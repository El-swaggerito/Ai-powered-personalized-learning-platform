export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          interests: string | null
          performance: string | null
          career_aspirations: string | null
          skill_building_needs: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          interests?: string | null
          performance?: string | null
          career_aspirations?: string | null
          skill_building_needs?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          interests?: string | null
          performance?: string | null
          career_aspirations?: string | null
          skill_building_needs?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_recommendations: {
        Row: {
          id: string
          user_id: string
          title: string
          type: string
          description: string
          link: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          type: string
          description: string
          link: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          type?: string
          description?: string
          link?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
