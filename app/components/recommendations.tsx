"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { getRecommendations } from "../actions/recommendations"
import { Loader2, ExternalLink, BookOpen, Users, Lightbulb, Award, Filter, Search } from "lucide-react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Recommendation {
  title: string
  type: string
  description: string
  link: string
}

interface UserProfileData {
  interests: string
  performance: string
  careerAspirations: string
  skillBuildingNeeds: string
}

export function Recommendations({ profileData }: { profileData: UserProfileData }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true)
      setError(null)
      try {
        const result = await getRecommendations(profileData)
        setRecommendations(result)
      } catch (err) {
        setError("Failed to fetch recommendations. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (profileData.interests && profileData.performance) {
      fetchRecommendations()
    }
  }, [profileData])

  useEffect(() => {
    // Animate in when component becomes visible
    if (containerRef.current && !loading && recommendations.length > 0) {
      gsap.from(".recommendations-container", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        clearProps: "all",
      })
    }
  }, [loading, recommendations.length])

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = activeFilter ? rec.type.toLowerCase().includes(activeFilter.toLowerCase()) : true

    return matchesSearch && matchesFilter
  })

  // Get unique types for filter
  const recommendationTypes = [...new Set(recommendations.map((rec) => rec.type))]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"
            style={{ animationDuration: "2s" }}
          ></div>
          <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full shadow-lg">
            <Loader2 className="w-12 h-12 text-white animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-blue-700 font-medium text-lg">Generating personalized recommendations...</p>
          <p className="text-blue-500 text-sm mt-1">Analyzing your profile data</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Alert className="bg-red-50 border-red-200 text-red-800">
          <AlertTitle className="text-red-800 font-bold">Error Loading Recommendations</AlertTitle>
          <AlertDescription className="text-red-700">
            {error}
            <div className="mt-4">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <AlertTitle className="text-blue-800 font-bold">No Recommendations Yet</AlertTitle>
          <AlertDescription className="text-blue-700">
            Please update your profile with your interests and academic information to get personalized recommendations.
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  // Updated filtering logic
  const academicRecommendations = filteredRecommendations.filter(
    (rec) =>
      rec.type.toLowerCase().includes("academic") ||
      rec.type.toLowerCase().includes("course") ||
      rec.type.toLowerCase().includes("resource"),
  )

  const extracurricularRecommendations = filteredRecommendations.filter(
    (rec) =>
      rec.type.toLowerCase().includes("extracurricular") ||
      rec.type.toLowerCase().includes("activity") ||
      rec.type.toLowerCase().includes("workshop") ||
      rec.type.toLowerCase().includes("event"),
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      ref={containerRef}
      className="space-y-8 text-foreground recommendations-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-blue-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center">
          <Award className="mr-2 h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-blue-800">Your Personalized Recommendations</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
            <Input
              placeholder="Search recommendations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 border-blue-200 focus:border-blue-500 w-full sm:w-auto"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {recommendationTypes.map((type) => (
              <Badge
                key={type}
                variant="outline"
                className={`cursor-pointer transition-all ${
                  activeFilter === type ? "bg-blue-100 text-blue-800 border-blue-300" : "hover:bg-blue-50"
                }`}
                onClick={() => setActiveFilter(activeFilter === type ? null : type)}
              >
                <Filter className="h-3 w-3 mr-1" />
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      {filteredRecommendations.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-50 p-8 rounded-xl text-center"
        >
          <Search className="h-12 w-12 mx-auto text-blue-400 mb-4" />
          <h3 className="text-xl font-medium text-blue-800 mb-2">No matching recommendations</h3>
          <p className="text-blue-600">Try adjusting your search or filters to see more recommendations.</p>
          {(searchTerm || activeFilter) && (
            <Button
              variant="outline"
              className="mt-4 border-blue-300 text-blue-700"
              onClick={() => {
                setSearchTerm("")
                setActiveFilter(null)
              }}
            >
              Clear Filters
            </Button>
          )}
        </motion.div>
      ) : (
        <>
          {academicRecommendations.length > 0 && (
            <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
              <motion.h3 className="text-xl font-semibold flex items-center text-blue-700" variants={item}>
                <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                Academic Recommendations
              </motion.h3>
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {academicRecommendations.map((rec, index) => (
                  <RecommendationCard
                    key={`academic-${index}`}
                    recommendation={rec}
                    icon={<Lightbulb className="h-5 w-5 text-blue-500" />}
                    variants={item}
                    index={index}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {extracurricularRecommendations.length > 0 && (
            <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
              <motion.h3 className="text-xl font-semibold flex items-center text-blue-700" variants={item}>
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Extracurricular Activities
              </motion.h3>
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {extracurricularRecommendations.map((rec, index) => (
                  <RecommendationCard
                    key={`extracurricular-${index}`}
                    recommendation={rec}
                    icon={<Users className="h-5 w-5 text-blue-500" />}
                    variants={item}
                    index={index}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}

function RecommendationCard({
  recommendation,
  icon,
  variants,
  index,
}: {
  recommendation: Recommendation
  icon: React.ReactNode
  variants: any
  index: number
}) {
  return (
    <motion.div variants={variants} custom={index} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Card className="flex flex-col h-full bg-white border-blue-100 shadow-md overflow-hidden">
        <CardHeader className="relative pb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-95" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=400')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10">
            <CardTitle className="text-lg flex items-center text-white">
              {icon}
              <span className="ml-2">{recommendation.title}</span>
            </CardTitle>
            <CardDescription className="text-blue-100">{recommendation.type}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pt-4">
          <p className="text-sm text-gray-600 mb-4">{recommendation.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <a href={recommendation.link} target="_blank" rel="noopener noreferrer">
                Learn More <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
