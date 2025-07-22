import React, { useEffect, useState } from 'react';

const THEME_KEY = 'anora-theme';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Prefer saved theme, else system preference
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((d) => !d)}
      style={{
        padding: '1rem 1rem',
        borderRadius: 100,
        border: '1px solid #ccc',
        background: darkMode ? '#222' : '#eee',
        color: darkMode ? '#fff' : '#222',
        cursor: 'pointer',
        fontSize: '1rem',
      }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '🌞' : '🌙'}
    </button>
  );
}
