import path from 'path';
import { app,  BrowserWindow, ipcMain } from 'electron';
import axios from 'axios';
import fs from 'fs';
import store from '../store';
import { resolveHtmlPath } from '../util';

export function createSleepView(bounds, isMain = false) {
  let mainWindow: BrowserWindow | null = null;
  var isPreventClose = true;
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../../.erb/dll/preload.js'),
    },
  });
  // mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(store.get('sleepHtml'))}`);
  mainWindow.loadFile(getAssetPath('index.html'));
  setTimeout(() => {
    axios.get('https://www.fit.kim/public_static/index.html').then(function (response) {
      // store.set('sleepHtml', response.data);
      fs.writeFileSync(getAssetPath('index.html'), response.data);
    }).catch(function (error) {
      console.log(error);
    }).then(function () {
    });
  }, 100);
  
  // https://www.fit.kim/public_static/
  mainWindow.webContents.on('did-finish-load', () => {
  });
  const listener = (e) => {
    mainWindow?.webContents.send('getDuraton', e);
  }
  if (isMain) {
    mainWindow.on('blur', () => {
      mainWindow?.show();
    });
  }
  mainWindow.on('show', () => {
    mainWindow?.focus();
  });

  mainWindow.on('close', (e) => {
    if (isPreventClose) {
      e.preventDefault();
      return;
    }
  });
  mainWindow.on('closed', (e) => {
    mainWindow = null;
  });
  return {
    closeWindow: () => {
      isPreventClose = false;
      mainWindow?.close();
    }
  }
}
