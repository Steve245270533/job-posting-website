import { prismaAdapter } from "better-auth/adapters/prisma";
import { defineServerAuth } from '@nuxtjs/better-auth/config'

export default defineServerAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: { enabled: true },
})
