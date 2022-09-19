import { createTheme } from '@mui/material';

export const createDefaultTheme = (themeMode: any) => {
  const defaultTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#3F51B5',
        dark: '#303F9F',
        light: '#C5CAE9',
      },
      secondary: {
        main: '#607D8B',
      },
      error: {
        main: '#da3428',
      },
      background: {
        paper: themeMode == 'dark' ? '#424242' : '#fff',
        default: themeMode == 'dark' ? '#303030' : '#fff',
      },
      text: {
        primary: themeMode == 'dark' ? '#FFFFFF' : '#212121',
        secondary: '#757575',
      },
      divider: '#BDBDBD',
    },
    typography: {
      fontFamily: 'Open Sans',
      h1: {
        fontFamily: 'Montserrat',
      },
      h2: {
        fontFamily: 'Montserrat',
      },
      h3: {
        fontFamily: 'Montserrat',
      },
      h4: {
        fontFamily: 'Montserrat',
      },
      h5: {
        fontFamily: 'Montserrat',
      },
      h6: {
        fontFamily: 'Montserrat',
      },
    },
  });
  return defaultTheme;
};
