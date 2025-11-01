import express from 'express';
import {
  initializeXPSystem,
  getXPData,
  completeQuest,
  unlockAchievement,
  trackDailyLogin,
  trackGuideUsage,
  resetQuests,
  trackRouteVisit,
} from '../controllers/xpController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(isAuthenticated);

// Initialize XP system
router.post('/initialize', initializeXPSystem);

// Get XP data
router.get('/', getXPData);

// Complete quest
router.post('/quest/complete', completeQuest);

// Unlock achievement
router.post('/achievement/unlock', unlockAchievement);

// Track daily login
router.post('/login', trackDailyLogin);

// Track guide usage
router.post('/guide/track', trackGuideUsage);

// Track route visit
router.post('/track-route', trackRouteVisit);

// Reset quests
router.post('/quests/reset', resetQuests);

export default router;
