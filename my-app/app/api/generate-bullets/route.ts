import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { position, role } = await req.json()

    const prompt = `Generate 3 impactful, quantifiable bullet points for a resume position of "${position}" for someone applying to be a "${role}". 
    Focus on achievements and metrics. Use action verbs. Keep each bullet point under 100 characters.
    Format as a JSON array of strings.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    })

    const bulletPoints = JSON.parse(completion.choices[0].message.content || "[]")
    return NextResponse.json({ bulletPoints })
  } catch (error) {
    console.error("Error generating bullet points:", error)
    return NextResponse.json({ error: "Failed to generate bullet points" }, { status: 500 })
  }
}

