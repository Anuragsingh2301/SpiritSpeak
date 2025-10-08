// src/data/guidesData.js

// 1. Array for GENERAL GUIDE INFORMATION (Details, descriptions, and colors)
export const guideInfo = [
  {
    id: 1,
    guideName: "Elara, The Creative Muse",
    primaryFocus: "Inspiring creativity, expression, and finding beauty.",
    detailedBio: "Elara believes that life is a grand canvas. Her guidance focuses on encouraging you to express yourself fully and view challenges as unique artistic opportunities.",
    colorPalette: {
      cardBg: "bg-indigo-50", // Light background for reflection card
      titleColor: "text-indigo-800", // Dark text for title
      widgetBg: "bg-pink-700 text-white", // Background for Thought Widget
    },
  },
  {
    id: 2,
    guideName: "Kai, The Stoic Companion",
    primaryFocus: "Fostering resilience, emotional regulation, and acceptance.",
    detailedBio: "Kai teaches that enduring hardship is the path to growth and that true freedom comes from accepting what you cannot change.",
    colorPalette: {
      cardBg: "bg-teal-50",
      titleColor: "text-teal-800",
      widgetBg: "bg-purple-700 text-white", // Matches the example image
    },
  },
  {
    id: 3,
    guideName: "Orion, The Practical Analyst",
    primaryFocus: "Promoting clarity, strategic planning, and efficiency.",
    detailedBio: "Orion helps you cut through mental clutter to establish clear, actionable steps toward your goals.",
    colorPalette: {
      cardBg: "bg-amber-50",
      titleColor: "text-amber-800",
      widgetBg: "bg-green-700 text-white",
    },
  },
  {
    id: 4,
    guideName: "Aethel, The Chronicler",
    primaryFocus: "Encouraging self-reflection, gratitude, and documenting progress.",
    detailedBio: "Aethel emphasizes the importance of consistent journaling, tracking emotional trends, and celebrating small victories over time.",
    colorPalette: {
      cardBg: "bg-blue-50",
      titleColor: "text-blue-800",
      widgetBg: "bg-blue-700 text-white",
    },
  },
];

// 2. Array for ALL RECENT REFLECTIONS (6 entries for random selection)
export const reflections = [
  { id: 101, guideName: "Elara, The Creative Muse", summary: "Your words paint a vivid picture... part of the larger artwork of your life.", timestamp: "Yesterday" },
  { id: 102, guideName: "Kai, The Stoic Companion", summary: "Remember that like the tide, emotions ebb and flow...", timestamp: "2 days ago" },
  { id: 103, guideName: "Orion, The Practical Analyst", summary: "A focused mind achieves clarity and purpose.", timestamp: "3 days ago" },
  { id: 104, guideName: "Aethel, The Chronicler", summary: "A record of the past is a guide to the future.", timestamp: "4 days ago" },
  { id: 105, guideName: "Elara, The Creative Muse", summary: "Felt inspired by a simple sunrise; sometimes the smallest beauty is the most profound.", timestamp: "1 week ago" },
  { id: 106, guideName: "Kai, The Stoic Companion", summary: "Challenging morning, but I chose my response. I control my own citadel.", timestamp: "1 week ago" },
];

// 3. Array for ALL THOUGHTS (8 thoughts for random selection for the widget)
export const thoughts = [
  { guide: "Kai, The Stoic Companion", quote: "The obstacle is the way. Every challenge you faced today was not a barrier, but a path to discovering your own strength." },
  { guide: "Kai, The Stoic Companion", quote: "Control what you can, endure what you cannot, and learn the difference between the two." },
  { guide: "Elara, The Creative Muse", quote: "Creativity is just connecting things. When you can't find the answer, start looking for connections." },
  { guide: "Elara, The Creative Muse", quote: "Don't ask what the world needs. Ask what makes you come alive, and go do it." },
  { guide: "Orion, The Practical Analyst", quote: "Clarity comes from engagement, not thought. The best way to predict the future is to create it." },
  { guide: "Orion, The Practical Analyst", quote: "Efficiency is doing things right. Effectiveness is doing the right things." },
  { guide: "Aethel, The Chronicler", quote: "A journal is your personal time machine. Respect the past, but live for the entry you write today." },
  { guide: "Aethel, The Chronicler", quote: "The first step to mastery is documenting your failures. Write it down, and the lesson sticks." },
];

// 4. Array for ALL ENTRIES (Past Entries widget data)
export const entries = [
    { date: "Sept 31, 2025", time: "9:14 PM", text: "Had a long day at college, the new project seems hard..." },
    { date: "Sept 28, 2025", time: "10:30 PM", text: "Felt a bit anxious about the presentation tomorrow..." },
    { date: "Sept 25, 2025", time: "8:00 PM", text: "Started that new project, feeling a mix of excitement and pressure." },
];