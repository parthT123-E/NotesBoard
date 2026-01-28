# NotesBoard

A product-style **MERN notes web app** with secure authentication, user-scoped notes, and **Upstash Redis** rate limiting to improve reliability and protect endpoints from abuse.

---

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Rate Limiting / Caching:** Upstash Redis
- **Auth:** JWT + HttpOnly cookies

---

## Features
- **Authentication + protected routes**
  - JWT-based auth stored in **HttpOnly cookies**
  - Middleware-protected API routes
  - Password hashing + validation
- **Notes management**
  - Create / read / update / delete notes
  - Notes are scoped per user (access control enforced server-side)
- **Reliability & security**
  - **Redis-backed rate limiting** on sensitive endpoints (e.g., auth / write-heavy routes)
  - Defensive checks and clear API responses

---

## Repo Structure
- `backend/` — Express API (auth, notes, rate limiting)
- `frontend/` — React UI

---

# Run Locally

## Prerequisites
- **Node.js** (recommended 18+)
- **MongoDB**
  - Local MongoDB instance OR MongoDB Atlas connection string
- **Upstash Redis**
  - Upstash REST URL + token (used for rate limiting)

---
