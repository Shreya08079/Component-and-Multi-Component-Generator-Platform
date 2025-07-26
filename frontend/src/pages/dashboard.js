import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import withAuth from '@/components/withAuth';
import ChatPanel from '@/components/ChatPanel';
import CodeTabs from '@/components/CodeTabs';
import SessionList from '@/components/SessionList';
import PropertyEditor from '@/components/PropertyEditor';
import axios from 'axios';

function Dashboard() {
  const [sessionId, setSessionId] = useState(null);
  const [chat, setChat] = useState([]);
  const [jsxCode, setJsxCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [editorState, setEditorState] = useState({});
  const [selectedElement, setSelectedElement] = useState(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const autoSaveTimeout = useRef(null);

  // Load session by ID
  const loadSession = async (session) => {
    setSessionId(session._id);
    setChat(session.chat || []);
    setJsxCode(session.code || '');
    setEditorState(session.editorState || {});
    setCssCode('');
    setSelectedElement(null);
  };

  // Auto-save session after chat/code/editorState changes
  useEffect(() => {
    if (!sessionId) return;
    if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
    autoSaveTimeout.current = setTimeout(() => {
      axios.put(`/api/sessions/${sessionId}`, {
        chat,
        code: jsxCode,
        editorState,
      }, { headers: { Authorization: `Bearer ${token}` } });
    }, 800); // debounce
    return () => clearTimeout(autoSaveTimeout.current);
  }, [chat, jsxCode, editorState, sessionId, token]);

  // On first load, fetch latest session or create one
  useEffect(() => {
    if (!token) return;
    axios.get('/api/sessions', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.length) {
          loadSession(res.data[0]);
        } else {
          axios.post('/api/sessions', { name: 'Untitled' }, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => loadSession(r.data));
        }
      });
  }, [token]);

  // Handle element selection in preview (demo: select root element)
  const handlePreviewClick = (e) => {
    e.preventDefault();
    setSelectedElement({
      tag: 'div',
      props: { children: 'Sample', style: { fontSize: 16, color: '#222' } }
    });
  };

  // Apply property editor changes (demo: update JSX code with new props)
  const handlePropChange = (newProps) => {
    // In a real app, parse and update JSX AST, here we just update preview text
    setJsxCode(`<button style="font-size:${newProps.style?.fontSize};color:${newProps.style?.color};background:${newProps.style?.backgroundColor};border-radius:${newProps.style?.borderRadius}">${newProps.children || 'Button'}</button>`);
  };

  return (
    <>
      <Head>
        <title>Dashboard | AI Playground</title>
      </Head>
      <div className="app-container" aria-label="AI Micro-Frontend Playground">
        <header style={{ padding: '1rem', background: '#1E2A44', color: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <h1 tabIndex={0} style={{ margin: 0, fontSize: '2rem', fontWeight: 700, letterSpacing: 1 }}>CodeCraft</h1>
</header>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'row', minHeight: '80vh', background: '#1E2A44' }}>
          {/* Session List Panel */}
          <aside style={{ width: 220, background: '#1E2A44', color: '#fff', borderRight: '1px solid #E2E8F0', padding: 12, height: 'calc(100vh - 80px)' }}>
            <SessionList
              token={token}
              selectedId={sessionId}
              setSelectedId={setSessionId}
              onLoadSession={loadSession}
            />
          </aside>
          {/* Chat Side Panel */}
          <aside style={{ width: 320, background: '#1E2A44', color: '#fff', borderRight: '1px solid #E2E8F0', padding: 16, height: 'calc(100vh - 80px)' }}>
            <h2 tabIndex={0} style={{ color: '#fff' }}>Chat</h2>
            <ChatPanel
              sessionId={sessionId}
              chat={chat}
              setChat={setChat}
              setCode={setJsxCode}
              token={token}
              selectedElement={selectedElement}
            />
          </aside>
          {/* Main Preview Area */}
          <section style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, background: '#F5F7FA', color: '#2D3748' }}>
            <h2 tabIndex={0} style={{ color: '#2D3748', fontWeight: 700 }}>Component Preview</h2>
            <div style={{ width: '100%', minHeight: 300, border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', color: '#2D3748', marginBottom: 24, position: 'relative' }}>
              {/* Micro-frontend iframe/sandbox preview */}
              {jsxCode ? (
                <iframe
                  title="Component Preview"
                  style={{ width: '100%', height: 300, border: 'none', background: '#fff', borderRadius: 8 }}
                  sandbox="allow-scripts allow-same-origin"
                  srcDoc={`<html><head><style>${cssCode}</style></head><body><div id='selectable' tabindex='0' style='outline:2px solid #38bdf8;cursor:pointer' onclick='parent.postMessage({type:"select",tag:"button"},"*")'>${jsxCode}</div></body></html>`}
                  onLoad={e => {
                    const iframe = e.target;
                    iframe.contentWindow.addEventListener('click', handlePreviewClick);
                  }}
                />
              ) : (
                <div style={{ textAlign: 'center', color: '#9B59B6', padding: 48 }}>
                  No component generated yet.
                </div>
              )}
              {/* Property Editor floating panel */}
              <PropertyEditor selected={selectedElement} onChange={handlePropChange} />
            </div>
            {/* Code Tabs */}
            <CodeTabs jsxCode={jsxCode} cssCode={cssCode} />
          </section>
        </main>
      </div>
    </>
  );
}

// ErrorBoundary component for user-friendly error display
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log errorInfo to an error reporting service here
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: 24 }}>
        <h2>Something went wrong</h2>
        <pre>{this.state.error?.message || 'Unknown error'}</pre>
      </div>;
    }
    return this.props.children;
  }
}

export default withAuth(function DashboardWithBoundary(props) {
  return (
    <ErrorBoundary>
      <Dashboard {...props} />
    </ErrorBoundary>
  );
});
