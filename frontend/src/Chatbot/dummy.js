// src/components/Chatbot.js
import React, { useState } from 'react';
import './ChatbotPage.css'

function Chatbot() {
  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState("");

  async function handleSubmit(e){
    e.preventDefault();

  return (
    <main className='chatbot-page'>
      <div className='chat-log'>
        {chatlog.map((message, index) => (
            <ChatMessage key={index} message={message} />
        ))}
      </div>

      <div className='chatbox'>

      <form onSubmit={handleSubmit}>
      <input className='chatbox-input' value={input} onChange={(e)=>setInput(e.target.value)}
      placeholder='Enter your query here'>
      </input>

      <input type='submit'  />

      </form>

      </div>
    </main>
  );
}

const ChatMessage = ({message}) => {
  return (
    <div className='chat-message'>
          <div className='chat-mesage-center'>
            <div className='avatar'>
            </div>
            <div className='message'>
              {message.message}
            </div>
          </div>
        </div>
  )
}

export default Chatbot;
