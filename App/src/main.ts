import { app, BrowserWindow } from 'electron';
import * as path from 'path';

// Enable live reloading (before window creation)
require('electron-reload')([path.join(__dirname, '../src'), path.join(__dirname, '../dist')],{
  // 'electron' path can be automatically detected or manually set for platform
  awaitWriteFinish: true, // Ensures that file changes are finished before reloading
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#030637',
  });

  win.loadFile(path.join(__dirname, '../src/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

