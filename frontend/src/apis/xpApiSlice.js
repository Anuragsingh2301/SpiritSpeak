import { APISlice } from './APISlice';

export const xpApiSlice = APISlice.injectEndpoints({
  endpoints: (builder) => ({
    // Initialize XP system
    initializeXP: builder.mutation({
      query: () => ({
        url: '/api/xp/initialize',
        method: 'POST',
      }),
    }),

    // Get XP data
    getXPData: builder.query({
      query: () => '/api/xp',
      providesTags: ['XP'],
    }),

    // Complete quest
    completeQuest: builder.mutation({
      query: ({ questId, questType }) => ({
        url: '/api/xp/quest/complete',
        method: 'POST',
        body: { questId, questType },
      }),
      invalidatesTags: ['XP'],
    }),

    // Unlock achievement
    unlockAchievement: builder.mutation({
      query: ({ achievementId }) => ({
        url: '/api/xp/achievement/unlock',
        method: 'POST',
        body: { achievementId },
      }),
      invalidatesTags: ['XP'],
    }),

    // Track daily login
    trackDailyLogin: builder.mutation({
      query: () => ({
        url: '/api/xp/login',
        method: 'POST',
      }),
      invalidatesTags: ['XP'],
    }),

    // Track guide usage
    trackGuideUsage: builder.mutation({
      query: ({ guideId }) => ({
        url: '/api/xp/guide/track',
        method: 'POST',
        body: { guideId },
      }),
      invalidatesTags: ['XP'],
    }),

    // Reset quests
    resetQuests: builder.mutation({
      query: () => ({
        url: '/api/xp/quests/reset',
        method: 'POST',
      }),
      invalidatesTags: ['XP'],
    }),
  }),
});

export const {
  useInitializeXPMutation,
  useGetXPDataQuery,
  useCompleteQuestMutation,
  useUnlockAchievementMutation,
  useTrackDailyLoginMutation,
  useTrackGuideUsageMutation,
  useResetQuestsMutation,
} = xpApiSlice;
