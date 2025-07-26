import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>CodeCraft | AI Micro-Frontend Playground</title>
        <meta name="description" content="Generate, preview, and export React components with AI" />
      </Head>
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F5F7FA', padding: 0 }}>
        <header style={{ width: '100%', padding: '32px 0 0 0', textAlign: 'center' }}>
          <img src="/logo.svg" alt="CodeCraft logo" style={{ height: 64, marginBottom: 8 }} />
          <h1 style={{ color: '#1E2A44', fontWeight: 900, fontSize: 48, marginBottom: 12, letterSpacing: -2 }}>CodeCraft</h1>
          <h2 style={{ color: '#4A90E2', fontWeight: 700, fontSize: 24, marginBottom: 20 }}>Your AI-powered React playground</h2>
        </header>
        <section style={{ maxWidth: 750, textAlign: 'center', margin: '0 auto 36px auto', color: '#334155', fontSize: 20, lineHeight: 1.7 }}>
          <p>Generate, preview, and export beautiful React components using natural language prompts. Tweak styles, chat with AI, and craft your perfect UI in seconds.</p>
        </section>
        <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, marginBottom: 40 }}>
          <Feature icon="✨" text="AI-powered code generation" />
          <Feature icon="🎨" text="Live property editing" />
          <Feature icon="💬" text="Chat-driven UI tweaks" />
          <Feature icon="💾" text="Save, resume, and export" />
          <Feature icon="🦾" text="Accessible & responsive" />
        </section>
        <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
          <a href="/signup" style={{ padding: '14px 38px', background: '#4A90E2', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 20, textDecoration: 'none', boxShadow: '0 2px 8px #4a90e220' }}>Get Started</a>
          <a href="/login" style={{ padding: '14px 38px', background: '#9B59B6', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 20, textDecoration: 'none', boxShadow: '0 2px 8px #9b59b620' }}>Log In</a>
        </div>
        <nav style={{ marginTop: 12, fontSize: 16 }}>
          <a href="/about" style={{ color: '#4A90E2', marginRight: 24, textDecoration: 'underline' }}>About</a>
          <a href="/settings" style={{ color: '#4A90E2', textDecoration: 'underline' }}>Settings</a>
        </nav>
        <footer style={{ marginTop: 48, color: '#64748b', fontSize: 15 }}>
          &copy; {new Date().getFullYear()} CodeCraft. Made by Shreya.
        </footer>
      </main>
    </>
  );
}

function Feature({ icon, text }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #1e2a4420', padding: '28px 32px', minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span style={{ fontWeight: 600, color: '#1E2A44', fontSize: 18 }}>{text}</span>
    </div>
  );
}
