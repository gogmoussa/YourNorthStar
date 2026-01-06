import React from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card, Section } from '../../components/Card';
import { TextArea } from '../../components/TextArea';
import { formatDateForInput, getToday } from '../../utils/date';

export function DailyLog() {
    const [logs, setLogs] = useLocalStorage(STORAGE_KEYS.DAILY_LOGS, []);

    const todayStr = formatDateForInput(getToday());
    const logIndex = logs.findIndex(l => l.date === todayStr);
    const currentLog = logIndex !== -1 ? logs[logIndex] : {
        date: todayStr,
        mood: null,
        note: '',
        movement: false
    };

    const updateLog = (updates) => {
        const newLog = { ...currentLog, ...updates };
        let newLogs = [...logs];
        if (logIndex !== -1) {
            newLogs[logIndex] = newLog;
        } else {
            newLogs.push(newLog);
        }
        setLogs(newLogs);
    };

    return (
        <Section title="Step 4: Daily Presence">
            <Card>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                    <label style={{ fontSize: 'var(--text-xs)', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--space-sm)', letterSpacing: '0.05em' }}>
                        Mood (1-5)
                    </label>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                        {[1, 2, 3, 4, 5].map(val => (
                            <button
                                key={val}
                                onClick={() => updateLog({ mood: val })}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: '1px solid #ddd',
                                    background: currentLog.mood === val ? 'var(--color-accent)' : 'white',
                                    color: currentLog.mood === val ? 'white' : 'var(--color-text-primary)',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    boxShadow: currentLog.mood === val ? '0 4px 6px rgba(217, 119, 6, 0.3)' : 'none'
                                }}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>

                <TextArea
                    label="Micro-note"
                    placeholder="How are you feeling? What happened today?"
                    value={currentLog.note}
                    onChange={(e) => updateLog({ note: e.target.value.slice(0, 140) })}
                    rows={3}
                />
                <div style={{ marginTop: '-8px', paddingRight: 'var(--space-xs)', textAlign: 'right', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                    {currentLog.note.length}/140
                </div>
            </Card>
        </Section>
    );
}
