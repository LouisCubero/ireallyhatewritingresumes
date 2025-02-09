"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Position {
  id: number
  value: string
}

export default function Experience() {
  const router = useRouter()
  const [positions, setPositions] = useState<Position[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ])

  // Keep track of the last input ref for auto-focus
  const lastInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus the last input when adding a new position
  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus()
    }
  }, [positions]) //Fixed unnecessary dependency

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault()

      // Save current position
      const updatedPositions = [...positions]
      const currentPosition = updatedPositions[index]
      if (currentPosition.value.trim()) {
        localStorage.setItem(`position_${currentPosition.id}`, currentPosition.value.trim())
      }

      // If it's the last position and has content, navigate to next page
      if (index === positions.length - 1 && currentPosition.value.trim()) {
        router.push("/extracurriculars")
      }
    }
  }

  const handleChange = (value: string, index: number) => {
    const updatedPositions = [...positions]
    updatedPositions[index].value = value
    setPositions(updatedPositions)
  }

  const addPosition = () => {
    const newId = positions.length + 1
    setPositions([...positions, { id: newId, value: "" }])
  }

  const removePosition = () => {
    if (positions.length > 1) {
      const updatedPositions = positions.slice(0, -1)
      setPositions(updatedPositions)
      // Remove from localStorage
      localStorage.removeItem(`position_${positions.length}`)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-medium mb-6 text-center">experience</h1>
        <p className="text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          think about jobs, internships, fellowships, programs.. titles don't really matter, call yourself anything that
          fits what you've accomplished.
        </p>

        <div className="space-y-6">
          {positions.map((position, index) => (
            <div key={position.id} className="flex gap-4 items-center">
              <div className="bg-[#6b5d5d] text-white px-6 py-4 w-40 flex-shrink-0">position {position.id}</div>
              <div className="flex-grow relative">
                <Input
                  ref={index === positions.length - 1 ? lastInputRef : null}
                  type="text"
                  value={position.value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="type here..."
                  className="w-full bg-gray-800/50 border-none text-white px-6 py-4 h-auto"
                />
                {index === positions.length - 1 && positions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removePosition}
                    className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Minus className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={addPosition}
            className="text-white hover:bg-white/10 bg-white/5 rounded-full p-6"
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </main>
  )
}

