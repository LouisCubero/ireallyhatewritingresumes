"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function JobInput() {
  const router = useRouter()
  const [role, setRole] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && role.trim()) {
      // Save role to localStorage for persistence
      localStorage.setItem("role", role.trim())
      router.push("/experience")
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-medium mb-16 text-center">what job do you want?</h1>

        <Input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ex. product manager"
          className="bg-gray-800/50 border-gray-700 text-xl p-6 h-auto"
        />
      </div>

      <div className="absolute bottom-4 left-4 text-gray-500">resume builder</div>
    </main>
  )
}

