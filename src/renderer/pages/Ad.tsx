import React, { useEffect, useState } from "react";

export default function AdView() {
  
  return <div>
    <webview id="foo" src="https://www.baidu.com/" style={{width: '1001px', height: '1200px'}}></webview>
  </div>
}