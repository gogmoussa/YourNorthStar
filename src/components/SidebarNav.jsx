import React from 'react';
import { useLocalStorage } from '../storage/useLocalStorage';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { Card } from '../components/Card';
import { getWeekId } from '../utils/date';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Review / Dashboard', icon: '🏠' },
    { id: 'planner', label: 'Planning', icon: '📝' },
    { id: 'daily', label: 'Daily Presence', icon: '☀' },
    { id: 'settings', label: 'Settings', icon: '⚙' }
];

export function SidebarNav({ activeView, onViewChange }) {
    const [weeks] = useLocalStorage(STORAGE_KEYS.WEEKS, []);
    const [objectives] = useLocalStorage(STORAGE_KEYS.OBJECTIVES, []);

    // Active Focus
    const activeObjective = objectives.find(o => o.status === 'active');

    // Stats
    const currentWeekId = getWeekId();
    const currentWeek = weeks.find(w => w.id === currentWeekId);
    const tasks = currentWeek?.tasks || [];
    const completedTasks = tasks.filter(t => t.done).length;
    const definedTasks = tasks.filter(t => t.text && t.text.trim() !== '');
    const progress = definedTasks.length > 0 ? Math.round((completedTasks / definedTasks.length) * 100) : 0;

    return (
        <aside className="sidebar-col">
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {NAV_ITEMS.map(item => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-md)',
                                padding: '12px 16px',
                                borderRadius: 'var(--radius-sm)',
                                background: isActive ? 'var(--color-bg-panel)' : 'transparent',
                                color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                fontWeight: isActive ? '600' : '500',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                fontSize: 'var(--text-base)',
                                border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                                boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem', width: '24px', textAlign: 'center' }}>{item.icon}</span>
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div style={{ height: '1px', background: 'var(--color-border)', margin: 'var(--space-md) 0' }} />

            <Card>
                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: '600', marginBottom: 'var(--space-md)' }}>
                    Weekly Rhythm
                </h3>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: '8px', fontWeight: '500' }}>
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--color-bg-input)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-success)', transition: 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} />
                    </div>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    Focus: <strong style={{ color: 'var(--color-text-primary)' }}>{activeObjective ? activeObjective.title : 'None'}</strong>
                </div>
            </Card>
        </aside>
    );
}
