import React from 'react';
import Chatbot from '@site/src/components/Chatbot';
import { AuthProvider } from '@site/src/contexts/AuthContext';

// Root component that wraps the entire application
function Root({ children }) {
  return (
    <AuthProvider>
      {children}
      <Chatbot />
    </AuthProvider>
  );
}

export default Root;