import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import axios from 'axios';
import { Routes, Route,Navigate } from 'react-router-dom';
import './index.css';
import Home from '../../pages/home/home';

class Index extends Component { 
  constructor(props) {
    super(props);
    // 设置初始化状态
    this.state = {
      isLoggedIn: false,
      message: '请登录',
      redirectToHome: false // 新增 redirectToHome 状态，用于控制重定向
    };
  }

  // 表单提交调用函数
  onFinish = (values) => {
    console.log('表单接收到的数据: ', values);
    const { username, password } = values;

    axios.post('/login', {
      username,
      password
    })
    .then((response) => {
      if (response.data.success) {
        // 登录成功
        console.log('登录成功:', response.data.message);
        console.log('欢迎信息:', response.data.data);
        // 设置登录状态为 true
        this.setState({ isLoggedIn: true, redirectToHome: true }); // 更新 redirectToHome 状态为 true
      } else {
        // 登录失败
        console.log('登录失败:', response.data.message);
        console.log('失败原因:', response.data.data);
        // 更新消息状态
        this.setState({ message: '用户名或密码错误' });
      }
    })
    .catch((error) => {
      console.log('请求错误:', error);
    });
  };

  render() {
    const { isLoggedIn, message, redirectToHome } = this.state;

    if (redirectToHome) {
      return (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      );
    }

    return (
      <div>
        {isLoggedIn ? (
          <Home />
        ) : (
          <div>
            <div className="login-container">
              <div className="login-box">
                <h3>博速汽修厂</h3>
                <hr />
                <Form
                  name="normal_login"
                  className="login-form"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入你的用户名!' }]}
                    className="usernames"
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入你的用户名" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入你的密码!' }]}
                  >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入你的密码" />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="http://127.0.0.1:3001">
                      忘记密码
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                    </Button>
                  </Form.Item>
                  {/* 判断用户是否登录然后给出提示信息 */}
                  {isLoggedIn ? (
                    <Alert message="Error" type="error" showIcon />
                  ) : (
                    <p>{message}</p>
                  )}
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Index;
