import User from '../models/User.js';

// Quest Pool - 35+ different quests to choose from
const QUEST_POOL = {
  daily: [
    // Journal-related
    { id: 'daily_journal_1', title: 'Write one journal entry', xp: 20, type: 'journal_entry' },
    { id: 'daily_journal_2', title: 'Write a 100-word journal entry', xp: 25, type: 'journal_100_words' },
    { id: 'daily_journal_3', title: 'Journal about your day', xp: 20, type: 'journal_entry' },
    { id: 'daily_journal_4', title: 'Express your thoughts in writing', xp: 20, type: 'journal_entry' },
    
    // Login - ONLY ONE, never repeats
    { id: 'daily_login_1', title: 'Daily login bonus', xp: 10, type: 'daily_login' },
    
    // Reflection-related
    { id: 'daily_reflect_1', title: 'Get a reflection from a guide', xp: 15, type: 'get_reflection' },
    { id: 'daily_reflect_2', title: 'Seek wisdom from your guide', xp: 15, type: 'get_reflection' },
    { id: 'daily_reflect_3', title: 'Request guide insight', xp: 15, type: 'get_reflection' },
    
    // Guide interaction - requires chatting with specific guide
    { id: 'daily_guide_1', title: 'Chat with Aethel', xp: 15, type: 'chat_with_aethel' },
    { id: 'daily_guide_2', title: 'Chat with Elara', xp: 15, type: 'chat_with_elara' },
    { id: 'daily_guide_3', title: 'Chat with Kai', xp: 15, type: 'chat_with_kai' },
    { id: 'daily_guide_4', title: 'Chat with Orion', xp: 15, type: 'chat_with_orion' },
  ],
  
  weekly: [
    // Journal streaks
    { id: 'weekly_journal_1', title: 'Journal 5 days this week', xp: 100, type: 'journal_5_days', progress: 0, target: 5 },
    { id: 'weekly_journal_2', title: 'Write 7 journal entries', xp: 150, type: 'journal_7_days', progress: 0, target: 7 },
    { id: 'weekly_journal_3', title: 'Journal 3 times this week', xp: 60, type: 'journal_3_days', progress: 0, target: 3 },
    { id: 'weekly_journal_4', title: 'Write 500 total words', xp: 80, type: 'write_500_words', progress: 0, target: 500 },
    
    // Guide exploration
    { id: 'weekly_guide_1', title: 'Try a new guide', xp: 50, type: 'new_guide' },
    { id: 'weekly_guide_2', title: 'Use a guide for 3 days', xp: 75, type: 'guide_3_days', progress: 0, target: 3 },
    { id: 'weekly_guide_3', title: 'Explore all 4 guides', xp: 100, type: 'visit_all_guides', progress: 0, target: 4 },
    { id: 'weekly_guide_4', title: 'Use different guides 3 times', xp: 60, type: 'different_guides', progress: 0, target: 3 },
    { id: 'weekly_guide_5', title: 'Read 3 guide lore stories', xp: 50, type: 'read_3_lore', progress: 0, target: 3 },
    
    // Reflections
    { id: 'weekly_reflect_1', title: 'Get 5 reflections', xp: 75, type: 'get_5_reflections', progress: 0, target: 5 },
    { id: 'weekly_reflect_2', title: 'Collect 10 reflections', xp: 150, type: 'get_10_reflections', progress: 0, target: 10 },
    { id: 'weekly_reflect_3', title: 'Get 3 guide insights', xp: 45, type: 'get_3_reflections', progress: 0, target: 3 },
    
    // Login streaks
    { id: 'weekly_streak_1', title: 'Login 5 days this week', xp: 80, type: 'login_5_days', progress: 0, target: 5 },
    { id: 'weekly_streak_2', title: 'Visit daily for 7 days', xp: 120, type: 'login_7_days', progress: 0, target: 7 },
    { id: 'weekly_streak_3', title: 'Check in 3 times', xp: 40, type: 'login_3_days', progress: 0, target: 3 },
    
    // Mixed activities
    { id: 'weekly_mixed_1', title: 'Complete 5 daily quests', xp: 100, type: 'complete_5_dailies', progress: 0, target: 5 },
    { id: 'weekly_mixed_2', title: 'Earn 100 XP this week', xp: 50, type: 'earn_100_xp', progress: 0, target: 100 },
    { id: 'weekly_mixed_3', title: 'Be active 4 days this week', xp: 70, type: 'active_4_days', progress: 0, target: 4 },
  ]
};

// Achievement Pool - 15+ achievements
const ACHIEVEMENT_POOL = [
  // Beginner achievements
  { id: 'ach_1', title: 'Journaling Initiate', icon: '🌟', xp: 50, condition: 'first_journal', description: 'Write your first journal entry' },
  { id: 'ach_2', title: 'First Steps', icon: '👣', xp: 25, condition: 'first_login', description: 'Login for the first time' },
  { id: 'ach_3', title: 'Mood Explorer', icon: '🎭', xp: 30, condition: 'first_mood', description: 'Log your first mood' },
  
  // Streak achievements
  { id: 'ach_4', title: '3-Day Warrior', icon: '⚔️', xp: 50, condition: '3_day_streak', description: 'Login 3 days in a row' },
  { id: 'ach_5', title: '7-Day Streak', icon: '🔥', xp: 100, condition: '7_day_streak', description: 'Login 7 days consecutively' },
  { id: 'ach_6', title: '30-Day Legend', icon: '🚀', xp: 500, condition: '30_day_streak', description: 'Maintain a 30-day streak' },
  { id: 'ach_7', title: '100-Day Master', icon: '�', xp: 1000, condition: '100_day_streak', description: 'Achieve 100 days streak' },
  
  // Journal achievements
  { id: 'ach_8', title: 'Dedicated Writer', icon: '✍️', xp: 100, condition: '10_journals', description: 'Write 10 journal entries' },
  { id: 'ach_9', title: 'Reflective Mind', icon: '🧠', xp: 200, condition: '50_journals', description: 'Write 50 journal entries' },
  { id: 'ach_10', title: 'Master Chronicler', icon: '📚', xp: 500, condition: '100_journals', description: 'Write 100 journal entries' },
  { id: 'ach_11', title: 'Wordsmith', icon: '📝', xp: 150, condition: '5000_words', description: 'Write 5000 words total' },
  
  // Guide achievements
  { id: 'ach_12', title: 'Guide Seeker', icon: '🧭', xp: 100, condition: '10_guides', description: 'Use guides 10 times' },
  { id: 'ach_13', title: 'Wisdom Collector', icon: '🎓', xp: 150, condition: '25_reflections', description: 'Collect 25 reflections' },
  { id: 'ach_14', title: 'Guide Master', icon: '🔮', xp: 200, condition: 'all_guides_used', description: 'Use all 4 guides' },
  { id: 'ach_15', title: 'Lore Explorer', icon: '📖', xp: 100, condition: '10_lore_read', description: 'Read 10 guide lore stories' },
  
  // Mood achievements
  { id: 'ach_16', title: 'Mood Mapper', icon: '🎨', xp: 100, condition: '20_moods', description: 'Log mood 20 times' },
  { id: 'ach_17', title: 'Emotional Journey', icon: '🌈', xp: 150, condition: '50_moods', description: 'Track 50 moods' },
  { id: 'ach_18', title: 'All Moods Logged', icon: '🎭', xp: 75, condition: 'all_moods', description: 'Experience all 5 mood types' },
  
  // XP achievements
  { id: 'ach_19', title: 'XP Hunter', icon: '⭐', xp: 100, condition: '500_xp', description: 'Earn 500 total XP' },
  { id: 'ach_20', title: 'XP Champion', icon: '💫', xp: 250, condition: '1000_xp', description: 'Earn 1000 total XP' },
  { id: 'ach_21', title: 'XP Legend', icon: '🌟', xp: 500, condition: '5000_xp', description: 'Earn 5000 total XP' },
  
  // Special achievements
  { id: 'ach_22', title: 'Early Bird', icon: '🌅', xp: 50, condition: 'morning_journal', description: 'Journal before 9 AM' },
  { id: 'ach_23', title: 'Night Owl', icon: '🦉', xp: 50, condition: 'night_journal', description: 'Journal after 10 PM' },
  { id: 'ach_24', title: 'Completionist', icon: '✅', xp: 200, condition: 'complete_all_weekly', description: 'Complete all weekly quests' },
  { id: 'ach_25', title: 'Quest Master', icon: '🏆', xp: 300, condition: '50_quests', description: 'Complete 50 quests total' },
];

// Helper function to get random quests from pool (always includes 1 login quest for daily)
function getRandomQuests(questArray, count, questType = 'daily', user = null) {
  const now = new Date();
  
  if (questType === 'daily') {
    // Check if daily login quest was already completed today
    const shouldIncludeLogin = user ? !user.isDailyLoginQuestCompletedToday() : true;
    
    if (shouldIncludeLogin) {
      // Include 1 login quest
      const loginQuests = questArray.filter(q => q.type === 'daily_login');
      const otherQuests = questArray.filter(q => q.type !== 'daily_login');
      
      // Get 1 random login quest
      const selectedLogin = loginQuests[Math.floor(Math.random() * loginQuests.length)];
      
      // Get (count - 1) other random quests
      const shuffledOthers = [...otherQuests].sort(() => 0.5 - Math.random());
      const selectedOthers = shuffledOthers.slice(0, count - 1);
      
      // Combine and return with startedAt timestamp
      return [selectedLogin, ...selectedOthers].map(quest => ({ 
        ...quest, 
        completed: false,
        startedAt: now,
        progress: 0
      }));
    } else {
      // Don't include login quest, get all quests from non-login pool
      const otherQuests = questArray.filter(q => q.type !== 'daily_login');
      const shuffledOthers = [...otherQuests].sort(() => 0.5 - Math.random());
      return shuffledOthers.slice(0, count).map(quest => ({ 
        ...quest, 
        completed: false,
        startedAt: now,
        progress: 0
      }));
    }
  } else {
    // For weekly quests, just random selection with startedAt timestamp
    const shuffled = [...questArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(quest => ({ 
      ...quest, 
      completed: false,
      startedAt: now,
      progress: 0
    }));
  }
}

// Helper function to get random achievements
function getRandomAchievements(count) {
  const shuffled = [...ACHIEVEMENT_POOL].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(ach => ({ ...ach, unlocked: false }));
}

/**
 * Validate if quest conditions are met before completion
 * @param {Object} user - User document
 * @param {Object} quest - Quest object
 * @returns {Object} - { success: boolean, message: string, requirement: string }
 */
async function validateQuestCompletion(user, quest) {
  const today = new Date().toISOString().split('T')[0];
  
  // Import JournalEntry model dynamically to avoid circular dependencies
  const JournalEntry = (await import('../models/journalEntryModel.js')).default;
  
  // Get quest start time (when it was assigned)
  const questStartTime = quest.startedAt ? new Date(quest.startedAt) : new Date(0); // Default to epoch if no startedAt
  
  switch (quest.type) {
    // Journal-related quests
    case 'journal_entry':
      {
        // Check if user has written a journal AFTER this quest was assigned
        const journalsAfterQuest = user.dailyJournals.journals.filter(j => 
          new Date(j.timestamp) >= questStartTime
        );
        
        if (journalsAfterQuest.length === 0) {
          return {
            success: false,
            message: 'You need to write a journal entry for this quest',
            requirement: 'Write at least one journal entry after receiving this quest'
          };
        }
        return { success: true };
      }
    
    // 100-word journal quest
    case 'journal_100_words':
      {
        // Check if user has written a 100+ word journal AFTER this quest was assigned
        const journalsAfterQuest = user.dailyJournals.journals.filter(j => 
          new Date(j.timestamp) >= questStartTime && j.wordCount >= 100
        );
        
        if (journalsAfterQuest.length === 0) {
          return {
            success: false,
            message: 'You need to write a journal entry with at least 100 words for this quest',
            requirement: 'Write a journal entry with 100+ words after receiving this quest'
          };
        }
        return { success: true };
      }
    
    // Mood-related quests
    case 'mood_log':
      {
        // Check if user has logged mood AFTER this quest was assigned
        // Mood is saved with journal, so check journals after quest start time
        const journalsAfterQuest = user.dailyJournals.journals.filter(j => 
          new Date(j.timestamp) >= questStartTime
        );
        
        if (journalsAfterQuest.length === 0) {
          return {
            success: false,
            message: 'You need to log your mood for this quest',
            requirement: 'Save a journal entry with your mood after receiving this quest'
          };
        }
        return { success: true };
      }
    
    // Daily login quests - automatically validated (already logged in)
    case 'daily_login':
      return { success: true };
    
    // Chat with specific guide quests - Check reflections array for guide name
    case 'chat_with_aethel':
      {
        const chatCount = await JournalEntry.countDocuments({
          user: user._id,
          'reflections.guideName': { $regex: /Aethel/i },
          createdAt: { $gte: questStartTime }
        });
        
        if (chatCount === 0) {
          return {
            success: false,
            message: 'Get a reflection from Aethel to complete this quest'
          };
        }
        return { success: true };
      }
    
    case 'chat_with_elara':
      {
        const chatCount = await JournalEntry.countDocuments({
          user: user._id,
          'reflections.guideName': { $regex: /Elara/i },
          createdAt: { $gte: questStartTime }
        });
        
        if (chatCount === 0) {
          return {
            success: false,
            message: 'Get a reflection from Elara to complete this quest'
          };
        }
        return { success: true };
      }
    
    case 'chat_with_kai':
      {
        const chatCount = await JournalEntry.countDocuments({
          user: user._id,
          'reflections.guideName': { $regex: /Kai/i },
          createdAt: { $gte: questStartTime }
        });
        
        if (chatCount === 0) {
          return {
            success: false,
            message: 'Get a reflection from Kai to complete this quest'
          };
        }
        return { success: true };
      }
    
    case 'chat_with_orion':
      {
        const chatCount = await JournalEntry.countDocuments({
          user: user._id,
          'reflections.guideName': { $regex: /Orion/i },
          createdAt: { $gte: questStartTime }
        });
        
        if (chatCount === 0) {
          return {
            success: false,
            message: 'Get a reflection from Orion to complete this quest'
          };
        }
        return { success: true };
      }
    
    // Reflection quests - Simple: just check if any journal exists after quest started
    case 'get_reflection':
      {
        const journalCount = await JournalEntry.countDocuments({
          user: user._id,
          createdAt: { $gte: questStartTime }
        });
        
        if (journalCount === 0) {
          return {
            success: false,
            message: 'Write a journal entry to complete this quest'
          };
        }
        return { success: true };
      }
    
    // Weekly quests with progress tracking
    case 'journal_5_days':
    case 'journal_7_days':
    case 'journal_3_days':
      const target = quest.target || 5;
      const startOfWeek = getStartOfWeek();
      const journalDaysCount = await JournalEntry.aggregate([
        {
          $match: {
            user: user._id,
            createdAt: { $gte: startOfWeek }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
          }
        },
        {
          $count: 'uniqueDays'
        }
      ]);
      
      const daysWithJournals = journalDaysCount[0]?.uniqueDays || 0;
      
      if (daysWithJournals < target) {
        return {
          success: false,
          message: `You need to journal on ${target} different days this week`,
          requirement: `Progress: ${daysWithJournals}/${target} days`
        };
      }
      return { success: true };
    
    case 'write_500_words':
      const startOfWeekForWords = getStartOfWeek();
      const entries = await JournalEntry.find({
        user: user._id,
        createdAt: { $gte: startOfWeekForWords }
      });
      
      const totalWords = entries.reduce((sum, entry) => {
        return sum + (entry.content?.split(/\s+/).length || 0);
      }, 0);
      
      if (totalWords < 500) {
        return {
          success: false,
          message: 'You need to write 500 words total this week',
          requirement: `Progress: ${totalWords}/500 words`
        };
      }
      return { success: true };
    
    case 'mood_5_times':
    case 'mood_7_times':
    case 'mood_3_times':
      const moodTarget = quest.target || 5;
      const startOfWeekForMood = getStartOfWeek();
      const moodCount = await JournalEntry.countDocuments({
        user: user._id,
        mood: { $exists: true, $ne: null },
        createdAt: { $gte: startOfWeekForMood }
      });
      
      if (moodCount < moodTarget) {
        return {
          success: false,
          message: `You need to log your mood ${moodTarget} times this week`,
          requirement: `Progress: ${moodCount}/${moodTarget} moods logged`
        };
      }
      return { success: true };
    
    // Login streak quests - STRICT VALIDATION
    case 'login_5_days':
    case 'login_7_days':
    case 'login_3_days':
      const loginTarget = quest.target || 5;
      
      // Get login dates this week
      const loginDatesThisWeek = user.loginDatesThisWeek || [];
      const uniqueLoginDays = loginDatesThisWeek.length;
      
      if (uniqueLoginDays < loginTarget) {
        return {
          success: false,
          message: `You need to login on ${loginTarget} different days this week`,
          requirement: `Progress: ${uniqueLoginDays}/${loginTarget} days`
        };
      }
      return { success: true };
    
    // Reflection count quests
    case 'get_5_reflections':
    case 'get_10_reflections':
    case 'get_3_reflections':
      const reflectionTarget = quest.target || 5;
      const startOfWeekForReflections = getStartOfWeek();
      const reflectionCount = await JournalEntry.countDocuments({
        user: user._id,
        'reflections.0': { $exists: true },
        createdAt: { $gte: startOfWeekForReflections }
      });
      
      if (reflectionCount < reflectionTarget) {
        return {
          success: false,
          message: `You need to get ${reflectionTarget} reflections this week`,
          requirement: `Progress: ${reflectionCount}/${reflectionTarget} reflections`
        };
      }
      return { success: true };
    
    // Active days quest - STRICT VALIDATION
    case 'active_4_days':
      const activeDaysTarget = quest.target || 4;
      const startOfWeekForActive = getStartOfWeek();
      
      // Get unique days with any activity (journal entries OR logins)
      const journalActivityDays = await JournalEntry.aggregate([
        {
          $match: {
            user: user._id,
            createdAt: { $gte: startOfWeekForActive }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
          }
        }
      ]);
      
      // Combine journal activity days and login days
      const journalDays = new Set(journalActivityDays.map(d => d._id));
      const loginDays = new Set(user.loginDatesThisWeek || []);
      
      // Merge both sets to get all unique active days
      const allActiveDays = new Set([...journalDays, ...loginDays]);
      const activeDaysCount = allActiveDays.size;
      
      if (activeDaysCount < activeDaysTarget) {
        return {
          success: false,
          message: `You need to be active on ${activeDaysTarget} different days this week`,
          requirement: `Progress: ${activeDaysCount}/${activeDaysTarget} active days`
        };
      }
      return { success: true };
    
    // For quests without specific validation yet, allow completion
    // TODO: Add validation for remaining quest types
    default:
      return { success: true };
  }
}

/**
 * Helper function to get start of current week (Monday)
 */
function getStartOfWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday start
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Helper function to add a new random achievement when one is unlocked
 * Maintains: unlocked achievements + 3 locked achievements
 */
function revealNewAchievement(user) {
  // Count unlocked achievements
  const unlockedCount = user.achievements.filter(a => a.unlocked).length;
  const lockedCount = user.achievements.filter(a => !a.unlocked).length;
  
  // We want to maintain: unlocked + 3 locked
  // So if we have less than 3 locked, add one
  if (lockedCount < 3 && user.achievements.length < ACHIEVEMENT_POOL.length) {
    const currentAchievementIds = user.achievements.map(a => a.id);
    const availableAchievements = ACHIEVEMENT_POOL.filter(
      a => !currentAchievementIds.includes(a.id)
    );
    
    if (availableAchievements.length > 0) {
      const newAchievement = { 
        ...availableAchievements[Math.floor(Math.random() * availableAchievements.length)],
        unlocked: false 
      };
      user.achievements.push(newAchievement);
      console.log(`🆕 New achievement revealed: ${newAchievement.title} (Unlocked: ${unlockedCount}, Locked: ${lockedCount + 1})`);
      return true;
    }
  }
  return false;
}

/**
 * @desc    Initialize XP system for user
 * @route   POST /api/xp/initialize
 * @access  Private
 */
const initializeXPSystem = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Initialize quests with random selection if not already set
    if (!user.quests.daily || user.quests.daily.length === 0) {
      user.quests.daily = getRandomQuests(QUEST_POOL.daily, 3, 'daily', user); // 3 daily quests
      user.quests.weekly = getRandomQuests(QUEST_POOL.weekly, 3, 'weekly', user); // 3 weekly quests
    }
    
    // Initialize achievements with random selection if not already set
    if (!user.achievements || user.achievements.length === 0) {
      user.achievements = getRandomAchievements(3); // Start with 3 locked achievements
    }

    await user.save();
    
    // Filter achievements to show only unlocked + 3 locked
    const achievementsToDisplay = filterAchievementsToDisplay(user.achievements);

    res.json({
      success: true,
      data: {
        totalXP: user.totalXP,
        quests: user.quests,
        achievements: achievementsToDisplay,
        consecutiveLoginDays: user.consecutiveLoginDays,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get user XP data
 * @route   GET /api/xp
 * @access  Private
 */
const getXPData = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Calculate progress for all quests dynamically
    const questsWithProgress = await calculateQuestProgress(user);
    
    // Filter achievements to show only unlocked + 3 locked
    const achievementsToDisplay = filterAchievementsToDisplay(user.achievements);

    res.json({
      success: true,
      data: {
        totalXP: user.totalXP,
        quests: questsWithProgress,
        achievements: achievementsToDisplay,
        consecutiveLoginDays: user.consecutiveLoginDays,
        lastLoginDate: user.lastLoginDate,
        totalQuestsCompleted: user.questProgress?.questsCompleted || 0,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper function to filter achievements to show only unlocked + 3 locked
 */
function filterAchievementsToDisplay(achievements) {
  // Separate unlocked and locked achievements
  const unlocked = achievements.filter(a => a.unlocked);
  const locked = achievements.filter(a => !a.unlocked);
  
  // Take only first 3 locked achievements
  const lockedToShow = locked.slice(0, 3);
  
  // Combine: all unlocked + 3 locked
  return [...unlocked, ...lockedToShow];
}

/**
 * Calculate current progress for all quests
 */
async function calculateQuestProgress(user) {
  const JournalEntry = (await import('../models/journalEntryModel.js')).default;
  const startOfWeek = getStartOfWeek();
  
  // Clone the quests to avoid modifying the original
  const quests = {
    daily: [...(user.quests.daily || [])],
    weekly: [...(user.quests.weekly || [])]
  };
  
  // Update progress for weekly quests
  for (let quest of quests.weekly) {
    if (quest.completed) continue; // Skip completed quests
    
    // Use quest.startedAt if available, otherwise fall back to startOfWeek
    const questStartTime = quest.startedAt ? new Date(quest.startedAt) : startOfWeek;
    
    switch (quest.type) {
      case 'journal_5_days':
      case 'journal_7_days':
      case 'journal_3_days':
        const journalDaysCount = await JournalEntry.aggregate([
          {
            $match: {
              user: user._id,
              createdAt: { $gte: questStartTime }
            }
          },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
            }
          },
          {
            $count: 'uniqueDays'
          }
        ]);
        quest.progress = journalDaysCount[0]?.uniqueDays || 0;
        break;
        
      case 'write_500_words':
        const entries = await JournalEntry.find({
          user: user._id,
          createdAt: { $gte: questStartTime }
        });
        const totalWords = entries.reduce((sum, entry) => {
          return sum + (entry.content?.split(/\s+/).length || 0);
        }, 0);
        quest.progress = totalWords;
        quest.target = 500;
        break;
        
      case 'mood_5_times':
      case 'mood_7_times':
      case 'mood_3_times':
        const moodCount = await JournalEntry.countDocuments({
          user: user._id,
          mood: { $exists: true, $ne: null },
          createdAt: { $gte: questStartTime }
        });
        quest.progress = moodCount;
        break;
        
      case 'login_5_days':
      case 'login_7_days':
      case 'login_3_days':
        {
          // For login quests, count unique login days since quest started
          const loginDatesThisWeek = user.loginDatesThisWeek || [];
          const questStartDate = questStartTime.toISOString().split('T')[0];
          const loginsAfterQuestStart = loginDatesThisWeek.filter(date => date >= questStartDate);
          quest.progress = loginsAfterQuestStart.length;
        }
        break;
        
      case 'get_5_reflections':
      case 'get_10_reflections':
      case 'get_3_reflections':
        const reflectionCount = await JournalEntry.countDocuments({
          user: user._id,
          'reflections.0': { $exists: true },
          createdAt: { $gte: questStartTime }
        });
        quest.progress = reflectionCount;
        break;
      
      case 'active_4_days':
        {
          // Calculate active days (journal entries OR logins) since quest started
          const journalActivityDays = await JournalEntry.aggregate([
            {
              $match: {
                user: user._id,
                createdAt: { $gte: questStartTime }
              }
            },
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
              }
            }
          ]);
          
          // Combine journal activity days and login days (only after quest started)
          const journalDays = new Set(journalActivityDays.map(d => d._id));
          const questStartDate = questStartTime.toISOString().split('T')[0];
          const loginDaysAfterStart = (user.loginDatesThisWeek || []).filter(date => date >= questStartDate);
          const loginDays = new Set(loginDaysAfterStart);
          const allActiveDays = new Set([...journalDays, ...loginDays]);
          
          quest.progress = allActiveDays.size;
          quest.target = 4;
        }
        break;
    }
  }
  
  return quests;
}

/**
 * @desc    Complete a quest and replace with new one
 * @route   POST /api/xp/quest/complete
 * @access  Private
 */
const completeQuest = async (req, res, next) => {
  try {
    const { questId, questType } = req.body;
    
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Find the quest
    const questList = user.quests[questType];
    const quest = questList.find(q => q.id === questId);
    
    if (!quest) {
      return res.status(404).json({
        success: false,
        message: 'Quest not found',
      });
    }

    // Check if quest is already completed
    if (quest.completed) {
      return res.status(400).json({
        success: false,
        message: 'Quest already completed',
      });
    }

    // ⚠️ VALIDATION: Check if quest conditions are met
    const isValid = await validateQuestCompletion(user, quest);
    
    if (!isValid.success) {
      return res.status(400).json({
        success: false,
        message: isValid.message || 'Quest conditions not met',
        requirement: isValid.requirement,
      });
    }

    // If this is a daily login quest, mark it as completed to prevent it from appearing again today
    if (quest.type === 'daily_login') {
      user.markDailyLoginQuestCompleted();
    }

    // Complete the quest and earn XP
    const xpEarned = user.completeQuest(questId, questType);
    
    if (xpEarned > 0) {
      // Track quest completion count
      user.incrementQuestCount();
      
      // Find the completed quest
      const completedQuestIndex = questList.findIndex(q => q.id === questId);
      
      if (completedQuestIndex !== -1) {
        // Get the completed quest's ID to avoid duplicates
        const completedQuestIds = questList
          .filter(q => q.completed)
          .map(q => q.id);
        
        // Get available quests (not currently in user's list)
        const currentQuestIds = questList.map(q => q.id);
        let availableQuests = QUEST_POOL[questType].filter(
          q => !currentQuestIds.includes(q.id)
        );
        
        // For daily quests, exclude login quests from replacement pool
        if (questType === 'daily') {
          availableQuests = availableQuests.filter(q => q.type !== 'daily_login');
        }
        
        // If there are available quests, replace the completed one
        if (availableQuests.length > 0) {
          const newQuest = { ...availableQuests[Math.floor(Math.random() * availableQuests.length)] };
          newQuest.completed = false;
          newQuest.progress = 0; // Always reset progress to 0 for new quest
          newQuest.startedAt = new Date(); // Set fresh start time
          
          // Replace the completed quest with a new one
          questList[completedQuestIndex] = newQuest;
        }
        // If no available quests, keep the completed one (it will show as completed)
      }
    }
    
    await user.save();

    // Calculate updated progress for all quests
    const questsWithProgress = await calculateQuestProgress(user);
    
    // Filter achievements to show only unlocked + 3 locked
    const achievementsToDisplay = filterAchievementsToDisplay(user.achievements);

    res.json({
      success: true,
      message: xpEarned > 0 ? `Quest completed! Earned ${xpEarned} XP. New quest unlocked!` : 'Quest already completed',
      data: {
        xpEarned,
        totalXP: user.totalXP,
        quests: questsWithProgress,
        achievements: achievementsToDisplay,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Unlock an achievement
 * @route   POST /api/xp/achievement/unlock
 * @access  Private
 */
const unlockAchievement = async (req, res, next) => {
  try {
    const { achievementId } = req.body;
    
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const xpEarned = user.unlockAchievement(achievementId);
    
    // If achievement was successfully unlocked, reveal a new one
    if (xpEarned > 0) {
      revealNewAchievement(user);
    }
    
    await user.save();
    
    // Filter achievements to show only unlocked + 3 locked
    const achievementsToDisplay = filterAchievementsToDisplay(user.achievements);

    res.json({
      success: true,
      message: xpEarned > 0 ? `Achievement unlocked! Earned ${xpEarned} XP` : 'Achievement already unlocked',
      data: {
        xpEarned,
        totalXP: user.totalXP,
        achievements: achievementsToDisplay,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Track daily login and automatically award XP
 * @route   POST /api/xp/login
 * @access  Private
 */
const trackDailyLogin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    console.log('📍 Tracking login for user:', user.email);
    
    const today = new Date().toISOString().split('T')[0];
    const alreadyLoggedInToday = user.lastLoginDate === today;
    
    console.log('📅 Last login:', user.lastLoginDate, '| Today:', today, '| Already logged in:', alreadyLoggedInToday);

    let loginXP = 0;
    let questCompleted = false;
    
    // Only process login quest if this is the first login today
    if (!alreadyLoggedInToday) {
      // Track the login (updates streak and lastLoginDate)
      const streak = user.trackLogin();
      console.log('🔥 Login streak:', streak);
      
      // Find and automatically complete daily login quest
      const dailyLoginQuest = user.quests.daily.find(q => q.type === 'daily_login' && !q.completed);
      
      console.log('🎯 Found login quest:', dailyLoginQuest);
      
      if (dailyLoginQuest) {
        // Complete the quest and get XP
        loginXP = user.completeQuest(dailyLoginQuest.id, 'daily');
        questCompleted = true;
        
        console.log(`✅ Quest completed! XP earned: ${loginXP}`);
        console.log(`💰 Total XP now: ${user.totalXP}`);
        
        // Replace with a new random quest (excluding login quests since we always keep 1)
        const questIndex = user.quests.daily.findIndex(q => q.id === dailyLoginQuest.id);
        if (questIndex !== -1) {
          const otherQuests = QUEST_POOL.daily.filter(q => q.type !== 'daily_login');
          const currentQuestIds = user.quests.daily.map(q => q.id);
          const availableQuests = otherQuests.filter(q => !currentQuestIds.includes(q.id));
          
          if (availableQuests.length > 0) {
            const newQuest = { ...availableQuests[Math.floor(Math.random() * availableQuests.length)] };
            newQuest.completed = false;
            newQuest.progress = 0; // Reset progress for new quest
            newQuest.startedAt = new Date(); // Fresh start time
            user.quests.daily[questIndex] = newQuest;
            console.log('🔄 Replaced with new quest:', newQuest.title);
          }
        }
      } else {
        console.log('⚠️ No incomplete login quest found');
      }
      
      // Check for streak achievements
      let achievementUnlocked = false;
      if (streak === 3) {
        const xp = user.unlockAchievement('ach_4'); // 3-day streak
        if (xp > 0) achievementUnlocked = true;
      } else if (streak === 7) {
        const xp = user.unlockAchievement('ach_5'); // 7-day streak
        if (xp > 0) achievementUnlocked = true;
      } else if (streak === 30) {
        const xp = user.unlockAchievement('ach_6'); // 30-day streak
        if (xp > 0) achievementUnlocked = true;
      } else if (streak === 100) {
        const xp = user.unlockAchievement('ach_7'); // 100-day streak
        if (xp > 0) achievementUnlocked = true;
      }

      // Check first login achievement
      if (user.consecutiveLoginDays === 1) {
        const xp = user.unlockAchievement('ach_2'); // First Steps
        if (xp > 0) achievementUnlocked = true;
      }
      
      // Reveal new achievement if one was unlocked
      if (achievementUnlocked) {
        revealNewAchievement(user);
      }
    } else {
      console.log('⏭️ User already logged in today, skipping login quest');
    }

    await user.save();
    
    // Filter achievements to show only unlocked + 3 locked
    const achievementsToDisplay = filterAchievementsToDisplay(user.achievements);

    res.json({
      success: true,
      message: questCompleted ? `Welcome back! +${loginXP} XP claimed!` : 'Login tracked',
      data: {
        consecutiveLoginDays: user.consecutiveLoginDays,
        totalXP: user.totalXP,
        loginXP: loginXP,
        questCompleted: questCompleted,
        quests: user.quests,
        achievements: achievementsToDisplay,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Track guide usage
 * @route   POST /api/xp/guide/track
 * @access  Private
 */
const trackGuideUsage = async (req, res, next) => {
  try {
    const { guideId } = req.body;
    
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.trackGuideUsage(guideId);
    
    // Check guide-related quests
    const totalGuideUses = Array.from(user.guideUsageCount.values()).reduce((sum, count) => sum + count, 0);
    
    if (totalGuideUses >= 10) {
      user.unlockAchievement('ach_5'); // Guide Seeker achievement
    }

    await user.save();

    res.json({
      success: true,
      data: {
        totalXP: user.totalXP,
        achievements: user.achievements,
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reset daily/weekly quests with new random quests
 * @route   POST /api/xp/quests/reset
 * @access  Private
 */
const resetQuests = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const today = new Date().toISOString().split('T')[0];
    let questsChanged = false;
    
    // Reset daily quests only when it's a new day (24 hours passed)
    // Individual quests are replaced when completed
    const isNewDay = user.questsLastReset.daily !== today;
    
    if (isNewDay) {
      console.log(`🔄 Resetting daily quests - New day detected`);
      user.quests.daily = getRandomQuests(QUEST_POOL.daily, 3, 'daily', user);
      user.questsLastReset.daily = today;
      questsChanged = true;
    }

    // Reset weekly quests only when it's a new week
    // Individual quests are replaced when completed
    const currentWeek = getWeekNumber(new Date());
    const isNewWeek = user.questsLastReset.weekly !== currentWeek;
    
    if (isNewWeek) {
      console.log(`🔄 Resetting weekly quests - New week detected`);
      user.quests.weekly = getRandomQuests(QUEST_POOL.weekly, 3, 'weekly', user);
      user.questsLastReset.weekly = currentWeek;
      questsChanged = true;
    }

    if (questsChanged) {
      await user.save();
      console.log('✅ Quests reset and saved');
    }

    res.json({
      success: true,
      data: {
        quests: user.quests,
        resetInfo: {
          dailyReset: isNewDay || allDailyQuestsCompleted,
          weeklyReset: isNewWeek || allWeeklyQuestsCompleted
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Track route visit for quest validation
 * @route   POST /api/xp/track-route
 * @access  Private
 */
const trackRouteVisit = async (req, res, next) => {
  try {
    const { routeName } = req.body;
    
    if (!routeName) {
      return res.status(400).json({
        success: false,
        message: 'Route name is required',
      });
    }

    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Validate route name (allow main routes and individual guide routes)
    const validRoutes = [
      'dashboard', 
      'journal', 
      'guides', 
      'profile', 
      'progress',
      'guide-aethel', 
      'guide-elara', 
      'guide-kai', 
      'guide-orion'
    ];
    const normalizedRoute = routeName.toLowerCase();
    
    if (!validRoutes.includes(normalizedRoute)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid route name. Must be one of: dashboard, journal, guides, profile, progress, guide-aethel, guide-elara, guide-kai, guide-orion',
      });
    }

    // Track the route visit
    user.trackRouteVisit(normalizedRoute);
    await user.save();

    // Check if this visit unlocked any quests
    const hasVisitedGuides = user.hasVisitedGuidesToday();
    const hasVisitedAllGuides = user.hasVisitedAllGuidesToday();

    res.json({
      success: true,
      message: `Route visit tracked: ${normalizedRoute}`,
      data: {
        visitedRoutes: user.dailyRouteVisits.routes,
        hasVisitedGuides,
        hasVisitedAllGuides,
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get week number
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return `${date.getFullYear()}-W${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
}

export {
  initializeXPSystem,
  getXPData,
  completeQuest,
  unlockAchievement,
  trackDailyLogin,
  trackGuideUsage,
  resetQuests,
  trackRouteVisit,
};
