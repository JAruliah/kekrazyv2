import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { DefaultLayout } from '../components/Layouts/DefaultLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </UserProvider>
  )
}

export default MyApp
