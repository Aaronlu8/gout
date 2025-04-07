import React from 'react';
import styled from 'styled-components';
import { Typography, Avatar, Space, Divider, Button, Popover, Row, Col, Card, Tabs } from 'antd';
import { GithubOutlined, MailOutlined, WechatOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const FooterContainer = styled.footer`
  padding: 16px 20px 8px;  // 减小内边距
  background: linear-gradient(135deg, #f0f7ff, #e6f4ff);
  border-top: 1px solid #e6f4ff;
  text-align: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`;

const AuthorAvatar = styled(Avatar)`
  width: 40px;  // 减小头像尺寸
  height: 40px;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-right: 12px;
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  
  .ant-card-body {
    padding: 12px;  // 减小卡片内边距
  }
`;

const CompactTitle = styled(Title)`
  margin-top: 0 !important;
  margin-bottom: 0 !important;  // 移除底部边距
  font-size: 16px !important;  // 减小字体大小
  text-align: left;  // 左对齐
`;

const CompactParagraph = styled(Paragraph)`
  margin-bottom: 8px !important;
  font-size: 13px !important;
  line-height: 1.6 !important;
  text-align: justify;
`;

const QRCodeImage = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: block;
`;

const SocialLinks = styled.div`
  margin-top: 12px;
  text-align: center;
  
  .ant-btn {
    margin: 0 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }
`;

// 新增样式组件
const TabsContainer = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 12px;
  }
  
  .ant-tabs-tab {
    padding: 8px 16px;
  }
`;

// 修改头像容器为水平布局
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;  // 改为水平方向
  align-items: center;  // 垂直居中对齐
  margin-bottom: 12px;
`;

// 添加标题容器样式
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;  // 与头像高度一致
`;

const Footer = () => {
  // 二维码内容
  const wechatQRCode = (
    <div style={{ textAlign: 'center' }}>
      <QRCodeImage src={`${process.env.PUBLIC_URL}/images/wechat-qrcode.png`} alt="微信二维码" />
      <p>微信扫码添加好友</p>
    </div>
  );

  return (
    <FooterContainer>
      <Row justify="center" gutter={[12, 12]} align="stretch">
        <Col xs={24} md={16}>
          <StyledCard>
            <TabsContainer centered>
              <TabPane 
                tab={<span><UserOutlined /> 关于我</span>} 
                key="1"
              >
                <AvatarContainer>
                  <AuthorAvatar src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} />
                  <TitleContainer>
                    <CompactTitle level={4}>一个不会写代码的开发者</CompactTitle>
                  </TitleContainer>
                </AvatarContainer>
                <CompactParagraph>
                  我是一名汽车行业的产品经理，摸爬滚打十多载，没想到会自己开发线上产品，同时我也是一名痛风患友，指标500多，发作过2次，现在饮食特别注意，并且感觉用过的嘌呤APP都不好，所以凭自己的0代码知识开发一个
                </CompactParagraph>
                <CompactParagraph>
                  奈何本来想开发个APP，结果开发了个网页版本，后续有能耐了再补充APP。我会尽量全面和准确地展示食品嘌呤，由于数据量众多，如果有错误的地方还请指正。
                </CompactParagraph>
                <CompactParagraph>
                  如有兴趣交流的，欢迎加微信，要注明来意哦！小弟在此多谢支持。
                </CompactParagraph>
              </TabPane>
              
              {/* 联系我标签页 */}
              <TabPane 
                tab={<span><HeartOutlined /> 联系我</span>} 
                key="2"
              >
                <SocialLinks>
                  <Space size="large" wrap>
                    <div style={{ textAlign: 'center' }}>
                      <Popover content={wechatQRCode} title="微信" trigger="click">
                        <Button type="primary" icon={<WechatOutlined />} size="large">
                          微信联系
                        </Button>
                      </Popover>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Button 
                        type="primary" 
                        icon={<MailOutlined />} 
                        href="mailto:aaronlu860@163.com"
                        size="large"
                      >
                        邮件联系
                      </Button>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Button 
                        type="primary" 
                        icon={<GithubOutlined />} 
                        href="https://github.com/Aaronlu8" 
                        target="_blank"
                        title="访问开发者的GitHub主页"
                        size="large"
                      >
                        GitHub
                      </Button>
                    </div>
                  </Space>
                </SocialLinks>
              </TabPane>
            </TabsContainer>
          </StyledCard>
        </Col>
        
        <Col xs={24} md={6}>
          <StyledCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <CompactTitle level={4} style={{ textAlign: 'center' }}>支持一下我吧</CompactTitle>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}>
              <QRCodeImage src={`${process.env.PUBLIC_URL}/images/donate-qrcode.png`} alt="打赏二维码" />
              <CompactParagraph style={{ marginTop: 8, textAlign: 'center', marginBottom: '0 !important' }}>
                <Text strong style={{ fontSize: '14px' }}>感谢您的支持！🫰🫰🫰</Text>
              </CompactParagraph>
            </div>
          </StyledCard>
        </Col>
      </Row>
      
      <Divider style={{ margin: '16px 0 8px' }} />
      
      <Text type="secondary" style={{ fontSize: '12px' }}>
        © {new Date().getFullYear()} 嘌呤管家 - 版权所有
      </Text>
    </FooterContainer>
  );
};

export default Footer;