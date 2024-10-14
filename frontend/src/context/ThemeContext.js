// src/context/ThemeContext.js
import React, { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Apply the theme class to the body
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
