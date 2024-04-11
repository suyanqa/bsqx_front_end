import React, { useState } from 'react';
import { Button, Modal, message, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const DeleteComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleDeleteConfirm = () => {
    // 请求前输出用户输入的id值
    console.log(inputValue);
    axios.post(`/customer/delete/${inputValue}`)
    .then(response => {
      if (response.data.success) {
        message.success(response.data.message);
        setModalVisible(false);
        setConfirmDelete(false);
        setInputValue(''); // 清空状态
      } else {
        message.error(response.data.data);
      }
    })
    .catch(error => {
      console.error('删除客户错误:', error);
      message.error('删除客户失败，请稍后再试');
    });
  };

  const handleDelete = () => {
    setConfirmDelete(true);
    setModalVisible(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleDelete();
    }
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="请输入待删除客户的 ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleKeyPress} // 在这里添加 onPressEnter 属性 回车等同于按下按钮
          style={{ marginRight: '8px' }}
        />
        <Button type="danger" onClick={handleDelete} icon={<DeleteOutlined />}>删除</Button>
      </div>
      <Modal
        title="确认删除客户"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setConfirmDelete(false);
        }}
        footer={null}
      >
        {!confirmDelete ? (
          <>
            <p>确定要删除客户吗？</p>
            <Button
              type="primary"
              onClick={() => {
                setConfirmDelete(true);
                setCustomerId(inputValue);
                setInputValue('');
              }}
              style={{ marginTop: '10px' }}
            >
              是
            </Button>
            <Button onClick={() => setModalVisible(false)} style={{ marginLeft: '10px' }}>
              否
            </Button>
          </>
        ) : (
          <>
            <p>确认要删除客户 {customerId} 吗？</p>
            <Button type="primary" onClick={handleDeleteConfirm} style={{ marginTop: '10px' }} onPressEnter={handleKeyPress}>
              确定
            </Button>
            <Button onClick={() => {
              setConfirmDelete(false);
              setModalVisible(false);
            }} style={{ marginLeft: '10px' }}>
              取消
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default DeleteComponent;
