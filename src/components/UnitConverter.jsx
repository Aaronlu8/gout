import React, { useState } from 'react';
import styled from 'styled-components';
import { Space, Select, InputNumber, Tooltip } from 'antd';

const { Option } = Select;

const ConverterWrapper = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
`;

const ResultText = styled.span`
  font-weight: bold;
  color: #1890ff;
`;

const UnitDescription = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const units = {
  '大碗': { weight: 500, desc: '约500g/ml，相当于标准米饭碗装满' },
  '中碗': { weight: 300, desc: '约300g/ml，相当于家用餐碗八分满' },
  '小碗': { weight: 200, desc: '约200g/ml，相当于家用餐碗一半' },
  '筷子夹': { weight: 15, desc: '约15g，一筷子夹起的量' },
  '大勺': { weight: 15, desc: '约15g/ml，标准汤勺容量' },
  '中勺': { weight: 10, desc: '约10g/ml，标准调羹容量' },
  '小勺': { weight: 5, desc: '约5g/ml，标准茶匙容量' }
};

const UnitConverter = ({ purineContent }) => {
  const [selectedUnit, setSelectedUnit] = useState('中碗');
  const [quantity, setQuantity] = useState(1);

  const calculatePurine = () => {
    const gramWeight = units[selectedUnit].weight;
    return ((purineContent * gramWeight * quantity) / 100).toFixed(1);
  };

  return (
    <ConverterWrapper>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <InputNumber
            min={0.1}
            max={10}
            step={0.1}
            value={quantity}
            onChange={setQuantity}
            style={{ width: 80 }}
          />
          <Tooltip title={units[selectedUnit].desc}>
            <Select value={selectedUnit} onChange={setSelectedUnit} style={{ width: 100 }}>
              {Object.keys(units).map(unit => (
                <Option key={unit} value={unit}>{unit}</Option>
              ))}
            </Select>
          </Tooltip>
          <span>含嘌呤：</span>
          <ResultText>{calculatePurine()}mg</ResultText>
        </Space>
        <UnitDescription>
          {units[selectedUnit].desc}
        </UnitDescription>
      </Space>
    </ConverterWrapper>
  );
};

export default UnitConverter;