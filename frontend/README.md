# CodeCraft: AI Micro-Frontend Playground

CodeCraft is a full-stack, AI-powered playground for generating, previewing, and editing React components via chat. It combines a modern Next.js frontend with an Express backend and OpenAI-compatible LLM integration.

---

## ✨ Features

### Frontend (Next.js)
- **AI Chat UI:** Chat with an AI to generate and iteratively refine React components.
- **Live Preview:** Instantly preview generated components in a sandboxed iframe.
- **Interactive Editing:** Modify component properties and styles visually.
- **Code Inspection:** View and copy JSX and CSS code for each component.
- **Export:** Download your component as a ZIP (JSX + CSS).
- **Session Management:**
  - Save, load, and delete sessions (workspaces for your components and chat history).
  - Resume work exactly where you left off.
- **Authentication:**
  - Signup, login, and protected dashboard routes.
- **Settings:**
  - Update email and password from the settings page.
- **Error Boundaries:**
  - Friendly error messages for robust user experience.
- **Modern UI:**
  - Responsive, accessible, and visually polished design.

### Backend (Express API)
- **Authentication Endpoints:** `/api/auth/signup`, `/api/auth/login`
- **Session Endpoints:** `/api/sessions` (CRUD for user sessions)
- **AI Generation Endpoint:** `/api/llm/generate` (LLM-powered component/code generation)
- **Protected Routes:** All session and generation endpoints require JWT auth.
- **MongoDB Integration:** Persistent storage for users and sessions.
- **Extensible:** Easily add new endpoints or models.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Setup (Frontend)
```bash
cd frontend
npm install
npm run dev
```

### Setup (Backend)
```bash
cd backend
npm install
node index.js
```

### Environment
- Configure `.env` files in both `backend` and `frontend` as needed (see `.env.example` if available).

---

## 📚 Project Structure
- `frontend/` — Next.js app (UI, pages, components)
- `backend/` — Express API (auth, sessions, LLM integration)

---

## 🛠️ Tech Stack
- Next.js, React, Express, MongoDB, OpenAI-compatible LLM, JWT, Axios, JSZip, Prism-react-renderer

---

## 🧑‍💻 Author
Made by Shreya, 2025.

---

## 📄 License
MIT (add details if needed)
