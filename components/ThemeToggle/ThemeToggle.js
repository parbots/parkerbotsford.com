import styles from './ThemeToggle.module.css';

import { useTheme } from 'hooks/theme';

import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className={styles.button} onClick={toggleTheme}>
            {theme == 'light' && (
                <FontAwesomeIcon
                    icon={faSun}
                    fixedWidth
                    className={styles.icon}
                />
            )}
            {theme == 'dark' && (
                <FontAwesomeIcon
                    icon={faMoon}
                    fixedWidth
                    className={styles.icon}
                />
            )}
        </button>
    );
};

export default ThemeToggle;
