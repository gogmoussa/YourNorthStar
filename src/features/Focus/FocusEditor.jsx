import React from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card, Section } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { formatDateForInput, getToday, getDefaultFocusEnd } from '../../utils/date';

export function FocusEditor() {
    const [objectives, setObjectives] = useLocalStorage(STORAGE_KEYS.OBJECTIVES, []);

    // Find active objective
    const activeIndex = objectives.findIndex(o => o.status === 'active');
    const activeObjective = activeIndex !== -1 ? objectives[activeIndex] : null;

    const handleUpdate = (updates) => {
        if (activeIndex === -1) return;
        const newObjectives = [...objectives];
        newObjectives[activeIndex] = { ...newObjectives[activeIndex], ...updates };
        setObjectives(newObjectives);
    };

    const startNewFocus = () => {
        const newFocus = {
            id: Date.now().toString(),
            title: '',
            description: '',
            startDate: formatDateForInput(getToday()),
            endDate: getDefaultFocusEnd(),
            indicators: ['', '', ''],
            status: 'active'
        };
        setObjectives([...objectives, newFocus]);
    };

    if (!activeObjective) {
        return (
            <Section title="Step 2: Set 12-Week Focus">
                <Card style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
                    <p style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text-secondary)' }}>
                        You have no active focus. Let's set one for the next 12 weeks.
                    </p>
                    <Button onClick={startNewFocus}>Start New Focus</Button>
                </Card>
            </Section>
        );
    }

    return (
        <Section title="Step 2: Set 12-Week Focus">
            <Card>
                <Input
                    label="Main Objective"
                    placeholder="e.g. Launch the MVP"
                    value={activeObjective.title}
                    onChange={(e) => handleUpdate({ title: e.target.value })}
                />
                <div>
                    <Input
                        label="Start Date"
                        type="date"
                        value={activeObjective.startDate}
                        onChange={(e) => handleUpdate({ startDate: e.target.value })}
                    />
                    <Input
                        label="Target Date"
                        type="date"
                        value={activeObjective.endDate}
                        onChange={(e) => handleUpdate({ endDate: e.target.value })}
                    />
                </div>

                <div style={{ marginTop: 'var(--space-sm)' }}>
                    <label style={{ fontSize: 'var(--text-xs)', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--space-sm)', letterSpacing: '0.05em' }}>
                        Measurable Indicators (Max 3)
                    </label>
                    {activeObjective.indicators.map((indicator, idx) => (
                        <Input
                            key={idx}
                            placeholder={`Indicator ${idx + 1}`}
                            value={indicator}
                            onChange={(e) => {
                                const newIndicators = [...activeObjective.indicators];
                                newIndicators[idx] = e.target.value;
                                handleUpdate({ indicators: newIndicators });
                            }}
                        />
                    ))}
                </div>
            </Card>
        </Section>
    );
}
