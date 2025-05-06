import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const lightTheme = {
    '--text': '#05090a',
    '--background': '#f0f5f9',
    '--primary': '#4a99c4',
    '--primary-hover': '#3a7a9b',
    '--secondary': '#93c6e1',
    '--secondary-hover': '#7baac1',
    '--accent': '#6ab4dc',
    '--accent-hover': '#5593b1',
    '--container': '#fff',
    '--home': 'rgba(145, 197, 225, 0.5)',
    '--text-primary': '#333333', /* Texto principal */
    '--text-secondary': '#666666', /* Texto secundario */
    '--text-on-dark': '#ffffff', /* Texto sobre fondo oscuro */
    '--text-on-light': '#05090a', /* Texto sobre fondo claro */
    '--text-error': '#ff0000', /* Texto de error */
    '--text-success': '#008000' /* Texto de éxito */
  };

  const darkTheme = {
    '--text': '#e0e6ed', // Un tono ligeramente más oscuro para mejor contraste
    '--background': '#0a0f14', // Un tono más profundo para el fondo
    '--primary': '#4a99c4', // Un azul más vibrante
    '--primary-hover': '#3a7ca0', // Un tono más oscuro para el hover
    '--secondary': '#2a6b8e', // Un azul más profundo
    '--secondary-hover': '#204f6a', // Un tono más oscuro para el hover
    '--accent': '#2e7fae', // Un azul más vibrante
    '--accent-hover': '#235f82', // Un tono más oscuro para el hover
    '--container': '#2b2b2b', // Un gris más oscuro para los contenedores
    '--home': 'rgba(145, 197, 225, 0.5)', // Manteniendo el mismo color
    '--text-primary': '#e0e6ed', // Un tono ligeramente más oscuro para mejor contraste
    '--text-secondary': '#b0b0b0', // Un gris más claro para el texto secundario
    '--text-on-dark': '#ffffff', // Manteniendo el mismo color
    '--text-on-light': '#0a0f14', // Un tono más oscuro para el texto sobre fondos claros
    '--text-error': '#ff4d4d', // Manteniendo el mismo color
    '--text-success': '#00cc00' // Manteniendo el mismo color
  };

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });
  const [colors, setColors] = useState(theme === 'light' ? lightTheme : darkTheme);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    const themeColors = theme === 'light' ? lightTheme : darkTheme;
    Object.keys(themeColors).forEach((key) => {
      root.style.setProperty(key, themeColors[key]);
    });
    setColors(themeColors);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
      <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
