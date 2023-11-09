'use client'

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  // Appliquer la classe dark ou light au body
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = localStorage.getItem('theme') === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Basculer le thème
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
    </button>
  );
}
