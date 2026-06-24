"use client"

import { useState } from "react"
import { criarTarefa } from "./actions"

export function NovaTarefa() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    await criarTarefa(formData)
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="Nova tarefa..."
        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Adicionando..." : "Adicionar"}
      </button>
    </form>
  )
}