"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold">🌿 Espendida</h1>

      {session ? (
        <>
          <p className="text-lg">
            Connecté en tant que{" "}
            <span className="font-semibold">{session.user?.email}</span>
          </p>

          <button
            onClick={() => signOut()}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Se déconnecter
          </button>
        </>
      ) : (
        <>
          <p className="text-lg text-center max-w-md">
            Bienvenue sur le blog vivant d’Espendida.
            <br /> Connecte-toi pour publier ou lire les articles.
          </p>

          <button
            onClick={() => router.push("/signin")}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Se connecter
          </button>
        </>
      )}
    </main>
  )
}
