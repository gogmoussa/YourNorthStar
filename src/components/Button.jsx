import React from 'react';

export function Button({ children, onClick, variant = 'primary', ...props }) {
    const baseStyle = {
        padding: '12px 24px', // Use pixel values or calc for specific button feel
        borderRadius: 'var(--radius-sm)', // Squircles
        fontWeight: '500',
        fontSize: 'var(--text-sm)',
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '0.01em',
        cursor: 'pointer'
    };

    const variants = {
        primary: {
            background: 'var(--color-accent)',
            color: 'white',
            boxShadow: '0 4px 6px rgba(198, 156, 109, 0.25)', // Colored shadow
            border: '1px solid transparent'
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            border: '1px solid transparent'
        },
        outline: {
            background: 'transparent',
            color: 'var(--color-accent)',
            border: '1px solid var(--color-accent)'
        }
    };

    const [isHovered, setIsHovered] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);

    const style = {
        ...baseStyle,
        ...variants[variant],
        ...(isHovered && variant === 'primary' ? { background: 'var(--color-accent-hover)', transform: 'translateY(-1px)' } : {}),
        ...(isHovered && variant === 'ghost' ? { background: 'var(--color-accent-soft)', color: 'var(--color-text-primary)' } : {}),
        ...(isActive ? { transform: 'scale(0.98)' } : {})
    };

    return (
        <button
            onClick={onClick}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            {...props}
        >
            {children}
        </button>
    );
}
