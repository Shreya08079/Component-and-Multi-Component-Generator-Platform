import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ChatPanel({ sessionId, chat, setChat, setCode, token, selectedElement }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const sendPrompt = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    const userMsg = { role: 'user', content: input };
    const newChat = [...chat, userMsg];
    setChat(newChat);
    setInput('');
    try {
      try {
        const res = await axios.post(
          '/api/llm/generate',
          {
            prompt: input,
            code: '',
            mode: 'new',
            targetElement: selectedElement ? selectedElement.tag : null
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const aiMsg = { role: 'assistant', content: res.data.code };
        setChat([...newChat, aiMsg]);
        setCode(res.data.code);
      } catch (err) {
        setChat([
          ...newChat,
          { role: 'assistant', content: 'Error: ' + (err.response?.data?.message || 'Failed to generate code') }
        ]);
      }
      setLoading(false);
    } catch (err) {
      setChat([
        ...newChat,
        { role: 'assistant', content: 'Error: ' + (err.response?.data?.message || 'An unknown error occurred') }
      ]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 8, background: '#1E2A44', color: '#fff', borderRadius: 8, border: '1px solid #E2E8F0', padding: 8 }}>
        {chat.map((msg, i) => (
          <div key={i} style={{ margin: '8px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#4A90E2' : '#fff' }}>
              {msg.role === 'user' ? 'You' : 'AI'}:
            </span>
            <span style={{ marginLeft: 6, whiteSpace: 'pre-wrap' }}>{msg.content}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      {selectedElement && selectedElement.tag && (
  <div aria-live="polite" style={{ marginBottom: 6, color: '#16a34a', fontWeight: 600, fontSize: 13 }}>
    Targeting: <span style={{ textTransform: 'capitalize' }}>{selectedElement.tag}</span>
  </div>
)}
<form onSubmit={sendPrompt} style={{ display: 'flex', gap: 4, background: '#1E2A44', borderRadius: 8, border: '1px solid #E2E8F0', padding: 8 }}>
        <input
          type="text"
          placeholder="Type a prompt..."
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: 8, background: '#22304b', color: '#fff', border: '1px solid #E2E8F0', borderRadius: 6 }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} style={{ padding: '8px 16px', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, boxShadow: '0 1px 4px #0001', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
