import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();
const MODEL = "gpt-3.5-turbo";

// Using the default configuration
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

const runPrompt = async (prompt:string) => {    
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: MODEL,
    });
    return chatCompletion.choices[0].message.content;
}

export default runPrompt;

