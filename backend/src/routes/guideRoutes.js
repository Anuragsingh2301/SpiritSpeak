import express from 'express';
import { getThoughtOfTheDay, getGuideLore } from '../controllers/guideController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// All routes in this file are protected
router.use(isAuthenticated);

// GET /api/guides/thought-of-the-day
router.get('/thought-of-the-day', getThoughtOfTheDay);

// GET /api/guides/:id/lore
router.get('/:id/lore', getGuideLore);

export default router;