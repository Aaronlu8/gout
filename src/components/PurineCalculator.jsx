import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Select, InputNumber, Button, List, Typography, Divider, Alert, Space, Tabs, Modal, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useFoods } from '../contexts/FoodContext';
import { CATEGORIES } from '../data/foodCategories';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const CalculatorCard = styled(Card)`
  margin-bottom: 20px;
`;

const ControlRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  gap: 8px;
  align-items: flex-end;
`;

const ResultCard = styled(Card)`
  background-color: #f5f5f5;
  margin-top: 20px;
`;

// 常用餐具的转换比例
const UTENSIL_CONVERSIONS = {
  '大碗': 250,
  '中碗': 200,
  '小碗': 150,
  '大勺': 20,
  '中勺': 15,
  '小勺': 5,
  '筷子夹': 30,
  '小份': 100,
  '中份': 200,
  '大份': 300
};

const PurineCalculator = () => {
  const { foods } = useFoods();
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentFood, setCurrentFood] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(100);
  const [totalPurine, setTotalPurine] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUtensil, setSelectedUtensil] = useState(null);
  const [currentPurine, setCurrentPurine] = useState(0);
  const [savedMeals, setSavedMeals] = useState(() => {
    const saved = localStorage.getItem('savedMeals');
    return saved ? JSON.parse(saved) : [];
  });
  const [mealName, setMealName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    let total = 0;
    selectedItems.forEach(item => {
      total += (item.food.purineContent * item.amount) / 100;
    });
    setTotalPurine(total);
  }, [selectedItems]);

  // 根据选择的餐具更新食品量
  useEffect(() => {
    if (selectedUtensil) {
      setCurrentAmount(UTENSIL_CONVERSIONS[selectedUtensil]);
    }
  }, [selectedUtensil]);

  const handleAddFood = () => {
    if (!currentFood) return;
    
    const food = foods.find(f => f.name === currentFood);
    if (!food) return;
    
    setSelectedItems([
      ...selectedItems,
      {
        id: Date.now(),
        food,
        amount: currentAmount,
        purine: (food.purineContent * currentAmount) / 100,
        utensil: selectedUtensil || `${currentAmount}g`
      }
    ]);
    
    setCurrentFood(null);
    setCurrentAmount(100);
    setSelectedUtensil(null);
  };

  const handleRemoveFood = (id) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const getPurineLevel = (value) => {
    if (value <= 150) return { text: '正常', color: 'green' };
    if (value <= 300) return { text: '中等', color: 'orange' };
    return { text: '偏高', color: 'red' };
  };

  const purineLevel = getPurineLevel(totalPurine);

  // 根据分类筛选食品
  const filteredFoods = selectedCategory === 'all' 
    ? foods 
    : foods.filter(food => food.category === selectedCategory);

  // 添加清空所有食品的函数
  const handleClearAll = () => {
    setSelectedItems([]);
  };

  // 添加新的 useEffect 来计算当前选择的食品的嘌呤含量
  useEffect(() => {
    if (!currentFood) {
      setCurrentPurine(0);
      return;
    }
    
    const food = foods.find(f => f.name === currentFood);
    if (food) {
      const purine = (food.purineContent * currentAmount) / 100;
      setCurrentPurine(purine);
    }
  }, [currentFood, currentAmount, foods]);

  // 保存当前膳食
  const handleSaveMeal = () => {
    if (!mealName.trim() || selectedItems.length === 0) return;
    
    const newMeal = {
      id: Date.now(),
      name: mealName,
      items: selectedItems,
      totalPurine: totalPurine
    };
    
    const updatedMeals = [...savedMeals, newMeal];
    setSavedMeals(updatedMeals);
    localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
    
    setMealName('');
    setShowSaveModal(false);
  };

  // 加载保存的膳食
  const handleLoadMeal = (meal) => {
    setSelectedItems(meal.items);
  };

  // 删除保存的膳食
  const handleDeleteMeal = (id) => {
    const updatedMeals = savedMeals.filter(meal => meal.id !== id);
    setSavedMeals(updatedMeals);
    localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
  };

  return (
    <>
      <Title level={2}>嘌呤摄入计算器</Title>
      <Text>选择食品和数量，计算总嘌呤摄入量</Text>
      
      <CalculatorCard title="添加食品">
        <Tabs defaultActiveKey="category" style={{ marginBottom: 16 }}>
          <TabPane tab="按分类选择" key="category">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Select
                style={{ width: '100%' }}
                placeholder="选择食品分类"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={[
                  { value: 'all', label: '全部分类' },
                  ...Object.values(CATEGORIES).map(category => ({
                    value: category.id,
                    label: category.name
                  }))
                ]}
              />
              
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="选择食品"
                optionFilterProp="children"
                value={currentFood}
                onChange={setCurrentFood}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={filteredFoods.map(food => ({
                  value: food.name,
                  label: `${food.name} (${food.purineContent}mg/100g)`
                }))}
              />
            </Space>
          </TabPane>
          <TabPane tab="直接搜索" key="search">
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="搜索食品"
              optionFilterProp="children"
              value={currentFood}
              onChange={setCurrentFood}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={foods.map(food => ({
                value: food.name,
                label: `${food.name} (${food.purineContent}mg/100g)`
              }))}
            />
          </TabPane>
        </Tabs>
        
        <ControlRow>
          <Select
            style={{ width: '50%' }}
            placeholder="选择常用量"
            value={selectedUtensil}
            onChange={setSelectedUtensil}
            allowClear
            options={Object.entries(UTENSIL_CONVERSIONS).map(([name, value]) => ({
              value: name,
              label: `${name} (约 ${value}g)`
            }))}
          />
          
          <InputNumber
            style={{ width: '25%' }}
            min={1}
            max={1000}
            value={currentAmount}
            onChange={setCurrentAmount}
            addonAfter="g"
          />
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddFood}
            disabled={!currentFood}
          >
            添加
          </Button>
        </ControlRow>
        
        {currentFood && (
          <div style={{ marginTop: 8 }}>
            <Text>
              当前选择: <Text strong>{currentAmount}g</Text> 的 
              <Text strong>{foods.find(f => f.name === currentFood)?.name}</Text>，
              嘌呤含量约 <Text strong type={currentPurine > 50 ? "danger" : "success"}>
                {currentPurine.toFixed(1)}mg
              </Text>
            </Text>
          </div>
        )}
      </CalculatorCard>
      
      <Card 
        title="已选食品" 
        extra={
          <Space>
            {selectedItems.length > 0 && (
              <>
                <Button type="primary" onClick={() => setShowSaveModal(true)}>
                  保存膳食
                </Button>
                <Button danger onClick={handleClearAll}>
                  清空所有
                </Button>
              </>
            )}
          </Space>
        }
      >
        {selectedItems.length === 0 ? (
          <Text type="secondary">暂无添加食品</Text>
        ) : (
          <List
            dataSource={selectedItems}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleRemoveFood(item.id)} 
                  />
                ]}
              >
                <List.Item.Meta
                  title={item.food.name}
                  description={`${item.utensil} (${item.amount}g, ${item.food.purineContent}mg/100g)`}
                />
                <div>{item.purine.toFixed(1)}mg</div>
              </List.Item>
            )}
          />
        )}
        
        <Divider />
        
        <ResultCard>
          <Title level={4}>总嘌呤摄入量: {totalPurine.toFixed(1)}mg</Title>
          <Alert
            message={`嘌呤摄入水平: ${purineLevel.text}`}
            type={purineLevel.color === 'green' ? 'success' : purineLevel.color === 'orange' ? 'warning' : 'error'}
            showIcon
            description={
              <div>
                <Text>每日嘌呤摄入建议控制在150-300mg以内。</Text>
                {purineLevel.color === 'green' && (
                  <div style={{ marginTop: 8 }}>
                    <Text type="success">当前摄入量适中，可以继续保持这样的饮食习惯。</Text>
                  </div>
                )}
                {purineLevel.color === 'orange' && (
                  <div style={{ marginTop: 8 }}>
                    <Text type="warning">当前摄入量处于中等水平，建议适当控制高嘌呤食品的摄入。</Text>
                  </div>
                )}
                {purineLevel.color === 'red' && (
                  <div style={{ marginTop: 8 }}>
                    <Text type="danger">当前摄入量偏高，建议减少高嘌呤食品的摄入，多喝水帮助排出尿酸。</Text>
                  </div>
                )}
              </div>
            }
          />
        </ResultCard>
      </Card>
      
      {savedMeals.length > 0 && (
        <Card title="已保存的膳食" style={{ marginTop: 20 }}>
          <List
            dataSource={savedMeals}
            renderItem={meal => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => handleLoadMeal(meal)}>
                    加载
                  </Button>,
                  <Button danger onClick={() => handleDeleteMeal(meal.id)}>
                    删除
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={meal.name}
                  description={`${meal.items.length}种食品，总嘌呤含量: ${meal.totalPurine.toFixed(1)}mg`}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
      
      <Modal
        title="保存膳食"
        open={showSaveModal}  // 将 visible 改为 open
        onOk={handleSaveMeal}
        onCancel={() => setShowSaveModal(false)}
      >
        <Input
          placeholder="输入膳食名称（如：早餐、午餐）"
          value={mealName}
          onChange={e => setMealName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default PurineCalculator;