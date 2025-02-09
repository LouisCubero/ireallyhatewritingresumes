"use client"

import { useEffect, useState } from "react"

interface ResumeData {
  role: string
  positions: string[]
  activities: string[]
}

interface BulletPoints {
  [key: string]: string[]
}

export default function ResumePreview() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [bulletPoints, setBulletPoints] = useState<BulletPoints>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = localStorage.getItem("resumeData")
    if (data) {
      const parsed = JSON.parse(data)
      setResumeData(parsed)
      generateBulletPoints(parsed)
    }
  }, [])

  const generateBulletPoints = async (data: ResumeData) => {
    const bullets: BulletPoints = {}

    for (const position of data.positions) {
      try {
        const response = await fetch("/api/generate-bullets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ position, role: data.role }),
        })

        const result = await response.json()
        bullets[position] = result.bulletPoints
      } catch (error) {
        console.error("Error generating bullets for position:", position, error)
        bullets[position] = [
          "Failed to generate bullet points",
          "Please try again later",
          "Or add manual bullet points",
        ]
      }
    }

    setBulletPoints(bullets)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="text-2xl">Generating resume content...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Louis Cubero</h1>

        {/* Experience Section */}
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black mb-4">EXPERIENCE</h2>
          {resumeData?.positions.map((position, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{position}</h3>
              <ul className="list-disc pl-6">
                {bulletPoints[position]?.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Extracurriculars Section */}
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black mb-4">EXTRACURRICULARS</h2>
          {resumeData?.activities.map((activity, index) => (
            <div key={index} className="mb-2">
              <p>{activity}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

