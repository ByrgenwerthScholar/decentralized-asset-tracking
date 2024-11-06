import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';
import chokidar from 'chokidar';


let backendProcess: ChildProcess;

if (process.env.NODE_ENV === 'development') {
  try {
    const electronPath = path.join(
      __dirname,
      '..',
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'electron.cmd' : 'electron'
    );

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
  } catch (err) {
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
  backendProcess = spawn('node', [backendPath], {
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

  let restartTimeout: NodeJS.Timeout | null = null;

  const watcher = chokidar.watch(backendFile, { ignoreInitial: true });

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

  const win = new BrowserWindow({
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
  } else {
    win.loadFile(path.join(__dirname, '../../frontend/dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) {
      backendProcess.kill();
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

