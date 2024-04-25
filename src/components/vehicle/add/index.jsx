import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card } from 'antd';
import axios from 'axios';

const App = () => {
  const [alertVisible, setAlertVisible] = useState(false); // 控制警报消息的显示与隐藏
  const [alertType, setAlertType] = useState('success'); // 控制警报消息的类型
  const [alertMessage, setAlertMessage] = useState(''); // 控制警报消息的内容

  const onFinish = (values) => {

    axios
    .post('/api/vehicle/add', values)
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
        title="添加车辆"
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
            label="客户ID"
            name="customerId"
            rules={[
              {
                required: true,
                message: '请输入车辆所属用户ID',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="车牌号"
            name="licensePlate"
            rules={[
              {
                required: true,
                message: '请输入客户车牌号',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="品牌"
            name="model"
            rules={[{required:true,message:"请输入车辆品牌"}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="VIN码"
            name="vin"
            rules={[{required:true,message:"请输入车辆VIN码"}]}
        >
          <Input/>
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
