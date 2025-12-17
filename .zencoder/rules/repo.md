---
description: Repository Information Overview
alwaysApply: true
---

# Repository Information Overview

## Repository Summary
A full-stack application containing a Node.js backend and a React frontend.

## Repository Structure
- **backend/**: Node.js/Express server with PostgreSQL database integration.
- **frontend/**: React application built with Vite and Tailwind CSS.

## Projects

### Backend
**Configuration File**: `backend/package.json`

#### Language & Runtime
**Language**: JavaScript (Node.js)
**Version**: Not specified (implied Node.js runtime)
**Build System**: npm scripts
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- cors
- dotenv
- express
- joi
- pg

**Development Dependencies**:
- node-pg-migrate
- nodemon

#### Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run migrations
npm run migrate:up
```

#### Docker
No Docker configuration found.

#### Testing
No testing framework or configuration found.

### Frontend
**Configuration File**: `frontend/package.json`

#### Language & Runtime
**Language**: JavaScript (React)
**Version**: React 19
**Build System**: Vite
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- react
- react-dom
- react-router-dom
- tailwindcss-animate
- lucide-react
- @radix-ui/react-checkbox
- @radix-ui/react-slot
- class-variance-authority
- clsx
- tailwind-merge

**Development Dependencies**:
- vite
- tailwindcss
- postcss
- autoprefixer
- eslint

#### Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

#### Docker
No Docker configuration found.

#### Testing
No testing framework or configuration found.
