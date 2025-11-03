// MOODS - Used in Journal component for mood selection
export const moods = [
    { name: 'Happy', icon: '😊', color: 'bg-green-100 text-green-800 ring-green-300' },
    { name: 'Calm', icon: '😌', color: 'bg-blue-100 text-blue-800 ring-blue-300' },
    { name: 'Okay', icon: '😐', color: 'bg-yellow-100 text-yellow-800 ring-yellow-300' },
    { name: 'Anxious', icon: '😟', color: 'bg-purple-100 text-purple-800 ring-purple-300' },
    { name: 'Sad', icon: '😢', color: 'bg-gray-100 text-gray-800 ring-gray-300' }
];

// LEAGUE DATA - Used for gamification features
export const leagueData = [
    { name: "Spark", xp: 0, icon: '✨', color: 'text-amber-500' },
    { name: "Dreamer", xp: 500, icon: '☁️', color: 'text-sky-500' },
    { name: "Storyteller", xp: 1500, icon: '📖', color: 'text-indigo-500' },
    { name: "Sage", xp: 3000, icon: '🌿', color: 'text-emerald-500' },
    { name: "Luminary", xp: 5000, icon: '☀️', color: 'text-yellow-400' }
];

// Function to get current league based on XP
export const getCurrentLeague = (xp) => {
    const currentLeagueIndex = leagueData.slice().reverse().findIndex(l => xp >= l.xp);
    return leagueData[leagueData.length - 1 - currentLeagueIndex] || leagueData[0];
};

// Function to get next league based on XP
export const getNextLeague = (xp) => {
    const currentLeagueIndex = leagueData.slice().reverse().findIndex(l => xp >= l.xp);
    const nextIndex = leagueData.length - currentLeagueIndex;
    return leagueData[nextIndex] || null;
};

export const quests = {
    daily: [
        { id: 1, title: 'Write one entry', xp: 20, completed: true },
        { id: 2, title: 'Log your mood today', xp: 5, completed: false },
    ],
    weekly: [
        { id: 3, title: 'Journal 5 days this week', xp: 100, completed: false },
        { id: 4, title: 'Try a new guide', xp: 50, completed: true },
        { id: 5, title: 'Log your mood 5 times', xp: 25, completed: false }
    ]
};

export const achievements = [
    { id: 1, title: 'Journaling Initiate', icon: '🌟', xp: 50, unlocked: true },
    { id: 2, title: '7-Day Streak', icon: '🔥', xp: 100, unlocked: true },
    { id: 3, title: '30-Day Streak', icon: '🚀', xp: 500, unlocked: false },
    { id: 4, title: 'Reflective Mind', icon: '🧠', xp: 200, unlocked: false },
    { id: 5, title: 'Guide Seeker', icon: '🧭', xp: 100, unlocked: false },
    { id: 6, title: 'Mood Mapper', icon: '🎨', xp: 100, unlocked: false }
];

export const monthlyBadges = [
    { month: 'September', year: 2025, unlocked: true },
    { month: 'October', year: 2025, unlocked: false },
    { month: 'November', year: 2025, unlocked: false },
    { month: 'December', year: 2025, unlocked: false },
];