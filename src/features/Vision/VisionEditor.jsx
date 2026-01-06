import React from 'react';
import { useLocalStorage } from '../../storage/useLocalStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import { Card, Section } from '../../components/Card';
import { TextArea } from '../../components/TextArea';
import { Input } from '../../components/Input';

export function VisionEditor() {
    const [vision, setVision] = useLocalStorage(STORAGE_KEYS.VISION, {
        longText: '',
        sentence: ''
    });

    const handleChange = (field, value) => {
        setVision(prev => ({ ...prev, [field]: value }));
    };

    return (
        <Section
            title="Step 1: Define North Star Vision"
            description="Write a thoughtful paragraph. Then compress it into a single guiding sentence."
        >
            <Card>
                <TextArea
                    label="The Vision (Detailed)"
                    placeholder="Where do you want to be? What does it feel like? Write freely..."
                    value={vision.longText}
                    onChange={(e) => handleChange('longText', e.target.value)}
                    rows={6}
                    data-testid="vision-long-text"
                />
                <Input
                    label="The Single Sentence (Compressed)"
                    placeholder="e.g. 'I build systems that give me freedom.'"
                    value={vision.sentence}
                    onChange={(e) => handleChange('sentence', e.target.value)}
                    data-testid="vision-sentence"
                />
            </Card>
        </Section>
    );
}
