import { KaiGraphic, ElaraGraphic, OrionGraphic, AethelGraphic } from './assets/graphics';

export const guidesData = [
    {
        id: 'kai',
        color: 'bg-sky-100',
        textColor: 'text-sky-800',
        tier: 'free',
        name: 'Kai, The Stoic Companion',
        graphic: KaiGraphic,
        lore: "Kai's wisdom was not learned in a library, but forged on a storm-battered coast. As the keeper of an ancient lighthouse, he learned that one cannot calm the sea, but you can tend to your own light, ensuring it never falters. He teaches that true strength is not the absence of hardship, but the endurance to shine through it.",
        dailyStory: { title: "Chapter 1: The Unmovable Rock", content: "Kai learned his first lesson not from a person, but from a single rock on the coast. For years, he watched waves crash against it, chipping away tiny pieces, yet it remained. He realized resilience isn't about avoiding damage, but about enduring it and holding your ground.", prompt: "What is one 'wave' you endured today, and how did it show your own strength?" }
    },
    {
        id: 'elara',
        color: 'bg-violet-100',
        textColor: 'text-violet-800',
        tier: 'free',
        name: 'Elara, The Creative Muse',
        graphic: ElaraGraphic,
        lore: "Elara is a celestial artist who weaves constellations from stardust and forgotten dreams. She believes every experience, joyful or sorrowful, is a color on the palette of life. She helps you see the masterpiece you are creating every day, finding beauty not in perfection, but in the vibrant, chaotic, and unique composition of your own story.",
        dailyStory: { title: "Starlight Sketch #1: The Shattered Vase", content: "Elara once saw an artist weep over a shattered vase. Instead of discarding the pieces, she showed him how to arrange them into a mosaic, its cracks filled with gold. The new creation was more beautiful for having been broken.", prompt: "What 'broken piece' from your day could become part of a new, more beautiful picture?" }
    },
    {
        id: 'orion',
        color: 'bg-emerald-100',
        textColor: 'text-emerald-800',
        tier: 'free',
        name: 'Orion, The Practical Analyst',
        graphic: OrionGraphic,
        lore: "As the universe's cartographer, Orion brought clarity to the cosmic chaos by mapping the intricate dance of the stars. He operates on a simple principle: every complex problem is a collection of smaller, solvable parts. He offers you his tools—logic, observation, and pattern recognition—to help you chart a clear path through the fog of uncertainty.",
        dailyStory: { title: "Log Entry 734: The Tangled Constellation", content: "Orion faced a star-system so tangled, its paths seemed random. Instead of trying to force a route, he simply observed. For a full cycle, he charted every movement, and soon, the underlying pattern emerged, revealing a clear and simple path forward.", prompt: "What 'tangled' problem could you understand better by simply observing it without judgment?" }
    },
    {
        id: 'aethel',
        color: 'bg-amber-100',
        textColor: 'text-amber-800',
        tier: 'premium',
        name: 'Aethel, The Chronicler',
        graphic: AethelGraphic,
        lore: "Aethel is an ancient, sentient tree whose roots run as deep as memory itself. It has witnessed ages and holds the stories of generations within its rings. Aethel teaches that to understand the leaves (your current feelings), you must understand the roots (your past). It helps you trace the lines from then to now, finding compassion for your journey.",
        dailyStory: { title: "Ring of Memory: The First Sapling", content: "Aethel remembers its first storm. A tiny sapling, it feared it would break. But an older tree nearby whispered, 'Bend, don't fight. Your strength is in your flexibility.' Aethel learned that yielding is not weakness, but a strategy for survival and growth.", prompt: "When did you feel you had to 'bend' today, and what strength did you find in it?" }
    }
];

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

export const moods = [
    { name: 'Happy', icon: '😊', color: 'bg-green-100 text-green-800 ring-green-300' },
    { name: 'Calm', icon: '😌', color: 'bg-blue-100 text-blue-800 ring-blue-300' },
    { name: 'Okay', icon: '😐', color: 'bg-yellow-100 text-yellow-800 ring-yellow-300' },
    { name: 'Anxious', icon: '😟', color: 'bg-purple-100 text-purple-800 ring-purple-300' },
    { name: 'Sad', icon: '😢', color: 'bg-gray-100 text-gray-800 ring-gray-300' }
];

export const moodHistory = [
    { day: 'Mon', mood: 'Happy' },
    { day: 'Tue', mood: 'Okay' },
    { day: 'Wed', mood: 'Calm' },
    { day: 'Thu', mood: 'Happy' },
    { day: 'Fri', mood: null },
    { day: 'Sat', mood: 'Anxious' },
    { day: 'Sun', mood: null }
];

export const leagueData = [
    { name: "Spark", xp: 0, icon: '✨', color: 'text-amber-500' },
    { name: "Dreamer", xp: 500, icon: '☁️', color: 'text-sky-500' },
    { name: "Storyteller", xp: 1500, icon: '📖', color: 'text-indigo-500' },
    { name: "Sage", xp: 3000, icon: '🌿', color: 'text-emerald-500' },
    { name: "Luminary", xp: 5000, icon: '☀️', color: 'text-yellow-400' }
];