import React, { useState } from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card, Section } from '../../components/Card';
import { Settings as AccountSettings } from './Settings'; // Rename the old Settings component or merge?
// Actually, let's just rewrite Settings.jsx to act as the container, and move the Nudges into it.
// Wait, the file is `src/features/Settings/Settings.jsx`. I'll overwrite it.

import { VisionEditor } from '../Vision/VisionEditor';
import { Button } from '../../components/Button';

export function Settings() {
    const defaultSettings = {
        notifications: {
            weeklyPlan: true,
            midweekNudge: true,
            reflection: true
        },
        timing: '09:00',
        tone: 'gentle'
    };

    const [storedSettings, setSettings] = useLocalStorage(STORAGE_KEYS.SETTINGS, defaultSettings);

    const settings = {
        ...defaultSettings,
        ...storedSettings,
        notifications: {
            ...defaultSettings.notifications,
            ...(storedSettings?.notifications || {})
        }
    };

    const updateSettings = (key, val) => {
        setSettings(prev => ({ ...prev, [key]: val }));
    };

    const toggleNotification = (key) => {
        setSettings(prev => {
            const currentNotifications = prev?.notifications || defaultSettings.notifications;
            return {
                ...prev,
                notifications: {
                    ...currentNotifications,
                    [key]: !currentNotifications[key]
                }
            };
        });
    };

    return (
        <div className="fade-in">
            <Section title="North Star Vision">
                <div style={{ marginBottom: 'var(--space-lg)' }}>
                    <p style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-secondary)' }}>
                        This is your guiding light. Change it only when your life's direction shifts properly.
                    </p>
                    <VisionEditor />
                </div>
            </Section>

            <Section title="Accountability Settings">
                <Card>
                    <div style={{ marginBottom: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'var(--text-base)', fontWeight: '600', marginBottom: 'var(--space-sm)' }}>Notification Nudges</h3>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                            Gentle reminders to stay aligned. No spam, ever.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <Toggle
                                label="Weekly Planning Prompt (Mondays)"
                                checked={settings.notifications.weeklyPlan}
                                onChange={() => toggleNotification('weeklyPlan')}
                            />
                            <Toggle
                                label="Mid-week Encouragement (Wednesdays)"
                                checked={settings.notifications.midweekNudge}
                                onChange={() => toggleNotification('midweekNudge')}
                            />
                            <Toggle
                                label="End-of-week Reflection (Sundays)"
                                checked={settings.notifications.reflection}
                                onChange={() => toggleNotification('reflection')}
                            />
                        </div>
                    </div>
                </Card>
            </Section>
        </div>
    );
}

function Toggle({ label, checked, onChange }) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', cursor: 'pointer' }}>
            <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>{label}</span>
            <div style={{
                width: '48px',
                height: '24px',
                background: checked ? 'var(--color-accent)' : 'var(--color-border)',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background 0.2s'
            }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: checked ? '26px' : '2px',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }} />
                <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
            </div>
        </label>
    );
}
