import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
if (window.electron && window.electron.ipcRenderer) {
  window.electron.ipcRenderer.on('ipc-example', (arg) => {
    // eslint-disable-next-line no-console
    console.log(arg, '首页');
  });
  window.electron.ipcRenderer.myPing();
}
