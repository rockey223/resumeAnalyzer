import { NextResponse } from "next/server";
import "pdf-parse/worker";
import { PDFParse, VerbosityLevel } from "pdf-parse";
import { OpenAI } from "openai";
// for commonjs
// require('pdf-parse/worker');

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "PDF file not found" },
        { status: 400 },
      );
    }

    // Convert PDF file to buffer
    const arrayBuffer = await file.arrayBuffer();
    //const buffer = Buffer.from(arrayBuffer);

    // Parse PDF
    const parser = new PDFParse({
      data: arrayBuffer,
      verbosity: VerbosityLevel.WARNINGS,
    });
    const text = await parser.getText();
    console.log(text);
    await parser.destroy();

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // powerful free model
      messages: [
        {
          role: "system",
          content: "You are a professional resume analyzer.",
        },
        {
          role: "user",
          content: `
Analyze this resume and return STRICT JSON ONLY.

Do NOT include:
- explanations
- markdown
- extra text

Resume:
${text}

Return ONLY this format:

{
  "score": 0-100,
  "atsCompatibility": 0-100,
  "keywordsMatch": 0-100,
  "impactClarity": 0-100,
  "formatting": 0-100,
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "average": 0-100
}
`,
        },
      ],
    });

    console.log("com", completion.choices[0].message.content);
    const clean = completion.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(clean);
    } catch (err) {
      console.log("JSON parse failed:", clean);
      parsed = clean;
    }

    console.log("clean", parsed);
    // console.log("he", parsed.strengths);

    return NextResponse.json({
      data: parsed,
      message: "Resume analyzed successfully",
    });
  } catch (error) {
    console.error("PDF parse error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the PDF" },
      { status: 500 },
    );
  }
}
