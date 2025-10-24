import JournalEntry from '../models/journalEntryModel.js';
import { aiModel } from '../config/ai.js';
import { guidePersonalities } from '../utils/guides.js';

/**
 * @desc    Create a new journal entry
 * @route   POST /api/journal
 * @access  Private
 */
export const createJournalEntry = async (req, res, next) => {
  try {
    const { content, mood } = req.body;

    // 1. Validate data
    if (!content || !mood) {
      return res.status(400).json({
        success: false,
        message: 'Please provide content and a mood',
      });
    }

    // 2. Create and save the entry
    const entry = await JournalEntry.create({
      content,
      mood,
      user: req.session.userId, // Attach to the logged-in user!
    });

    // 3. Send success response
    res.status(201).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    next(error); // Pass to the global error handler
  }
};

/**
 * @desc    Get all entries for the logged-in user
 * @route   GET /api/journal
 * @access  Private
 */
export const getJournalEntries = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({ user: req.session.userId })
                                      .sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate an AI reflection for a journal entry
 * @route   POST /api/journal/reflect
 * @access  Private
 */
export const getReflection = async (req, res, next) => {
  try {
    const { content, guideId } = req.body;

    if (!content || !guideId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide content and a guide ID',
      });
    }

    // 1. Get the guide's personality
    const guide = guidePersonalities[guideId];

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Invalid guide selected',
      });
    }

    // 2. Construct the full prompt
    const fullPrompt = `${guide.prompt}\n"${content}"`;

    // 3. Call the Gemini API
    const result = await aiModel.generateContent(fullPrompt);
    const response = result.response;
    const reflectionText = response.text();

    // 4. Send the AI-generated text back
    res.status(200).json({
      success: true,
      reflection: reflectionText,
    });

  } catch (error) {
    console.error('AI Reflection Error:', error);
    next(error);
  }
};