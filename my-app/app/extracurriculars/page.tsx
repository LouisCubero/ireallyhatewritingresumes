"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Activity {
  id: number
  value: string
}

export default function Extracurriculars() {
  const router = useRouter()
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ])

  const lastInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus()
    }
  }, []) //Fixed useEffect dependency

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault()

      // Save current activity
      const updatedActivities = [...activities]
      const currentActivity = updatedActivities[index]
      if (currentActivity.value.trim()) {
        localStorage.setItem(`activity_${currentActivity.id}`, currentActivity.value.trim())
      }

      // If it's the last activity and has content, aggregate data and navigate
      if (index === activities.length - 1 && currentActivity.value.trim()) {
        // Aggregate all data
        const role = localStorage.getItem("role") || ""
        const positions = []
        let i = 1
        while (true) {
          const position = localStorage.getItem(`position_${i}`)
          if (!position) break
          positions.push(position)
          i++
        }

        const activitiesList = []
        i = 1
        while (true) {
          const activity = localStorage.getItem(`activity_${i}`)
          if (!activity) break
          activitiesList.push(activity)
          i++
        }

        // Store aggregated data
        const resumeData = {
          role,
          positions,
          activities: activitiesList,
        }
        localStorage.setItem("resumeData", JSON.stringify(resumeData))

        // Navigate to resume preview
        router.push("/resume-preview")
      }
    }
  }

  const handleChange = (value: string, index: number) => {
    const updatedActivities = [...activities]
    updatedActivities[index].value = value
    setActivities(updatedActivities)
  }

  const addActivity = () => {
    const newId = activities.length + 1
    setActivities([...activities, { id: newId, value: "" }])
  }

  const removeActivity = () => {
    if (activities.length > 1) {
      const updatedActivities = activities.slice(0, -1)
      setActivities(updatedActivities)
      // Remove from localStorage
      localStorage.removeItem(`activity_${activities.length}`)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-medium mb-6 text-center">extracurriculars</h1>
        <p className="text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          showcase student leadership, your involvement in clubs, initiatives you're taking part in, any sports that you
          play, or a book club you made.
        </p>

        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4 items-center">
              <div className="bg-[#6b5d5d] text-white px-6 py-4 w-40 flex-shrink-0">activity {activity.id}</div>
              <div className="flex-grow relative">
                <Input
                  ref={index === activities.length - 1 ? lastInputRef : null}
                  type="text"
                  value={activity.value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  placeholder="type here..."
                  className="w-full bg-gray-800/50 border-none text-white px-6 py-4 h-auto"
                />
                {index === activities.length - 1 && activities.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeActivity}
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
            onClick={addActivity}
            className="text-white hover:bg-white/10 bg-white/5 rounded-full p-6"
          >
            <Plus className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </main>
  )
}