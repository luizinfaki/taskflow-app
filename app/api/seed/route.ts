import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function GET() {
  const senha = await bcrypt.hash("123456", 10)

  const user = await prisma.user.upsert({
    where: { email: "teste@teste.com" },
    update: {},
    create: {
      name: "Luiz",
      email: "teste@teste.com",
      password: senha,
    },
  })

  return NextResponse.json({ ok: true, user })
}