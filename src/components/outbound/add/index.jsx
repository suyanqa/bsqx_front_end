import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card,DatePicker } from 'antd';
import axios from 'axios';
import {nanoid} from 'nanoid'


const App = () => {
  const [alertVisible, setAlertVisible] = useState(false); // 控制警报消息的显示与隐藏
  const [alertType, setAlertType] = useState('success'); // 控制警报消息的类型
  const [alertMessage, setAlertMessage] = useState(''); // 控制警报消息的内容

  const onFinish = (values) => {
    values.itemId = nanoid()

    axios
    .post('/outbound/add', values)
    .then((response) => {
      if (response.data.success) {
        // 成功处理
        setAlertType('success');
        setAlertMessage(response.data.message);
        setAlertVisible(true);
        // ... (可选，您可以在这里执行其他操作，例如更新表格数据)
      } else {
        // 失败处理
        setAlertType('error');
        setAlertMessage(response.data.message);
        setAlertVisible(true);
      }
    })
    .catch((err) => {
      // 网络错误处理
      setAlertType('error');
      setAlertMessage('请求失败,请稍后再试~');
      setAlertVisible(true);
    });
};

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };

  const onChange = (date, dateString) => {
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Card
        title="添加出库记录"
        style={{ width: 400, textAlign: 'center' }} // 设置卡片宽度并居中显示内容
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="配件名称"
            name="itemName"
            rules={[
              {
                required: true,
                message: '请输入配件名称',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="配件品牌"
            name="brand"
            rules={[
              {
                required: true,
                message: '请输入配件品牌',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="配件数量"
            name="quantity"
            rules={[{required:true,message:"请输入配件数量"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
          label="日期选择"
          name="outboundDate"
          rules={[
            {
              required: true,
              message: '请选择日期',
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"  // 直接提供格式字符串
            onChange={onChange}
          />
        </Form.Item>
        
        

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: '34%' }}>
              添加
            </Button>
          </Form.Item>
        </Form>

        {/* 警报消息 */}
        {alertVisible && <Alert style={{ marginTop: 10 }} message={alertMessage} type={alertType} />}
      </Card>
    </div>
  );
};

export default App;
