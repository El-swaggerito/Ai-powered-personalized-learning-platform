"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { BookHeart, GraduationCap, Briefcase, Lightbulb, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

interface UserProfileData {
  interests: string
  performance: string
  careerAspirations: string
  skillBuildingNeeds: string
}

export function UserProfile({ onProfileUpdate }: { onProfileUpdate: (data: UserProfileData) => void }) {
  const [profileData, setProfileData] = useState<UserProfileData>({
    interests: "",
    performance: "",
    careerAspirations: "",
    skillBuildingNeeds: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a success animation before transitioning
    if (formRef.current) {
      // First show success message
      setShowSuccess(true)

      // Then animate form
      gsap.to(formRef.current, {
        y: -10,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.7, // Wait for success message to show
        onComplete: () => {
          onProfileUpdate(profileData)
        },
      })
    } else {
      onProfileUpdate(profileData)
    }
  }

  // Auto-focus first field on mount
  useEffect(() => {
    const firstInput = document.getElementById("interests")
    if (firstInput) {
      firstInput.focus()
    }
  }, [])

  const formFields = [
    {
      id: "interests",
      name: "interests",
      label: "Interests",
      icon: <BookHeart className="mr-2 h-4 w-4" />,
      placeholder: "E.g., Machine Learning, History, Art",
      isTextarea: true,
      helperText: "What subjects or topics are you passionate about?",
    },
    {
      id: "performance",
      name: "performance",
      label: "Academic Performance",
      icon: <GraduationCap className="mr-2 h-4 w-4" />,
      placeholder: "E.g., GPA or recent grades",
      isTextarea: false,
      helperText: "How are you performing academically?",
    },
    {
      id: "careerAspirations",
      name: "careerAspirations",
      label: "Career Aspirations",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      placeholder: "E.g., Software Engineer, Data Scientist",
      isTextarea: false,
      helperText: "What career path are you interested in pursuing?",
    },
    {
      id: "skillBuildingNeeds",
      name: "skillBuildingNeeds",
      label: "Skill-building Needs",
      icon: <Lightbulb className="mr-2 h-4 w-4" />,
      placeholder: "E.g., Public speaking, Leadership, Programming",
      isTextarea: true,
      helperText: "What skills would you like to develop or improve?",
    },
  ]

  const isFormValid = Object.values(profileData).every((value) => value.trim() !== "")

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full bg-white shadow-lg border-blue-100 overflow-hidden">
        <CardHeader className="pb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-95" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=800')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10">
            <CardTitle className="text-white text-2xl">Your Learning Profile</CardTitle>
            <CardDescription className="text-blue-100">
              Tell us about yourself to get personalized learning recommendations
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6 relative">
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 right-0 bg-green-50 border-b border-green-100 p-3 flex items-center justify-center text-green-700 z-10"
              >
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                Profile updated successfully! Generating recommendations...
              </motion.div>
            )}
          </AnimatePresence>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field, index) => (
              <motion.div
                key={field.id}
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Label htmlFor={field.id} className="flex items-center text-blue-700 font-medium">
                  {field.icon}
                  {field.label}
                </Label>
                {field.isTextarea ? (
                  <Textarea
                    id={field.id}
                    name={field.name}
                    value={profileData[field.name as keyof UserProfileData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="min-h-[100px] border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                ) : (
                  <Input
                    id={field.id}
                    name={field.name}
                    value={profileData[field.name as keyof UserProfileData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                )}
                <p className="text-xs text-blue-500 italic">{field.helperText}</p>
              </motion.div>
            ))}
          </form>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-lg border-t border-blue-100">
          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full transition-all duration-300 ${
                isFormValid
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Update Profile
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
