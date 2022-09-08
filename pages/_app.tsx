import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { DefaultLayout } from '../components/Layouts/DefaultLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SessionProvider>
  )
}

export default MyApp
