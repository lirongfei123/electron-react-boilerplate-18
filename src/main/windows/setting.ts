import path from 'path';
import axios from 'axios';
import sleepManager from '../windows/sleepManager';
import { app,  BrowserWindow, ipcMain } from 'electron';
import { resolveHtmlPath } from '../util';
import { getIsVip, goPay, restorePay } from '../pay';
let mainWindow: BrowserWindow | null = null;
ipcMain.on('goPay', async (event, arg) => {
  goPay();
});
ipcMain.on('restorePay', async (event, arg) => {
  restorePay();
});
ipcMain.on('getVipValue', async (event, arg) => {
  event.reply('vip-value', {
    isVip: getIsVip(),
  });
});
ipcMain.on('goSleepNow', async (event, arg) => {
  sleepManager.createSleepWindow();
  setTimeout(() => {
    sleepManager.closeSleepWindow();
  }, 10 * 1000);
});

ipcMain.on('requestConfigInfo', async (event, arg) => {
  axios.get('https://www.fit.kim/public_static/setting.json').then(function (response) {
    event.reply('sendConfigInfo', {
      config: response.data,
    });
  }).catch(function (error) {
    console.log(error);
  }).then(function () {
  });
  
});

export function createSettingView() {
  if (mainWindow) {
    mainWindow.show();
    return;
  }
  var width = 500;
  var height = 400;
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  
  mainWindow = new BrowserWindow({
    center: true,
    width: width,
    title: "设置",
    height: height,
    skipTaskbar: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      webviewTag: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../../.erb/dll/preload.js'),
    },
  });
  mainWindow.loadURL(resolveHtmlPath('index.html#/setting'));
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });
  mainWindow.on('show', () => {
  });

 
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

}