import React from 'react';
import { VisionDisplay } from '../Vision/VisionDisplay';
import { WeeklyView } from '../Weekly/WeeklyView'; // We'll reuse this for now, but strip editing later if needed? 
// Actually, re-using WeeklyView is fine, but we might want a "Read-Mode" version. 
// For MVP, using the same view in "Review" is okay, but user asked for "Planning" to be separate.
// Let's create a specialized Dashboard that uses a "Checklist Only" version of weekly tasks.

import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { getWeekId } from '../../utils/date';
import { Card, Section } from '../../components/Card';

export function Dashboard() {
    return (
        <div className="fade-in">
            <VisionDisplay />
            <Section title="This Week's Execution">
                <WeeklyChecklist />
            </Section>
            {/* We could add Focus Progress here too? */}
        </div>
    );
}

function WeeklyChecklist() {
    const [weeks, setWeeks] = useLocalStorage(STORAGE_KEYS.WEEKS, []);
    const currentWeekId = getWeekId();
    const safeWeeks = Array.isArray(weeks) ? weeks : [];
    const weekIndex = safeWeeks.findIndex(w => w.id === currentWeekId);

    // We need to handle updates here too for checking boxes
    const currentWeek = weekIndex !== -1 ? safeWeeks[weekIndex] : {
        id: currentWeekId,
        tasks: []
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

    const handleTaskToggle = (idx) => {
        const newTasks = [...currentWeek.tasks];
        newTasks[idx] = { ...newTasks[idx], done: !newTasks[idx].done };
        updateWeek({ tasks: newTasks });
    }

    const tasks = currentWeek.tasks || [];
    const definedTasks = tasks.filter(t => t.text && t.text.trim().length > 0);

    if (definedTasks.length === 0) {
        return (
            <Card style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                No priorities set for this week yet. Go to the <strong>Plan</strong> tab.
            </Card>
        )
    }

    return (
        <Card>
            {definedTasks.map((task, idx) => (
                <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    padding: 'var(--space-md)',
                    borderBottom: idx < definedTasks.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'all 0.2s',
                    opacity: task.done ? 0.6 : 1
                }}>
                    <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => handleTaskToggle(tasks.indexOf(task))} // Need actual index
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-success)', cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: '500',
                            textDecoration: task.done ? 'line-through' : 'none',
                            color: task.done ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)'
                        }}>
                            {task.text}
                        </div>
                        {task.targetDay && (
                            <div style={{
                                fontSize: 'var(--text-cs)',
                                textTransform: 'uppercase',
                                fontWeight: '700',
                                color: 'var(--color-accent)',
                                marginTop: '4px'
                            }}>
                                {task.targetDay}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </Card>
    );
}
