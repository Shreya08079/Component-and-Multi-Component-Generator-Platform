import { useState } from 'react';
import Prism from 'prism-react-renderer/prism';
import Highlight, { defaultProps } from 'prism-react-renderer';
import jszip from 'jszip';

export default function CodeTabs({ jsxCode, cssCode }) {
  const [tab, setTab] = useState('jsx');

  const handleCopy = () => {
    const code = tab === 'jsx' ? jsxCode : cssCode;
    navigator.clipboard.writeText(code);
  };

  const handleDownload = async () => {
    const zip = new jszip();
    zip.file('Component.jsx', jsxCode);
    zip.file('styles.css', cssCode);
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'component.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: '100%', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8 }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#F5F7FA', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <button
          style={{
            flex: 1,
            padding: 12,
            background: tab === 'jsx' ? '#F5F7FA' : '#E2E8F0',
            color: tab === 'jsx' ? '#2D3748' : '#4A90E2',
            fontWeight: tab === 'jsx' ? 700 : 500,
            border: 'none',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            cursor: 'pointer',
            outline: 'none',
            transition: 'background 0.15s, color 0.15s'
          }}
          onClick={() => setTab('jsx')}
        >JSX/TSX</button>
        <button
          style={{
            flex: 1,
            padding: 12,
            background: tab === 'css' ? '#F5F7FA' : '#E2E8F0',
            color: tab === 'css' ? '#2D3748' : '#4A90E2',
            fontWeight: tab === 'css' ? 700 : 500,
            border: 'none',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            cursor: 'pointer',
            outline: 'none',
            transition: 'background 0.15s, color 0.15s'
          }}
          onClick={() => setTab('css')}
        >CSS</button>
      </div>
      <div style={{ padding: 16, minHeight: 120, background: '#fff', color: '#2D3748', fontSize: 15, maxHeight: 300, overflow: 'auto' }}>
        <Highlight {...defaultProps} code={tab === 'jsx' ? jsxCode : cssCode} language={tab === 'jsx' ? 'jsx' : 'css'}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, background: 'none', margin: 0, color: '#2D3748', maxHeight: 260, overflowX: 'auto', overflowY: 'auto', whiteSpace: 'pre', wordBreak: 'break-word' }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 12 }}>
        <button style={{ padding: '8px 16px', background: '#9B59B6', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }} onClick={handleCopy}>Copy</button>
        <button style={{ padding: '8px 16px', background: '#4A90E2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }} onClick={handleDownload}>Download ZIP</button>
      </div>
    </div>
  );
}
