import { aiModel } from '../config/ai.js';
import { guidePersonalities } from '../utils/guides.js';
import DailyContent from '../models/dailyContentModel.js';

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

/**
 * @desc    Get AI-generated lore for a specific guide (caches by day)
 * @route   GET /api/guides/:id/lore
 * @access  Private
 */
export const getGuideLore = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Normalize the date to the start of today (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 2. Check our database for an existing chapter for this guide today
    let content = await DailyContent.findOne({ guideId: id, date: today });

    // 3. IF CACHED: Return the saved content
    if (content) {
      return res.status(200).json({
        success: true,
        title: content.title,
        story: content.story,
        prompt: content.prompt,
      });
    }

    // 4. IF NOT CACHED: Generate, save, and then return
    const guide = guidePersonalities[id];
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }

    const fullPrompt = `
      ${guide.personality}

      Your task is to write an engaging, motivational story (about 150-200 words) 
      about a key moment in your life that shaped your philosophy.
      This is for a "Today's Chapter" section.
      It should be a lore-focused story, not a quote or a direct response.
      Start the story with an intriguing title, like "Chapter 1: The ..."
      End the story with a single, one-sentence prompt for the user to reflect on.

      Respond with ONLY the title, the story, and the prompt, separated by newlines.
      Example:
      Today's Chapter: The Unmovable Rock

      I learned my first lesson not from a person, but from a single rock...

      "What is one 'wave' you endured today...?"
    `;

    const result = await aiModel.generateContent(fullPrompt);
    const response = await result.response;
    let loreText = response.text();

    const parts = loreText.split('\n').filter(Boolean);
    const title = parts[0] || "A New Chapter";
    const story = parts.slice(1, -1).join('\n') || "A story is waiting to be told...";
    const prompt = parts[parts.length - 1] || "What new story will you write today?";

    // 5. Save the new content to the database
    content = await DailyContent.create({
      guideId: id,
      date: today,
      title,
      story,
      prompt,
    });

    res.status(201).json({
      success: true,
      title: content.title,
      story: content.story,
      prompt: content.prompt,
    });

  } catch (error)
    {
    // This handles a rare case where two users request at the same time
    if (error.code === 11000) { 
      return res.status(409).json({ success: false, message: 'Content is being generated, please try again.' });
    }
    console.error('AI Lore Error:', error);
    next(error);
  }
};