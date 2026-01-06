import React from 'react';
import { FocusEditor } from '../Focus/FocusEditor';
import { WeeklyView } from '../Weekly/WeeklyView';

export function Planner() {
    return (
        <div className="fade-in">
            <h2 style={{
                marginBottom: 'var(--space-lg)',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '700'
            }}>
                Planning Phase
            </h2>
            <FocusEditor />
            <WeeklyView />
        </div>
    );
}
