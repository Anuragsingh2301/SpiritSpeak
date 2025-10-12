import express from 'express';
const router = express.Router();
import {
  register,
  login,
  logout,
  getCurrentUser,
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import {
  registerValidation,
  loginValidation,
  validate,
} from '../validators/authValidator.js';

// Public routes
router.post(
  '/register',
  authLimiter,
  registerValidation,
  validate,
  register
);

router.post(
  '/login',
  authLimiter,
  loginValidation,
  validate,
  login
);

// Protected routes (require authentication)
router.post('/logout', isAuthenticated, logout);
router.get('/me', isAuthenticated, getCurrentUser);

export default router;
