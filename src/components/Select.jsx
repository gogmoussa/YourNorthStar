import React, { useState } from 'react';

export function Select({ label, value, onChange, options = [], ...props }) {
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
        padding: '16px 18px',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${focused ? 'var(--color-accent)' : 'transparent'}`,
        background: 'var(--color-bg-input)',
        fontSize: 'var(--text-base)',
        fontWeight: '600',
        fontFamily: 'var(--font-sans)',
        outline: 'none',
        width: '100%',
        appearance: 'none',
        // Updated chevron color to match new accent
        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23D97706%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem top 50%',
        backgroundSize: '0.65rem auto',
        transition: 'all 0.2s ease',
        boxShadow: focused ? '0 0 0 3px var(--color-accent-soft)' : 'none',
        color: 'var(--color-text-primary)'
    };

    return (
        <div style={containerStyle}>
            {label && <label style={labelStyle}>{label}</label>}
            <select
                value={value}
                onChange={onChange}
                style={inputStyle}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
