import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { AuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend"

const prisma = new PrismaClient()
const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      // on remplace le "server/from" par une fonction personnalisée
      async sendVerificationRequest({ identifier, url }) {
        const { error } = await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: identifier,
          subject: "Connexion à Espendida",
          html: `
            <div style="font-family:sans-serif;text-align:center;">
              <h2>🔗 Lien magique Espendida</h2>
              <p>Clique pour te connecter :</p>
              <a href="${url}" style="display:inline-block;background:#000;color:#fff;padding:10px 20px;border-radius:6px;">Se connecter</a>
              <p style="margin-top:16px;font-size:12px;color:#888;">Ce lien expirera bientôt.</p>
            </div>
          `,
        })

        if (error) throw new Error(error.message)
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          role: user.role,
        }
      }
      return session
    },
  },
}
