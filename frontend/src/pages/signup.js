import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await axios.post(`${apiBase}/api/auth/signup`, { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setSuccess('Signup successful! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | CodeCraft</title>
      </Head>
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F5F7FA' }}>
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #1e2a4420', padding: 40, minWidth: 340, maxWidth: '90vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src="/logo.svg" alt="CodeCraft logo" style={{ height: 56, marginBottom: 10 }} />
          <h2 style={{ color: '#1E2A44', fontWeight: 800, fontSize: 30, marginBottom: 8 }}>Sign Up for CodeCraft</h2>
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', width: 260, gap: 12, marginTop: 12 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 7, border: '1px solid #E2E8F0', fontSize: 16 }}
            />
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ padding: 10, borderRadius: 7, border: '1px solid #E2E8F0', fontSize: 16, width: '100%' }}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(v => !v)}
                style={{ position: 'absolute', right: 8, top: 7, background: 'none', border: 'none', cursor: 'pointer', color: '#4A90E2', fontSize: 18 }}
                tabIndex={-1}
              >{showPassword ? '🙈' : '👁️'}</button>
            </div>
            <button type="submit" style={{ background: '#4A90E2', color: '#fff', padding: 12, borderRadius: 7, fontWeight: 700, fontSize: 18, marginTop: 8, border: 'none', boxShadow: '0 1px 4px #4a90e220' }}>Sign Up</button>
            {error && <div style={{ color: '#F87171', marginTop: 6, fontWeight: 600, textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: '#059669', marginTop: 6, fontWeight: 600, textAlign: 'center' }}>{success}</div>}
          </form>
          <p style={{ marginTop: 18, fontSize: 15 }}>
            Already have an account? <a href="/login" style={{ color: '#4A90E2', fontWeight: 600 }}>Log in</a>
          </p>
          <nav style={{ marginTop: 8, fontSize: 14 }}>
            <a href="/" style={{ color: '#4A90E2', marginRight: 16, textDecoration: 'underline' }}>Home</a>
            <a href="/about" style={{ color: '#4A90E2', textDecoration: 'underline' }}>About</a>
          </nav>
        </div>
      </main>
    </>
  );
}
