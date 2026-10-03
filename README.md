\# EduRights 🌟



EduRights is a child-friendly MERN web application designed to help children learn about their legal rights through interactive learning modules, quizzes, progress tracking, points, levels, badges, and multilingual content.



The platform combines educational content with a simple gamification system to make learning about rights engaging and accessible.



\---



\## ✨ Features



\### 📚 Learning Modules

\- Interactive learning modules about children's rights

\- Module browsing and detailed module pages

\- Sequential module unlocking

\- Completion tracking

\- MongoDB-backed learning progress



\### 🌍 Multi-Language Learning

\- English

\- Hindi

\- Spanish

\- French

\- Language preference is saved to the user's profile

\- Module titles, topics, and content support language variants



\### 🎯 Progress \& Gamification

\- Module completion tracking

\- XP / points system

\- Level progression

\- Badges

\- Progress percentage

\- Profile-based learning statistics



\### 🧠 Quizzes

\- Module-based quizzes

\- Question and answer flow

\- Score calculation

\- Quiz progress

\- Points awarded through the gamification system



\### 👤 Authentication \& User Profile

\- User registration

\- User login

\- JWT-based authentication

\- Protected user APIs

\- User profile information

\- Avatar support

\- Persistent user data



\### 📖 Knowledge Hub

\- Educational articles and additional rights-related information

\- Article browsing and reading support



\### 🎨 Child-Friendly UI

\- Responsive interface

\- Colorful and engaging design

\- Adventure-style learning experience

\- Progress cards and visual feedback



\---



\## 🛠️ Tech Stack



\### Frontend

\- React

\- Vite

\- JavaScript

\- CSS

\- Lucide React icons



\### Backend

\- Node.js

\- Express.js

\- JWT Authentication

\- REST APIs



\### Database

\- MongoDB

\- MongoDB Atlas

\- Mongoose



\---



\## 📁 Project Structure



```text

EduRights/

│

├── client/

│   ├── public/

│   └── src/

│       ├── components/

│       ├── context/

│       ├── data/

│       ├── pages/

│       ├── services/

│       ├── utils/

│       ├── App.jsx

│       ├── App.css

│       └── index.css

│

├── server/

│   ├── src/

│   │   ├── config/

│   │   ├── controllers/

│   │   ├── middleware/

│   │   ├── models/

│   │   ├── routes/

│   │   └── server.js

│   ├── .env.example

│   └── package.json

│

├── .gitignore

└── README.md



🚀 Getting Started

1\. Clone the Repository

git clone <repository-url>

cd EduRights



💻 Frontend Setup

Open a terminal inside the client folder:

cd client

npm install

npm run dev



The Vite development server will start locally.

⚙️ Backend Setup

Open another terminal:

cd server

npm install

npm run dev



The Express server runs on:

http://localhost:5000



🔐 Environment Variables

Create a .env file inside the server folder.

Example:

PORT=5000

MONGO\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secret



Do not commit the .env file to GitHub.

Use .env.example as a reference.



🔌 Main API Routes

Authentication

POST /api/auth/register

POST /api/auth/login



Users

GET /api/users/profile

PUT /api/users/profile

POST /api/users/award-points



Modules

GET /api/modules

GET /api/modules/:moduleId



Articles

GET /api/articles

GET /api/articles/:articleId



Quizzes

GET /api/quizzes/:moduleId

POST /api/quizzes/:moduleId/submit



Protected endpoints require a JWT Bearer token.



🎮 Learning \& Progress Flow

User Login

&#x20;   ↓

Learning Modules

&#x20;   ↓

Open Available Module

&#x20;   ↓

Complete Module

&#x20;   ↓

Progress Saved

&#x20;   ↓

XP Awarded

&#x20;   ↓

Profile Updated

&#x20;   ↓

Level / Badge Progress



Modules are unlocked sequentially so that users progress through the learning adventure step by step.



🏆 Level System

The current XP progression is:

Level	XP Range	Title

Level 1	0–99	Level 1 Beginner

Level 2	100–249	Explorer

Level 3	250–499	Rights Explorer

Level 4	500–999	Rights Defender

Level 5	1000+	Rights Champion





The level is calculated from the user's persisted XP.

🌐 Language Support

EduRights supports:

\- English (en)

\- Hindi (hi)

\- Spanish (es)

\- French (fr)

The selected language is stored with the user's profile and can be used to display language-specific module content.



🧪 Testing

Before merging into the main branch, the application should be tested for:

\- User registration

\- User login/logout

\- Protected routes

\- Module browsing

\- Module completion

\- Sequential module unlocking

\- Progress persistence

\- XP and level updates

\- Quiz submission

\- Badge/progress updates

\- Language switching

\- Profile updates

\- API/database connectivity



👥 Team Development

The project is developed using feature branches.

Example:

main

│

├── feature/auth

├── feature/learning-content

├── feature/quiz-engine

└── feature/integration



Feature Ownership

Person A — Auth \& User System

\- Authentication

\- Registration/login

\- User model

\- JWT security

\- Dashboard/user system



Person B — Learning Content

\- Learning modules

\- Module APIs

\- Module browsing

\- Knowledge Hub

\- Multi-language content structure

\- Learning progress integration



Person C — Quiz \& Gamification

\- Quiz system

\- Scoring

\- Progress/badges

\- Points and level-up logic



Person D — Integration \& Delivery

\- Final integration

\- Shared UI/UX

\- Testing

\- Documentation

\- Deployment/demo preparation



🔒 Security

\- JWT authentication is used for protected endpoints.

\- Passwords are stored as hashes rather than plain text.

\- Environment variables are used for sensitive configuration.

\- .env files must not be committed to Git.



📌 Project Status

EduRights is under active development.

The core authentication, learning-content, progress, multilingual, quiz, and gamification features are being developed independently on feature branches and will be integrated into the main branch during the final integration stage.



🌟 Goal

EduRights aims to make learning about children's rights:

Simple → Interactive → Accessible → Fun

while helping children understand their rights through an engaging digital learning experience.

