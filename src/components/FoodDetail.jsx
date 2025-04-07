import React from 'react';
import styled from 'styled-components';
import { Modal, Descriptions, Tag, Divider, Alert, Tooltip } from 'antd';
import { PURINE_LEVELS, CATEGORIES } from '../data/foodCategories';
import UnitConverter from './UnitConverter';
import { getSourceReliability } from '../data/sourceReliability';
import { InfoCircleOutlined } from '@ant-design/icons';

const StyledDescriptions = styled(Descriptions)`
  .ant-descriptions-item-label {
    font-weight: bold;
  }
`;

const PurineTag = styled(Tag)`
  font-size: 16px;
  padding: 5px 10px;
`;

const AdviceAlert = styled(Alert)`
  margin-top: 16px;
`;

const FoodDetail = ({ food, onClose }) => {
  if (!food) return null;

  return (
    <DetailContainer>
      <CloseButton onClick={onClose}>×</CloseButton>
      <FoodName>{food.name}</FoodName>
      
      <DetailItem>
        <Label>嘌呤含量:</Label>
        <Value>{food.purine} mg/100g</Value>
      </DetailItem>
      
      <DetailItem>
        <Label>嘌呤水平:</Label>
        <Value>
          <PurineLevel level={food.purineLevel}>{food.purineLevel}</PurineLevel>
        </Value>
      </DetailItem>
      
      {food.weight && (
        <DetailItem>
          <Label>参考重量:</Label>
          <Value>{food.weight}</Value>
        </DetailItem>
      )}
      
      <DetailItem>
        <Label>数据来源:</Label>
        <Value>{food.source}</Value>
      </DetailItem>
      
      {/* ... 其他现有内容 ... */}
    </DetailContainer>
  );
};

export default FoodDetail;