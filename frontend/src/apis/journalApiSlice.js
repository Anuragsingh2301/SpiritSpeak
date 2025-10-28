import { APISlice } from './APISlice';

// Define the 'Journal' tag
const journalTag = { type: 'Journal', id: 'LIST' };

export const journalApiSlice = APISlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get All Journal Entries ---
    getJournalEntries: builder.query({
      query: () => ({
        url: "/api/journal", // Matches backend: GET /api/journal
        method: "GET",
      }),
      // Provides the 'Journal' tag for caching
      providesTags: [journalTag],
    }),

    // --- Create New Journal Entry ---
    createJournalEntry: builder.mutation({
      query: (entryData) => ({
        url: "/api/journal", // Matches backend: POST /api/journal
        method: "POST",
        body: entryData, // { content: "...", mood: "..." }
      }),
      // Invalidates the 'Journal' tag, forcing a refetch of all entries
      invalidatesTags: [journalTag, 'Streak', 'Calendar'],
    }),

    getReflection: builder.mutation({
      query: (data) => ({
        url: "/api/journal/reflect", // Matches backend: POST /api/journal/reflect
        method: "POST",
        body: data, // { content: "...", guideId: "..." }
      }),
      // Invalidate reflection attempts to refetch the updated count
      invalidatesTags: ['ReflectionAttempts'],
    }),

    getStreak: builder.query({
      query: () => "/api/journal/streak",
      providesTags: ["Streak"],
    }),

    getReflectionAttempts: builder.query({
      query: () => "/api/journal/reflection-attempts",
      providesTags: ["ReflectionAttempts"],
    }),

    getCalendarData: builder.query({
      query: () => "/api/journal/calendar",
      providesTags: ["Calendar"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetJournalEntriesQuery,
  useCreateJournalEntryMutation,
  useGetReflectionMutation,
  useGetStreakQuery,
  useGetReflectionAttemptsQuery,
  useGetCalendarDataQuery,
} = journalApiSlice;