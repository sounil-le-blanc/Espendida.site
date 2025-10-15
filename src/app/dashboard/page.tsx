"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">
          Veuillez vous connecter pour accéder au dashboard.
        </p>
      </main>
    )
  }

  const handleSave = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })

    if (res.ok) alert("✅ Article enregistré !")
    else alert("❌ Erreur lors de la sauvegarde")
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">🪶 Nouvel article</h1>

      <input
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="Titre de l'article"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <textarea
          className="w-full h-96 border border-gray-300 rounded p-2 font-mono"
          placeholder="Écris ici ton article en Markdown..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="w-full h-96 border border-gray-200 bg-white p-4 overflow-y-auto rounded prose">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        💾 Enregistrer
      </button>
    </main>
  )
}
