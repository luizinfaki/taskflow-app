"use client"

import { alterarTarefa, deletarTarefa } from "./actions"

interface Props {
  id: string
  title: string
  done: boolean
}

export function TarefaItem({ id, title, done }: Props) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => alterarTarefa(id, e.target.checked)}
          className="w-4 h-4 cursor-pointer"
        />
        <span className={done ? "line-through text-gray-400" : ""}>
          {title}
        </span>
      </div>

      <button
        onClick={() => deletarTarefa(id)}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Deletar
      </button>
    </div>
  )
}