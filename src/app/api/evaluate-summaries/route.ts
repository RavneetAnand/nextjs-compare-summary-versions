import OpenAI from "openai";

const client = new OpenAI();

export async function POST(req: Request) {
    const { summary1, summary2, transcript, notes } = await req.json();

    if (!summary1 || !summary2) {
        return new Response("Both summaries are required", { status: 400 });
    }

    const prompt = `
You are an expert at evaluating meeting summaries. You need to compare two different summary versions of the same meeting and determine which one is better.

# Meeting Information
## Transcript
${transcript || "No transcript provided"}

## Meeting Notes
${notes || "No notes provided"}

# Summaries to Evaluate
## Summary Version 1
${summary1}

## Summary Version 2
${summary2}

# Instructions
1. Evaluate both summaries based on the criteria such as truthfulness, clarity, conciseness and relevance.
2. For each criterion, determine which summary performs better and explain why.
3. Provide an overall recommendation on which summary is better.

Format your response as JSON with the following structure:
{
    "truthfulness": {
        "better": "v1 or v2",
        "reasoning": "explanation"
    },
    "clarity": {
        "better": "v1 or v2",
        "reasoning": "explanation"
    },
    "conciseness": {
        "better": "v1 or v2",
        "reasoning": "explanation"
    },
    "relevance": {
        "better": "v1 or v2",
        "reasoning": "explanation"
    },
    "overall": {
        "better": "v1 or v2",
        "reasoning": "explanation"
    }
}
`;

    const result = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "You are an AI assistant that evaluates meeting summaries and provides structured feedback in JSON format.",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
    });

    console.log("AI Response:", result.choices[0].message.content);

    return new Response(result.choices[0].message.content, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
