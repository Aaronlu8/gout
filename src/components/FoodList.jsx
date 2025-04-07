import React, { useState, useEffect } from 'react';
import { List, Card, Tag, Space, Typography, Select, InputNumber, Tooltip, Input, Slider } from 'antd';
import { useFoods } from '../contexts/FoodContext';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MEASURE_UNITS } from '../data/foodCategories';
import { getSourceReliability } from '../data/sourceReliability';

const { Text, Title } = Typography;
const { Option } = Select;

const StyledCard = styled(Card)`
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// 修改 FoodInfo 样式
const FoodInfo = styled.div`
  min-width: 300px;
`;

const FoodHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const UnitCalculator = styled.div`
  padding: 12px 20px;
  background: #FFF8DC;
  border-radius: 8px;
  flex-grow: 0;
  width: 380px;
`;

// 在 List renderItem 中更新卡片内容布局
const PurineTag = styled(Tag)`
  font-size: 14px;
  padding: 4px 8px;
`;

const ResultWrapper = styled.div`
  font-weight: bold;
  color: #1890ff;
  margin-left: 8px;
`;

// 添加 getPurineLevelColor 函数
const getPurineLevelColor = (level) => {
  switch (level) {
    case '极低': return '#87d068';
    case '低': return '#52c41a';
    case '中': return '#faad14';
    case '中高': return '#fa8c16';
    case '高': return '#ff4d4f';
    case '极高': return '#f5222d';
    default: return '#8c8c8c';
  }
};

const SourceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const ReliabilityTag = styled(Tag)`
  font-size: 12px;
  margin-left: 4px;
`;

// 修改液体食品判断函数
const isLiquidFood = (foodName) => {
  // 特殊情况排除列表
  const exceptions = ['茶树菇', '茶叶蛋', '木奶果', '香水柠檬', '蛤蜊汤包', '水母', '奶酪', '奶粉（全脂）', '奶油蛋糕', '酸奶冰淇淋', '奶酪（切达）', '奶酪（帕玛森）', '奶酪（马苏里拉）', '奶酪棒', '奶盖', '植物奶酪', '植物奶油', '奶酪球', '酱油膏', '料酒膏'];
  if (exceptions.includes(foodName)) {
    return false;
  }

  // 添加液体饮品
  const liquidBeverages = ['威士忌', '伏特加', '白兰地', '卡布奇诺', '可乐', '雪碧', '橙汁', '苹果汁', '葡萄汁'];
  const liquidSeasonings = ['醋', '抽', '酱油', '糖浆', '味醂', '蚝油'];
  const liquidFoods = ['汤', '粥', '奶', '酒', '饮料', '水', '茶', '咖啡', '豆浆'];
  
  return [...liquidFoods, ...liquidSeasonings, ...liquidBeverages].some(liquid => foodName.includes(liquid));
};

// 修改液体密度映射
const LIQUID_DENSITY = {
  '豆浆': 1.03,    // 豆浆密度约1.03g/ml
  '牛奶': 1.03,    // 牛奶密度约1.03g/ml
  '啤酒': 1.01,    // 啤酒密度约1.01g/ml
  '红酒': 0.99,    // 红酒密度约0.99g/ml
  '咖啡': 1.00,    // 咖啡密度约1g/ml
  '茶': 1.00,      // 茶水密度约1g/ml
  '汤': 1.00,      // 汤的密度约1g/ml
  '粥': 1.05,      // 粥的密度约1.05g/ml
  '醋': 1.02,      // 醋的密度约1.02g/ml
  '生抽': 1.15,    // 生抽密度约1.15g/ml
  '老抽': 1.18,    // 老抽密度约1.18g/ml
  '糖浆': 1.33,    // 糖浆密度约1.33g/ml
  '味醂': 1.10,    // 味醂密度约1.10g/ml
  '蚝油': 1.25,    // 蚝油密度约1.25g/ml
  '威士忌': 0.98,  // 威士忌密度约0.98g/ml
  '伏特加': 0.95,  // 伏特加密度约0.95g/ml
  '白兰地': 0.97,  // 白兰地密度约0.97g/ml
  '卡布奇诺': 1.02, // 卡布奇诺密度约1.02g/ml
  '可乐': 1.04,    // 可乐密度约1.04g/ml
  '雪碧': 1.03,    // 雪碧密度约1.03g/ml
  '橙汁': 1.05,    // 橙汁密度约1.05g/ml
  '苹果汁': 1.05,  // 苹果汁密度约1.05g/ml
  '葡萄汁': 1.06,  // 葡萄汁密度约1.06g/ml
  'default': 1.00  // 默认密度1g/ml
};

// 修改搜索框的实现
const FilterContainer = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

// 添加筛选项标签样式
const FilterLabel = styled(Text)`
  font-weight: 500;
  margin-right: 8px;
  min-width: 80px;
  display: inline-block;
`;

// 将这些样式组件移到组件外部
const PageHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;
  padding: 24px 0;
  background: linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const CategoryTitle = styled(Title)`
  margin: 0 !important;
  color: #8B4513;
  &.ant-typography {
    margin-bottom: 8px !important;
  }
`;

const CategoryDescription = styled(Text)`
  font-size: 16px;
  color: #6B4423;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  &:last-child {
    margin-bottom: 0;
  }
`;

// 添加食品分类名称映射
const CATEGORY_NAMES = {
  'staple_foods': '主食类',
  'meats': '肉类',
  'seafoods': '水产类',
  'vegetables': '蔬菜类',
  'fruits': '水果类',
  'beverages': '酒水饮品类',
  'eggs_dairy': '蛋奶类',
  'nuts_seeds': '坚果和种子类',
  'seasonings': '调味品与酱料类'
};

const FoodList = () => {
  const { categoryId } = useParams();
  console.log('当前分类ID:', categoryId); // 添加这行来查看实际的 categoryId
  const { foods } = useFoods();
  const [categoryFoods, setCategoryFoods] = useState([]);
  
  // 添加状态管理
  const [selectedUnits, setSelectedUnits] = useState({});
  const [quantities, setQuantities] = useState({});

  // 获取所有计量单位选项
  const unitOptions = [
    {
      value: '100ml',
      label: '🥛 100ml',
      volume: 100
    },
    ...Object.values(MEASURE_UNITS.BOWL).map(unit => ({
      value: unit.name,
      label: `${unit.icon} ${unit.name} (${unit.volume}g)`,
      volume: unit.volume
    })),
    {
      value: MEASURE_UNITS.CHOPSTICKS.name,
      label: `${MEASURE_UNITS.CHOPSTICKS.icon} ${MEASURE_UNITS.CHOPSTICKS.name} (${MEASURE_UNITS.CHOPSTICKS.volume}g)`,
      volume: MEASURE_UNITS.CHOPSTICKS.volume
    },
    ...Object.values(MEASURE_UNITS.SPOON).map(unit => ({
      value: unit.name,
      label: `${unit.icon} ${unit.name} (${unit.volume}g)`,
      volume: unit.volume
    }))
  ];

  // 计算嘌呤含量
  // 添加液体食品密度映射
  const LIQUID_DENSITY = {
    '豆浆': 1.03,  // 豆浆密度约1.03g/ml
    '牛奶': 1.03,  // 牛奶密度约1.03g/ml
    '啤酒': 1.01,  // 啤酒密度约1.01g/ml
    '红酒': 0.99,  // 红酒密度约0.99g/ml
    '咖啡': 1.00,  // 咖啡密度约1g/ml
    '茶': 1.00,    // 茶水密度约1g/ml
    '汤': 1.00,    // 汤的密度约1g/ml
    '粥': 1.05,    // 粥的密度约1.05g/ml
    'default': 1.00 // 默认密度1g/ml
  };
  
  // 获取液体食品密度
  const getLiquidDensity = (foodName) => {
    const density = Object.entries(LIQUID_DENSITY).find(([key]) => foodName.includes(key))?.[1];
    return density || LIQUID_DENSITY.default;
  };
  
  // 修改计算嘌呤含量的函数
  const calculatePurine = (food, unit, quantity) => {
    const unitVolume = unitOptions.find(u => u.value === unit)?.volume || 100;
    let purineValue = food.purine;
  
    // 如果是液体食品，需要进行密度换算
    if (isLiquidFood(food.name)) {
      const density = getLiquidDensity(food.name);
      purineValue = purineValue * density; // 将 mg/100g 转换为 mg/100ml
    }
  
    return ((purineValue * unitVolume * quantity) / 100).toFixed(1);
  };

  // 处理单位变化
  const handleUnitChange = (foodId, value) => {
    setSelectedUnits(prev => ({ ...prev, [foodId]: value }));
  };

  // 处理数量变化
  const handleQuantityChange = (foodId, value) => {
    setQuantities(prev => ({ ...prev, [foodId]: value }));
  };

  useEffect(() => {
    const filteredFoods = foods.filter(food => food.category === categoryId);
    setCategoryFoods(filteredFoods);
  }, [categoryId, foods]);

  // 只保留这两个状态
  const [foodType, setFoodType] = useState('all');
  const [purineRange, setPurineRange] = useState([0, 200]);

  // 简化筛选逻辑
  // 添加状态
  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // 修改筛选逻辑
  const filteredFoods = categoryFoods
    .filter(food => {
      // 搜索筛选
      if (searchText && !food.name.toLowerCase().includes(searchText.toLowerCase())) {
        return false;
      }
      // 嘌呤含量级别筛选
      if (selectedLevel !== 'all' && food.purineLevel !== selectedLevel) {
        return false;
      }
      // 食品类型筛选
      if (foodType !== 'all') {
        const isLiquid = isLiquidFood(food.name);
        if (foodType === 'liquid' && !isLiquid) return false;
        if (foodType === 'solid' && isLiquid) return false;
      }
      // 嘌呤含量范围筛选
      if (food.purine < purineRange[0] || food.purine > purineRange[1]) {
        return false;
      }
      return true;
    });

  return (
    <>
      <PageHeader>
        <CategoryTitle level={2}>
          {CATEGORY_NAMES[categoryId] || '食品列表'} 
          {categoryId === 'staple_foods' ? '🍚' : 
           categoryId === 'vegetables' ? '🥬' : 
           categoryId === 'fruits' ? '🍎' :
           categoryId === 'meats' ? '🥩' :
           categoryId === 'seafoods' ? '🐟' :
           categoryId === 'eggs_dairy' ? '🥚' :
           categoryId === 'nuts_seeds' ? '🥜' : 
           categoryId === 'seasonings' ? '🥫' : 
           categoryId === 'beverages' ? '🥤' : ''}
        </CategoryTitle>
        {(categoryId === 'staple_foods' || 
          categoryId === 'vegetables' || 
          categoryId === 'fruits' ||
          categoryId === 'meats' ||
          categoryId === 'seafoods' ||
          categoryId === 'eggs_dairy' ||
          categoryId === 'nuts_seeds' ||
          categoryId === 'seasonings' ||
          categoryId === 'beverages') && (
          <CategoryDescription>
            {categoryId === 'staple_foods' ? 
              '主食是人体能量的主要来源，合理搭配可以控制嘌呤摄入' : 
              categoryId === 'vegetables' ?
              '新鲜蔬菜是健康饮食的重要组成部分，大多数蔬菜嘌呤含量较低。其中菌菇类和豆芽类嘌呤含量相对较高，食用需要适量。' :
              categoryId === 'fruits' ?
              '水果富含维生素和膳食纤维，大多数水果的嘌呤含量都较低，是健康饮食的重要组成部分。' :
              categoryId === 'meats' ?
              '肉类是优质蛋白的重要来源，但同时也含有较高的嘌呤。建议优先选择瘦肉，避免食用内脏类。' :
              categoryId === 'seafoods' ?
              '水产品普遍含有较高的嘌呤，建议适量食用。深海鱼类和贝类的嘌呤含量尤其要注意。' :
              categoryId === 'eggs_dairy' ?
              '蛋奶类食品普遍嘌呤含量较低，是优质蛋白的重要来源。其中蛋类和奶制品都适合痛风患者食用。' :
              categoryId === 'nuts_seeds' ?
              '坚果和种子类食品富含蛋白质和健康脂肪，但部分品类嘌呤含量较高，建议适量食用。优先选择嘌呤含量较低的核桃、腰果等。' :
              categoryId === 'seasonings' ?
              '调味品和酱料类食品嘌呤含量差异较大，建议注意豆类和海产类调味品的使用量。优先选择植物性和低嘌呤调味品。' :
              categoryId === 'beverages' ?
              '酒水饮品类食品嘌呤含量普遍较低，但啤酒和部分发酵饮品含有一定嘌呤，建议适量饮用。纯净水和无糖饮料是最佳选择。' : ''
            }
          </CategoryDescription>
        )}
      </PageHeader>

      <FilterContainer>
        <FilterRow>
          {/* 添加标签文字 */}
          <Space>
            <FilterLabel>食品名称：</FilterLabel>
            <Input
              placeholder="搜索食品名称"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
          </Space>
          
          <Space>
            <FilterLabel>嘌呤级别：</FilterLabel>
            <Select
              placeholder="嘌呤含量级别"
              value={selectedLevel}
              onChange={setSelectedLevel}
              style={{ width: 120 }}
              allowClear
            >
              <Option value="all">全部</Option>
              <Option value="极低">极低</Option>
              <Option value="低">低</Option>
              <Option value="中">中</Option>
              <Option value="中高">中高</Option>
              <Option value="高">高</Option>
              <Option value="极高">极高</Option>
            </Select>
          </Space>
          
          <Space>
            <FilterLabel>食品类型：</FilterLabel>
            <Select
              placeholder="食品类型"
              style={{ width: 150 }}
              value={foodType}
              onChange={setFoodType}
              allowClear
            >
              <Option value="all">全部</Option>
              <Option value="solid">固体食品</Option>
              <Option value="liquid">液体食品</Option>
            </Select>
          </Space>
          
          <Space>
            <FilterLabel>嘌呤范围：</FilterLabel>
            <Slider
              range
              min={0}
              max={200}
              value={purineRange}
              onChange={setPurineRange}
              style={{ width: 200 }}
            />
            <Text>{purineRange[0]} - {purineRange[1]} mg/100g(ml)</Text>
          </Space>
        </FilterRow>
      </FilterContainer>

      <List
        grid={{ 
          gutter: [24, 24],
          column: 1
        }}
        dataSource={filteredFoods}
        renderItem={food => (
          <List.Item>
            <StyledCard>
              <CardContent>
                <FoodInfo>
                  <FoodHeader>
                    <Title level={4} style={{ 
                      margin: 0, 
                      color: '#5C3317',
                      fontSize: '20px',
                      fontWeight: 600,
                      minWidth: '120px'
                    }}>
                      {food.name}
                    </Title>
                    <Space size={8}>
                      <PurineTag color={getPurineLevelColor(food.purineLevel)}>
                        {food.purineLevel}
                      </PurineTag>
                      <Text style={{ color: '#666' }}>
                        {food.purine} mg/100{isLiquidFood(food.name) ? 'ml' : 'g'}
                      </Text>
                    </Space>
                  </FoodHeader>
                  <SourceInfo>
                    <Text style={{ fontSize: '13px', color: '#666' }}>
                      📚 来源:
                    </Text>
                    <Space>
                      <Tag color={getSourceReliability(food.source).color}>
                        {food.source}
                      </Tag>
                      {getSourceReliability(food.source).level !== '未知' && (
                        <Tooltip title={getSourceReliability(food.source).description}>
                          <Tag>可信度: {getSourceReliability(food.source).level}</Tag>
                        </Tooltip>
                      )}
                    </Space>
                  </SourceInfo>
                </FoodInfo>
                
                <UnitCalculator>
                  <Space size={12}>
                    <InputNumber
                      min={0.1}
                      max={10}
                      step={0.1}
                      value={quantities[food.name] || 1}
                      onChange={value => handleQuantityChange(food.name, value)}
                      style={{ width: 80 }}
                    />
                    <Select
                      value={selectedUnits[food.name] || '中碗'}
                      onChange={value => handleUnitChange(food.name, value)}
                      style={{ width: 140 }}
                    >
                      {unitOptions.map(unit => (
                        <Option key={unit.value} value={unit.value}>
                          {unit.label}
                        </Option>
                      ))}
                    </Select>
                    <ResultWrapper>
                      <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                        {calculatePurine(
                          food,
                          selectedUnits[food.name] || '中碗',
                          quantities[food.name] || 1
                        )} mg
                      </Text>
                    </ResultWrapper>
                  </Space>
                </UnitCalculator>
              </CardContent>
            </StyledCard>
          </List.Item>
        )}
      />
    </>
  );
};

export default FoodList;