import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in query results by default
    },
    lastLogin: {
      type: Date,
    },
    dailyReflections: {
      date: {
        type: String,
        default: null,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    // XP and Quest System
    totalXP: {
      type: Number,
      default: 0,
    },
    lastLoginDate: {
      type: String,
      default: null,
    },
    consecutiveLoginDays: {
      type: Number,
      default: 0,
    },
    loginDatesThisWeek: {
      type: Array,
      default: []
    },
    quests: {
      daily: {
        type: Array,
        default: []
      },
      weekly: {
        type: Array,
        default: []
      }
    },
    achievements: {
      type: Array,
      default: []
    },
    guideUsageCount: {
      type: Map,
      of: Number,
      default: {}
    },
    questsLastReset: {
      daily: {
        type: String,
        default: null
      },
      weekly: {
        type: String,
        default: null
      }
    },
    // Daily journal tracking (resets every 24 hours)
    dailyJournals: {
      date: {
        type: String,
        default: null // Format: YYYY-MM-DD
      },
      count: {
        type: Number,
        default: 0
      },
      journals: [{
        wordCount: Number,
        timestamp: Date
      }]
    },
    // Daily reflection tracking (resets every 24 hours)
    dailyReflectionsReceived: {
      date: {
        type: String,
        default: null
      },
      count: {
        type: Number,
        default: 0
      }
    },
    // Daily route visit tracking (resets every 24 hours)
    dailyRouteVisits: {
      date: {
        type: String,
        default: null
      },
      routes: {
        type: [String], // Array of route names visited today
        default: []
      }
    },
    // Daily login quest completion tracking
    dailyLoginQuestCompleted: {
      date: {
        type: String,
        default: null
      },
      completed: {
        type: Boolean,
        default: false
      }
    },
    // Quest progress tracking
    questProgress: {
      journalEntriesThisWeek: {
        type: Number,
        default: 0
      },
      moodLogsThisWeek: {
        type: Number,
        default: 0
      },
      reflectionsThisWeek: {
        type: Number,
        default: 0
      },
      guidesUsedThisWeek: {
        type: Array,
        default: []
      },
      loreReadCount: {
        type: Number,
        default: 0
      },
      totalJournalEntries: {
        type: Number,
        default: 0
      },
      totalMoodLogs: {
        type: Number,
        default: 0
      },
      totalReflections: {
        type: Number,
        default: 0
      },
      totalWordsWritten: {
        type: Number,
        default: 0
      },
      questsCompleted: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
    );
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Method to check and update daily reflection attempts
userSchema.methods.canGenerateReflection = function () {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const DAILY_LIMIT = 3;

  // Reset counter if it's a new day
  if (this.dailyReflections.date !== today) {
    this.dailyReflections.date = today;
    this.dailyReflections.count = 0;
  }

  return this.dailyReflections.count < DAILY_LIMIT;
};

// Method to increment reflection count
userSchema.methods.incrementReflectionCount = function () {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Reset counter if it's a new day
  if (this.dailyReflections.date !== today) {
    this.dailyReflections.date = today;
    this.dailyReflections.count = 0;
  }

  this.dailyReflections.count += 1;
};

// Method to get remaining attempts
userSchema.methods.getRemainingAttempts = function () {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const DAILY_LIMIT = 3;

  // Reset counter if it's a new day
  if (this.dailyReflections.date !== today) {
    return DAILY_LIMIT;
  }

  return DAILY_LIMIT - this.dailyReflections.count;
};

// XP and Quest Management Methods

// Method to add XP
userSchema.methods.addXP = function (amount) {
  this.totalXP += amount;
  return this.totalXP;
};

// Method to complete a quest
userSchema.methods.completeQuest = function (questId, questType) {
  const questList = this.quests[questType];
  const quest = questList.find(q => q.id === questId);
  
  if (quest && !quest.completed) {
    quest.completed = true;
    this.totalXP += quest.xp;
    return quest.xp;
  }
  return 0;
};

// Method to unlock achievement
userSchema.methods.unlockAchievement = function (achievementId) {
  const achievement = this.achievements.find(a => a.id === achievementId);
  
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    this.totalXP += achievement.xp;
    return achievement.xp;
  }
  return 0;
};

// Method to track daily login and update streak
userSchema.methods.trackLogin = function () {
  const today = new Date().toISOString().split('T')[0];
  
  if (this.lastLoginDate !== today) {
    // Check if it's consecutive
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (this.lastLoginDate === yesterdayStr) {
      this.consecutiveLoginDays += 1;
    } else {
      this.consecutiveLoginDays = 1;
    }
    
    this.lastLoginDate = today;
    
    // Track this week's login dates
    if (!this.loginDatesThisWeek) {
      this.loginDatesThisWeek = [];
    }
    
    // Get start of week
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diff);
    monday.setHours(0, 0, 0, 0);
    const startOfWeek = monday.toISOString().split('T')[0];
    
    // Filter out dates before this week
    this.loginDatesThisWeek = this.loginDatesThisWeek.filter(date => date >= startOfWeek);
    
    // Add today if not already present
    if (!this.loginDatesThisWeek.includes(today)) {
      this.loginDatesThisWeek.push(today);
    }
  }
  
  return this.consecutiveLoginDays;
};

// Method to track guide usage
userSchema.methods.trackGuideUsage = function (guideId) {
  const currentCount = this.guideUsageCount.get(String(guideId)) || 0;
  this.guideUsageCount.set(String(guideId), currentCount + 1);
  return currentCount + 1;
};

// Method to track daily journal with word count
userSchema.methods.trackDailyJournal = function (wordCount) {
  const today = new Date().toISOString().split('T')[0];
  
  // Reset if it's a new day
  if (!this.dailyJournals.date || this.dailyJournals.date !== today) {
    this.dailyJournals = {
      date: today,
      count: 0,
      journals: []
    };
  }
  
  // Only track up to 3 journals per day
  if (this.dailyJournals.count < 3) {
    this.dailyJournals.count += 1;
    this.dailyJournals.journals.push({
      wordCount: wordCount,
      timestamp: new Date()
    });
  }
  
  return this.dailyJournals.count;
};

// Method to check if user has written a 100+ word journal today
userSchema.methods.has100WordJournalToday = function () {
  const today = new Date().toISOString().split('T')[0];
  
  if (!this.dailyJournals.date || this.dailyJournals.date !== today) {
    return false;
  }
  
  return this.dailyJournals.journals.some(j => j.wordCount >= 100);
};

// Method to get today's journal count
userSchema.methods.getTodayJournalCount = function () {
  const today = new Date().toISOString().split('T')[0];
  
  if (!this.dailyJournals.date || this.dailyJournals.date !== today) {
    return 0;
  }
  
  return this.dailyJournals.count;
};

// Method to track daily reflection received
userSchema.methods.trackDailyReflection = function () {
  const today = new Date().toISOString().split('T')[0];
  
  // Reset if it's a new day
  if (!this.dailyReflectionsReceived.date || this.dailyReflectionsReceived.date !== today) {
    this.dailyReflectionsReceived = {
      date: today,
      count: 0
    };
  }
  
  this.dailyReflectionsReceived.count += 1;
  return this.dailyReflectionsReceived.count;
};

// Method to get today's reflection count
userSchema.methods.getTodayReflectionCount = function () {
  const today = new Date().toISOString().split('T')[0];
  
  if (!this.dailyReflectionsReceived.date || this.dailyReflectionsReceived.date !== today) {
    return 0;
  }
  
  return this.dailyReflectionsReceived.count;
};

// Method to track route visit
userSchema.methods.trackRouteVisit = function (routeName) {
  const today = new Date().toISOString().split('T')[0];
  
  // Reset if it's a new day
  if (!this.dailyRouteVisits.date || this.dailyRouteVisits.date !== today) {
    this.dailyRouteVisits = {
      date: today,
      routes: []
    };
  }
  
  // Add route if not already visited today
  if (!this.dailyRouteVisits.routes.includes(routeName)) {
    this.dailyRouteVisits.routes.push(routeName);
  }
  
  return this.dailyRouteVisits.routes;
};

// Method to check if user visited guides route today
userSchema.methods.hasVisitedGuidesToday = function () {
  const today = new Date().toISOString().split('T')[0];
  
  if (!this.dailyRouteVisits.date || this.dailyRouteVisits.date !== today) {
    return false;
  }
  
  return this.dailyRouteVisits.routes.includes('guides');
};

// Method to check if user visited all individual guides today
userSchema.methods.hasVisitedAllGuidesToday = function () {
  const today = new Date().toISOString().split('T')[0];
  
  if (!this.dailyRouteVisits.date || this.dailyRouteVisits.date !== today) {
    return false;
  }
  
  // Must visit all 4 guides: aethel, elara, kai, orion
  const requiredGuides = ['guide-aethel', 'guide-elara', 'guide-kai', 'guide-orion'];
  return requiredGuides.every(guide => this.dailyRouteVisits.routes.includes(guide));
};

// Method to mark daily login quest as completed
userSchema.methods.markDailyLoginQuestCompleted = function () {
  const today = new Date().toISOString().split('T')[0];
  
  this.dailyLoginQuestCompleted = {
    date: today,
    completed: true
  };
};

// Method to check if daily login quest was already completed today
userSchema.methods.isDailyLoginQuestCompletedToday = function () {
  const today = new Date().toISOString().split('T')[0];
  
  if (!this.dailyLoginQuestCompleted.date || this.dailyLoginQuestCompleted.date !== today) {
    return false;
  }
  
  return this.dailyLoginQuestCompleted.completed;
};

// Method to track journal entry creation
userSchema.methods.trackJournalEntry = function (wordCount = 0) {
  if (!this.questProgress) {
    this.questProgress = {};
  }
  this.questProgress.totalJournalEntries = (this.questProgress.totalJournalEntries || 0) + 1;
  this.questProgress.totalWordsWritten = (this.questProgress.totalWordsWritten || 0) + wordCount;
};

// Method to track mood log
userSchema.methods.trackMoodLog = function () {
  if (!this.questProgress) {
    this.questProgress = {};
  }
  this.questProgress.totalMoodLogs = (this.questProgress.totalMoodLogs || 0) + 1;
};

// Method to track reflection received
userSchema.methods.trackReflection = function () {
  if (!this.questProgress) {
    this.questProgress = {};
  }
  this.questProgress.totalReflections = (this.questProgress.totalReflections || 0) + 1;
};

// Method to track quest completion count
userSchema.methods.incrementQuestCount = function () {
  if (!this.questProgress) {
    this.questProgress = {};
  }
  this.questProgress.questsCompleted = (this.questProgress.questsCompleted || 0) + 1;
};

// Method to generate safe user object (without sensitive data)
userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model("User", userSchema);
