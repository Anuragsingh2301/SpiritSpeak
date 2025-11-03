# SpiritSpeak

SpiritSpeak is a MERN stack application designed to help users track their personal growth, journal their experiences, and interact with AI-powered guides for daily reflection and motivation. The platform combines modern web technologies with creative features to deliver a unique self-development experience.

## Project Vision & Concept
SpiritSpeak is built to gamify personal growth and journaling, making self-development engaging and rewarding. Users interact with AI guides, complete daily reflections, and earn XP for progress. The platform encourages regular engagement through motivational content, visual progress tracking, and habit formation tools. The experience is designed to be both fun and meaningful, blending psychology, gamification, and AI.

## What Makes SpiritSpeak Unique
- **AI-Powered Guides:** Users interact with distinct AI personas (guides) for daily motivation, advice, and reflection. Each guide has a unique style and personality, powered by the Gemini API.
- **Journaling & Reflection:** Rich journaling features allow users to record thoughts, moods, and reflections. Entries are visualized and tracked over time.
- **XP & Progress Tracking:** Every activity (journaling, reflection, guide interaction) earns XP. Users can view their growth, unlock achievements, and follow a league roadmap for long-term progress.
- **Mood Charts & Analytics:** Visualize emotional trends and habits with charts and dashboards, helping users understand their journey.
- **User Profiles & Calendar:** Personal profiles with calendar integration support habit tracking and goal setting.
- **Secure Authentication:** JWT and session-based authentication ensure user data privacy and security.

## Technical Architecture
- **Frontend:**
  - Built with React, Vite, and Tailwind CSS for a fast, responsive SPA.
  - Uses Redux Toolkit for state management and RTK Query for efficient API calls.
  - Features modular pages (Dashboard, Guide, Journal, Profile, Progress, etc.), reusable UI components, and custom hooks.
  - Implements loading screens, error handling, and protected routes for smooth UX.
  - Integrates SVG graphics, icons, and guide images for a visually engaging experience.

- **Backend:**
  - RESTful API built with Express.js, MongoDB (Mongoose ODM).
  - Handles authentication, journaling, XP, and AI guide endpoints.
  - Implements custom middleware for error handling, rate limiting, and input validation.
  - Modular controllers, models, and routes for easy extension.
  - Integrates Gemini API for dynamic AI guide responses.

## Implemented Features
- **Authentication:** Register, login, session management, protected routes
- **Journaling:** Create, edit, view, and delete journal entries linked to user accounts
- **XP System:** Earn XP for journaling, reflection, and guide interaction; view achievements and progress
- **AI Guides:** Chat with AI-powered guides, receive daily motivational content and prompts
- **Mood Tracking:** Visualize mood trends with charts and analytics
- **Profile & Calendar:** View/edit user profile, track habits and entries on a calendar
- **League Roadmap:** Follow a gamified roadmap for long-term growth
- **Error Handling & Validation:** Robust input validation, error screens, and rate limiting

## Folder Structure
- `/frontend`: React client app
  - `src/pages/`: Dashboard, Guide, Journal, Login, Register, Profile, Progress, Sidebar
  - `src/components/`: UI elements, auth logic, loading screens
  - `src/apis/`: RTK Query slices for backend communication
  - `src/assets/`: Graphics, icons, guide images
  - `src/config/`: API endpoint configuration
  - `src/features/`: Redux slices (e.g., XP tracking)
  - `src/hooks/`: Custom hooks for user data, quest tracking
  - `src/styles/`: Global CSS, Tailwind config
  - `public/`: Static assets, guide images
- `/backend`: Node.js/Express server
  - `src/app.js`: Express app setup
  - `src/server.js`: Server entry point
  - `src/config/`: AI, CORS, database, session config
  - `src/controllers/`: Business logic for each route
  - `src/middleware/`: Auth, error handler, rate limiter
  - `src/models/`: Mongoose schemas for users, journals, daily content
  - `src/routes/`: API endpoints grouped by feature
  - `src/utils/`: Helper functions (e.g., guide logic)
  - `src/validators/`: Input validation logic

## Getting Started
1. Clone the repository
2. Install dependencies in both `frontend` and `backend`
3. Set up `.env` files for API keys and database URIs
4. Run backend: `npm start` in `/backend`
5. Run frontend: `npm run dev` in `/frontend`

## Example User Journey
1. Register and log in to SpiritSpeak
2. Choose an AI guide and receive daily prompts
3. Journal your thoughts and moods
4. Earn XP and track progress on the dashboard
5. Visualize mood trends and achievements
6. Set goals and track habits with the calendar
