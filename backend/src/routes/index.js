import express from 'express';
import authRoutes from './authRoutes.js';
import journalRoutes from './journalRoutes.js';
import guideRoutes from './guideRoutes.js';
import xpRoutes from './xpRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/journal', journalRoutes);
router.use('/guides', guideRoutes);
router.use('/xp', xpRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
