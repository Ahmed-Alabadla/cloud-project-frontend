import React, { useCallback, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import type { AppContextProps } from './types';
import { theme, darkTheme } from '../theme/theme';
import ThemeContext from './themeContext';

const CheckThemeProvider : React.FC<AppContextProps> = ({ children }) => {
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light');

  const handleThemeModeSwitch = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const ThemeContextValue = useMemo(
    () => ({ themeMode, handleThemeModeSwitch }),
    [themeMode, handleThemeModeSwitch],
  );

  return (
    <ThemeContext.Provider value={ThemeContextValue}>
      <ThemeProvider theme={themeMode === 'light' ? theme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CheckThemeProvider;
