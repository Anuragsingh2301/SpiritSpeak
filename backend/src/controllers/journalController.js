import JournalEntry from '../models/journalEntryModel.js';
import User from '../models/User.js';
import { aiModel } from '../config/ai.js';
import { guidePersonalities } from '../utils/guides.js';

/**
 * @desc    Create a new journal entry
 * @route   POST /api/journal
 * @access  Private
 */
export const createJournalEntry = async (req, res, next) => {
  try {
    const { content, mood, reflections } = req.body;

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
      reflections: reflections || [],
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

    // 1. Get the user and check daily limit
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // 2. Check if user can generate reflection
    if (!user.canGenerateReflection()) {
      const remainingAttempts = user.getRemainingAttempts();
      return res.status(429).json({
        success: false,
        message: 'Daily reflection limit reached. Try again tomorrow!',
        remainingAttempts,
      });
    }

    // 3. Get the guide's personality
    const guide = guidePersonalities[guideId];

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Invalid guide selected',
      });
    }

    // 4. Construct the full prompt
    const fullPrompt = `${guide.prompt}\n"${content}"`;

    // 5. Call the Gemini API
    const result = await aiModel.generateContent(fullPrompt);
    const response = result.response;
    const reflectionText = response.text();

    // 6. Increment the user's reflection count
    user.incrementReflectionCount();
    await user.save();

    // 7. Send the AI-generated text back with remaining attempts
    res.status(200).json({
      success: true,
      reflection: reflectionText,
      remainingAttempts: user.getRemainingAttempts(),
      attemptsUsed: user.dailyReflections.count,
    });

  } catch (error) {
    console.error('AI Reflection Error:', error);
    next(error);
  }
};

/**
 * @desc    Calculate the user's current journal streak
 * @route   GET /api/journal/streak
 * @access  Private
 */
export const getStreak = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({ user: req.session.userId }).sort({ createdAt: -1 });

    if (entries.length === 0) {
      return res.status(200).json({ success: true, streak: 0 });
    }

    // Use a Set to get unique days, already sorted (newest to oldest)
    const uniqueDays = new Set();
    entries.forEach(entry => {
      uniqueDays.add(new Date(entry.createdAt).toDateString());
    });

    const sortedUniqueDays = [...uniqueDays].map(dateStr => new Date(dateStr));

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Normalize to start of today

    let yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    // Check if the streak is active (posted today or yesterday)
    if (sortedUniqueDays[0].getTime() === currentDate.getTime()) {
      streak = 1;
    } else if (sortedUniqueDays[0].getTime() === yesterday.getTime()) {
      streak = 1;
      currentDate = yesterday; // Start counting from yesterday
    } else {
      // Streak is not active
      return res.status(200).json({ success: true, streak: 0 });
    }

    // Continue counting backwards
    for (let i = 1; i < sortedUniqueDays.length; i++) {
      let expectedDate = new Date(currentDate);
      expectedDate.setDate(currentDate.getDate() - 1);

      if (sortedUniqueDays[i].getTime() === expectedDate.getTime()) {
        streak++;
        currentDate = sortedUniqueDays[i]; // Move the "check" date back
      } else {
        break; // Streak is broken
      }
    }

    res.status(200).json({ success: true, streak });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get remaining reflection attempts for today
 * @route   GET /api/journal/reflection-attempts
 * @access  Private
 */
export const getReflectionAttempts = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const remainingAttempts = user.getRemainingAttempts();
    const DAILY_LIMIT = 3;

    res.status(200).json({
      success: true,
      remainingAttempts,
      totalAttempts: DAILY_LIMIT,
      attemptsUsed: DAILY_LIMIT - remainingAttempts,
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get calendar data with guide colors for each day
 * @route   GET /api/journal/calendar
 * @access  Private
 */
export const getCalendarData = async (req, res, next) => {
  try {
    const entries = await JournalEntry.find({ user: req.session.userId });
    
    // Create a map of dates to guide colors
    const calendarData = {};
    
    entries.forEach(entry => {
      const dateString = new Date(entry.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Get the first reflection's guide (if multiple reflections exist, use the first one)
      if (entry.reflections && entry.reflections.length > 0) {
        const guideId = Number(entry.reflections[0].guideId); // Convert to number
        const guide = guidePersonalities[guideId];
        
        if (guide && guide.colorPalette) {
          calendarData[dateString] = {
            guideId: guideId,
            guideName: guide.guideName,
            color: guide.colorPalette.calendarBg || guide.frontendColor,
          };
        }
      }
    });

    res.status(200).json({
      success: true,
      data: calendarData,
    });

  } catch (error) {
    next(error);
  }
};