import { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
export default function SessionList({ token, selectedId, setSelectedId, onLoadSession }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    axios.get(`${API_BASE}/api/sessions`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setSessions(res.data))
      .catch((err) => {
        setSessions([]);
        setError(err.response?.data?.message || 'Failed to load sessions');
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div style={{ marginBottom: 16 }}>
  <h3>Sessions</h3>
  <button
    style={{ marginBottom: 12, width: '100%', padding: 8, background: '#4A90E2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}
    onClick={async () => {
      const res = await axios.post(`${API_BASE}/api/sessions`, { name: '' }, { headers: { Authorization: `Bearer ${token}` } });
      setSessions([res.data, ...sessions]);
      setSelectedId(res.data._id);
      onLoadSession(res.data);
    }}
  >+ New Session</button>
  {loading ? <div>Loading...</div> : (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {sessions.map(s => {
  // Get the first user prompt
  let label = '';
  if (s.chat && s.chat.length > 0) {
    const firstUser = s.chat.find(msg => msg.role === 'user');
    if (firstUser && firstUser.content) {
      const words = firstUser.content.trim().split(/\s+/);
      if (words.length <= 5) {
        label = firstUser.content;
      } else {
        label = words.slice(0, 5).join(' ') + '…';
      }
    } else {
      label = 'My prompt';
    }
  } else {
    label = 'My prompt';
  }
  return (
    <li key={s._id} style={{ display: 'flex', alignItems: 'center' }}>
      <button
        style={{
          background: selectedId === s._id ? '#bae6fd' : 'none',
          color: selectedId === s._id ? '#1E2A44' : '#fff',
          border: 'none',
          textAlign: 'left',
          width: '100%',
          padding: 8,
          cursor: 'pointer',
          borderRadius: 4,
          marginBottom: 2,
          fontWeight: selectedId === s._id ? 700 : 500,
          fontSize: 15
        }}
        onClick={() => {
          setSelectedId(s._id);
          onLoadSession(s);
        }}
      >
        {label}
      </button>
    </li>
  );
})}
    </ul>
  )}
</div>
  );
}
