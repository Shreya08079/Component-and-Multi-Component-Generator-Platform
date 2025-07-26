# 🏗️ CodeCraft Architecture Diagram

```mermaid
graph TD
  subgraph Frontend (Next.js + React)
    A[Login/Signup Page]
    B[Dashboard]
    C[SessionList]
    D[ChatPanel]
    E[PropertyEditor]
    F[CodeTabs]
    G[Live Preview (iframe)]
    H[Settings Page]
  end

  subgraph Backend (Express API)
    I[Auth Endpoints]
    J[Session Endpoints]
    K[AI Generation Endpoint]
    L[User/Profile Endpoints]
    M[Redis Cache]
    N[MongoDB]
    O[OpenRouter LLM API]
  end

  A-->|JWT|I
  B-->|Load/Create/Delete|J
  C-->|List/Select|J
  D-->|Prompt/Delta|K
  E-->|Patch JSX/CSS|J
  F-->|Copy/Download|B
  G-->|Sandboxed|B
  H-->|Update Profile|L

  I-->|User Data|N
  J-->|Session Data|N
  K-->|Prompt/Code|O
  J-->|Cache|M
  K-->|Cache|M

  B-->|Auto-save|J
  B-->|Resume|J
```

---

- **Frontend:** Next.js app with protected routes, dashboard, chat, live preview, property editor, and code export.
- **Backend:** Express API with JWT auth, session CRUD, AI integration, Redis cache, MongoDB persistence.
- **LLM:** Calls to OpenRouter (Llama, GPT-4o, Gemini, etc.) for code generation and delta patching.
- **State:** Auto-saved after every chat turn or UI edit; restored on login/reload.
- **Preview:** Rendered in a sandboxed iframe for isolation and security.
