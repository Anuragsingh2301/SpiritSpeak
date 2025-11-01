import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  useTrackDailyLoginMutation, 
  useCompleteQuestMutation,
  useUnlockAchievementMutation 
} from '../apis/xpApiSlice';
import { setXPData } from '../features/xpSlice';

/**
 * Custom hook to automatically track and complete quests based on user actions
 */
export const useQuestTracking = () => {
  const dispatch = useDispatch();
  const xpData = useSelector((state) => state.xp);
  
  const [trackDailyLogin] = useTrackDailyLoginMutation();
  const [completeQuest] = useCompleteQuestMutation();
  const [unlockAchievement] = useUnlockAchievementMutation();

  // Track daily login on mount
  useEffect(() => {
    const trackLogin = async () => {
      try {
        console.log('🔍 Tracking daily login...');
        const result = await trackDailyLogin().unwrap();
        console.log('✅ Login tracking result:', result);
        
        if (result.success) {
          dispatch(setXPData({
            totalXP: result.data.totalXP,
            quests: result.data.quests,
            achievements: result.data.achievements,
            consecutiveLoginDays: result.data.consecutiveLoginDays,
          }));
          
          // Show notification if quest was completed and XP was earned
          if (result.data.questCompleted && result.data.loginXP > 0) {
            console.log(`🎉 ${result.message} (+${result.data.loginXP} XP)`);
            alert(`🎉 ${result.message}`);
          }
        }
      } catch (error) {
        console.error('❌ Failed to track daily login:', error);
      }
    };

    trackLogin();
  }, [trackDailyLogin, dispatch]);

  // Function to track journal entry creation
  const trackJournalEntry = async () => {
    try {
      // Find the journal entry quest
      const journalQuest = xpData.quests?.daily?.find(
        q => q.type === 'journal_entry' && !q.completed
      );

      if (journalQuest) {
        const result = await completeQuest({ 
          questId: journalQuest.id, 
          questType: 'daily' 
        }).unwrap();
        
        if (result.success) {
          dispatch(setXPData({
            totalXP: result.data.totalXP,
            quests: result.data.quests,
          }));
          return result.data.xpEarned;
        }
      }
    } catch (error) {
      console.error('Failed to track journal entry:', error);
    }
    return 0;
  };

  // Function to track mood log
  const trackMoodLog = async () => {
    try {
      // Find the mood log quest
      const moodQuest = xpData.quests?.daily?.find(
        q => q.type === 'mood_log' && !q.completed
      );

      if (moodQuest) {
        const result = await completeQuest({ 
          questId: moodQuest.id, 
          questType: 'daily' 
        }).unwrap();
        
        if (result.success) {
          dispatch(setXPData({
            totalXP: result.data.totalXP,
            quests: result.data.quests,
          }));
          return result.data.xpEarned;
        }
      }

      // Also check for weekly mood quest progress
      const weeklyMoodQuest = xpData.quests?.weekly?.find(
        q => q.type === 'mood_5_times' && !q.completed
      );

      if (weeklyMoodQuest) {
        // This would require backend support to track progress
        // For now, we'll handle completion when they reach the target
      }
    } catch (error) {
      console.error('Failed to track mood log:', error);
    }
    return 0;
  };

  // Function to check and unlock achievements
  const checkAchievements = async (journalCount, guideCount, moodCount, streak) => {
    try {
      const achievements = xpData.achievements || [];
      
      // Check first journal achievement
      if (journalCount >= 1) {
        const firstJournalAch = achievements.find(a => a.condition === 'first_journal' && !a.unlocked);
        if (firstJournalAch) {
          await unlockAchievement({ achievementId: firstJournalAch.id });
        }
      }

      // Check 50 journals achievement
      if (journalCount >= 50) {
        const reflectiveMindAch = achievements.find(a => a.condition === '50_journals' && !a.unlocked);
        if (reflectiveMindAch) {
          await unlockAchievement({ achievementId: reflectiveMindAch.id });
        }
      }

      // Check guide achievements
      if (guideCount >= 10) {
        const guideSeekerAch = achievements.find(a => a.condition === '10_guides' && !a.unlocked);
        if (guideSeekerAch) {
          await unlockAchievement({ achievementId: guideSeekerAch.id });
        }
      }

      // Check mood achievements
      if (moodCount >= 20) {
        const moodMapperAch = achievements.find(a => a.condition === '20_moods' && !a.unlocked);
        if (moodMapperAch) {
          await unlockAchievement({ achievementId: moodMapperAch.id });
        }
      }

      // Streak achievements are handled by backend
    } catch (error) {
      console.error('Failed to check achievements:', error);
    }
  };

  return {
    trackJournalEntry,
    trackMoodLog,
    checkAchievements,
  };
};
