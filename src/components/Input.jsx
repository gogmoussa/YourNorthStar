import React, { useState } from 'react';

export function Input({ label, value, onChange, placeholder, type = 'text', ...props }) {
    const [focused, setFocused] = useState(false);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
        marginBottom: 'var(--space-md)'
    };

    const labelStyle = {
        fontSize: 'var(--text-xs)',
        fontWeight: '700', /* Bolder label */
        textTransform: 'uppercase',
        color: focused ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        letterSpacing: '0.05em',
        transition: 'color 0.2s ease',
        marginLeft: '2px'
    };

    const inputStyle = {
        padding: '16px 18px', /* Larger hit area */
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${focused ? 'var(--color-accent)' : 'transparent'}`, /* No border by default */
        background: 'var(--color-bg-input)', /* WARM BACKGROUND */
        fontSize: 'var(--text-base)',
        fontWeight: '600', /* Text Pops */
        fontFamily: 'var(--font-sans)',
        outline: 'none',
        width: '100%',
        transition: 'all 0.2s ease',
        boxShadow: focused ? '0 0 0 3px var(--color-accent-soft)' : 'none',
        color: 'var(--color-text-primary)'
    };

    return (
        <div style={containerStyle}>
            {label && <label style={labelStyle}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={inputStyle}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
        </div>
    );
}
