import { createContext } from 'react';

interface ThemeContextType {
    themeMode: string;
    handleThemeModeSwitch: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'dark',
  handleThemeModeSwitch: async () => undefined,
});

export default ThemeContext;
