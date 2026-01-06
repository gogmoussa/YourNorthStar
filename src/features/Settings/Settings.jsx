import React from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';

export function Settings() {
    const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.SETTINGS, {
        nudgesEnabled: false,
        nudgeFrequency: 'weekly',
        nudgeTime: '09:00'
    });

    const updateSettings = (updates) => {
        setSettings({ ...settings, ...updates });
    };

    return (
        <section style={{ marginBottom: 'var(--space-xxl)' }}>
            <header style={{ marginBottom: 'var(--space-md)' }}>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                    Accountability Nudges
                </h2>
            </header>
            <Card>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text-secondary)' }}>Enable Nudges</label>
                    <input
                        type="checkbox"
                        checked={settings.nudgesEnabled}
                        onChange={(e) => updateSettings({ nudgesEnabled: e.target.checked })}
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                    />
                </div>

                {settings.nudgesEnabled && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                        <Select
                            label="Frequency"
                            value={settings.nudgeFrequency}
                            onChange={(e) => updateSettings({ nudgeFrequency: e.target.value })}
                            options={[
                                { value: 'daily', label: 'Daily' },
                                { value: 'weekly', label: 'Weekly' }
                            ]}
                        />
                        <Select
                            label="Time"
                            value={settings.nudgeTime}
                            onChange={(e) => updateSettings({ nudgeTime: e.target.value })}
                            options={[
                                { value: '09:00', label: '9:00 AM' },
                                { value: '12:00', label: '12:00 PM' },
                                { value: '17:00', label: '5:00 PM' }
                            ]}
                        />
                    </div>
                )}
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-sm)' }}>
                    *Browser notifications must be allowed.
                </p>
            </Card>
        </section>
    );
}
