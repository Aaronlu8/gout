import React from 'react';
import styled from 'styled-components';
import { Typography, Card, Table, Tag, Divider, Button, Collapse } from 'antd';
import { SOURCE_RELIABILITY } from '../data/sourceReliability';
import { LinkOutlined, DownOutlined } from '@ant-design/icons';
import { FOODS_DATA } from '../data/foodData';
import { CATEGORIES } from '../data/foodCategories';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FoodListCard = styled(StyledCard)`
  margin-top: 24px;
`;

const CategoryTitle = styled(Title)`
  margin-top: 16px !important;
`;

const FoodItem = styled.span`
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 8px;
  padding: 4px 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const WeightInfo = styled.span`
  color: #1890ff;
  font-weight: 500;
  margin-left: 4px;
`;

const DataSource = () => {
  const dataSourceColumns = [
    {
      title: '数据来源',
      dataIndex: 'source',
      key: 'source',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: '可信度',
      dataIndex: 'reliability',
      key: 'reliability',
      render: (reliability) => {
        let color = 'green';
        if (reliability === '中等') {
          color = 'orange';
        } else if (reliability === '较低') {
          color = 'red';
        }
        return <Tag color={color}>{reliability}</Tag>;
      },
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '官方网站',
      dataIndex: 'website',
      key: 'website',
      render: (website) => {
        return website ? (
          <Button 
            type="link" 
            icon={<LinkOutlined />}
            href={website} 
            target="_blank"
          >
            访问
          </Button>
        ) : (
          '无'
        );
      },
    },
  ];

  // 从 SOURCE_RELIABILITY 生成表格数据
  const dataSourceData = Object.entries(SOURCE_RELIABILITY).map(([source, info], index) => ({
    key: index.toString(),
    source,
    reliability: info.level,
    description: info.description,
    website: info.website || null,
  }));

  // 按类别整理食品数据
  const foodsByCategory = {};
  
  Object.values(CATEGORIES).forEach(category => {
    foodsByCategory[category.id] = [];
  });
  
  FOODS_DATA.forEach(food => {
    if (foodsByCategory[food.category]) {
      foodsByCategory[food.category].push(food);
    }
  });

  return (
    <Container>
      <Title level={2}>数据来源与可信度说明</Title>
      
      <StyledCard>
        <Title level={3}>关于数据来源</Title>
        <Paragraph>
          本应用中的食品嘌呤含量数据来自多个来源，包括官方食品成分表、科学研究文献以及基于相似食品的推算数据。
          我们尽可能使用最权威、最新的数据，但由于不同来源之间可能存在差异，数据仅供参考。
        </Paragraph>
      </StyledCard>
      
      <StyledCard>
        <Title level={3}>数据来源可信度分级</Title>
        <Table 
          columns={dataSourceColumns} 
          dataSource={dataSourceData} 
          pagination={false}
        />
      </StyledCard>
      
      <StyledCard>
        <Title level={3}>数据使用建议</Title>
        <Paragraph>
          <Text strong>医疗建议免责声明：</Text> 本应用提供的数据仅供参考，不构成医疗建议。如有健康问题，请咨询医生或营养师。
        </Paragraph>
        <Divider />
        <Paragraph>
          <ul>
            <li>优先参考可信度"高"的数据来源</li>
            <li>对于可信度"中等"的数据，建议结合其他信息综合判断</li>
            <li>对于可信度"较低"的数据，仅作参考，不宜作为严格控制嘌呤摄入的唯一依据</li>
          </ul>
        </Paragraph>
      </StyledCard>
      
      <StyledCard>
        <Title level={3}>数据更新</Title>
        <Paragraph>
          我们会定期更新数据库，以确保数据的准确性和完整性。如果您发现任何数据错误或有新的数据来源建议，
          欢迎通过应用内的反馈功能告知我们。
        </Paragraph>
      </StyledCard>
      
      {/* 新增食品清单部分 */}
      <FoodListCard>
        <Title level={3}>食品分类清单</Title>
        <Paragraph>
          以下是本应用收录的所有食品，按类别分类。标注了重量的食品可以按个/只计量。
        </Paragraph>
        
        <Collapse>
          {Object.entries(foodsByCategory).map(([categoryId, foods]) => {
            const category = Object.values(CATEGORIES).find(c => c.id === categoryId);
            if (!category || foods.length === 0) return null;
            
            return (
              <Panel 
                header={`${category.name}（${foods.length}种）`} 
                key={categoryId}
              >
                {foods.map((food, index) => (
                  <FoodItem key={index}>
                    {food.name}
                    {food.weight && <WeightInfo>（{food.weight}）</WeightInfo>}
                  </FoodItem>
                ))}
              </Panel>
            );
          })}
        </Collapse>
      </FoodListCard>
    </Container>
  );
};

export default DataSource;