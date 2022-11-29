import React, { useEffect, useState } from "react";

export default function Sleep() {
  // const [sleepTime, setSleepTime] = useState(0);
  // const [workTime, setWorkTime] = useState(0);
  // useEffect(() => {
  //   window.electron.ipcRenderer.on('getDuraton', (arg) => {
  //     // eslint-disable-next-line no-console
  //     setWorkTime(arg.lastBusyDurtion);
  //     setSleepTime(arg.lastSleepDurtion);
  //   });
  // }, []);
  return <div style={{
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }}>
    <div>休息一下</div>
  </div>
}