"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User, Session } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
        }

        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error("Unexpected error getting session:", error)
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Create user profile if it doesn't exist
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single()

          if (!profile) {
            const { error } = await supabase.from("user_profiles").insert({
              user_id: session.user.id,
              full_name: session.user.user_metadata?.full_name || null,
            })

            if (error) {
              console.error("Error creating user profile:", error)
            }
          }
        } catch (error) {
          console.error("Error handling user profile:", error)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signOut = async () => {
    try {
      console.log("Attempting to sign out...")
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
        throw error
      }
      console.log("Sign out successful")
      // Clear local state immediately
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error("Unexpected error during sign out:", error)
      throw error
    }
  }

  return <AuthContext.Provider value={{ user, session, loading, signOut }}>{children}</AuthContext.Provider>
}
