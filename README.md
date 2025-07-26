# CodeCraft: Component & Multi‑Component Generator Platform

> **A stateful, AI-driven micro-frontend playground where authenticated users can iteratively generate, preview, tweak, and export React components—or entire multi-component pages—with all chat history, code edits, and UI state preserved across logins.**

CodeCraft empowers you to:
- **Generate single components or full pages** via conversational AI (LLM-powered, supports text and image prompts)
- **Preview and tweak your work live** in a secure, sandboxed micro-frontend viewport
- **Iterate with chat**: further prompts patch or refine your code, supporting incremental and delta updates
- **Inspect and export**: view syntax-highlighted JSX/TSX and CSS, copy, or download as a ZIP
- **Save, resume, and manage sessions**: all chat, code, and editor state is auto-saved and reloads instantly after login or page refresh
- **Edit interactively**: click any element to open a property editor for size, color, text, border, and more, with two-way binding to code
- **Target elements with chat**: after selecting, prompt the AI to apply style/code changes to just that element

Built with Next.js, React, Express, MongoDB, Redis, and OpenRouter-compatible LLMs (Llama 3/4, Gemini, GPT-4o-mini, etc.), CodeCraft is designed for rapid prototyping, learning, and experimentation with modern component-based UIs.

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
