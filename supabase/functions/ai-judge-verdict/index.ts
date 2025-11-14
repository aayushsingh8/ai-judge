import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const initialRequestSchema = z.object({
  caseId: z.string().min(1).max(100),
  sideADocs: z.string().min(1).max(50000),
  sideBDocs: z.string().min(1).max(50000),
  language: z.enum(['en', 'hi']),
  type: z.literal('initial')
});

const argumentRequestSchema = z.object({
  caseId: z.string().min(1).max(100),
  previousVerdict: z.object({}).passthrough(),
  argument: z.string().min(1).max(5000),
  side: z.enum(['A', 'B']),
  language: z.enum(['en', 'hi']),
  type: z.literal('argument'),
  sideADocs: z.string().optional(),
  sideBDocs: z.string().optional()
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input based on request type
    let validatedData;
    try {
      validatedData = body.type === 'initial' 
        ? initialRequestSchema.parse(body)
        : argumentRequestSchema.parse(body);
    } catch (validationError) {
      console.error("Validation error:", validationError);
      const errorDetails = validationError instanceof z.ZodError ? validationError.errors : "Invalid input";
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: errorDetails }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const caseId = validatedData.caseId;
    const language = validatedData.language;
    const type = validatedData.type;
    
    let sideADocs, sideBDocs, previousVerdict, argument, side;
    
    if (type === 'initial') {
      sideADocs = validatedData.sideADocs;
      sideBDocs = validatedData.sideBDocs;
    } else {
      previousVerdict = validatedData.previousVerdict;
      argument = validatedData.argument;
      side = validatedData.side;
      sideADocs = validatedData.sideADocs;
      sideBDocs = validatedData.sideBDocs;
    }
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "initial") {
      systemPrompt = `You are an impartial AI Judge analyzing a legal case. Provide thorough, balanced analysis in ${language === "hi" ? "Hindi" : "English"}.`;
      
      userPrompt = `Analyze this legal case:

Side A Documents:
${sideADocs}

Side B Documents:
${sideBDocs}

Provide a comprehensive analysis with:

1. **Case Summary** (2-3 sentences): Brief overview of the dispute and key facts.

2. **Legal Reasoning** (detailed): Analyze both sides' arguments, applicable laws, and logical assessment.

3. **Final Verdict** (clear and concise): Your judgment on the case.

4. **Confidence Score** (0-100%): How confident you are in this verdict.

5. **Bias Detection**: Analyze if the verdict leans towards any side. Options: "Neutral", "Slight lean towards Side A", "Slight lean towards Side B", "Strong lean towards Side A", "Strong lean towards Side B".

6. **Legal Precedents** (2 relevant cases):
   - Title of the case
   - Brief summary (2 sentences)
   - Relevance to current case

7. **Document Comparison**:
   - Agreements: Points both sides agree on
   - Contradictions: Direct conflicts between the sides
   - Strengths for Side A: Strong points in their favor
   - Strengths for Side B: Strong points in their favor

Format your response as a JSON object with these exact keys:
{
  "summary": "...",
  "reasoning": "...",
  "verdict": "...",
  "confidence": 85,
  "bias": "Neutral",
  "precedents": [
    { "title": "...", "summary": "...", "relevance": "..." },
    { "title": "...", "summary": "...", "relevance": "..." }
  ],
  "comparison": {
    "agreements": ["...", "..."],
    "contradictions": ["...", "..."],
    "strengths": {
      "sideA": ["...", "..."],
      "sideB": ["...", "..."]
    }
  }
}`;
    } else {
      systemPrompt = `You are continuing as the same impartial AI Judge. Reconsider your verdict based on new arguments in ${language === "hi" ? "Hindi" : "English"}.`;
      
      userPrompt = `Previous Verdict:
${JSON.stringify(previousVerdict, null, 2)}

New Argument from Side ${side}:
${argument}

Provide an updated analysis:

1. **Updated Reasoning**: How does this new argument affect your analysis?

2. **Updated Verdict**: Change only if the new argument is compelling enough.

3. **Updated Confidence Score** (0-100%)

4. **Updated Bias Analysis**

5. **Argument Quality Scoring** for the new argument:
   - Clarity (1-10): How clear and well-articulated is the argument?
   - Evidence Support (1-10): How well is it supported by evidence?
   - Overall Strength: "Weak", "Medium", or "Strong"

6. **Timeline Summary**: Brief note on what changed and why.

7. **Updated Precedents** (if applicable): Any new relevant cases.

Format as JSON:
{
  "summary": "...",
  "reasoning": "...",
  "verdict": "...",
  "confidence": 88,
  "bias": "...",
  "argumentScores": {
    "clarity": 8,
    "evidence": 7,
    "strength": "Strong"
  },
  "precedents": [...],
  "comparison": {...}
}`;
    }

    console.log("Calling Lovable AI Gateway with model: google/gemini-2.5-flash");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received successfully");

    let verdictText = data.choices[0].message.content;
    
    // Extract JSON from markdown code blocks if present
    if (verdictText.includes("```json")) {
      verdictText = verdictText.split("```json")[1].split("```")[0].trim();
    } else if (verdictText.includes("```")) {
      verdictText = verdictText.split("```")[1].split("```")[0].trim();
    }

    const verdict = JSON.parse(verdictText);

    return new Response(
      JSON.stringify({ verdict }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ai-judge-verdict:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
