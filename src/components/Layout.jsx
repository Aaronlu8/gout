import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Row, Col, Menu } from 'antd';
import { 
  HomeOutlined,
  CalculatorOutlined,
  BarChartOutlined,
  BookOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { CATEGORIES } from '../data/foodCategories';
import FoodList from './FoodList';
import { useFoods } from '../contexts/FoodContext';
import DataVisualization from './DataVisualization';
import Knowledge from './Knowledge';
import PurineCalculator from './PurineCalculator';
import DataSource from './DataSource';
import Footer from './Footer';

const { Header, Content } = AntLayout;  // 移除 Sider
// 删除 Search 的定义，因为已经不需要了

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: linear-gradient(135deg, #f0f7ff, #e6f4ff);
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 56px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const StyledContent = styled(Content)`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  margin-top: 56px;  // 添加上边距，防止内容被导航栏遮挡
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const HeaderTitle = styled.h1`
  color: #1677ff;
  margin: 0;
  font-size: 20px;  // 减小字体
  font-weight: 600;
  text-shadow: none;
`;

const StyledMenu = styled(Menu)`
  background: transparent;
  border-bottom: none;
  flex: 1;
  justify-content: flex-end;
  margin-left: 24px;
  
  .ant-menu-item {
    padding: 0 16px;
    margin: 0 4px;
    height: 56px;
    line-height: 56px;
    
    &:hover {
      color: #1677ff;
    }
    
    &.ant-menu-item-selected {
      background: rgba(22, 119, 255, 0.1);
    }
  }
`;

// 删除这里的重复声明
// const StyledContent = styled(Content)`
//   padding: 2rem;
//   background: ${props => props.theme.colors.background};
// `;

// 删除 StyledSider 组件定义

const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { foods } = useFoods();  // 添加 foods

  // 添加 getFoodsByCategory 函数
  const getFoodsByCategory = (categoryId) => {
    return foods.filter(food => food.category === categoryId);
  };

  const renderContent = () => {
    const categoryId = location.pathname.split('/category/')[1];
    if (categoryId) {
      return <FoodList category={categoryId} />;
    }
    return (
      <>
        <Row gutter={[16, 16]}>
          {Object.values(CATEGORIES).map(category => (
            <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
              <CategoryCard 
                category={category} 
                foods={getFoodsByCategory(category.id)}
                onClick={() => navigate(`/category/${category.id}`)} 
              />
            </Col>
          ))}
        </Row>
      </>
    );
  };
  
  // 修改 Layout 组件的 return 部分
  return (
    <StyledLayout>
      <StyledHeader>
        <HeaderContent>
          <HeaderTitle>嘌呤管家</HeaderTitle>
          <StyledMenu
            mode="horizontal"
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/" icon={<HomeOutlined />} onClick={() => navigate('/')}>
              食品分类
            </Menu.Item>
            <Menu.Item key="/charts" icon={<BarChartOutlined />} onClick={() => navigate('/charts')}>
              数据统计
            </Menu.Item>
            <Menu.Item key="/calculator" icon={<CalculatorOutlined />} onClick={() => navigate('/calculator')}>
              嘌呤计算器
            </Menu.Item>
            <Menu.Item key="/knowledge" icon={<BookOutlined />} onClick={() => navigate('/knowledge')}>
              痛风知识
            </Menu.Item>
            <Menu.Item key="/datasource" icon={<InfoCircleOutlined />} onClick={() => navigate('/datasource')}>
              数据来源
            </Menu.Item>
          </StyledMenu>
        </HeaderContent>
      </StyledHeader>
      <StyledContent>
        <Routes>
          <Route path="/" element={renderContent()} />
          <Route path="/category/:categoryId" element={<FoodList />} />
          <Route path="/charts" element={<DataVisualization />} />
          <Route path="/calculator" element={<PurineCalculator />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/datasource" element={<DataSource />} />
        </Routes>
      </StyledContent>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;