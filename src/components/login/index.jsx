import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import axios from 'axios';
import './index.css';
import Menu from '../Menu';

class Index extends Component {
  constructor(props) {
    super(props);
    // 设置初始化状态
    this.state = {
      isLoggedIn: false,
      message: '请登录'
    };
  }

  componentDidMount() {
    // 在组件挂载时执行的逻辑
    // 可以在此处发送请求或执行其他副作用操作
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
        this.setState({ isLoggedIn: true });
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
    const { isLoggedIn, message } = this.state;

    return (
      <div className="login-container">
        <div className="login-box">
          <h3>博速汽修厂</h3>
          <hr />
          {isLoggedIn ? ( // 根据登录状态决定是否渲染菜单组件
            <Menu />
          ) : (
            <div>
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
                  {/*&nbsp;&nbsp;<a href="http://127.0.0.1:3000">现在注册</a>**/}
                </Form.Item>
                {/* 
                  判断用户是否登录然后给出提示信息
              **/}
                {isLoggedIn ? (
                  <Alert message="Error" type="error" showIcon />
                ) : (
                  <p>{message}</p>
                )}
              </Form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Index;
