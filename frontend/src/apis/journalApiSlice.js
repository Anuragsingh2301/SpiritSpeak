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
      invalidatesTags: [journalTag, 'Streak'],
    }),

    getReflection: builder.mutation({
      query: (data) => ({
        url: "/api/journal/reflect", // Matches backend: POST /api/journal/reflect
        method: "POST",
        body: data, // { content: "...", guideId: "..." }
      }),
    }),

    getStreak: builder.query({
      query: () => "/api/journal/streak",
      providesTags: ["Streak"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetJournalEntriesQuery,
  useCreateJournalEntryMutation,
  useGetReflectionMutation,
  useGetStreakQuery,
} = journalApiSlice;