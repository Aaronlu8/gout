import React, { useEffect } from 'react';
import styled from 'styled-components';

const KnowledgeContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const KnowledgeFrame = styled.iframe`
  width: 100%;
  height: 100vh;
  border: none;
`;

const Knowledge = () => {
  return (
    <KnowledgeContainer>
      <KnowledgeFrame 
        src="/assets/knowledge/index.html" 
        title="痛风知识"
      />
    </KnowledgeContainer>
  );
};

export default Knowledge;