import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { TarefaItem } from "./TarefaItem"
import { NovaTarefa } from "./NovaTarefa"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  const tarefas = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  const pendentes = tarefas.filter(t => !t.done)
  const concluidas = tarefas.filter(t => t.done)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Olá, {session.user.name}</h1>
            <p className="text-gray-500 text-sm mt-1">
              {pendentes.length} tarefa{pendentes.length !== 1 ? "s" : ""} pendente{pendentes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <NovaTarefa />
        </div>

        <div className="flex flex-col gap-2">
          {pendentes.map(tarefa => (
            <TarefaItem
              key={tarefa.id}
              id={tarefa.id}
              title={tarefa.title}
              done={tarefa.done}
            />
          ))}

          {concluidas.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Concluídas</p>
              <div className="flex flex-col gap-2">
                {concluidas.map(tarefa => (
                  <TarefaItem
                    key={tarefa.id}
                    id={tarefa.id}
                    title={tarefa.title}
                    done={tarefa.done}
                  />
                ))}
              </div>
            </div>
          )}

          {tarefas.length === 0 && (
            <p className="text-center text-gray-400 mt-12">
              Nenhuma tarefa ainda. Crie uma acima.
            </p>
          )}
        </div>

      </div>
    </main>
  )
}