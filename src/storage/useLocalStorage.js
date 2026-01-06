import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // Get from local storage then parse
    const readValue = () => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));

                // Dispatch a custom event so other useLocalStorage hooks in this tab know to update
                window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key } }));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (e) => {
            // Handle cross-tab 'storage' events
            if (e.type === 'storage' && e.key === key) {
                setStoredValue(readValue());
            }
            // Handle same-tab custom events
            if (e.type === 'local-storage-update' && e.detail.key === key) {
                setStoredValue(readValue());
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-storage-update', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage-update', handleStorageChange);
        };
    }, [key]);

    return [storedValue, setValue];
}
