import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius.large};
  background-color: ${props => props.backgroundColor};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
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

const CategoryCard = ({ category }) => {
  return (
    <StyledCard backgroundColor={category.color}>
      <CategoryIcon>{category.icon}</CategoryIcon>
      <CategoryName>{category.name}</CategoryName>
    </StyledCard>
  );
};

export default CategoryCard;