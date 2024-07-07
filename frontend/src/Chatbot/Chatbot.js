import { useState } from "react";

const App = () => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Who won the last World Cup?",
    "When is Christmas?",
    "What is today's date??"
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }

  const getResponse = async () => {
    if(!value){
      setError("Error! Please ask a question!")
      return
    }
    try{
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch("http://localhost:3500/gemini", options)
      const data = await response.json()

      setChatHistory(oldChatHistory => [...oldChatHistory, 
        {role: "user", parts: value},
        {role: "model", parts: data.text}
    ])

    setValue("")
      
    }catch (error){
      console.log(error)
      setError("Something went wrong! Pleae try again later.")
    }
  }

  const clear = () => {
    setValue("")
    setError("")
    setChatHistory([])
  }

  return (
    <div className="app">
      <p>
        What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>Surprise me</button>
      </p>
      <div className="input-container">
        <input
          value={value}
          placeholder="What do you want to ask?"
          onChange={(e) => setValue(e.target.value)}>
        </input>
        <button onClick={getResponse}>Ask me</button>
        <button onClick={clear}>Clear</button>
      </div>
      
      {error && <p>{error}</p>}

      <div className="search-result">
        {chatHistory.map((chatItem, _index) => 
          <div key={_index}>
            <p className="answer">{chatItem.role} : {chatItem.parts}</p>
          </div>)}
      </div>
    </div>
  );
};

export default App;
