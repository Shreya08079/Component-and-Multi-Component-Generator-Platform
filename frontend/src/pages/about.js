import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About | CodeCraft</title>
      </Head>
      <main style={{ maxWidth: 700, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #1e2a4420' }}>
        <h1 style={{ color: '#1E2A44', fontWeight: 800, fontSize: 36, marginBottom: 10 }}>About CodeCraft</h1>
        <p style={{ fontSize: 18, color: '#334155', marginBottom: 24 }}>
          <b>CodeCraft</b> is an AI-driven micro-frontend playground where you can generate, preview, tweak, and export React components using natural language prompts. It features session management, chat-driven UI tweaks, a powerful property editor, and export tools—all in a beautiful, accessible interface.
        </p>
        <ul style={{ fontSize: 17, color: '#475569', marginBottom: 24, lineHeight: 1.7 }}>
          <li>🔮 Generate React components with AI</li>
          <li>🎨 Edit styles and properties interactively</li>
          <li>💬 Chat with the AI to incrementally update your UI</li>
          <li>💾 Save, resume, and export your work</li>
          <li>🦾 Accessible, responsive, and modern design</li>
        </ul>
        <p style={{ color: '#64748b', fontSize: 15 }}>
          Built with Next.js, React, Express, and OpenAI-compatible LLMs.<br/>
          <b>Made by Shreya, 2025.</b>
        </p>
      </main>
    </>
  );
}
