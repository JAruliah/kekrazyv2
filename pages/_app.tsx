import '../styles/globals.css';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import useGeneralStore from '../stores/GeneralStore';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createDefaultTheme } from '../themes/defaultTheme';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { themeMode } = useGeneralStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('themeMode');
      if (theme != null) {
        useGeneralStore.setState({ themeMode: theme });
      }
    }
  }, []);
  const theme = createDefaultTheme(themeMode);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
