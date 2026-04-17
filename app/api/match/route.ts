import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// We initialize the OpenAI "Messenger" using your secret key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    // We send a "Prompt" to the AI, telling it exactly what to do
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // This is the "brain" version we are using
      messages: [
        {
          role: "system",
          content: "You are an expert HR assistant. Compare the resume and job description provided and return a match score (0-100) and a brief analysis in JSON format."
        },
        {
          role: "user",
          content: `Resume: ${resumeText}\n\nJob Description: ${jobDescription}`
        }
      ],
      response_format: { type: "json_object" } // This ensures the AI speaks "code"
    });

    // We get the answer back and send it to your screen!
    const aiResult = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(aiResult);
    
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "The AI is tired. Try again!" }, { status: 500 });
  }
}