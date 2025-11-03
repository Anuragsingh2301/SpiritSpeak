# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# SpiritSpeak Frontend

SpiritSpeak's frontend is a modern, interactive client built to empower users in their personal growth journey. It offers journaling, progress tracking, and AI-powered guidance through a clean, gamified interface.

## Project Vision & Concept

The frontend is designed to make self-development engaging and accessible. Users interact with AI guides, track their mood and XP, and visualize their progress. The UI is crafted for clarity, motivation, and ease of use, encouraging daily reflection and habit formation.

## Technical Overview

- **Framework:** React (Vite) for fast, modular SPA development
- **Styling:** Tailwind CSS for utility-first, responsive design
- **State Management:** Redux Toolkit for predictable global state
- **API Calls:** RTK Query for efficient data fetching and caching
- **Routing:** React Router for seamless navigation
- **Linting:** ESLint for code quality

## Key Features

- **Journaling:** Create, edit, and view journal entries with rich UI
- **Progress Tracking:** XP system, mood charts, and league roadmap to gamify growth
- **AI Guides:** Chat with AI-powered guides for daily motivation and reflection
- **Authentication:** Secure login/register flows, protected routes, session persistence
- **User Profile:** View/edit profile, calendar integration for habit tracking
- **Loading & Error States:** Custom loading screens and error handling for smooth UX

## Folder Structure

- `src/App.jsx`: Main app component, root of SPA
- `src/pages/`: Dashboard, Guide, Journal, Login, Register, Profile, Progress, Sidebar
- `src/components/`: UI elements (buttons, modals, inputs), auth logic, loading screens
- `src/apis/`: RTK Query slices for backend communication
- `src/assets/`: SVG graphics, icons, guide images
- `src/config/`: API endpoint configuration
- `src/features/`: Redux slices (e.g., XP tracking)
- `src/hooks/`: Custom hooks for user data, quest tracking
- `src/styles/`: Global CSS, Tailwind config
- `public/`: Static assets, guide images

## Setup & Usage

1. Install dependencies: `npm install`
2. Configure `.env` for backend API endpoints and keys
3. Start dev server: `npm run dev`
4. Access app at `http://localhost:5173` (default Vite port)

## Example Workflow

1. User registers or logs in
2. User journals and interacts with AI guides
3. XP and mood are tracked and visualized
4. User views progress and achievements on dashboard

## Extending & Customization

- Add new pages in `src/pages` for features like notifications or settings
- Create reusable UI components in `src/components/ui`
- Add new API endpoints via RTK Query slices in `src/apis`
- Integrate new graphics or icons in `src/assets`
- Use Redux Toolkit for new global state features

## Best Practices

- Keep API keys and sensitive data in `.env`
- Use modular, reusable components
- Write tests for critical UI and logic
- Document new features and components
