import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY is not set.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

export const aiModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-lite',  // ← replace with one of the supported names from ListModels
  generationConfig: {
    temperature: 0.9,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 500,
  },
});

export const generateAIResponse = async (prompt) => {
  try {
    const result = await aiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('AI service error:', error);
    throw new Error('AI service failed. Please check model name / API key.');
  }
};
