import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalXP: 0,
  currentLevel: 'Spark',
  quests: {
    daily: [],
    weekly: []
  },
  achievements: [],
  lastLoginDate: null,
  consecutiveLoginDays: 0,
  dailyReflectionCount: 0,
  guideUsageCount: {}
};

const xpSlice = createSlice({
  name: 'xp',
  initialState,
  reducers: {
    // Set initial XP data from backend
    setXPData: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },

    // Add XP to total
    addXP: (state, action) => {
      state.totalXP += action.payload;
    },

    // Complete a quest
    completeQuest: (state, action) => {
      const { questId, questType, xp } = action.payload;
      
      // Find and update quest
      const questList = state.quests[questType];
      const questIndex = questList.findIndex(q => q.id === questId);
      
      if (questIndex !== -1 && !questList[questIndex].completed) {
        questList[questIndex].completed = true;
        state.totalXP += xp;
      }
    },

    // Unlock achievement
    unlockAchievement: (state, action) => {
      const { achievementId, xp } = action.payload;
      
      const achievement = state.achievements.find(a => a.id === achievementId);
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        state.totalXP += xp;
      }
    },

    // Update quests array
    updateQuests: (state, action) => {
      state.quests = action.payload;
    },

    // Update achievements array
    updateAchievements: (state, action) => {
      state.achievements = action.payload;
    },

    // Track daily login
    recordLogin: (state) => {
      const today = new Date().toISOString().split('T')[0];
      
      if (state.lastLoginDate !== today) {
        // Check if it's consecutive
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (state.lastLoginDate === yesterdayStr) {
          state.consecutiveLoginDays += 1;
        } else {
          state.consecutiveLoginDays = 1;
        }
        
        state.lastLoginDate = today;
      }
    },

    // Track reflection count
    incrementReflectionCount: (state) => {
      state.dailyReflectionCount += 1;
    },

    // Track guide usage
    trackGuideUsage: (state, action) => {
      const guideId = action.payload;
      state.guideUsageCount[guideId] = (state.guideUsageCount[guideId] || 0) + 1;
    },

    // Reset daily/weekly quests
    resetQuests: (state, action) => {
      const { questType, newQuests } = action.payload;
      state.quests[questType] = newQuests;
    },

    // Reset XP data (for logout)
    resetXPData: () => initialState
  }
});

export const {
  setXPData,
  addXP,
  completeQuest,
  unlockAchievement,
  updateQuests,
  updateAchievements,
  recordLogin,
  incrementReflectionCount,
  trackGuideUsage,
  resetQuests,
  resetXPData
} = xpSlice.actions;

export default xpSlice.reducer;
