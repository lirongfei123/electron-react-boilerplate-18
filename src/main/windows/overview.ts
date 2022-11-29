import path from 'path';
import { app,  BrowserWindow, ipcMain } from 'electron';
import { resolveHtmlPath } from '../util';
import { addIohookListener, removeIohookListener } from '../sysevent';
var robot = require("robotjs");
let mainWindow: BrowserWindow | null = null;
export function createOverView(position) {
  if (mainWindow) {
    mainWindow.show();
    return;
  }
  var width = 200;
  var height = 128;
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    transparent: false,
    frame: false,
    x: position.x - width/2,
    skipTaskbar: true,
    y: position.y,
    width: width,
    height: height,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../../.erb/dll/preload.js'),
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html#/overview'));
  mainWindow.on('blur', () => {
    mainWindow?.close();
  });
  
  mainWindow.webContents.on('did-finish-load', () => {
    addIohookListener(listener);
  });
  const listener = (e) => {
    mainWindow?.webContents.send('getDuraton', e);
  }
  mainWindow.on('show', () => {
  });

 
  mainWindow.on('closed', () => {
    removeIohookListener(listener);
    mainWindow = null;
  });

}