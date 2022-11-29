import { emitIohookEvent } from './sysevent';
import { app, ipcMain, shell } from 'electron';
import store from './store';
import sleepManager from './windows/sleepManager';
import { getIsVip } from './pay';
const ioHook = require('iohook-electron');
var sleepSecond = store.get('sleepMinute') * 60 * 1000;
var workSecond = store.get('workMinute') * 60 * 1000;
var blankSecond = store.get('blankMinute') * 60 * 1000;
var isSleeping = false;
var lastSleepTime = new Date().getTime();
var lastBusyTime = new Date().getTime();
var closeTimer = null;
ipcMain.on('settingValueChange', async (event, arg) => {
  if (arg.name == 'workMinute') {
    workSecond = 60 * arg.value * 1000;
    resetSleepTime();
    store.set('workMinute', arg.value);
  }
  if (arg.name == 'sleepMinute') {
    sleepSecond = 60 * arg.value * 1000;
    store.set('sleepMinute', arg.value);
  }
  if (arg.name == 'blankMinute') {
    blankSecond = 60 * arg.value * 1000;
    store.set('blankMinute', arg.value);
  }
  if (arg.name == 'autoStart') {
    if (arg.value) {
      // 开机启动
      app.setLoginItemSettings({
        openAtLogin: true
      });
    } else {
      // 关闭开机启动
      app.setLoginItemSettings({
        openAtLogin: false
      });
    }
    store.set('autoStart', arg.value);
  }
});
ipcMain.on('getSettingValue', async (event, arg) => {
  event.reply('setting-value', {
    workMinute: store.get('workMinute'),
    sleepMinute: store.get('sleepMinute'),
    blankMinute: store.get('blankMinute'),
    autoStart: store.get('autoStart'),
    isVip: getIsVip(),
    isMac: process.platform == 'darwin'
  });
});

ipcMain.on('closeSleepWindow', async (event, arg) => {
  close_sleep_window();
});
ipcMain.on('getCurrentWorkMinute', async (event, arg) => {
  event.reply('getDuraton', {
    lastSleepDurtion: new Date().getTime() - lastSleepTime,
  });
});

const open_listener_callback = () => {
  if (isSleeping) {
    return;
  }
  var nowTime = new Date().getTime();
  // 如果距离上一次busy时间超过空闲时间, 意味着已经休息了5分钟
  if (nowTime - lastBusyTime > blankSecond) {
    lastSleepTime = nowTime;
  }
  // console.log(nowTime - lastSleepTime, nowTime, lastSleepTime, workSecond);
  if ((nowTime - lastSleepTime) > workSecond) {
    isSleeping = true;
    sleepManager.createSleepWindow();
    closeTimer = setTimeout(() => {
      close_sleep_window();
    }, sleepSecond);
  }
  emitIohookEvent({
    lastBusyDurtion: nowTime - lastBusyTime,
    lastSleepDurtion: nowTime - lastSleepTime,
  });
  lastBusyTime = new Date().getTime();
}
ioHook.on('mousedown', (event: any) => {
  open_listener_callback();
});
ioHook.on('keyup', (event: any) => {
  open_listener_callback();
});
// ioHook.registerShortcut([29, 42, 11], (keys) => {
//   close_sleep_window();
// });
// Alternatively, pass true to start in DEBUG mode.
ioHook.start();
function close_sleep_window() {
  resetSleepTime();
  clearTimeout(closeTimer);
  isSleeping = false;
  sleepManager.closeSleepWindow();
}
function resetSleepTime() {
  lastBusyTime = new Date().getTime();
  lastSleepTime = new Date().getTime();
}