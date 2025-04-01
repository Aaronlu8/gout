import React from 'react';
import { HashRouter as Router } from 'react-router-dom';  // 改用 HashRouter
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ThemeProvider } from 'styled-components';
import { FoodProvider } from './contexts/FoodContext';
import { theme } from './styles/theme';
import Layout from './components/Layout';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <ThemeProvider theme={theme}>
        <FoodProvider>
          <Router>
            <Layout />
          </Router>
        </FoodProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
