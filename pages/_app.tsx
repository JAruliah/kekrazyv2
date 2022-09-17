import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DefaultLayout } from '../components/Layouts/DefaultLayout';
import defaultTheme from './themes/defaultTheme';

import { ThemeProvider, CssBaseline } from '@mui/material';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
