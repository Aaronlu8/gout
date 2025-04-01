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

// 修改组件参数，将 visible 重命名为 open 以保持一致性
const FoodDetail = ({ food, visible: open, onClose }) => {
  if (!food) return null;

  // 添加一个辅助函数来判断食品是否为液体
  const isLiquidFood = (food) => {
    const liquidDairyProducts = [
      '牛奶（全脂）', '牛奶（脱脂）', '酸奶', '杏仁奶', 
      '羊奶', '椰奶', '豆奶', '椰浆', '牛奶'
    ];
    
    const liquidBeverages = [
      '豆浆', '豆浆（未加糖）', '黑豆浆', '五谷豆浆'
    ];
    
    return food.category === 'beverages' || 
           liquidDairyProducts.includes(food.name) || 
           liquidBeverages.includes(food.name);
  };

  const getPurineAdvice = (level, category, foodName) => {
    // 判断是否为液体食品
    const isLiquid = isLiquidFood({category, name: foodName});
    
    // 特殊处理酒水饮品类和液体奶制品
    if (isLiquid) {
      const liquidAdviceMap = {
        'VERY_LOW': {
          type: 'success',
          title: '推荐饮用',
          description: '嘌呤含量极低，可以适量饮用。'
        },
        'LOW': {
          type: 'success',
          title: '可以饮用',
          description: '嘌呤含量较低，可以经常饮用，但注意控制总量。'
        },
        'MEDIUM': {
          type: 'warning',
          title: '适量饮用',
          description: '嘌呤含量中等，建议每天限制在250ml以内。'
        },
        'HIGH': {
          type: 'warning',
          title: '谨慎饮用',
          description: '嘌呤含量较高，建议隔天饮用，每次不超过150ml。'
        },
        'VERY_HIGH': {
          type: 'error',
          title: '尽量避免',
          description: '嘌呤含量极高，建议尽量避免饮用，必要时每周不超过1-2次，每次不超过100ml。'
        }
      };
      return liquidAdviceMap[level] || {
        type: 'info',
        title: '注意',
        description: '请根据个人情况合理饮用。'
      };
    }

    // 其他食品类别的建议保持不变
    const adviceMap = {
      'VERY_LOW': {
        type: 'success',
        title: '推荐食用',
        description: '嘌呤含量极低，可以适量食用，建议每天不超过300g。'
      },
      'LOW': {
        type: 'success',
        title: '可以食用',
        description: '嘌呤含量较低，可以经常食用，建议每天不超过200g。'
      },
      'MEDIUM': {
        type: 'warning',
        title: '适量食用',
        description: '嘌呤含量中等，建议每天限制在100g以内。'
      },
      'HIGH': {
        type: 'warning',
        title: '谨慎食用',
        description: '嘌呤含量较高，建议隔天食用，每次不超过50g。'
      },
      'VERY_HIGH': {
        type: 'error',
        title: '尽量避免',
        description: '嘌呤含量极高，建议尽量避免食用，必要时每周不超过1-2次，每次不超过30g。'
      }
    };
    return adviceMap[level] || {
      type: 'info',
      title: '注意',
      description: '请根据个人情况合理食用。'
    };
  };

  const advice = getPurineAdvice(food.purineLevel, food.category, food.name);
  
  // 获取来源可信度信息
  const sourceInfo = getSourceReliability(food.source);

  return (
    <Modal
      title={food.name}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <StyledDescriptions column={1}>
        <Descriptions.Item label="分类">
          {CATEGORIES[food.category]?.name || food.originalCategory}
        </Descriptions.Item>
        <Descriptions.Item label="嘌呤含量">
          <PurineTag color={PURINE_LEVELS[food.purineLevel].color}>
            {food.purineContent}mg/{isLiquidFood(food) ? '100ml' : '100g'} ({PURINE_LEVELS[food.purineLevel].name})
          </PurineTag>
        </Descriptions.Item>
        <Descriptions.Item label="数据来源">
          {food.source}
          <Tooltip title={sourceInfo.description}>
            <Tag color={sourceInfo.color} style={{ marginLeft: 8 }}>
              可信度: {sourceInfo.level} <InfoCircleOutlined />
            </Tag>
          </Tooltip>
        </Descriptions.Item>
      </StyledDescriptions>
      
      <Divider>计量换算</Divider>
      <UnitConverter 
        purineContent={food.purineContent} 
        isLiquid={isLiquidFood(food)} 
      />
      
      <AdviceAlert
        message={advice.title}
        description={advice.description}
        type={advice.type}
        showIcon
      />
    </Modal>
  );
};

export default FoodDetail;