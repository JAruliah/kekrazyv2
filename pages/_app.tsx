import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import useGeneralStore from '../stores/GeneralStore';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createDefaultTheme } from '../themes/defaultTheme';
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { themeMode } = useGeneralStore();
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
