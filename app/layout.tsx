import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "./components/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Personalized Learning Platform",
  description: "AI-powered learning recommendations for students",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
