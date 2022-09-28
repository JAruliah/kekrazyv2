import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '../../../prisma/prismaClient';
import bcrypt from 'bcrypt';
// import login from '../login';
export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          // db lookup
          const saltRounds = 10;
          if (credentials != undefined) {
            const userObj = await prisma.user.findFirst({
              select: {
                id: true,
                username: true,
                email: true,
                firstName: true,
                lastName: true,
                image: true,
                password: true,
              },
              where: {
                username: credentials.username,
              },
            });
            if (userObj) {
              const match = await bcrypt.compare(
                credentials.password,
                userObj.password
              );
              if (match) {
                return {
                  id: userObj.id,
                  username: userObj.username,
                  email: userObj.email,
                  firstName: userObj.firstName,
                  lastName: userObj.lastName,
                  image: userObj.image,
                };
              }
            }
          }
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.log(e.message);
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token) {
        session.id = token.id;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
