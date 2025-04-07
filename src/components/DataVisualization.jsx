import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Radio, Spin, Empty, Row, Col, Statistic, Typography } from 'antd';
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { useFoods } from '../contexts/FoodContext';
import { CATEGORIES } from '../data/foodCategories';

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

const StatsContainer = styled(Row)`
  margin-bottom: 24px;
`;

const Container = styled.div`
  padding: 16px;
`;

const DataVisualization = () => {
  const { foods, loading } = useFoods();
  const [chartType, setChartType] = useState('overview');
  const [statsData, setStatsData] = useState({
    totalFoods: 0,
    avgPurine: 0,
    highPurineFoods: 0,
    safeFoods: 0,
    categoryDistribution: [],
    purineRanges: []
  });

  useEffect(() => {
    if (foods.length > 0) {
      // 计算基础统计数据
      const totalPurine = foods.reduce((sum, food) => sum + food.purine, 0);
      const avgPurine = Math.round(totalPurine / foods.length);
      const highPurineFoods = foods.filter(food => food.purine > 150).length;
      const safeFoods = foods.filter(food => food.purine < 50).length;

      // 按分类统计
      const categoryStats = {};
      Object.values(CATEGORIES).forEach(cat => {
        categoryStats[cat.id] = {
          category: cat.name,
          count: 0,
          avgPurine: 0,
          totalPurine: 0,
          color: cat.color,
          highRiskCount: 0, // 高风险食品数量（嘌呤含量>150）
          safeCount: 0      // 安全食品数量（嘌呤含量<50）
        };
      });

      // 按嘌呤含量范围统计
      const purineRanges = [
        { range: '0-50', name: '安全食用', count: 0, color: '#52c41a' },
        { range: '51-100', name: '适量食用', count: 0, color: '#1890ff' },
        { range: '101-150', name: '谨慎食用', count: 0, color: '#faad14' },
        { range: '151-200', name: '限制食用', count: 0, color: '#fa8c16' },
        { range: '>200', name: '避免食用', count: 0, color: '#f5222d' }
      ];

      foods.forEach(food => {
        // 更新分类统计
        if (categoryStats[food.category]) {
          const cat = categoryStats[food.category];
          cat.count += 1;
          cat.totalPurine += food.purine;
          if (food.purine > 150) cat.highRiskCount += 1;
          if (food.purine < 50) cat.safeCount += 1;
        }

        // 更新嘌呤范围统计
        if (food.purine <= 50) purineRanges[0].count += 1;
        else if (food.purine <= 100) purineRanges[1].count += 1;
        else if (food.purine <= 150) purineRanges[2].count += 1;
        else if (food.purine <= 200) purineRanges[3].count += 1;
        else purineRanges[4].count += 1;
      });

      // 计算每个分类的平均嘌呤含量
      Object.keys(categoryStats).forEach(key => {
        if (categoryStats[key].count > 0) {
          categoryStats[key].avgPurine = Math.round(
            categoryStats[key].totalPurine / categoryStats[key].count
          );
        }
      });

      setStatsData({
        totalFoods: foods.length,
        avgPurine,
        highPurineFoods,
        safeFoods,
        categoryDistribution: Object.values(categoryStats),
        purineRanges
      });
    }
  }, [foods]);

  const renderChart = () => {
    if (loading) return <Spin size="large" />;
    if (foods.length === 0) return <Empty description="暂无数据" />;

    switch (chartType) {
      case 'overview':
        return (
          <>
            <StatsContainer gutter={16}>
              <Col span={6}>
                <Card>
                  <Statistic title="收录食品总数" value={statsData.totalFoods} suffix="种" />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic title="平均嘌呤含量" value={statsData.avgPurine} suffix="mg/100g" />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="高嘌呤食品" 
                    value={statsData.highPurineFoods} 
                    suffix={`种 (${Math.round(statsData.highPurineFoods/statsData.totalFoods*100)}%)`}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Statistic 
                    title="安全食品" 
                    value={statsData.safeFoods}
                    suffix={`种 (${Math.round(statsData.safeFoods/statsData.totalFoods*100)}%)`}
                  />
                </Card>
              </Col>
            </StatsContainer>
            <ChartCard title="食品嘌呤含量分布">
              <ChartContainer>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={statsData.purineRanges}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="name"
                      label={({ name, count, percent }) => 
                        `${name}: ${count}种 (${(percent * 100).toFixed(0)}%)`}
                    >
                      {statsData.purineRanges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartCard>
          </>
        );

      case 'category':
        return (
          <ChartCard title="各类食品嘌呤分析">
            <ChartContainer>
              <ResponsiveContainer>
                <BarChart
                  data={statsData.categoryDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis yAxisId="left" orientation="left" label={{ value: '食品数量（种）', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: '平均嘌呤含量(mg/100g)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" name="食品数量" fill="#1890ff" />
                  <Bar yAxisId="left" dataKey="highRiskCount" name="高风险食品" fill="#f5222d" />
                  <Bar yAxisId="left" dataKey="safeCount" name="安全食品" fill="#52c41a" />
                  <Line yAxisId="right" type="monotone" dataKey="avgPurine" name="平均嘌呤含量" stroke="#722ed1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartCard>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Typography.Paragraph style={{ textAlign: 'center', marginBottom: '20px', fontSize: '16px', color: '#888' }}>
        这页想做的好一点，但是好像没啥用，各位看官就随便看看，如果有好的建议请告诉我🫰
      </Typography.Paragraph>
      
      <ControlsContainer>
        <Radio.Group value={chartType} onChange={e => setChartType(e.target.value)}>
          <Radio.Button value="overview">总体概览</Radio.Button>
          <Radio.Button value="category">分类分析</Radio.Button>
        </Radio.Group>
      </ControlsContainer>
      {renderChart()}
    </Container>
  );
};

export default DataVisualization;