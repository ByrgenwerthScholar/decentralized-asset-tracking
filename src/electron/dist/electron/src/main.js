"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const chokidar_1 = __importDefault(require("chokidar"));
let backendProcess;
if (process.env.NODE_ENV === 'development') {
    try {
        const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', process.platform === 'win32' ? 'electron.cmd' : 'electron');
        // Exclude electron-reload from bundling
        const electronReload = require('electron-reload');
        // Set appPath explicitly
        const appPath = __dirname;
        electronReload(appPath, {
            electron: electronPath,
            forceHardReset: true,
            hardResetMethod: 'exit',
        });
        console.log('Electron executable path:', electronPath);
    }
    catch (err) {
        console.error('Failed to load electron-reload:', err);
    }
}
function startBackend() {
    const backendPath = path.join(__dirname, '../', '../', 'backend', 'express', 'dist', 'app.js');
    // Kill existing backend process if running
    if (backendProcess) {
        backendProcess.kill();
    }
    // Start the backend process
    backendProcess = (0, child_process_1.spawn)('node', [backendPath], {
        cwd: path.dirname(backendPath),
        stdio: 'inherit',
    });
    backendProcess.on('error', (err) => {
        console.error('Failed to start backend process:', err);
    });
    backendProcess.on('close', (code) => {
        console.log(`Backend process exited with code ${code}`);
    });
}
function watchBackend() {
    const backendFile = path.join(__dirname, '../', '../', 'backend', 'express', 'dist', 'app.js');
    let restartTimeout = null;
    const watcher = chokidar_1.default.watch(backendFile, { ignoreInitial: true });
    watcher.on('change', () => {
        if (restartTimeout) {
            clearTimeout(restartTimeout);
        }
        restartTimeout = setTimeout(() => {
            console.log('Detected change in backend code. Restarting backend process...');
            startBackend();
        }, 500); // Adjust the delay as needed
    });
}
function createWindow() {
    startBackend();
    watchBackend();
    const win = new electron_1.BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        backgroundColor: '#030637',
    });
    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:3001'); // Ensure this matches the devServer port
    }
    else {
        win.loadFile(path.join(__dirname, '../../frontend/dist/index.html'));
    }
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (backendProcess) {
            backendProcess.kill();
        }
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
