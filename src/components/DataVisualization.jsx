import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Radio, Spin, Empty } from 'antd';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useFoods } from '../contexts/FoodContext';
import { CATEGORIES, PURINE_LEVELS } from '../data/foodCategories';

const ChartCard = styled(Card)`
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  height: 400px;
  margin: 20px 0;
`;

const ControlsContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const DataVisualization = () => {
  const { foods, loading } = useFoods();
  const [chartType, setChartType] = useState('category');
  const [categoryData, setCategoryData] = useState([]);
  const [levelData, setLevelData] = useState([]);

  useEffect(() => {
    if (foods.length > 0) {
      // 按分类统计
      const categoryStats = {};
      Object.values(CATEGORIES).forEach(cat => {
        categoryStats[cat.id] = {
          category: cat.name,
          count: 0,
          avgPurine: 0,
          totalPurine: 0,
          color: cat.color
        };
      });

      foods.forEach(food => {
        if (categoryStats[food.category]) {
          categoryStats[food.category].count += 1;
          categoryStats[food.category].totalPurine += food.purineContent;
        }
      });

      Object.keys(categoryStats).forEach(key => {
        if (categoryStats[key].count > 0) {
          categoryStats[key].avgPurine = Math.round(
            categoryStats[key].totalPurine / categoryStats[key].count
          );
        }
      });

      setCategoryData(
        Object.values(categoryStats)
          .filter(item => item.count > 0)
          .sort((a, b) => b.avgPurine - a.avgPurine)
      );

      // 按嘌呤等级统计
      const levelStats = {};
      Object.entries(PURINE_LEVELS).forEach(([key, value]) => {
        levelStats[key] = {
          level: value.name,
          count: 0,
          color: value.color
        };
      });

      foods.forEach(food => {
        if (levelStats[food.purineLevel]) {
          levelStats[food.purineLevel].count += 1;
        }
      });

      setLevelData(
        Object.values(levelStats)
          .filter(item => item.count > 0)
          .sort((a, b) => b.count - a.count)
      );
    }
  }, [foods]);

  const renderChart = () => {
    if (loading) {
      return <Spin size="large" />;
    }

    if (foods.length === 0) {
      return <Empty description="暂无数据" />;
    }

    if (chartType === 'category') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              angle={-45} 
              textAnchor="end" 
              height={70} 
              // 删除了底部的标签
            />
            <YAxis label={{ value: '平均嘌呤含量(mg/100g)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => [`${value} mg/100g`, '平均嘌呤含量']} />
            <Legend />
            <Bar dataKey="avgPurine" name="平均嘌呤含量">
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={levelData}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="count"
              nameKey="level"
              label={({ level, count, percent }) => `${level}: ${count} (${(percent * 100).toFixed(0)}%)`}
            >
              {levelData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [`${value} 种食品`, props.payload.level]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <>
      <ControlsContainer>
        <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
          <Radio.Button value="category">按食品分类</Radio.Button>
          <Radio.Button value="level">按嘌呤等级</Radio.Button>
        </Radio.Group>
      </ControlsContainer>

      <ChartCard title={chartType === 'category' ? '各类食品平均嘌呤含量' : '食品嘌呤等级分布'}>
        <ChartContainer>{renderChart()}</ChartContainer>
      </ChartCard>
    </>
  );
};

export default DataVisualization;