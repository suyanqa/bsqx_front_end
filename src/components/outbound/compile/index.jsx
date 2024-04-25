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
    axios.post('/api/outbound/all')
      .then(response => {
        // console.log(response.data);
        setDataSource(response.data.data);
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
    axios.post(`/api/outbound/edit/${selectedItem.id}`, values)
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
        console.error('编辑出库记录错误:', error);
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
      title: '配件名称',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title:'出库日期',
      dataIndex:'outboundDate',
      key:'outboundDate'
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
        title="编辑车辆"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item label="ID" name="id" rules={[{ required: true, message: '请输入出库ID' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="配件名称" name="itemName" rules={[{ required: true, message: '请输入配件名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="品牌" name="brand" rules={[{required:true,message:"请输入配件品牌"}]}>
            <Input />
          </Form.Item>
          <Form.Item label="数量" name="quantity" rules={[{required:true,message:"请输入出库数量"}]}>
            <Input/>
          </Form.Item>

          <Form.Item label="日期" name="outboundDate" rules={[{required:true,message:"请输入出库日期YYYY-MM-DD"}]}>
            <Input/>
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
