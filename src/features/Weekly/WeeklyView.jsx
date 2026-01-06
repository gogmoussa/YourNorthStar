import React from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card, Section } from '../../components/Card';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { getWeekId } from '../../utils/date';

const DAYS = [
    { value: '', label: 'Select Day' },
    { value: 'Mon', label: 'Monday' },
    { value: 'Tue', label: 'Tuesday' },
    { value: 'Wed', label: 'Wednesday' },
    { value: 'Thu', label: 'Thursday' },
    { value: 'Fri', label: 'Friday' },
    { value: 'Sat', label: 'Saturday' },
    { value: 'Sun', label: 'Sunday' }
];

export function WeeklyView() {
    const [weeks, setWeeks] = useLocalStorage(STORAGE_KEYS.WEEKS, []);
    const currentWeekId = getWeekId();

    // Handle legacy or broken state
    const safeWeeks = Array.isArray(weeks) ? weeks : [];

    const weekIndex = safeWeeks.findIndex(w => w.id === currentWeekId);

    const currentWeek = weekIndex !== -1 ? safeWeeks[weekIndex] : {
        id: currentWeekId,
        primaryFocus: '',
        tasks: [
            { id: 1, text: '', done: false, targetDay: '' },
            { id: 2, text: '', done: false, targetDay: '' },
            { id: 3, text: '', done: false, targetDay: '' }
        ],
        confidence: 5,
        reflection: ''
    };

    const updateWeek = (updates) => {
        const newWeek = { ...currentWeek, ...updates };
        let newWeeks = [...safeWeeks];
        if (weekIndex !== -1) {
            newWeeks[weekIndex] = newWeek;
        } else {
            newWeeks.push(newWeek);
        }
        setWeeks(newWeeks);
    };

    const handleTaskUpdate = (idx, field, value) => {
        const newTasks = [...currentWeek.tasks];
        newTasks[idx] = { ...newTasks[idx], [field]: value };
        updateWeek({ tasks: newTasks });
    };

    return (
        <Section title={`Step 3: This Week (${currentWeekId})`}>
            <Card>
                <Input
                    label="Weekly Primary Focus"
                    placeholder="One big thing to move the needle..."
                    value={currentWeek.primaryFocus}
                    onChange={(e) => updateWeek({ primaryFocus: e.target.value })}
                />

                <div style={{ marginTop: 'var(--space-lg)' }}>
                    <label style={{ fontSize: 'var(--text-xs)', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--space-md)', letterSpacing: '0.05em' }}>
                        Weekly Priorities (Max 3)
                    </label>
                    {currentWeek.tasks.map((task, idx) => (
                        <div key={task.id} style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr auto',
                            gap: 'var(--space-sm)',
                            alignItems: 'center',
                            background: 'var(--color-bg-input)', // Warm background for items too
                            padding: 'var(--space-sm)',
                            borderRadius: 'var(--radius-sm)',
                            marginBottom: 'var(--space-sm)',
                            border: '1px solid transparent'
                        }}>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={(e) => handleTaskUpdate(idx, 'done', e.target.checked)}
                                style={{ width: '24px', height: '24px', accentColor: 'var(--color-success)', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                placeholder="Task description"
                                value={task.text}
                                onChange={(e) => handleTaskUpdate(idx, 'text', e.target.value)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: 'var(--text-base)',
                                    fontWeight: '500',
                                    outline: 'none',
                                    textDecoration: task.done ? 'line-through' : 'none',
                                    color: task.done ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)', /* Pop text here too */
                                    width: '100%'
                                }}
                            />
                            <select
                                value={task.targetDay}
                                onChange={(e) => handleTaskUpdate(idx, 'targetDay', e.target.value)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'var(--text-sm)',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    textAlign: 'right',
                                    fontWeight: '600'
                                }}
                            >
                                {DAYS.map(d => <option key={d.value} value={d.value}>{d.value || 'Day'}</option>)}
                            </select>
                        </div>
                    ))}
                </div>
            </Card>
        </Section>
    );
}
