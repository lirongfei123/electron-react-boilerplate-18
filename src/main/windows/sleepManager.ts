import path from 'path';
import { app,  BrowserWindow, ipcMain, screen } from 'electron';
import {createSleepView} from './sleep';
import { createAdView } from './ad';
var robot = require("robotjs");
var timer = null;
var isSleeping = false;
var sleepWindows = [];
export default {
  createSleepWindow() {
    if (isSleeping) {
      return;
    }
    isSleeping = true;
    clearInterval(timer);
    var mainScreen = screen.getPrimaryDisplay();
    const mouseX = mainScreen.workArea.x + mainScreen.workArea.width/2;
    const mouseY = mainScreen.workArea.y + mainScreen.workArea.height/2;
    timer = setInterval(() => {
      robot.moveMouse(mouseX, mouseY);
    }, 16);
    var allScreens = screen.getAllDisplays();
    for (var i = 0; i < allScreens.length; i++) {
      var sleepWindow = createSleepView(allScreens[i].bounds, i== 0)
      sleepWindows.push(sleepWindow);
    }
  },
  closeSleepWindow() {
    
    clearInterval(timer);
    for (var i = 0; i < sleepWindows.length; i++) {
      sleepWindows[i].closeWindow();
    }
    if (isSleeping) {
      createAdView();
    }
    isSleeping = false;
  }
}