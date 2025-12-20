import React, { useState, useEffect } from 'react';
import './styles.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showSelectionButton, setShowSelectionButton] = useState(false);

  // Function to get selected text
  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection ? selection.toString().trim() : '';
  };

  // Event listener for text selection
  useEffect(() => {
    const handleMouseUp = () => {
      const selectedText = getSelectedText();
      if (selectedText) {
        setSelectedText(selectedText);
        setShowSelectionButton(true);
      } else {
        setShowSelectionButton(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((inputValue.trim() === '' && !selectedText) || isLoading) return;

    const messageToSend = inputValue || selectedText;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: messageToSend,
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Here Backend URL REQUIRED, Replace this with deployed backend URL:
    try {
      const response = await fetch('https://rag-chatbot-backend-production-601a.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: messageToSend,
          selection_context: selectedText || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botResponse = {
        id: Date.now() + 1,
        text: data.answer,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setSelectedText('');
      setShowSelectionButton(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Only show floating button when chat is not open */}
      {!isOpen && (
        <button
          className="chatbot-button"
          onClick={toggleChat}
          aria-label="Open chat"
        >
          <span className="chatbot-button-emoji">
            {showSelectionButton ? '?' : '🤖'}
          </span>
        </button>
      )}

      {/* Selection indicator button (appears when text is selected) */}
      {showSelectionButton && !isOpen && (
        <button
          className="chatbot-selection-button"
          onClick={() => {
            setIsOpen(true);
          }}
          style={{
            position: 'fixed',
            bottom: '90px', // Position above the main chat button
            right: '20px',
            padding: '8px 16px',
            background: 'var(--ifm-color-primary, #B8860B)',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>🤖</span>
          <span>Ask about selection</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>
              {selectedText ? 'Ask about selection' : 'AI Assistant'}
            </h3>
            <button
              className="chatbot-close-button"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>
                <p>Hello! I'm your AI assistant for the Physical AI and Humanoid Robotics textbook. How can I help you today?</p>
                {selectedText && (
                  <div style={{ marginTop: '10px', fontSize: '14px' }}>
                    <strong>Selected text:</strong> "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"
                  </div>
                )}
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender}-message`}
                  >
                    <div className="message-text">{message.text}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message bot-message">
                    <div className="message-text">Thinking...</div>
                  </div>
                )}
              </>
            )}
          </div>
          <form onSubmit={handleSend} className="chatbot-input-form">
            {selectedText && (
              <div style={{
                fontSize: '12px',
                marginBottom: '8px',
                padding: '4px 8px',
                background: '#e0e7ff',
                borderRadius: '4px',
                wordBreak: 'break-word'
              }}>
                <strong>Context:</strong> {selectedText.substring(0, 60)}{selectedText.length > 60 ? '...' : ''}
              </div>
            )}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={selectedText ? "Ask about selected text..." : "Type your question..."}
              className="chatbot-input"
              disabled={isLoading}
            />
            <button type="submit" className="chatbot-send-button" disabled={isLoading}>
              {isLoading ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;