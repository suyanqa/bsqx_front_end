import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { ConfigProvider } from "antd"
import zhCN from "antd/lib/locale/zh_CN"

const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
  );