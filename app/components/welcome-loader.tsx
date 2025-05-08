"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { BookOpen } from "lucide-react"

export function WelcomeLoader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create particles
    const particlesContainer = particlesRef.current
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute rounded-full opacity-0"

        // Randomize particle properties
        const size = Math.random() * 8 + 4
        const color = i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#6366f1" : "#8b5cf6"

        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.backgroundColor = color
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        particlesContainer.appendChild(particle)
      }
    }

    // Main animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          pointerEvents: "none",
        })
      },
    })

    // Animate particles
    if (particlesContainer) {
      const particles = particlesContainer.children
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]
        const delay = Math.random() * 0.5

        tl.to(
          particle,
          {
            opacity: 0.7,
            duration: 0.4,
            ease: "power2.out",
          },
          delay,
        )

        tl.to(
          particle,
          {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          `<+=0.1`,
        )
      }
    }

    // Animate logo and text
    tl.from(
      iconRef.current,
      {
        scale: 0,
        rotation: -45,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      },
      0.3,
    )
      .from(
        textRef.current?.children,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.7",
      )
      .to(
        iconRef.current,
        {
          y: -10,
          repeat: 1,
          yoyo: true,
          duration: 0.4,
          ease: "power1.inOut",
        },
        "+=0.2",
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #dbeafe 100%)",
      }}
    >
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      <div className="text-center px-6 relative z-10">
        <div ref={iconRef} className="inline-block mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-5 rounded-2xl shadow-lg">
            <BookOpen className="w-16 h-16" />
          </div>
        </div>
        <div ref={textRef}>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-3">
            Learning Journey
          </h1>
          <p className="text-blue-600 text-xl max-w-md mx-auto font-light">
            Personalized recommendations powered by AI
          </p>
        </div>
      </div>
    </div>
  )
}
