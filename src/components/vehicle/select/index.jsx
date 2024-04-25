import React, { useState } from 'react';
import { Input, Spin, List } from 'antd'; // 引入 Spin 和 List 组件
import axios from 'axios';

const { Search } = Input;

const App = () => {
  const [isLoading, setIsLoading] = useState(false); // 控制搜索加载的显示与隐藏
  const [searchResult, setSearchResult] = useState([]); // 用于保存搜索结果

  /**
   * 
   * @param {*} keyword -- 一个搜索关键字
   * Axios 函数对用户接收到的搜索关键词做处理,
   * 判断用户是想进行用户ID搜索还是其余关键字搜索
   * Number.isInteger()判断数据类型是否为Integer
   * parseInt()强制转换
   */
  const Axios = (keyword) => {
    if (Number.isInteger(parseInt(keyword))) {
      console.log(keyword);
      axios.post('/api/vehicle/search', { id: keyword })
        .then((response) => {
          if (response.data.success) {
            setSearchResult(response.data.data); // 将搜索结果保存到状态中
          }
        }).catch(err => {
          console.log("请求失败请稍后重试");
        }).finally(() => {
          setIsLoading(false); // 加载结束，隐藏加载状态
        });
    } else if (typeof keyword === 'string') {
      axios.post('/vehicle/search', { name: keyword })
        .then((response) => {
          if (response.data.success) {
            setSearchResult(response.data.data); // 将搜索结果保存到状态中
          }
        }).catch(err => {
          console.log("请求失败请稍后重试");
        }).finally(() => {
          setIsLoading(false); // 加载结束，隐藏加载状态
        });
    }
  };
  

  const handleSearch = (keyword) => {
    setIsLoading(true); // 开始加载，显示加载状态
    Axios(keyword)
  };

  return (
    <div className='select' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 600 }}>
        <Search
          placeholder="请输入关键字进行搜索"
          enterButton="搜索" // 使用 Ant Design 的搜索按钮
          size="large"
          onSearch={handleSearch} // 添加搜索回调函数
        />
        {isLoading && <Spin size="large" />} {/* 加载状态显示 */}
        <List
          size="large"
          bordered
          dataSource={searchResult} // 使用搜索结果作为数据源
          renderItem={(item) => (
            <List.Item>
              <div>{`ID: ${item.id}`}</div>
              <div>{`客户ID: ${item.customerId}`}</div>
              <div>{`品牌: ${item.model}`}</div>
              <div>{`车牌: ${item.licensePlate}`}</div>
              <div>{`VIN: ${item.vin}`}</div>
            </List.Item>
          )} // 渲染每个搜索结果项
          locale={{ emptyText: '暂无数据' }} // 设置没有数据时的提示文本
        />
      </div>
    </div>
  );
};

export default App;
