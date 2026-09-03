# Frontend

This is the React frontend application for the Training Opportunities Website. It provides the user interface for students, companies, and supervisors to interact with the platform.

## Tech Stack

- **Framework**: [React](https://react.dev/) (v19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Project Structure

```text
src/
├── assets/       # Static assets like images and icons
├── components/   # Reusable UI components
├── context/      # React Context for global state management
├── lib/          # Helper libraries (e.g., Axios setup)
├── pages/        # Page components (routed views)
├── routes/       # React Router configuration
├── services/     # API integration and services
└── types/        # TypeScript type definitions
```

## Getting Started

### Prerequisites
Make sure you have Node.js (v20 or higher recommended) installed.

### Installation & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

- `npm run dev`: Starts the local development server using Vite.
- `npm run build`: Compiles the TypeScript code and builds the production bundle.
- `npm run preview`: Locally previews the production build.
- `npm run test`: Runs the Vitest test suite.
- `npm run lint`: Analyzes the code for issues using ESLint.
- `npm run format`: Formats code automatically using Prettier.
