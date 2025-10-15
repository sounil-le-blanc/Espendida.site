"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn("email", { email, callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Connexion Espendida</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entre ton email..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Recevoir le lien magique
        </button>
      </form>
    </div>
  )
}
