// src/components/Chatbot.js
import React, { useState } from 'react';
import './ChatbotPage.css'

function Chatbot() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    setMessages([...messages, { user: 'me', text: message }]);
    // Add logic to process message and get response
    const response = "This is a response from the chatbot"; // Placeholder
    setMessages([...messages, { user: 'me', text: message }, { user: 'bot', text: response }]);
  };

  return (
    <main className='chatbot-page'>
      <div className='chat-log'>
        <div className='chat-message'>
          <div className='avatar'>
          </div>
            <div className='message'>
              Hello there
            </div>
        </div>
      </div>

      <div className='chatbox'>
      <textarea className='chatbox-input'
      placeholder='Enter your query here'>
      </textarea>
      </div>
    </main>
  );
}

export default Chatbot;
