import React from 'react';
import styled from 'styled-components';
import { Card, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius.large};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const CategoryIcon = styled.span`
  font-size: 2rem;
  display: block;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const CategoryName = styled.h3`
  text-align: center;
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

const StyledList = styled(List)`
  .ant-list-item {
    padding: 4px 0;
    border-bottom: none;
  }
`;

const CategoryCard = ({ category, foods = [], onClick }) => {
  const navigate = useNavigate();

  return (
    <StyledCard backgroundColor={category.color} onClick={onClick}>
      <CategoryIcon>{category.icon}</CategoryIcon>
      <CategoryName>{category.name}</CategoryName>
    </StyledCard>
  );
};

export default CategoryCard;