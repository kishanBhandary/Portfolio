import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    // Apply dark class to html and save preference
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    // Load saved preference on mount; fall back to system preference
    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }, []);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            aria-pressed={darkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            style={{
                position: 'relative',
                width: '64px',
                height: '32px',
                borderRadius: '9999px',
                backgroundColor: darkMode ? '#1e293b' : '#e2e8f0',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                outline: 'none',
                zIndex: 9999
            }}
            onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)';
            }}
            onBlur={(e) => {
                e.target.style.boxShadow = 'none';
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: darkMode ? '#fbbf24' : '#f59e0b',
                    transform: darkMode ? 'translateX(32px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                }}
            >
                {darkMode ? '🌙' : '☀️'}
            </div>
        </button>
    );
}