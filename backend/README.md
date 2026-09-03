# Backend

This is the Node.js and Express backend API for the Training Opportunities Website. It handles data management, authentication, and business logic.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)

## Project Structure

```text
src/
├── config/       # Configuration files (e.g., database connection)
├── controllers/  # Route controllers containing business logic
├── middleware/   # Express middleware (e.g., auth, error handling)
├── models/       # Mongoose database schemas and models
├── routes/       # API route definitions
├── utils/        # Utility functions and helpers
├── __tests__/    # Backend tests
├── app.js        # Express app setup
└── server.js     # Entry point to start the server
```

## Getting Started

### Prerequisites
- Node.js (v20 or higher recommended)
- A running instance of MongoDB (local or Atlas)

### Installation & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables (create a `.env` file based on `.env.example`).
3. Start the development server:
   ```bash
   npm run dev
   ```
   The API will typically be available at `http://localhost:5000` (or the port specified in your environment variables).

## Available Scripts

- `npm run dev`: Starts the local development server with auto-reloading (e.g., using nodemon).
- `npm start`: Starts the server in production mode.
- `npm test`: Runs the test suite for the backend.
