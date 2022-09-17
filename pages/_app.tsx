import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultLayout } from '../components/Layouts/DefaultLayout';
import useGeneralStore from '../stores/GeneralStore';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { themeMode } = useGeneralStore();
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
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
