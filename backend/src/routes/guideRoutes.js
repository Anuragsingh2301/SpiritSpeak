import express from 'express';
import { getThoughtOfTheDay } from '../controllers/guideController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// All routes in this file are protected
router.use(isAuthenticated);

// GET /api/guides/thought-of-the-day
router.get('/thought-of-the-day', getThoughtOfTheDay);

export default router;