import React, { useState, useEffect } from 'react';
import { Spin, Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const EditableTable = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]); // 获取到的用户数据存入DataSource
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // 编辑状态的值
  const [form] = Form.useForm();

  // 获取所有客户信息
  useEffect(() => {
    axios.post('/api/customer/allCustomers')
      .then(response => {
        setDataSource(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('获取数据错误:', error);
        setLoading(false);
      });
  }, []);

  // 处理点击编辑按钮事件
  const handleEdit = (record) => {
    setSelectedItem(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  // 取消编辑
  const handleCancel = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  // 提交编辑后的数据
  const onFinish = (values) => {
    axios.post(`/api/customer/edit/${selectedItem.id}`, values)
      .then(response => {
        if (response.data.success) {
          message.success('编辑成功');
          // 更新修改后的数据
          const newData = dataSource.map(item => {
            if (item.id === selectedItem.id) {
              return { ...item, ...values };
            }
            return item;
          });
          setDataSource(newData); // 设置修改后的新数据
          setModalVisible(false);
          setSelectedItem(null);
        } else {
          message.error(response.data.message);
        }
      })
      .catch(error => {
        console.error('编辑客户错误:', error);
        message.error('编辑失败，请稍后再试');
      });
  };

  // 表格列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: '其余手机号',
      dataIndex: 'additionalContactNumber',
      key: 'additionalContactNumber',
    },
    {
      title: '操作',
      key: 'action',
      // _表示当前行索引,record表示当前行的数据
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          编辑
        </Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
      <Modal
        title="编辑用户"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入客户名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="contactNumber" rules={[{ required: true, message: '请输入客户手机号' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="其余手机号" name="additionalContactNumber">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default EditableTable;
