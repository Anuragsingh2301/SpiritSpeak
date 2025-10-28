import express from 'express';
import {
  createJournalEntry,
  getJournalEntries,
  getReflection,
  getStreak,
  getReflectionAttempts,
  getCalendarData,
} from '../controllers/journalController.js';
import { isAuthenticated } from '../middleware/auth.js'; // From your auth setup

const router = express.Router();

// Apply the 'isAuthenticated' middleware to ALL routes in this file
router.use(isAuthenticated);
router.get('/streak', getStreak);
router.get('/reflection-attempts', getReflectionAttempts);
router.get('/calendar', getCalendarData);

// /api/journal
router
  .route('/')
  .post(createJournalEntry)
  .get(getJournalEntries);

// /api/journal/reflect
router.post('/reflect', getReflection);
// We can add routes for single entries later (e.g., /:id)
export default router;