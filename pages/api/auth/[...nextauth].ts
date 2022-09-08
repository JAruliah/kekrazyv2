import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
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
        console.log(credentials)
        const user = await prisma.user.findFirst({
          where: {
            userName: credentials?.username
          }
        });
        if(user){
          return user;
        }else{
          return null;
        }
      }
    })
  ]
})