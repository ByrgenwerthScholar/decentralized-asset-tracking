// src/electron/main.ts
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { spawn, ChildProcess } from 'child_process';
import chokidar from 'chokidar';
import waitOn from 'wait-on';

let backendProcess: ChildProcess | null = null;

// Function to start the backend server
function startBackend(): void {
  const backendPath = path.join(__dirname, '../../backend/express/dist/app.js');

  // Kill existing backend process if running
  if (backendProcess) {
    backendProcess.kill();
    console.log('Existing backend process killed.');
  }

  // Use the current Node.js executable path
  const nodePath = process.execPath;

  // Start the backend process
  backendProcess = spawn(nodePath, [backendPath], {
    cwd: path.dirname(backendPath),
    stdio: 'inherit',
  });

  backendProcess.on('error', (err: Error) => {
    console.error('Failed to start backend process:', err);
  });

  backendProcess.on('close', (code: number) => {
    console.log(`Backend process exited with code ${code}`);
    backendProcess = null;
  });

  console.log('Backend process started.');
}

// Function to watch backend files and restart on changes
function watchBackend(): void {
  const backendFile = path.join(__dirname, '../../backend/express/dist/app.js');

  let restartTimeout: NodeJS.Timeout | null = null;

  const watcher = chokidar.watch(backendFile, { ignoreInitial: true });

  watcher.on('change', () => {
    console.log(`Detected change in backend file: ${backendFile}`);
    if (restartTimeout) {
      clearTimeout(restartTimeout);
    }
    restartTimeout = setTimeout(() => {
      console.log('Restarting backend process...');
      startBackend();
    }, 500); // Adjust the delay as needed
  });

  watcher.on('ready', () => {
    console.log('Started watching backend files for changes.');
  });

  watcher.on('error', (error: Error) => {
    console.error('Error watching backend files:', error);
  });
}

async function createWindow(): Promise<void> {
  console.log('Starting backend server...');
  startBackend();
  console.log('Watching backend files...');
  watchBackend();

  console.log('Waiting for Express server to be ready...');
  try {
    await waitOn({
      resources: ['http://localhost:3000'],
      timeout: 15000, // 15 seconds
      interval: 100, // Check every 100ms
    });
    console.log('Express server is up. Loading the Electron window.');
  } catch (err) {
    console.error('Express server did not start in time:', err);
    app.quit(); // Exit the app if the server isn't up
    return;
  }

  const win: BrowserWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Ensure preload.js exists
      nodeIntegration: false, // Security: Disable Node.js integration
      contextIsolation: true, // Security: Enable context isolation
      devTools: process.env.NODE_ENV === 'development', // Enable DevTools in development
    },
    backgroundColor: '#030637',
  });

  const backendURL: string = 'http://localhost:3000'; // Express server URL

  // Load the Express server URL
  win.loadURL(backendURL);

  console.log(`Electron window loaded ${backendURL}`);

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

// Event: When Electron is ready, create the window
app.whenReady().then(createWindow);

// Event: Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) {
      backendProcess.kill();
      console.log('Backend process killed.');
    }
    app.quit();
  }
});

// Event: Re-create a window in the app when the dock icon is clicked and no other windows are open (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
