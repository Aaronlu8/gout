import React, { useState } from 'react';
import styled from 'styled-components';
import { List, Card, Tag, Space, Button, Select, Row, Col } from 'antd';
import { useFoods } from '../contexts/FoodContext';
import { PURINE_LEVELS, CATEGORIES } from '../data/foodCategories';
import UnitConverter from './UnitConverter';
import FoodDetail from './FoodDetail';

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: 16px;
`;

const FoodName = styled.span`
  font-size: ${props => props.theme.typography.fontSize.large};
  font-weight: bold;
`;

const PurineContent = styled.span`
  color: ${props => props.color};
  font-weight: bold;
`;

const Source = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.small};
`;

const CategoryTag = styled(Tag)`
  margin-left: 8px;
`;

// 添加食品单位信息配置
const foodUnits = {
  // 主食类
  '馒头': '约100g/个',
  '包子（含馅料）': '约120g/个',
  '饺子': '约15g/个',
  '烧饼': '约80g/个',
  '花卷': '约80g/个',
  '油条': '约50g/根',
  
  // 蔬菜类
  '菠菜': '约200g/把',
  '生菜': '约150g/棵',
  '芥蓝': '约200g/把',
  '油菜': '约150g/把',
  '芹菜': '约100g/把',
  '韭菜': '约100g/把',
  '茄子': '约200g/个',
  '黄瓜': '约250g/根',
  '西红柿': '约150g/个',
  '青椒': '约50g/个',
  '土豆': '约200g/个',
  '红薯': '约300g/个',
  '紫薯': '约250g/个',
  '玉米': '约350g/个',
  '山药': '约250g/段',
  '芋头': '约200g/个',
  '香菇（干）': '约5g/朵',  // 添加香菇（干）信息
  
  // 水果类
  '苹果': '约200g/个',
  '香蕉': '约150g/根',
  '橙子': '约200g/个',
  '柚子': '约500g/个',
  '梨': '约250g/个',
  '桃子': '约150g/个',
  '葡萄': '约3g/粒',
  '草莓': '约15g/个',
  '樱桃': '约5g/个',
  '蓝莓': '约2g/粒',
  '火龙果': '约350g/个',
  '榴莲': '约500g/块',
  '柿子': '约200g/个',
  '枣': '约15g/个',
  '杏': '约30g/个',
  '李子': '约40g/个',
  '石榴': '约250g/个',
  '山楂': '约15g/个',
  '猕猴桃': '约80g/个',
  '无花果': '约50g/个',
  '枇杷': '约30g/个',
  '荔枝': '约20g/个',
  '龙眼': '约10g/个',
  '杨梅': '约10g/个',
  '西瓜': '约8000g/个',
  '哈密瓜': '约1500g/个',
  '甜瓜': '约1000g/个',
  '木瓜': '约400g/个',
  '芒果': '约350g/个',
  '菠萝': '约1500g/个',
  '椰子': '约1000g/个',
  '柠檬': '约120g/个',
  '青柠': '约80g/个',
  '金桔': '约20g/个',
  '橘子': '约150g/个',
  '柑橘': '约180g/个',
  '沙棘': '约1g/粒',
  '桑葚': '约2g/粒',
  '覆盆子': '约3g/粒',
  '黑莓': '约5g/个',
  '红醋栗': '约1g/粒',
  '黑醋栗': '约1g/粒',
  '蔓越莓': '约1g/粒',
  
  // 蛋奶类 - 修改为毫升单位
  '牛奶（全脂）': '约250ml/杯',
  '牛奶（脱脂）': '约250ml/杯',
  '酸奶': '约200ml/杯',
  '杏仁奶': '约250ml/杯',
  '羊奶': '约250ml/杯',
  '椰奶': '约250ml/杯',
  '豆奶': '约250ml/杯',
  '椰浆': '约100ml/杯',
  
  // 水产类
  '带鱼': '约150g/条',
  '鲫鱼': '约250g/条',
  '虾': '约15g/只',
  '螃蟹': '约200g/只',
  '生蚝': '约50g/只',
  '扇贝': '约30g/只',
  '比目鱼': '约400g/条',  // 添加比目鱼信息
  '草鱼': '约1500g/条',   // 添加草鱼信息
  '鲳鱼': '约300g/条',    // 添加鲳鱼信息
  '蛏子': '约10g/只',     // 添加蛏子信息
  '大闸蟹': '约150g/只',  // 添加大闸蟹信息
  '帝王蟹': '约2000g/只', // 添加帝王蟹信息
  '对虾': '约25g/只',     // 添加对虾信息
  '多宝鱼': '约350g/条',  // 添加多宝鱼信息
  '多春鱼': '约100g/条',  // 添加多春鱼信息
  '鲑鱼': '约400g/块',    // 添加鲑鱼信息
  '蛤蜊': '约20g/只',     // 添加蛤蜊信息
  '河豚': '约500g/条',    // 添加河豚信息
  '河虾': '约5g/只',      // 添加河虾信息
  '花蟹': '约120g/只',    // 添加花蟹信息
  '黄花鱼': '约300g/条',  // 添加黄花鱼信息
  '基围虾': '约20g/只',   // 添加基围虾信息
  '龙虾': '约500g/只',    // 添加龙虾信息
  '鲈鱼': '约400g/条',    // 添加鲈鱼信息
  '鳗鱼': '约300g/条',    // 添加鳗鱼信息
  '皮皮虾': '约30g/只',   // 添加皮皮虾信息
  '青蟹': '约200g/只',    // 添加青蟹信息
  '秋刀鱼': '约150g/条',  // 添加秋刀鱼信息
  '石斑鱼': '约500g/条',  // 添加石斑鱼信息
  '田螺': '约5g/只',      // 添加田螺信息
  '象拔蚌': '约200g/只',  // 添加象拔蚌信息
  '鱿鱼': '约250g/只',    // 添加鱿鱼信息
  '海参': '约50g/条',     // 添加海参信息
  
  // 酒水饮品类
  '啤酒': '约330ml/瓶',
  '红酒': '约150ml/杯',
  '白酒': '约50ml/杯',
  '威士忌': '约45ml/杯',
  '伏特加': '约45ml/杯',
  '朗姆酒': '约45ml/杯',
  '金酒': '约45ml/杯',
  '龙舌兰': '约45ml/杯',
  '香槟': '约150ml/杯',
  '鸡尾酒': '约200ml/杯',
  '米酒': '约100ml/杯',
  '黄酒': '约100ml/杯',
  '果酒': '约150ml/杯',
  '清酒': '约100ml/杯',
  '可乐': '约330ml/罐',
  '雪碧': '约330ml/罐',
  '芬达': '约330ml/罐',
  '茶': '约250ml/杯',
  '咖啡': '约250ml/杯',
  '果汁': '约250ml/杯',
  '牛奶': '约250ml/杯',
  '豆浆': '约250ml/杯',
  '酸奶': '约200ml/杯',
  '矿泉水': '约500ml/瓶',
  '苏打水': '约330ml/瓶',
  '能量饮料': '约250ml/罐',
  '运动饮料': '约500ml/瓶',
  
  // 坚果和种子类
  '核桃': '约15g/个',
  '花生': '约1g/粒',
  '夏威夷果': '约3g/粒',
  '巴旦木': '约1.5g/粒',
  '开心果': '约2g/粒',
  '白芝麻': '约0.01g/粒',
  '黑芝麻': '约0.01g/粒',
  '南瓜子': '约0.2g/粒',
  '向日葵籽': '约0.1g/粒'
};

const FilterWrapper = styled(Row)`
  margin-bottom: 16px;
`;

const CategoryTitle = styled.h2`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  font-size: 24px;
  padding-left: 8px;
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const FoodList = ({ categoryId, foods: searchFoods }) => {
  const { foods: allFoods, loading } = useFoods();
  const [selectedFood, setSelectedFood] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [purineFilter, setPurineFilter] = useState('all');
  
  // 添加大小写转换，确保可以匹配 CATEGORIES 中的键
  const normalizedCategoryId = categoryId ? categoryId.toUpperCase() : null;
  
  // 更新调试代码
  console.log('categoryId:', categoryId);
  console.log('normalizedCategoryId:', normalizedCategoryId);
  console.log('CATEGORIES keys:', Object.keys(CATEGORIES));
  console.log('Category name:', CATEGORIES[normalizedCategoryId]?.name);
  
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
  
  // 添加一个函数来调整酒水饮品和豆浆类的嘌呤级别
  const getAdjustedPurineLevel = (food) => {
    // 处理豆浆类食品，无论它们在哪个分类中
    const soymilkProducts = ['豆浆', '豆浆（未加糖）', '黑豆浆', '五谷豆浆'];
    if (soymilkProducts.includes(food.name)) {
      return 'MEDIUM'; // 将豆浆类食品统一设为中等嘌呤
    }
    
    // 处理酒水饮品类
    if (food.category === 'beverages') {
      // 根据饮品名称调整嘌呤级别
      const beveragePurineLevels = {
        // 高嘌呤饮品
        '啤酒': 'HIGH',
        '百威啤酒': 'HIGH',
        '青岛啤酒': 'HIGH',
        '燕京啤酒': 'HIGH',
        '雪花啤酒': 'HIGH',
        '哈尔滨啤酒': 'HIGH',
        '科罗娜啤酒': 'HIGH',
        '黑啤酒': 'VERY_HIGH',
        '黑啤': 'VERY_HIGH',
        '世涛啤酒': 'VERY_HIGH',
        '精酿啤酒': 'HIGH',
        
        // 中等嘌呤饮品
        '豆浆': 'MEDIUM',
        '黄酒': 'MEDIUM',
        '米酒': 'MEDIUM',
        '清酒': 'MEDIUM',
        '黑豆浆': 'MEDIUM',
        '五谷豆浆': 'MEDIUM',
        '能量饮料': 'MEDIUM',
        '红牛': 'MEDIUM',
        
        // 低嘌呤饮品
        '红酒': 'LOW',
        '白酒': 'LOW',
        '葡萄酒': 'LOW',
        '威士忌': 'LOW',
        '伏特加': 'LOW',
        '朗姆酒': 'LOW',
        '金酒': 'LOW',
        '龙舌兰': 'LOW',
        '香槟': 'LOW',
        '鸡尾酒': 'LOW',
        '果酒': 'LOW',
        '咖啡': 'LOW',
        '茶': 'LOW',
        '绿茶': 'LOW',
        '红茶': 'LOW',
        '乌龙茶': 'LOW',
        '普洱茶': 'LOW',
        
        // 极低嘌呤饮品
        '可乐': 'VERY_LOW',
        '雪碧': 'VERY_LOW',
        '芬达': 'VERY_LOW',
        '果汁': 'VERY_LOW',
        '牛奶': 'VERY_LOW',
        '酸奶': 'VERY_LOW',
        '矿泉水': 'VERY_LOW',
        '苏打水': 'VERY_LOW',
        '运动饮料': 'VERY_LOW',
      };
      
      return beveragePurineLevels[food.name] || food.purineLevel;
    }
    
    // 处理液态奶制品
    const liquidDairyProducts = [
      '牛奶（全脂）', '牛奶（脱脂）', '酸奶', '杏仁奶', 
      '羊奶', '椰奶', '豆奶', '椰浆', '牛奶'
    ];
    
    if (liquidDairyProducts.includes(food.name)) {
      // 液态奶制品的嘌呤级别
      const dairyPurineLevels = {
        '牛奶': 'VERY_LOW',         // 0-2mg/100ml
        '牛奶（全脂）': 'VERY_LOW',  // 0-2mg/100ml
        '牛奶（脱脂）': 'VERY_LOW',  // 0-2mg/100ml
        '酸奶': 'VERY_LOW',         // 0-2mg/100ml
        '杏仁奶': 'VERY_LOW',       // 0-1mg/100ml
        '羊奶': 'LOW',              // 2-5mg/100ml
        '椰奶': 'LOW',              // 2-5mg/100ml
        '豆奶': 'MEDIUM',           // 7-15mg/100ml (与豆浆相似)
        '椰浆': 'LOW',              // 2-5mg/100ml
      };
      
      return dairyPurineLevels[food.name] || food.purineLevel;
    }
    
    return food.purineLevel;
  };
  
  // 获取调整后的嘌呤级别对应的颜色和名称
  const getAdjustedPurineInfo = (food) => {
    const level = getAdjustedPurineLevel(food);
    return {
      color: PURINE_LEVELS[level].color,
      name: PURINE_LEVELS[level].name
    };
  };
  
  const displayFoods = searchFoods || 
    allFoods.filter(food => food.category === categoryId);

  const sortedAndFilteredFoods = displayFoods
    .filter(food => {
      // 使用调整后的嘌呤级别进行过滤
      const adjustedLevel = getAdjustedPurineLevel(food);
      return purineFilter === 'all' || adjustedLevel === purineFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'purine_asc') {
        return a.purineContent - b.purineContent;
      }
      if (sortBy === 'purine_desc') {
        return b.purineContent - a.purineContent;
      }
      return 0;
    });

  return (
    <>
      {/* 使用转换后的 categoryId 查找分类名称 */}
      {!searchFoods && categoryId && (
        <CategoryTitle>
          {CATEGORIES[normalizedCategoryId]?.name || '未分类食品'}
        </CategoryTitle>
      )}
      
      <FilterWrapper gutter={16} align="middle">
        <Col>
          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 150 }}
          >
            <Select.Option value="name">按名称排序</Select.Option>
            <Select.Option value="purine_asc">嘌呤含量从低到高</Select.Option>
            <Select.Option value="purine_desc">嘌呤含量从高到低</Select.Option>
          </Select>
        </Col>
        <Col>
          <Select
            value={purineFilter}
            onChange={setPurineFilter}
            style={{ width: 150 }}
          >
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="VERY_LOW">极低嘌呤</Select.Option>
            <Select.Option value="LOW">低嘌呤</Select.Option>
            <Select.Option value="MEDIUM">中等嘌呤</Select.Option>
            <Select.Option value="HIGH">高嘌呤</Select.Option>
            <Select.Option value="VERY_HIGH">极高嘌呤</Select.Option>
          </Select>
        </Col>
      </FilterWrapper>

      <List
        dataSource={sortedAndFilteredFoods}
        renderItem={food => {
          // 获取调整后的嘌呤信息
          const purineInfo = getAdjustedPurineInfo(food);
          
          return (
            <StyledCard 
              hoverable 
              onClick={() => {
                // 创建一个带有调整后嘌呤级别的食品对象
                const adjustedFood = {
                  ...food,
                  purineLevel: getAdjustedPurineLevel(food)
                };
                setSelectedFood(adjustedFood);
              }}
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Space>
                  <FoodName>{food.name}</FoodName>
                  {foodUnits[food.name] && (
                    <Tag color="cyan">{foodUnits[food.name]}</Tag>
                  )}
                  {searchFoods && CATEGORIES[food.category] && (
                    <CategoryTag color={CATEGORIES[food.category].color}>
                      {CATEGORIES[food.category].name}
                    </CategoryTag>
                  )}
                </Space>
                <Space>
                  <PurineContent color={purineInfo.color}>
                    {food.purineContent}mg/{isLiquidFood(food) ? '100ml' : '100g'}
                  </PurineContent>
                  <Tag color={purineInfo.color}>
                    {purineInfo.name}
                  </Tag>
                </Space>
                <Source>来源: {food.source}</Source>
                <div onClick={(e) => e.stopPropagation()}>
                  <UnitConverter 
                    purineContent={food.purineContent} 
                    isLiquid={isLiquidFood(food)}
                  />
                </div>
              </Space>
            </StyledCard>
          );
        }}
      />
      <FoodDetail
        food={selectedFood}
        visible={!!selectedFood}
        onClose={() => setSelectedFood(null)}
      />
    </>
  );
};

export default FoodList;