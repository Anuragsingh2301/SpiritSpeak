import express from 'express';
import authRoutes from './authRoutes.js';
import journalRoutes from './journalRoutes.js';
import guideRoutes from './guideRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/journal', journalRoutes);
router.use('/guides', guideRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
