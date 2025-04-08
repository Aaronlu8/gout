import React from 'react';
import { Layout, Typography, Table, Tag, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DataSourcePage = () => {
  const dataSourceInfo = [
    {
      name: '《中国食物成分表》',
      reliability: '高',
      description: '中国疾病预防控制中心营养与健康所编制的官方食物成分数据库。数据经过严格的科学测定。',
      url: 'https://www.chinacdc.cn/yyrdgz/spfk/'
    },
    // 可以添加更多数据来源
  ];

  return (
    <Content className="datasource-container">
      <Title level={2} className="datasource-title">数据来源可信度分级</Title>
      
      <div className="datasource-table">
        <table>
          <thead>
            <tr>
              <th>数据来源</th>
              <th>可信度</th>
              <th>说明</th>
              <th>官方网站</th>
            </tr>
          </thead>
          <tbody>
            {dataSourceInfo.map((source, index) => (
              <tr key={index}>
                <td>{source.name}</td>
                <td>
                  <span className={`datasource-reliability reliability-${source.reliability === '高' ? 'high' : source.reliability === '中' ? 'medium' : 'low'}`}>
                    {source.reliability}
                  </span>
                </td>
                <td>{source.description}</td>
                <td>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="datasource-link">
                    <LinkOutlined /> 访问
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Paragraph className="datasource-description">
        本应用的嘌呤含量数据主要来源于权威的食物成分数据库和科学研究文献。
        我们优先采用官方发布的数据，并定期更新以确保信息的准确性。
      </Paragraph>
    </Content>
  );
};

export default DataSourcePage;