import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import sessionConfig from './config/session.js';
import corsOptions from './config/cors.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

// Security middleware
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Sanitize data against NoSQL injection
app.use(hpp()); // Protect against HTTP Parameter Pollution

// CORS
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Session middleware
app.use(session(sessionConfig));

// Rate limiting
app.use('/api', apiLimiter);

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to SpiritSpeak API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me',
        verifyEmail: 'GET /api/auth/verify-email/:token',
        resendVerification: 'POST /api/auth/resend-verification',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'POST /api/auth/reset-password',
        changePassword: 'POST /api/auth/change-password',
      },
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
