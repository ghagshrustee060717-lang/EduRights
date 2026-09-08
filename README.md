# EduRights — Child Rights Learning Platform (MERN)

> Based on **SFT-WEB-2026-042-SRS-v1.2**

An interactive gamified platform where kids aged 8–16 learn about their legal rights through story-based modules, quizzes, points/levels/badges, and a child-friendly dashboard.

---

## 👤 Person A — Auth & User System Ownership

Maps to: **FR-01 (Registration, Login, Personal Dashboard)** & **NFR-03 (Security)**

### Features Implemented:
1. **User Model & DB Schema** (`server/src/models/User.js`):
   - `name`, `email`, `passwordHash`, `age`, `language`, `avatar`, `role`, `createdAt`
   - Gamification state: `currentLevel`, `levelTitle`, `totalPoints`, `nextLevelPoints`, `streakDays`, `badgesEarned[]`, `completedModules[]`
   - Resilient database adapter with automatic in-memory fallback store for offline testing.
2. **JWT Authentication & Security** (`server/src/middleware/auth.js`):
   - Bcrypt password hashing (10 salt rounds)
   - JWT token generation & 30-day expiration
   - Protected endpoint middleware (`Bearer <token>`)
   - Rejection of unauthenticated requests with 401 Unauthorized
3. **Backend API Endpoints** (`server/src/routes/`):
   - `POST /api/auth/register` — Register child/user with age, avatar, language
   - `POST /api/auth/login` — Sign in and receive JWT token + profile
   - `GET  /api/auth/me` — Authenticated profile verification
   - `GET  /api/users/profile` — Get full user details
   - `PUT  /api/users/profile` — Update nickname, age, language, avatar
   - `POST /api/users/award-points` — Gamification hook for Person C
4. **Theme & Frontend UI** (`client/`):
   - Styled after the visual mockup with deep royal indigo (`#14103e`), gold accents (`#fbbf24`), and child-friendly typography (`Outfit` / `Plus Jakarta Sans`).
   - **Public Landing Page**: Hero section with superhero mascot, *"Learn Your Rights, Unlock Your Powers!"*, floating badges (*Learn, Earn, Empower*), and quick demo login.
   - **Login & Register Modal**: Child-friendly mascot selection, age range (8–16), language options, and 1-click **"⚡ Quick Demo (Aarav)"** button.
   - **Personal Dashboard Shell**:
     - Sidebar navigation: Home, Map, Quests, Knowledge Hub, Trophy Case, Profile, Settings, Logout
     - Welcome Header: *"Welcome back, Aarav! 👋 Keep learning. Keep growing. You're doing great!"*
     - Level Progress: **Level 3 Explorer** (750 / 1200 XP progress bar)
     - Stats Row: ⚡ 750 XP, 🏆 12 Badges, 🔥 7 Days streak
     - *"Continue Your Adventure"* highlight card with reading illustration
     - *"Trophy Case"* preview badges (*First Steps, Quiz Master, Story Explorer, Helper*)
     - *"Recommended for You"* interactive quest cards (*Right to Play, Right to Safety, Right to Privacy*)
     - Profile & settings management modal

---

## 🚀 Running Locally

### 1. Server (Express API)
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```

### 2. Client (React + Vite)
```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

### 3. Automated Auth Tests (Person A Verification)
```bash
cd server
node test_auth.js
```

---

## 👥 Handoff to Teammates
- **Person B (Learning Content)**: Connect module articles and stories into `/api/modules` and the *Knowledge Hub* tab.
- **Person C (Quiz & Gamification)**: Hook quiz submission results into `POST /api/users/award-points` with `{ points, badge, moduleCompleted }`.
- **Person D (Integration & UX)**: Shared styling tokens in `client/src/index.css` and responsive sidebar layout are ready for deployment and demo video recording.
