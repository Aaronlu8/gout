import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { 
  HomeOutlined, 
  BarChartOutlined, 
  CalculatorOutlined, 
  FileTextOutlined, 
  InfoCircleOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 1000;
  height: 64px;

  @media (max-width: 768px) {
    height: 56px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 12px;
    min-width: max-content;
    width: auto;
  }
`;

const AppTitle = styled.div`
  color: #1677ff;
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  margin-right: 48px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-right: 24px;
    flex-shrink: 0;
  }
`;

const StyledMenu = styled(Menu)`
  flex: 1;
  border-bottom: none;
  background: transparent;
  white-space: nowrap;

  @media (max-width: 768px) {
    .ant-menu-item {
      padding: 0 12px;
      flex-shrink: 0;
      min-width: max-content;
    }
  }
`;

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState('home');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/stats')) {
      setCurrent('stats');
    } else if (path.includes('/calculator')) {
      setCurrent('calculator');
    } else if (path.includes('/knowledge')) {
      setCurrent('knowledge');
    } else if (path.includes('/datasource')) {
      setCurrent('datasource');
    } else {
      setCurrent('home');
    }
  }, [location]);

  const handleClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        navigate('/');
        break;
      case 'stats':
        navigate('/stats');
        break;
      case 'calculator':
        navigate('/calculator');
        break;
      case 'knowledge':
        navigate('/knowledge');
        break;
      case 'datasource':
        navigate('/datasource');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        <AppTitle>嘌呤管家</AppTitle>
        <StyledMenu mode="horizontal" selectedKeys={[current]} onClick={handleClick}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            食品分类
          </Menu.Item>
          <Menu.Item key="stats" icon={<BarChartOutlined />}>
            数据统计
          </Menu.Item>
          <Menu.Item key="calculator" icon={<CalculatorOutlined />}>
            嘌呤计算器
          </Menu.Item>
          <Menu.Item key="knowledge" icon={<FileTextOutlined />}>
            痛风知识
          </Menu.Item>
          <Menu.Item key="datasource" icon={<InfoCircleOutlined />}>
            数据来源
          </Menu.Item>
        </StyledMenu>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default AppHeader;