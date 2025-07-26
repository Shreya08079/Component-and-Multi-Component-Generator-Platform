import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#F5F7FA' }}>
      <h1 style={{ fontSize: 64, color: '#4A90E2', fontWeight: 900, marginBottom: 0 }}>404</h1>
      <h2 style={{ color: '#1E2A44', fontWeight: 700, marginBottom: 16 }}>Page Not Found</h2>
      <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a style={{ background: '#4A90E2', color: '#fff', padding: '10px 24px', borderRadius: 6, fontWeight: 600, textDecoration: 'none' }}>Go Home</a>
      </Link>
    </div>
  );
}
