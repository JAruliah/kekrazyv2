import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
// import login from '../login';
const prisma = new PrismaClient();
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // db lookup
        if(credentials!= undefined){
          const user = await prisma.user.findFirst({
            select:{
              username: true,
              email: true,
              firstName: true,
              lastName: true,
              image: true
            },
            where: {
              username: credentials.username
            }
          })
          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(credentials.password, salt, function(err, hash) {
            });
          });
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: ({token, user}) => {
      if(user){
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    session: ({token, session}) => {
      if(token){
        session.id = token.id;
        session.user = token.user;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
})