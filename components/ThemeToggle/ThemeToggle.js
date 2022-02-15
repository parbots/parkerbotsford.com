import styles from './ThemeToggle.module.css';

import { useThemeContext } from './ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <button className={styles.button} onClick={toggleTheme}>
            {theme}
        </button>
    );
};

export default ThemeToggle;
