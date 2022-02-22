import styles from './ThemeToggle.module.css';

import { useTheme } from 'hooks/theme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className={styles.button} onClick={toggleTheme}>
            {theme}
        </button>
    );
};

export default ThemeToggle;
