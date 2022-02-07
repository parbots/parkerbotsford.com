import styles from './ThemeToggle.module.css';

import { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <button className={styles.button} onClick={() => setTheme(nextTheme)}>
            {nextTheme}
        </button>
    );
};

export default ThemeToggle;
