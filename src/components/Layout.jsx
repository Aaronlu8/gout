import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Row, Col, Input, Button, Menu } from 'antd';
import { 
  ArrowLeftOutlined, 
  SearchOutlined,
  HomeOutlined,
  CalculatorOutlined,
  BarChartOutlined,
  BookOutlined,
  AppstoreOutlined,
  ReadOutlined,
  InfoCircleOutlined  // 添加新图标
} from '@ant-design/icons';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { CATEGORIES } from '../data/foodCategories';
import FoodList from './FoodList';
import { useFoods } from '../contexts/FoodContext';
import DataVisualization from './DataVisualization';
import Knowledge from './Knowledge';
import PurineCalculator from './PurineCalculator';
import DataSource from './DataSource';  // 导入新组件
import Footer from './Footer';  // 导入Footer组件

const { Header, Content, Sider } = AntLayout;
const { Search } = Input;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: linear-gradient(135deg, #f0f7ff, #e6f4ff);
  color: #1677ff;
  text-align: center;
  padding: 0;
  height: 64px;
  line-height: 64px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const HeaderTitle = styled.h1`
  color: #1677ff;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  text-shadow: none;
`;

const StyledContent = styled(Content)`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

const SearchWrapper = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
`;

const BackButton = styled(Button)`
  margin-bottom: 20px;
`;

const StyledSider = styled(Sider)`
  background: white;
`;

const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const { foods } = useFoods();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchText(value);
    setSelectedCategory('search');
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSearchText('');
  };

  const getFilteredFoods = () => {
    if (!searchText) return [];
    return foods.filter(food => 
      food.name.toLowerCase().includes(searchText.toLowerCase()) ||
      food.originalCategory.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const renderContent = () => {
    const path = location.hash.replace('#', '') || '/';  // 获取 hash 路径

    if (path === '/charts') {
      return <DataVisualization />;
    }
    
    if (path === '/knowledge') {
      return <Knowledge />;
    }
    
    if (path === '/calculator') {
      return <PurineCalculator />;
    }
    
    if (path === '/datasource') {
      return <DataSource />;
    }

    return (
      <>
        <SearchWrapper>
          <Search 
            placeholder="搜索食品..." 
            size="large" 
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onSearch={handleSearch}
            enterButton
          />
        </SearchWrapper>
        
        {selectedCategory && (
          <BackButton 
            type="primary" 
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
          >
            返回分类列表
          </BackButton>
        )}

        {!selectedCategory ? (
          <Row gutter={[16, 16]}>
            {Object.values(CATEGORIES).map(category => (
              <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
                <div onClick={() => setSelectedCategory(category.id)}>
                  <CategoryCard category={category} />
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <FoodList 
            categoryId={selectedCategory} 
            foods={selectedCategory === 'search' ? getFilteredFoods() : undefined}
          />
        )}
      </>
    );
  };

  return (
    <StyledLayout>
      <StyledSider>
        <Menu
          mode="inline"
          selectedKeys={[location.hash.replace('#', '') || '/']}
          style={{ height: '100%', paddingTop: '64px' }}
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
        </Menu>
      </StyledSider>
      <AntLayout>
        <StyledHeader>
          <HeaderTitle>嘌呤管家</HeaderTitle>
        </StyledHeader>
        <StyledContent>
          {renderContent()}
        </StyledContent>
        <Footer />  {/* 添加Footer组件 */}
      </AntLayout>
    </StyledLayout>
  );
};

export default Layout;