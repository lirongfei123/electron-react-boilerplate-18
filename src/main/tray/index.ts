import path from 'path';
import { app,  Tray, Menu, screen } from 'electron';
import { createOverView } from '../windows/overview';
import { createSleepView } from '../windows/sleep';
import { createAdView } from '../windows/ad';
import { createSettingView } from '../windows/setting';
import sleepManager from '../windows/sleepManager';
import { restorePay } from '../pay';
export function createTray() {
  const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../../assets');
  
  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  //图标的上下文菜单
  var trayMenuTemplate = [
    
    {   //打开相应页面
        label: "设置",
        click: function() {
          createSettingView();
        } 
    },
    // {
    //   label: "测试休息",        
    //   click: function() {
    //     sleepManager.createSleepWindow();
    //     setTimeout(() => {
    //       sleepManager.closeSleepWindow();
    //     }, 10 * 1000);
    //   } //打开相应页面
    // },
    // {
    //   //打开相应页面
    //     label: "测试广告",
    //     click: function() {
    //       createAdView();
    //     } 
    // },
    // {
    //   //打开相应页面
    //     label: "恢复购买",
    //     click: function() {
    //       restorePay();
    //     } 
    // },
    
    {
        label: "退出客户端",
        click: function() {
            app.quit();
        }
    },
    // {
    //   label: "查看版本信息",
    //   click: function() {
    //     //打开相应页面
    //   } 
    // }
  ];
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  let appTray = new Tray(getAssetPath('icons/16x16.png'));
  appTray.setContextMenu(contextMenu);
  appTray.on('mouse-enter', function() {
    let mousePos = screen.getCursorScreenPoint();
    createOverView(mousePos);
  });
}
