import React from 'react';
import styled from 'styled-components';
import { Typography, Avatar, Space, Divider, Button, Popover, Row, Col, Card } from 'antd';
import { GithubOutlined, MailOutlined, WechatOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const FooterContainer = styled.footer`
  padding: 20px 24px 12px;
  background: linear-gradient(135deg, #f0f7ff, #e6f4ff);
  border-top: 1px solid #e6f4ff;
  text-align: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
`;

const AuthorAvatar = styled(Avatar)`
  width: 80px;  // 减小头像尺寸
  height: 80px;
  margin-bottom: 8px;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  padding: 8px;
  
  .ant-card-body {
    padding: 12px;
  }
`;

const CompactTitle = styled(Title)`
  margin-top: 0 !important;
  margin-bottom: 4px !important;
  font-size: 18px !important;  // 减小标题字号
`;

const CompactParagraph = styled(Paragraph)`
  margin-bottom: 4px !important;
  font-size: 13px !important;  // 减小正文字号
  line-height: 1.5 !important;
`;

const QRCodeImage = styled.img`
  width: 120px;  // 减小二维码尺寸
  height: 120px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: block;  // 确保居中对齐
`;

const SocialLinks = styled.div`
  margin-top: 12px;
  
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

// 删除第二个 StyledCard 声明
// 删除重复的 CompactTitle 和 CompactParagraph 声明

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
      <Row justify="center" gutter={[16, 16]} align="stretch">  {/* 减小列间距 */}
        <Col xs={24} md={16}>
          <StyledCard>
            <AuthorAvatar src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} />
            <CompactTitle level={4}>一个不会写代码的开发者</CompactTitle>
            <CompactParagraph>
              {/* 文字内容保持不变 */}
            </CompactParagraph>
            <CompactParagraph>
              奈何本来想开发个APP，结果开发了个网页版本，后续有能耐了再补充APP。我会尽量全面和准确地展示食品嘌呤，由于数据量众多，如果有错误的地方还请指正。
            </CompactParagraph>
            <CompactParagraph>
              如有兴趣交流的，欢迎加微信，要注明来意哦！小弟在此多谢支持。
            </CompactParagraph>
            
            <SocialLinks>
              <Popover content={wechatQRCode} title="微信" trigger="click">
                <Button type="primary" shape="circle" icon={<WechatOutlined />} />
              </Popover>
              <Button 
                type="primary" 
                shape="circle" 
                icon={<MailOutlined />} 
                href="mailto:aaronlu860@163.com"
              />
              <Button 
                type="primary" 
                shape="circle" 
                icon={<GithubOutlined />} 
                href="https://github.com/Aaronlu8" 
                target="_blank"
                title="访问开发者的GitHub主页"
              />
            </SocialLinks>
          </StyledCard>
        </Col>
        
        <Col xs={24} md={6}>
          <StyledCard>
            <CompactTitle level={4}>支持一下我吧</CompactTitle>
            <QRCodeImage src={`${process.env.PUBLIC_URL}/images/donate-qrcode.png`} alt="打赏二维码" />
            <CompactParagraph style={{ marginTop: 4 }}>  {/* 减小文字上边距 */}
              <Text strong style={{ fontSize: '12px' }}>感谢您的支持！🫰🫰🫰</Text>
            </CompactParagraph>
          </StyledCard>
        </Col>
      </Row>
      
      <Divider style={{ margin: '16px 0 8px' }} />  {/* 减小分割线边距 */}
      
      <Text type="secondary" style={{ fontSize: '11px' }}>  {/* 减小版权信息字号 */}
        © {new Date().getFullYear()} 嘌呤管家 - 版权所有
      </Text>
    </FooterContainer>
  );
};

export default Footer;