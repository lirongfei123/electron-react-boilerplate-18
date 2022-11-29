import path from 'path';
import { app,  BrowserWindow, screen, shell, ipcMain } from 'electron';
import { resolveHtmlPath } from '../util';
import axios from 'axios';
import store from '../store';
let mainWindow: BrowserWindow | null = null;
ipcMain.on('closeAd', async (event, arg) => {
  mainWindow?.close();
});
ipcMain.on('payVip', async (event, arg) => {
  console.log('去支付');
  goPay();
});
import {getIsVip, goPay} from '../pay';
export function createAdView() {
  const isVip = getIsVip();
  if (isVip) {
    return;
  }
  axios.get('https://www.fit.kim/public_static/setting.json').then(function (response) {
    var setting = response.data;
    if (setting && setting.disable) {
      return;
    }
    if (setting && typeof setting.adWidth == 'number' && typeof setting.adHeight == 'number') {
      store.set('adSettings', {
        width: setting.adWidth,
        height: setting.adHeight,
      });
      _createAdView(setting.adWidth, setting.adHeight);
    } else {
      const adSettings = store.get('adSettings');
      var width = adSettings.width;
      var height = adSettings.height;
      _createAdView(width, height);
    }
  }).catch(function (error) {
    console.log(error);
  }).then(function () {
  });
}
function _createAdView(width, height) {
  if (mainWindow) {
    mainWindow.show();
    return;
  }
  
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  var mainScreen = screen.getPrimaryDisplay();
  const mouseX = mainScreen.workArea.x + mainScreen.workArea.width - width;
  const mouseY = mainScreen.workArea.y + mainScreen.workArea.height - height;
  mainWindow = new BrowserWindow({
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    frame: false,
    x: mouseX,
    y: mouseY,
    width: width,
    height: height,
    // skipTaskbar: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      webviewTag: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../../.erb/dll/preload.js'),
    },
  });
  mainWindow.webContents.addListener('new-window', function(e, url) {
    console.log(e, url);
    e.preventDefault();
    shell.openExternal(url);
  });
  // mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
  mainWindow.loadURL(`https://www.fit.kim/public_static/ad.html`);
  setTimeout(() => {
    axios.get('https://www.fit.kim/public_static/ad.html').then(function (response) {
      store.set('adHtml', response.data);
    }).catch(function (error) {
      console.log(error);
    }).then(function () {
    });
  }, 100);
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