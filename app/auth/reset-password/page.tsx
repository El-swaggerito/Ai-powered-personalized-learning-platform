"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match",
      })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Password updated successfully! Redirecting...",
      })

      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An error occurred updating your password",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-blue-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-800">Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert
              className={`mb-4 ${message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
            >
              <AlertDescription className={message.type === "error" ? "text-red-700" : "text-green-700"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center">
                <Lock className="mr-2 h-4 w-4" />
                New Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter new password"
                minLength={6}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center">
                <Lock className="mr-2 h-4 w-4" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm new password"
                minLength={6}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
