import Head from 'next/head';
import { useState } from 'react';

export default function Settings() {
  const [email, setEmail] = useState(''); // Should be prefilled from user profile
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update email/password
    setSuccess('Profile updated!');
    setError('');
  };

  return (
    <>
      <Head>
        <title>Settings | CodeCraft</title>
      </Head>
      <main style={{ maxWidth: 500, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #1e2a4420' }}>
        <h1 style={{ color: '#1E2A44', fontWeight: 800, fontSize: 32, marginBottom: 18 }}>Settings</h1>
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ color: '#334155', fontWeight: 600 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #E2E8F0' }} />
          <label style={{ color: '#334155', fontWeight: 600 }}>New Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #E2E8F0' }} />
          <button type="submit" style={{ background: '#4A90E2', color: '#fff', padding: 10, borderRadius: 6, fontWeight: 700, marginTop: 8 }}>Update Profile</button>
        </form>
        {success && <p style={{ color: '#059669', marginTop: 16 }}>{success}</p>}
        {error && <p style={{ color: '#F87171', marginTop: 16 }}>{error}</p>}
      </main>
    </>
  );
}
