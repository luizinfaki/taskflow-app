"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function criarTarefa(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return

  const title = formData.get("title") as string
  if (!title?.trim()) return

  await prisma.task.create({
    data: {
      title,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
}

export async function alterarTarefa(id: string, done: boolean) {
  const session = await auth()
  if (!session?.user?.id) return

  console.log("done: " + done)

  await prisma.task.update({
    where: { id, userId: session.user.id },
    data: { done: done },
  })

  revalidatePath("/dashboard")
}

export async function deletarTarefa(id: string) {
  const session = await auth()
  if (!session?.user?.id) return

  await prisma.task.delete({
    where: { id, userId: session.user.id },
  })

  revalidatePath("/dashboard")
}