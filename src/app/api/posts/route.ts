import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })

  const data = await req.json()
  const { title, content } = data

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user)
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 })

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  })

  return NextResponse.json({ post })
}
