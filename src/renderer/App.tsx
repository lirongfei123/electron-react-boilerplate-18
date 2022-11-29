import { Button, Message } from '@alifd/next';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import AdView from './pages/Ad';
import OverView from './pages/Overflow';
import SettingView from './pages/Setting';
import Sleep from './pages/Sleep';

const Hello = () => {
  const [support, setSupport] = useState(false);
  useEffect(() => {
    window.electron.ipcRenderer.on('accessibilitySupportEnabled', (value) => {
      setSupport(value.support);
    });
    var timer = setInterval(() => {
      window.electron.ipcRenderer.sendToMain('isAccessibilitySupportEnabled', {
      });
    }, 1000);
  });
  return (
    <div>
      {
        support ? <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: "column"
        }}>
          <div style={{
            marginBottom: '15px'
          }}>
            <Message title="权限获取成功" type="success">
              请重新打开软件
            </Message>
          </div>
          <Button type={'primary'}  onClick={() => {
            window.electron.ipcRenderer.sendToMain('restartApp', {});
          }}>重新打开软件</Button>
        </div> : <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: "column"
        }}>
          <div style={{
            marginBottom: '15px'
          }}>
            <Message title="需要获取系统辅助功能权限" type="warning">
              软件通过监听鼠标单击事件,以及键盘按下事件来判断是否在活动状态
              <br />
              软件除了鼠标按下, 键盘按下事件, 不会监听其他事件, 如: 鼠标移动, 键盘松开等事件
            </Message>
          </div>
          <Button type={'primary'} onClick={() => {
            window.electron.ipcRenderer.sendToMain('getAccessibilitySupportEnabled', {});
          }}>请求系统权限</Button>
        </div>
      }
    </div>
  );
  
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/overview" element={<OverView />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/ad" element={<AdView />} />
        <Route path="/setting" element={<SettingView />} />
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
