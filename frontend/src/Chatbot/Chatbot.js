// src/components/Chatbot.js
import React, { useState } from 'react';
import './ChatbotPage.css'

function Chatbot() {
  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState([]);
  const [error, setError] = useState("");

  async function getResponse(e){
    e.preventDefault();


    if (!input.trim()) {
      setError("Please enter a message");
      return;
    }

    try{
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatlog,
          message: input
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch("http://localhost:3080/gemini", options);
      const data = await response.text();
      console.log(">> response: ", data);
      setChatLog(oldChatLog => [...oldChatLog,{
        role: "user",
        parts: [{'text': input}]
      },{
        role: "model",
        parts: data
      }
      ])
      setInput("")

      console.log(">>", chatlog);
    } catch (error) {
      setError("Something went wrong!");
    }
  }

  return (
    <main className='chatbot-page'>
      <div className='chat-log'>
        {/* {chatlog.map ((message, index) => (
            <ChatMessage key={index} message={message}/>
        ))} */}
      </div>

      <div className='chatbox'>

      <form onSubmit={getResponse}>
      <input className='chatbox-input' value={input} onChange={(e)=>setInput(e.target.value)}
      placeholder='Enter your query here'>
      </input>
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
            {message.parts.text}
            </div>
          </div>
        </div>
  )
}

export default Chatbot;
