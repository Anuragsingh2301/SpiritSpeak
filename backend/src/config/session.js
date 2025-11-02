import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  name: process.env.SESSION_NAME || 'spiritspeak.sid',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/SpiritSpeak',
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 1 day in seconds
    autoRemove: 'native',
  }),
  cookie: {
    maxAge: parseInt(process.env.SESSION_MAX_AGE) || 86400000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
};

export default sessionConfig;
