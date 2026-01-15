🎯 EventHub – Event Management Platform

EventHub is a modern, full-featured event management web application with user registration, OTP-based login, resource portal, and admin dashboard.
Built using React 19, Vite, Tailwind CSS, and Framer Motion, it delivers a smooth and professional user experience.

🚀 Live Demo

URL: http://localhost:3000 (after npm run dev)

Admin Demo
Email: admin@eventhub.com
Password: admin123

User Demo
Register → Login with OTP (any 6 digits)

✨ Core Features
📝 Registration Portal

Responsive, modern registration form

Fields: Name, Email, Phone, Gender, Ticket Type

Real-time validation (email, phone, required fields)

Success animation & auto redirect

LocalStorage persistence (demo mode)

👤 User Portal

Email + OTP (magic link simulation)

Dashboard with user stats

Resource access:

🎬 YouTube Video Embed

📄 PDF Viewer (sample PDF)

⭐ Interactive Feedback Form

Secure session handling

🛠 Admin Dashboard

Secure admin authentication

View, search & filter registrations

Block / Activate users

Login activity tracking

CSV export (registrations & logins)

Analytics dashboard (charts & stats)

🛠 Tech Stack

Frontend: React 19 + Vite

Routing: React Router DOM

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

Storage: LocalStorage (demo)

📁 Project Structure
frontend/
├── public/
│ ├── index.html
│ ├── sample.pdf
│ └── feedback-form.html
│
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

⚙️ Installation & Setup
Prerequisites

Node.js 18+

npm / yarn

Steps
cd frontend
npm install
npm run dev

Open: http://localhost:3000

🔐 Demo Credentials

Admin

Email: admin@eventhub.com

Password: admin123

User

Register first

Login using OTP (any 6-digit number)

🎬 Working Integrations

YouTube Video: Embedded with loading animation

PDF Viewer: Iframe-based PDF preview + download

Feedback Form: Star rating, validation & storage

📊 Data Persistence (Demo)

Stored using LocalStorage:

registrations

userLoggedIn

adminLoggedIn

eventFeedbacks

loginActivities

Mock data auto-generated for admin dashboard.

🎨 UI / UX Highlights

Mobile-first responsive design

Tailwind utility-based styling

Smooth animations with Framer Motion

Accessible components & keyboard navigation

🔒 Security (Demo)

Protected routes (User & Admin)

Client-side validation

Session-based access control

🧪 Testing (Manual)

Registration validation

OTP login flow

Resource access

Admin filters & CSV export

User blocking & activation

📦 Build & Deployment
npm run build
npm run preview

Deploy on: Vercel, Netlify, AWS Amplify

🎯 Interview Highlights

React 19 + modern tooling

Clean component architecture

Scalable structure (backend-ready)

Professional UI with animations

Admin analytics & CSV export

OTP-based authentication flow

📊 Project Stats

LOC: ~3,500

Pages: 6

Reusable Components: 6

Build Size: ~500KB

Load Time: < 2s

🏆 Summary

✅ 3-Interface System (User + Admin + Registration)
✅ Modern UI / UX
✅ YouTube, PDF & Feedback Integration
✅ Admin Analytics Dashboard
✅ Interview-Ready Project
