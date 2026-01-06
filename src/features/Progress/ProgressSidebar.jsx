import React from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card } from '../../components/Card';
import { getWeekId } from '../../utils/date';

export function ProgressSidebar() {
    const [weeks] = useLocalStorage(STORAGE_KEYS.WEEKS, []);
    const [objectives] = useLocalStorage(STORAGE_KEYS.OBJECTIVES, []);

    // Active Focus
    const activeObjective = objectives.find(o => o.status === 'active');

    // Current Week Stats
    const currentWeekId = getWeekId();
    const currentWeek = weeks.find(w => w.id === currentWeekId);

    const tasks = currentWeek?.tasks || [];
    const completedTasks = tasks.filter(t => t.done).length;
    const definedTasks = tasks.filter(t => t.text && t.text.trim() !== '');
    const progress = definedTasks.length > 0 ? Math.round((completedTasks / definedTasks.length) * 100) : 0;

    return (
        <aside className="sidebar-col">
            <Card style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
                textAlign: 'right',
                marginBottom: 'var(--space-md)'
            }}>
                <div style={{ fontSize: 'var(--text-lg)', fontFamily: 'var(--font-serif)', color: 'var(--color-accent)' }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
            </Card>

            {/* Reverted to standard styling (matching Weekly Rhythm) */}
            <Card>
                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: '600', marginBottom: 'var(--space-md)' }}>
                    Current Focus
                </h3>
                {activeObjective ? (
                    <div>
                        <div style={{
                            fontWeight: '600',
                            marginBottom: 'var(--space-md)',
                            fontSize: 'var(--text-lg)',
                            lineHeight: '1.4',
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--color-text-primary)'
                        }}>
                            {activeObjective.title}
                        </div>
                        <div style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Ends {activeObjective.endDate}
                        </div>
                    </div>
                ) : (
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>No active focus</div>
                )}
            </Card>

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
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                    <strong>{completedTasks}</strong> / <strong>{definedTasks.length}</strong> priorities complete
                </div>
            </Card>
        </aside>
    );
}
