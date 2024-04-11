import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card } from 'antd';
import axios from 'axios';

const App = () => {
  const [alertVisible, setAlertVisible] = useState(false); // 控制警报消息的显示与隐藏
  const [alertType, setAlertType] = useState('success'); // 控制警报消息的类型
  const [alertMessage, setAlertMessage] = useState(''); // 控制警报消息的内容

  const onFinish = (values) => {
    const { name, contactNumber, additionalContactNumber } = values;
    axios
      .post('/customer/add', {
        name,
        contactNumber,
        additionalContactNumber,
      })
      .then((response) => {
        if (response.data.success) {
          setAlertType('success'); // 设置警报消息类型为成功
          setAlertMessage(response.data.data); // 设置警报消息内容
          setAlertVisible(true); // 显示警报消息
        } else {
          setAlertType('error'); // 设置警报消息类型为错误
          setAlertMessage(response.data.data); // 设置警报消息内容
          setAlertVisible(true); // 显示警报消息
        }
      })
      .catch((err) => {
        setAlertType('error'); // 设置警报消息类型为错误
        setAlertMessage('请求失败,请稍后再试~'); // 设置警报消息内容
        setAlertVisible(true); // 显示警报消息
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        title="添加客户"
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
            label="名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入客户名称',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: '请输入客户手机号',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="其余手机号"
            name="additionalContactNumber"
          >
            <Input />
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
