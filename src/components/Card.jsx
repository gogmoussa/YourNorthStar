import React from 'react';

export function Card({ children, className = '', ...props }) {
    const cardStyle = {
        background: 'var(--color-bg-panel)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'var(--space-lg)',
        /* Refined border for distinctness */
        border: '1px solid var(--color-border)',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
    };

    return (
        <div
            style={cardStyle}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </div>
    );
}

export function Section({ title, children, description }) {
    const sectionStyle = {
        paddingLeft: 'var(--space-lg)',
        borderLeft: '4px solid var(--color-section-border)',
        marginBottom: 'var(--space-xxl)', /* Large spacing between steps for "Better sectioning" */
        marginLeft: '-2px' /* align border */
    };

    return (
        <section style={sectionStyle}>
            <header style={{ marginBottom: 'var(--space-md)' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                    {title}
                </h2>
                {description && (
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', maxWidth: '600px' }}>
                        {description}
                    </p>
                )}
            </header>
            {children}
        </section>
    );
}
