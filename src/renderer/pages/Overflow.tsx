import React, { useEffect, useState } from "react";
import Range from '@alifd/next/lib/range';
export default function OverView() {
  const [workTotal, setWorkTotal] = useState(50);
  const [workTime, setWorkTime] = useState(0);
  window.electron.ipcRenderer.on('setting-value', (value) => {
    setWorkTotal(value.workMinute);
  });
  window.electron.ipcRenderer.on('getDuraton', (arg) => {
    // eslint-disable-next-line no-console
    setWorkTime(arg.lastSleepDurtion);
  });
  useEffect(() => {
    window.electron.ipcRenderer.sendToMain('getSettingValue', {});
    setInterval(() => {
      window.electron.ipcRenderer.sendToMain('getCurrentWorkMinute', {});
    }, 1000);
  }, []);
  const value = (workTime/60000).toFixed(2);
  return <div>
    <div>
      <div style={{
        marginBottom: '10px'
      }}>
        {`已经工作${value}分钟`}
      </div>
      <div>
        <Range
        slider={'single'}
            min={0}
            max={workTotal}
            value={value}
          />
      </div>
    </div>
  </div>
}