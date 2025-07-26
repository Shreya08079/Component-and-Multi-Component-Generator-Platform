import { useState, useEffect } from 'react';

export default function PropertyEditor({ selected, onChange }) {
  const [props, setProps] = useState(selected ? selected.props : {});

  useEffect(() => {
    setProps(selected ? selected.props : {});
  }, [selected]);

  if (!selected) return null;

  const update = (prop, value) => {
    const newProps = { ...props, [prop]: value };
    setProps(newProps);
    onChange(newProps);
  };

  // Helper for nested style updates
  const updateStyle = (styleProp, value) => {
    update('style', { ...props.style, [styleProp]: value });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 80,
        right: 40,
        background: '#F5F7FA',
        border: '1px solid #E2E8F0',
        borderRadius: 10,
        boxShadow: '0 2px 16px #0002',
        zIndex: 1000,
        padding: 24,
        minWidth: 260,
        maxWidth: 340,
        color: '#2D3748',
      }}
      aria-label="Property Editor"
      tabIndex={0}
    >
      <h4 style={{ marginTop: 0, marginBottom: 16, color: '#2D3748', fontWeight: 700 }}>Property Editor</h4>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-text" style={{ color: '#2D3748', fontWeight: 600 }}>Text:</label>
        <input
          id="prop-text"
          type="text"
          value={props.children || ''}
          onChange={e => update('children', e.target.value)}
          style={{ width: '100%', background: '#fff', color: '#2D3748', border: '1px solid #E2E8F0', borderRadius: 6, padding: 6 }}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-fontsize">Font Size:</label>
        <input
          id="prop-fontsize"
          type="range"
          min="10"
          max="60"
          value={parseInt(props.style?.fontSize || 16)}
          onChange={e => updateStyle('fontSize', e.target.value + 'px')}
        />
        <span style={{ marginLeft: 8 }}>{props.style?.fontSize || '16px'}</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-color">Text Color:</label>
        <input
          id="prop-color"
          type="color"
          value={props.style?.color || '#222222'}
          onChange={e => updateStyle('color', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-bg">Background:</label>
        <input
          id="prop-bg"
          type="color"
          value={props.style?.backgroundColor || '#ffffff'}
          onChange={e => updateStyle('backgroundColor', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-radius">Border Radius:</label>
        <input
          id="prop-radius"
          type="range"
          min="0"
          max="40"
          value={parseInt(props.style?.borderRadius?.replace('px','') || 0)}
          onChange={e => updateStyle('borderRadius', e.target.value + 'px')}
        />
        <span style={{ marginLeft: 8 }}>{props.style?.borderRadius || '0px'}</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-borderwidth">Border Width:</label>
        <input
          id="prop-borderwidth"
          type="range"
          min="0"
          max="10"
          value={parseInt(props.style?.borderWidth?.replace('px','') || 0)}
          onChange={e => updateStyle('borderWidth', e.target.value + 'px')}
        />
        <span style={{ marginLeft: 8 }}>{props.style?.borderWidth || '0px'}</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-bordercolor">Border Color:</label>
        <input
          id="prop-bordercolor"
          type="color"
          value={props.style?.borderColor || '#000000'}
          onChange={e => updateStyle('borderColor', e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-shadow">Box Shadow:</label>
        <input
          id="prop-shadow"
          type="text"
          value={props.style?.boxShadow || ''}
          placeholder="e.g. 2px 2px 8px #888"
          onChange={e => updateStyle('boxShadow', e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label htmlFor="prop-padding">Padding:</label>
        <input
          id="prop-padding"
          type="range"
          min="0"
          max="48"
          value={parseInt(props.style?.padding?.replace('px','') || 0)}
          onChange={e => updateStyle('padding', e.target.value + 'px')}
        />
        <span style={{ marginLeft: 8 }}>{props.style?.padding || '0px'}</span>
      </div>
    </div>
  );
}
