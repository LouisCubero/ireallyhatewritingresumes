"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const [currentWord, setCurrentWord] = useState("writing")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const words = ["writing", "fixing", "tailoring"]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentWord((prev) => {
          const currentIndex = words.indexOf(prev)
          return words[(currentIndex + 1) % words.length]
        })
        setIsTransitioning(false)
      }, 200)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative p-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10"
        onClick={() => router.push("/preferences")}
      >
        <Settings className="h-6 w-6" />
      </Button>

      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-medium mb-6 whitespace-nowrap">
          i really hate{" "}
          <span
            className={`inline-block transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
          >
            {currentWord}
          </span>{" "}
          resumes
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-16">
          create a new resume, fix an existing one, or tailor by role.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="text-2xl py-8 px-16 bg-black text-white border-white hover:bg-white hover:text-black transition-all duration-200"
            onClick={() => router.push("/job-input")}
          >
            create
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-2xl py-8 px-16 bg-black text-white border-white hover:bg-white hover:text-black transition-all duration-200"
          >
            fix
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-2xl py-8 px-16 bg-black text-white border-white hover:bg-white hover:text-black transition-all duration-200"
          >
            tailor
          </Button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-gray-400">
        <a href="https://www.linkedin.com/in/louiscubero" target="_blank" rel="noopener noreferrer">
          by Louis Cubero
        </a>
      </div>
    </main>
  )
}