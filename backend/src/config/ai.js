import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY is not set in your .env file.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// We'll use the 1.5-flash model for speed and effectiveness
export const aiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });