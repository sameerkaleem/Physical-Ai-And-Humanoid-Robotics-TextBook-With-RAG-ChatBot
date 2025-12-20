import React from 'react';
import Chatbot from '@site/src/components/Chatbot';

// Root component that wraps the entire application
function Root({ children }) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
}

export default Root;