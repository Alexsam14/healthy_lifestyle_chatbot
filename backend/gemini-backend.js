require("dotenv").config()
const PORT = 3003
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())


const { GoogleGenerativeAI } = require("@google/generative-ai")
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

app.post('/gemini', async (req, res) => {
    try{
        const model = await genAI.getGenerativeModel({model: "gemini-1.5-pro",
            systemInstruction: "You only answer health-related queries as brief as possible. You are integrated with a health chatbot. The name is Healthy Lifestyle Chatbot."
        })

        const generationConfig = {
            temperature: 0.5,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
          };

        const chat = model.startChat({
            generationConfig,
            history: req.body.history.map(item => ({
                role: item.role,
                parts: [{text: item.parts}]
              }))
        })
        const msg = req.body.message

        const result = await chat.sendMessage(msg)
        /*await?*/
        const response = await result.response
        const text = response.text()

        res.json({ text: text })
    } catch (error){
        console.error('Error:', error)
    res.status(500).send('An error occurred while processing your request')
    }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))