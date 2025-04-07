import React from 'react';
import styled from 'styled-components';

const IframeContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px - 4rem);
  overflow: hidden;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Knowledge = () => {
  // 使用 process.env.PUBLIC_URL 确保在不同环境下都能正确访问到 public 目录
  const knowledgeUrl = `${process.env.PUBLIC_URL}/knowledge/index.html`;
  
  return (
    <IframeContainer>
      <StyledIframe
        src={knowledgeUrl}
        title="痛风知识库"
        sandbox="allow-same-origin allow-scripts"
      />
    </IframeContainer>
  );
};

export default Knowledge;