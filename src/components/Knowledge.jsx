import React from 'react';
import styled from 'styled-components';

const IframeContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Knowledge = () => {
  return (
    <IframeContainer>
      <iframe 
        src="/Purineassist/knowledge/index.html" 
        width="100%" 
        height="100%" 
        frameBorder="0"
        title="痛风知识"
      />
    </IframeContainer>
  );
};

export default Knowledge;