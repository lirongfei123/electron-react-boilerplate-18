import React, { useEffect, useState } from 'react';
import Form from '@alifd/next/lib/form';
import Field from '@alifd/next/lib/field';
import NumberPicker from '@alifd/next/lib/number-picker';
import { Button, Checkbox, Switch } from '@alifd/next';
type RequiredMark = boolean | 'optional';
const FormItem = Form.Item;

export default function SettingView() {
  document.title = '设置';
  const [isVip, setIsVip] = useState(true);
  const [isMac, setIsMac] = useState(true);
  const [showSleep, setShowSleep] = useState(false);
  const sendValueToParent = (name, value) => {
    window.electron.ipcRenderer.sendToMain('settingValueChange', {
      name,
      value
    });
  }
  window.electron.ipcRenderer.on('setting-value', (value) => {
    field.setValues(value);
    console.log(value);
    setIsVip(value.isVip);
    setIsMac(value.isMac);
  });
  window.electron.ipcRenderer.on('sendConfigInfo', (value) => {
    if (value.config && value.config.showSleep) {
      setShowSleep(true);
    }
  });
  window.electron.ipcRenderer.on('vip-value', (value) => {
    setIsVip(value.isVip);
  });
  useEffect(() => {
    window.electron.ipcRenderer.sendToMain('getSettingValue', {
    });
    setInterval(() => {
      window.electron.ipcRenderer.sendToMain('getVipValue', {
      });
    }, 1000);
    window.electron.ipcRenderer.sendToMain('requestConfigInfo', {
    });
  }, []);
  const field = Field.useField({
    values: {
      workMinute: 50,
      sleepMinute: 5,
      blankMinute: 10,
      autoStart: true,
    },
    onChange: (name, value) => {
      sendValueToParent(name, value);
    }
  });
  const formItemLayout = {
    labelCol: {
      fixedSpan: 6
    },
    wrapperCol: {
      span: 18
    }
  };
  
  return (
    <Form style={{ width: "80%", margin: '0 auto' }} {...formItemLayout} colon>
      <FormItem
        name="autoStart"
        label="开机启动"
      >
        <Switch size={'small'} {...field.init('autoStart')} checked={field.getValue('autoStart')} />
      </FormItem>
      <FormItem
        name="workMinute"
        label="连续工作时间"
        required
        requiredMessage="连续工作时间"
      >
        <NumberPicker {...field.init('workMinute')} type="inline" min={1} max={240} />
      </FormItem>
      <FormItem
        name="sleepMinute"
        label="休息时间"
        required
        requiredMessage="连续工作时间"
      >
        <NumberPicker {...field.init('sleepMinute')} type="inline" min={1} max={60} />
      </FormItem>
      <FormItem
        name="blankMinute"
        label="空闲重置时间"
        required
        requiredMessage="连续工作时间"
        help="鼠标或者键盘无活动多长时间视为休息, 此时会重置计时"
      >
        <NumberPicker {...field.init('blankMinute')} type="inline" min={1} max={120} />
      </FormItem>
      {
        showSleep && <FormItem
        label="休息"
      >
        <div>
          <Button type={'primary'} onClick={() => {
            window.electron.ipcRenderer.sendToMain('goSleepNow', {
            });
          }}>立即休息</Button>
        </div>
      </FormItem>
      }
      { isMac && <FormItem
        label="会员信息"
      >
        {
          isVip ? <div>
            <Button type={'primary'} disabled>你已经是Pro版本</Button>
          </div> : <div>
            <Button type={'primary'} onClick={() => {
              window.electron.ipcRenderer.sendToMain('goPay', {});
            }}>购买Pro版本</Button>
            <Button style={{
              marginLeft: '10px'
            }} onClick={() => {
              window.electron.ipcRenderer.sendToMain('restorePay', {});
            }}>恢复购买</Button>
          </div>
        }
      </FormItem>}
      
    </Form>
  );
};
{/* <Form style={{ width: "60%" }} {...formItemLayout} colon>
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
        workMinute,
        sleepMinute,
        blankMinute,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="工作时间" name='workMinute' required tooltip="工作多长时间后休息">
        <Input placeholder="工作多长时间后休息" type={'number'} max={60 * 2} suffix="分钟" onChange={(e) => {
          sendValueToParent('workMinute', e.target.value);
        }} />
      </Form.Item>
      <Form.Item label="休息时间" name='sleepMinute' required tooltip="每次休息多长时间">
        <Input placeholder="每次休息多长时间"  type={'number'} max={60 * 24} suffix="分钟" onChange={(e) => {
          sendValueToParent('sleepMinute', e.target.value);
        }} />
      </Form.Item>
      <Form.Item label="电脑空闲重置时间" name='blankMinute' required tooltip="电脑空闲多久后重新计时">
        <Input placeholder="电脑空闲多久后重新计时" type={'number'} max={240} suffix="分钟" onChange={(e) => {
          sendValueToParent('blankMinute', e.target.value);
        }}/>
      </Form.Item>
    </Form> */}