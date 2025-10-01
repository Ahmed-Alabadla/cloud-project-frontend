import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#516EFF',
      dark: '#1F2B6C',
    },
    secondary: {
      main: '#FFE766',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#516EFF',
      dark: '#1F2B6C',
    },
    secondary: {
      main: '#FFE766',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});

export { theme, darkTheme };
