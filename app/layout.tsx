import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/SessionProvider"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Gerencie suas tarefas com simplicidade",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={geist.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}