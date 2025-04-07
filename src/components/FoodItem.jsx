import React from 'react';
import styled from 'styled-components';
import { PURINE_LEVELS } from '../data/foodCategories';

const ItemContainer = styled.div`
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const FoodName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const PurineInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PurineValue = styled.span`
  font-size: 14px;
  color: #666;
  margin-right: 8px;
`;

const PurineLevel = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  background-color: ${props => {
    const level = props.level;
    return PURINE_LEVELS[level] || '#999';
  }};
`;

// 添加新的样式组件
const WeightInfo = styled.div`
  font-size: 13px;
  color: #ff4d4f;  // 使用红色使其更加明显
  margin-top: 6px;
  font-weight: bold;
  display: block;
`;

const FoodItem = ({ food, onClick }) => {
  // 添加更多调试信息
  console.log(`渲染食品: ${food.name}`, food);
  
  return (
    <ItemContainer onClick={() => onClick(food)}>
      <FoodName>{food.name}</FoodName>
      <PurineInfo>
        <PurineValue>{food.purine} mg/100g</PurineValue>
        <PurineLevel level={food.purineLevel}>{food.purineLevel}</PurineLevel>
      </PurineInfo>
      {food.weight ? (
        <WeightInfo>{food.weight}</WeightInfo>
      ) : (
        <div style={{display: 'none'}}>无重量信息</div>
      )}
    </ItemContainer>
  );
};

export default FoodItem;