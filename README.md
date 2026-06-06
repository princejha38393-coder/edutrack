# EDUTRACK

EDUTRACK is a professional MERN stack e-learning platform with a modern responsive frontend, secure Express API, MongoDB models, JWT authentication, role-based access control, dashboards, course management, enrollments, loading states, dark mode, and production-friendly structure.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Framer Motion, Lucide, React Hot Toast
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Helmet, CORS, rate limiting

## Project Structure

```text
edutrack/
  client/   React frontend
  server/   Express + MongoDB API
```

## Quick Start

```bash
npm install
copy server\.env.example server\.env
copy client\.env.example client\.env
npm run seed
npm run dev
```

Frontend: `http://localhost:5173`

API: `http://localhost:5000/api`

## Demo Accounts

After running `npm run seed`:

- Admin: `admin@edutrack.io` / `Admin@12345`
- Student: `student@edutrack.io` / `Student@12345`

## Production Notes

- Set strong `JWT_SECRET` and production `MONGO_URI`.
- Configure `CLIENT_URL` for your deployed frontend.
- Use HTTPS, secure cookies if moving tokens into cookies, managed MongoDB backups, and server-side logging/monitoring.
