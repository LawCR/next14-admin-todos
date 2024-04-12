import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/features/auth/actions/auth-actions"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "usuario@gmail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "********" }
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(credentials?.email!, credentials?.password!)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } 
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Aqui podemos condicionar segun el return (boolean) si queremos que algun tipo de usuario no pueda loguearse
    async signIn({}) {
      return true
    },
    async jwt({token}) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token?.email ?? 'no-email'
        }
      })

      if (dbUser?.isActive === false) {
        throw new Error('User is not active')
      }
      
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-id'

      return token
    },
    async session({session, token}) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session
    },
    // async redirect({url, baseUrl}) {
    //   return url
    // },
  }
}

const handler =  NextAuth(authOptions)

export {
  handler as GET,
  handler as POST,
}