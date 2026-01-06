import React from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card } from '../../components/Card';

export function VisionDisplay() {
    const [vision] = useLocalStorage(STORAGE_KEYS.VISION, {
        longText: '',
        sentence: ''
    });

    if (!vision.sentence && !vision.longText) return null;

    return (
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)', padding: 'var(--space-md) 0' }}>
            <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-3xl)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)',
                lineHeight: '1.2'
            }}>
                {vision.sentence || "Define Your North Star"}
            </h2>
            {vision.longText && (
                <p style={{
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                }}>
                    "{vision.longText}"
                </p>
            )}
            <div style={{
                marginTop: 'var(--space-lg)',
                height: '2px',
                width: '40px',
                background: 'var(--color-accent)',
                margin: 'var(--space-lg) auto 0'
            }} />
        </div>
    );
}
