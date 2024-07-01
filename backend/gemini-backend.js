const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config({ path: './a.env' });
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error('API key is missing. Please set GOOGLE_API_KEY in your .env file.');
}

const PORT = 3080;
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/gemini", async (req,res) => {

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  console.log(">> gemini:", req.body)
  const chat = model.startChat({
    history: req.body.history
  })
  const msg = req.body.message

  console.log(">> gemini response:", msg)
  const result = await chat.sendMessage(msg)
  const response = await result.response
  const text = response.text()

  res.send(text)
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))