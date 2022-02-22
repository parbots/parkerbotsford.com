import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // The current theme state
    // TODO: Get system theme
    const [theme, setTheme] = useState('light');

    // Change the theme
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Whenever theme state changes, update DOM data-theme
    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Returns theme state and themeToggle()
export const useThemeContext = () => {
    return useContext(ThemeContext);
};
