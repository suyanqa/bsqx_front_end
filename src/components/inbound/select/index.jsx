import React, { useState } from 'react';
import { Input, Spin, List } from 'antd'; // 引入 Spin 和 List 组件
import axios from 'axios';

const { Search } = Input;

const App = () => {
  const [isLoading, setIsLoading] = useState(false); // 控制搜索加载的显示与隐藏
  const [searchResult, setSearchResult] = useState([]); // 用于保存搜索结果

  const handleSearch = (keyword) => {
    setIsLoading(true); // 开始加载，显示加载状态

    axios.post('/inbound/search', {
        keyword
    }).then((response) => {
      if (response.data.success) {
        setSearchResult(response.data.data); // 将搜索结果保存到状态中
      }
    }).catch(err => {
      console.log("请求失败请稍后重试");
    }).finally(() => {
      setIsLoading(false); // 加载结束，隐藏加载状态
    });
  };

  return (
    <div className='select' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: 600 }}>
        <Search
          placeholder="请输入关键词进行搜索"
          enterButton="搜索出库记录" // 使用 Ant Design 的搜索按钮
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
              <div>{`配件名称: ${item.itemName}`}</div>
              <div>{`品牌: ${item.brand}`}</div>
              <div>{`数量: ${item.quantity}`}</div>
              <div>{`入库日期: ${item.inboundDate}`}</div>
            </List.Item>
          )} // 渲染每个搜索结果项
          locale={{ emptyText: '暂无数据' }} // 设置没有数据时的提示文本
        />
      </div>
    </div>
  );
};

export default App;
