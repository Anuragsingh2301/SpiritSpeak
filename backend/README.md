# SpiritSpeak Backend

This is the backend server for SpiritSpeak, built with Node.js, Express, and MongoDB. It provides RESTful APIs for authentication, journaling, XP tracking, and AI guide interactions.

## Project Vision & Concept
SpiritSpeak's backend is designed to power a gamified personal growth platform. It enables users to journal, track progress, and interact with AI guides. The backend focuses on security, scalability, and extensibility, supporting features that encourage daily engagement and self-reflection.

## Technical Overview
- **Framework:** Express.js for robust REST API development
- **Database:** MongoDB with Mongoose ODM for flexible, scalable data modeling
- **Authentication:** JWT for stateless auth, sessions for persistent login
- **AI Integration:** Gemini API (Google AI) for dynamic guide responses
- **Middleware:** Custom error handling, rate limiting, and authentication
- **Validation:** Joi or custom validators for input sanitization

## Key Features
- **User Authentication:** Secure registration, login, password hashing, session management
- **Journaling:** CRUD operations for journal entries, linked to user accounts
- **XP/Progress Tracking:** Earn XP for journaling and reflection, view progress and achievements
- **AI Guides:** Daily motivational content and interactive prompts via Gemini API
- **Validation & Security:** Input validation, rate limiting, error handling, and CORS configuration
- **Extensible Architecture:** Modular controllers, models, and routes for easy feature addition

## Folder Structure
- `src/app.js`: Express app setup, middleware registration
- `src/server.js`: Server entry point, environment config
- `src/config/`: AI, CORS, database, and session configuration
- `src/controllers/`: Business logic for each route
- `src/middleware/`: Auth, error handler, rate limiter
- `src/models/`: Mongoose schemas for users, journals, daily content
- `src/routes/`: API endpoints grouped by feature
- `src/utils/`: Helper functions (e.g., guide logic)
- `src/validators/`: Input validation logic

## Setup & Usage
1. Install dependencies: `npm install`
2. Configure `.env` for MongoDB URI, JWT secret, Gemini API key
3. Start server: `npm start`
4. API runs on default port (e.g., 5000 or as set in `.env`)

## API Endpoints
- `/api/auth`: Register, login, logout, session management
- `/api/journal`: Create, read, update, delete journal entries
- `/api/xp`: Track and retrieve XP, progress, achievements
- `/api/guides`: Get daily content, interact with AI guides

## Example Workflow
1. User registers and logs in
2. User creates a journal entry
3. XP is awarded for journaling
4. User interacts with AI guide for daily reflection
5. Progress and achievements are tracked and returned

## Extending & Customization
- Add new models in `src/models` for additional features
- Create new controllers and routes for expanded API functionality
- Integrate new AI services by updating `src/config/ai.js` and related controllers
- Use middleware for cross-cutting concerns (logging, analytics, etc.)

## Best Practices
- Keep sensitive keys in `.env` and never commit them
- Use modular code for maintainability
- Write tests for controllers and middleware
- Document new endpoints and features

