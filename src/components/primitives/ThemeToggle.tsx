import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{ fontFamily: 'var(--font-mono)' }}
      className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors duration-200"
    >
      {dark ? 'light' : 'dark'}
    </button>
  );
}
