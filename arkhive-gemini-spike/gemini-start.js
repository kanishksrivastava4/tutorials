import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config();

const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY)

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })
    const prompt = "Briefly explain the concept of OCR and describe its uses"
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text()
    console.log(text)
}

run();