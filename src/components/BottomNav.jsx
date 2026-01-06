import React from 'react';

export function BottomNav({ activeView, onViewChange }) {
    const containerStyle = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '70px',
        background: 'var(--color-bg-panel)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.03)'
    };

    const navItems = [
        { id: 'dashboard', label: 'Review', icon: '🏠' },
        { id: 'planner', label: 'Plan', icon: '📝' },
        { id: 'daily', label: 'Daily', icon: '☀' },
        { id: 'settings', label: 'Settings', icon: '⚙' }
    ];

    return (
        <nav style={containerStyle} className="mobile-nav">
            {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            flex: 1,
                            height: '100%',
                            color: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                            transition: 'color 0.2s',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: isActive ? '600' : '500', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
