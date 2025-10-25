import { aiModel } from '../config/ai.js';
import { guidePersonalities } from '../utils/guides.js';

/**
 * @desc    Get a random AI-generated "Thought of the Day"
 * @route   GET /api/guides/thought-of-the-day
 * @access  Private
 */
export const getThoughtOfTheDay = async (req, res, next) => {
  try {
    // 1. Get and pick a random guide
    const guideIds = Object.keys(guidePersonalities);
    const randomId = guideIds[Math.floor(Math.random() * guideIds.length)];
    const guide = guidePersonalities[randomId];

    // 2. Create the prompt using the guide's personality
    const personalityPrompt = guide.personality;

    const fullPrompt = `
      ${personalityPrompt}

      Your task is to generate a single, profound, and wise "quote of the day" that reflects your core philosophy.
      It must sound like an ancient, timeless piece of wisdom.
      It must be a general quote, NOT a response to any specific user entry.
      It should be 1-2 sentences long.
      
      Respond with ONLY the quote. Do not add "Here is a quote:" or any other surrounding text.
    `;

    // 3. Call the Gemini API
    const result = await aiModel.generateContent(fullPrompt);
    const response = await result.response;
    let quote = response.text();

    // 4. Clean up the quote (remove quotes, asterisks, etc.)
    quote = quote.replace(/["*]/g, '').trim();

    // 5. Send the response
    res.status(200).json({
      success: true,
      guideName: guide.name,
      quote: quote,
    });

  } catch (error) {
    console.error('AI Thought of the Day Error:', error);
    next(error);
  }
};