// src/services/notificationService.ts
import * as grpc from '@grpc/grpc-js';
import { ChaincodeEvent, CloseableAsyncIterable, connect, Network, GatewayError } from '@hyperledger/fabric-gateway';
import { Server } from 'http';
import WebSocket from 'ws';
import { newGrpcConnection1, newIdentity1, newSigner1, newGrpcConnection2, newIdentity2, newSigner2, channelName, chaincodeName } from '../utils/vars';
import { TextDecoder } from 'util';

const utf8Decoder = new TextDecoder();

let wss1: WebSocket.Server | undefined;
let wss2: WebSocket.Server | undefined;

const notifyClients = (wss: WebSocket.Server, message: string) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export const setupNotificationService1 = async (): Promise<void> => {
  if (!wss1) {
    wss1 = new WebSocket.Server({ port:3002 });
    console.log('WebSocket server 1 started');

    wss1.on('connection', (ws) => {
      console.log('Client connected to WebSocket server 1');
      ws.on('message', (message) => {
        console.log('Received message on server 1:', message);
      });
      ws.on('close', () => {
        console.log('Client disconnected from WebSocket server 1');
      });
    });
  }

  const client = await newGrpcConnection1();
  const gateway = connect({
    client,
    identity: await newIdentity1(),
    signer: await newSigner1(),
    evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
    endorseOptions: () => ({ deadline: Date.now() + 15000 }),
    submitOptions: () => ({ deadline: Date.now() + 5000 }),
    commitStatusOptions: () => ({ deadline: Date.now() + 60000 }),
  });

  const network = gateway.getNetwork(channelName);
  await startEventListening(network, wss1);
};

export const setupNotificationService2 = async (): Promise<void> => {
  if (!wss2) {
    wss2 = new WebSocket.Server({ port: 3003 });
    console.log('WebSocket server 2 started');

    wss2.on('connection', (ws) => {
      console.log('Client connected to WebSocket server 2');
      ws.on('message', (message) => {
        console.log('Received message on server 2:', message);
      });
      ws.on('close', () => {
        console.log('Client disconnected from WebSocket server 2');
      });
    });
  }

  const client = await newGrpcConnection2();
  const gateway = connect({
    client,
    identity: await newIdentity2(),
    signer: await newSigner2(),
    evaluateOptions: () => ({ deadline: Date.now() + 5000 }),
    endorseOptions: () => ({ deadline: Date.now() + 15000 }),
    submitOptions: () => ({ deadline: Date.now() + 5000 }),
    commitStatusOptions: () => ({ deadline: Date.now() + 60000 }),
  });

  const network = gateway.getNetwork(channelName);
  await startEventListening(network, wss2);
};

async function startEventListening(network: Network, wss: WebSocket.Server): Promise<CloseableAsyncIterable<ChaincodeEvent>> {
  console.log('\n*** Start chaincode event listening');

  const events = await network.getChaincodeEvents(chaincodeName);
  void readEvents(events, wss); // Run asynchronously
  return events;
}

async function readEvents(events: CloseableAsyncIterable<ChaincodeEvent>, wss: WebSocket.Server): Promise<void> {
  try {
    for await (const event of events) {
      const payload = utf8Decoder.decode(event.payload);
      console.log(`\n<-- Chaincode event received: ${event.eventName} -`, payload);
      notifyClients(wss, `Event: ${event.eventName} - ${JSON.stringify(payload)}`);
    }
  } catch (error: any) {
    if (!(error instanceof GatewayError) || error.code !== grpc.status.CANCELLED.valueOf()) {
      throw error;
    }
  }
}
