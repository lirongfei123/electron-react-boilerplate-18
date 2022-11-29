import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'pi1111ng');
    },
    sendToMain(eventName: string, data: object) {
      ipcRenderer.send(eventName, data);
    },
    getDuraton() {
      ipcRenderer.send('getDuraton');
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'getDuraton', 'test-reply', 'setting-value', 'vip-value', 'accessibilitySupportEnabled', 'sendConfigInfo'];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'getDuraton'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});
