# Training Opportunities Website

A full-stack web application designed to help manage and discover training opportunities for students, connecting them with companies and supervisors.

## Overview

The platform consists of a modern React frontend and a robust Node.js/Express backend API, working together to provide a seamless experience for finding and managing internships and training.

## Architecture

- **[Frontend](./frontend/README.md)**: Built with React, TypeScript, Vite, and Material-UI. It communicates with the backend via RESTful APIs.
- **[Backend](./backend/README.md)**: Built with Node.js, Express, and MongoDB. It provides secure endpoints, manages data, and handles business logic.

## Running the Project Locally

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB (Local or Atlas)

### 1. Start the Backend API
Navigate to the backend directory, install packages, and run the server:
```bash
cd backend
npm install
npm run dev
```

### 2. Start the Frontend
In a new terminal window, navigate to the frontend directory, install packages, and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```

## CI/CD

This project uses **GitHub Actions** for continuous integration.
- The `.github/workflows/ci.yml` workflow automatically runs on every push and pull request to the `main` branch.
- It ensures dependencies can be installed correctly for both backend and frontend, and validates that the frontend builds successfully.
