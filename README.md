# EduRights

A gamified web platform that teaches children aged 8–16 about their legal rights through interactive story-based modules, quizzes, and a rewards system.

## Overview

EduRights simplifies child rights concepts into fun, self-paced learning. Kids progress through story-based modules, take quizzes, earn points and badges, and level up as they learn — all inside a child-friendly, responsive interface.

Built as a MERN stack application (MongoDB, Express, React, Node.js).

## Features

- 🔐 Registration, login, and a personal dashboard
- 📚 Interactive, story-based learning modules
- ✅ Quizzes tied to each module
- 🏆 Points, levels, and badge rewards
- 📖 Knowledge hub — articles, FAQs, and real-case examples
- 🌍 Multi-language support
- 📱 Responsive, child-friendly design

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas)
- **Auth:** JWT

## Project Structure

edurights/
client/ → React frontend
server/ → Express backend API
README.md
.gitignore


## Getting Started

### Prerequisites
- Node.js (LTS)
- A MongoDB Atlas account (connection string shared separately, never committed)

### Setup
```bash
# clone the repo
git clone <repo-url>
cd edurights

# frontend
cd client
npm install
npm run dev

# backend (separate terminal)
cd server
npm install
npm run dev
```

### Environment variables
Create a `.env` file inside `server/` (never commit this — it's in `.gitignore`):

MONGODB_URI=your-connection-string-here
JWT_SECRET=your-secret-here
PORT=5000


## Branching & Contribution

- `main` is protected — no direct commits.
- Work in feature branches: `feature/your-feature-name`
- Open a Pull Request, get one teammate's review, then merge.
- Commit small and often.

## Status

🚧 In active development.
