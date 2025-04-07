import React from 'react';
import { Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CategoryCard from '../components/CategoryCard';
import { FOOD_CATEGORIES } from '../data/foodCategories';

const { Title } = Typography;

const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled(Title)`
  text-align: center;
  margin-bottom: 32px !important;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <PageTitle level={2}>食品嘌呤含量查询</PageTitle>
      <Row gutter={[24, 24]}>
        {FOOD_CATEGORIES.map(category => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <CategoryCard
              category={category}
              onClick={() => navigate(`/category/${category.id}`)}
            />
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};

export default Home;