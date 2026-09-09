# Mini Social Post Application

A responsive full-stack MERN social feed built for the 3W Full Stack Internship Assignment.

## 🚀 Live Demo
- **Frontend (Vercel):** [https://mini-social-app-seven-olive.vercel.app](https://mini-social-app-seven-olive.vercel.app)
- **Backend API (Render):** [https://mini-social-app-utqm.onrender.com](https://mini-social-app-utqm.onrender.com)
- **GitHub Repository:** [https://github.com/Manojtiwari629/mini-social-app](https://github.com/Manojtiwari629/mini-social-app)

---

## 🛠 Tech Stack
- **Frontend:** React.js, Vanilla CSS (strictly adheres to no-Tailwind rule)
- **Backend:** Node.js, Express.js, Multer (multipart/form-data)
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens), bcryptjs

---

## ✨ Features Implemented
1. **User Authentication:**
   - Secure registration and login flow using salted password hashing.
   - JWT persistent sessions via LocalStorage.

2. **Social Feed & Post Creation:**
   - Create posts with text only, image only, or both.
   - Public feed displaying posts chronologically with timestamps and author handles.

3. **Interactions:**
   - Real-time like and unlike toggle.
   - Post commenting system storing usernames and timestamps.

4. **Optimized Architecture:**
   - Clean separation of concerns (`frontend/` and `backend/`).
   - Two efficient collections (`users` and `posts` with embedded arrays) as per guidelines.