import React, { useState } from 'react';

export function TextArea({ label, value, onChange, placeholder, rows = 5, ...props }) {
    const [focused, setFocused] = useState(false);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
        marginBottom: 'var(--space-md)'
    };

    const labelStyle = {
        fontSize: 'var(--text-xs)',
        fontWeight: '700',
        textTransform: 'uppercase',
        color: focused ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        letterSpacing: '0.05em',
        transition: 'color 0.2s ease',
        marginLeft: '2px'
    };

    const inputStyle = {
        padding: '16px',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${focused ? 'var(--color-accent)' : 'transparent'}`,
        background: 'var(--color-bg-input)', /* Warm BG */
        fontSize: 'var(--text-base)',
        fontWeight: '500', /* Readable weight */
        fontFamily: 'var(--font-sans)',
        resize: 'vertical',
        outline: 'none',
        transition: 'all 0.2s ease',
        boxShadow: focused ? '0 0 0 3px var(--color-accent-soft)' : 'none',
        lineHeight: '1.6',
        color: 'var(--color-text-primary)',
        minHeight: '120px'
    };

    return (
        <div style={containerStyle}>
            {label && <label style={labelStyle}>{label}</label>}
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                style={inputStyle}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
        </div>
    );
}
