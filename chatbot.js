require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); //Reach from frontend.

app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required!' });
        }
        const result = await model.generateContent(userMessage);
        res.json({ response: result.response.text() });

    } catch (error) {
        console.log("Error accured", error);
        res.status(500).json({ error: 'something went wrong!' });
    }
});

app.listen(port, () => {
    console.log(`Server is on port: http://localhost:${port}`);
})