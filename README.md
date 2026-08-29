# Student Management System — Backend

REST API built with **Express.js**, **TypeScript**, **Prisma ORM v6**, and **Supabase (PostgreSQL)**.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Express.js v5 | HTTP server & routing |
| TypeScript | Type safety |
| Prisma ORM v6 | Database ORM |
| Supabase | PostgreSQL database (hosted) |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Zod | Request validation |

---

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma        # Database schema & models
├── src/
│   ├── db/
│   │   └── prisma.ts        # Prisma client instance
│   ├── middlewares/
│   │   ├── auth.middleware.ts   # JWT authentication
│   │   └── role.middleware.ts   # Role-based access control
│   ├── modules/
│   │   ├── auth/            # Register & Login
│   │   ├── students/        # Student CRUD
│   │   ├── teachers/        # Teacher CRUD
│   │   ├── classes/         # Class CRUD
│   │   ├── subjects/        # Subject CRUD
│   │   ├── attendance/      # Attendance tracking
│   │   ├── exams/           # Exam management
│   │   ├── results/         # Exam results
│   │   ├── fees/            # Fee management
│   │   └── password-reset/  # Password reset
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── .env                     # Environment variables
└── package.json
```

---

## Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend/` root:

```env
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres"
JWT_SECRET="your-jwt-secret"
PORT=5000
```

> Get your Supabase URLs from: **Supabase Dashboard → Connect → .env.local tab**

### 3. Push Database Schema

```bash
npm run db:push
```

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Start Development Server

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled production build |
| `npm run db:push` | Push schema changes to database |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Create & run migrations |

---

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login & get JWT token |

### Students — `/api/students`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/students` | ADMIN | Create student |
| GET | `/api/students` | ADMIN, TEACHER | Get all students |
| GET | `/api/students/:id` | ADMIN, TEACHER, STUDENT | Get student by ID |
| PATCH | `/api/students/:id` | ADMIN | Update student |
| DELETE | `/api/students/:id` | ADMIN | Delete student |

### Teachers — `/api/teachers`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/teachers` | ADMIN | Create teacher |
| GET | `/api/teachers` | ADMIN | Get all teachers |
| GET | `/api/teachers/:id` | ADMIN, TEACHER | Get teacher by ID |
| PATCH | `/api/teachers/:id` | ADMIN | Update teacher |
| DELETE | `/api/teachers/:id` | ADMIN | Delete teacher |

### Classes — `/api/classes`
### Subjects — `/api/subjects`
### Attendance — `/api/attendance`
### Exams — `/api/exams`
### Results — `/api/results`
### Fees — `/api/fees`

> All above follow the same CRUD pattern with role-based access.

---

## Authentication

All protected routes require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

Get the token from `POST /api/auth/login` response.

---

## Roles & Permissions

| Role | Permissions |
|------|-------------|
| `ADMIN` | Full access to all resources |
| `TEACHER` | Read students, manage attendance, exams, results |
| `STUDENT` | Read own profile and results |

---

## Database Models

- **User** — Authentication (email, password, role)
- **Student** — Student profile linked to User
- **Teacher** — Teacher profile linked to User
- **Class** — Classes with assigned teacher
- **Subject** — Subjects linked to class & teacher
- **Attendance** — Daily attendance per student
- **Exam** — Exams per class & subject
- **Result** — Marks per student per exam
- **Fee** — Fee records per student

---

## Connecting to Frontend

In your frontend project, set the base API URL:

```js
// e.g. in .env of your frontend
VITE_API_URL=http://localhost:5000

// or for production
VITE_API_URL=https://your-deployed-backend.com
```

Example fetch call:

```js
// Login
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "admin@example.com", password: "password" }),
});
const { token } = await res.json();

// Authenticated request
const students = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
  headers: { Authorization: `Bearer ${token}` },
});
```

---

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Supabase pooler connection (port 5432) |
| `DIRECT_URL` | Supabase direct connection for migrations |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `PORT` | Server port (default: 5000) |
