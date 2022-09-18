import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

// JWT
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    user: User;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    username: String;
    firstName: String;
    lastName: String;
    email: String;
    image: String;
    settings: Settings;
  }

  interface Settings {
    theme: String;
  }

  interface Session {
    user: User;
  }
}
