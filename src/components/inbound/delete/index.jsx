import React, { useState } from 'react';
import { Button, Modal, message, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const DeleteComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleDeleteConfirm = () => {
    console.log(inputValue); // 确认使用 inputValue 进行删除
    axios.post(`/inbound/delete/${inputValue}`)
      .then(response => {
        if (response.data.success) {
          message.success(response.data.message);
          setModalVisible(false);
          setInputValue(''); // 清空输入框
        } else {
          message.error(response.data.message); // 使用 message 字段显示错误信息
        }
      })
      .catch(error => {
        console.error('删除记录错误:', error);
        message.error('删除记录失败，请稍后再试');
      });
  };

  const handleDelete = () => {
    if (!inputValue) {
      message.error('请输入一个有效的ID');
      return;
    }
    setModalVisible(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleDelete(); // 触发删除逻辑
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="请输入待删除出库记录的 ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ marginRight: '8px' }}
        />
        <Button type="danger" onClick={handleDelete} icon={<DeleteOutlined />}>删除</Button>
      </div>
      <Modal
        title="确认删除"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <p>确认要删除ID为: {inputValue} 的记录吗？</p>
        <Button type="primary" onClick={handleDeleteConfirm} style={{ marginRight: '10px' }}>
          确定
        </Button>
        <Button onClick={() => setModalVisible(false)}>
          取消
        </Button>
      </Modal>
    </>
  );
};

export default DeleteComponent;
