"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Preferences() {
  const [fontSize, setFontSize] = useState("11")

  const sections = ["header", "experience", "projects", "education", "extracurriculars", "relevant courses"]

  const templates = ["shawn's resume template", "louis's resume template", "jake's resume template"]

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl md:text-7xl font-medium mb-4 text-center">preferences</h1>
      <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
        disabling 'header and education' section by default until we can find a method to fill out this process. it's
        still pretty slow to fill out.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Disable Sections */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2 className="text-xl mb-4">disable sections</h2>
          <div className="space-y-3">
            {sections.map((section) => (
              <div key={section} className="flex items-center space-x-2">
                <Checkbox id={section} />
                <Label htmlFor={section}>{section}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Variants */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <h2 className="text-xl mb-4">resume variants</h2>
          <RadioGroup defaultValue="shawn">
            {templates.map((template) => (
              <div key={template} className="flex items-center space-x-2">
                <RadioGroupItem value={template} id={template} />
                <Label htmlFor={template}>{template}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Font Settings */}
        <div className="bg-gray-900/50 p-6 rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl mb-4">change font size</h2>
            <div className="flex gap-2">
              {["10", "11", "12"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`w-10 h-10 flex items-center justify-center rounded
                    ${fontSize === size ? "bg-gray-700" : "bg-gray-800/50"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl mb-4">change font</h2>
            <Input type="text" placeholder="type here" className="bg-gray-800/50 border-gray-700" />
          </div>
        </div>
      </div>
    </main>
  )
}

