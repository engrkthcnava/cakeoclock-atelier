import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the client outside the handler so it stays warm across invocations
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req, res) {
  // 1. Handle Preflight Browser Security checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Strict Method Validation
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed. Use POST.` });
  }

  try {
    // 3. Verify the environment variable is loaded
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY on Vercel.' });
    }

    // 4. Safely grab properties from Vercel's auto-parsed req.body
    const { message, menuContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Missing message body content.' });
    }

    // 5. Connect to the generative backend model
    const model = ai.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `
        ${menuContext}
        
        Tone & Style: Keep your answers friendly, warm, professional, and enthusiastic like a helpful baker.
        Formatting: Always present prices explicitly using Philippine Pesos (₱). Keep answers relatively concise. Do not guess items outside our selection.
      `
    });

    const result = await model.generateContent(message);
    const responseData = await result.response;
    const replyText = responseData.text() || "Hello! How can I sweeten your day?";

    // 6. Respond using Vercel's built-in JSON handler helper
    return res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error('Serverless Execution Error:', error);
    return res.status(500).json({ 
      error: 'The kitchen had a problem baking that response.',
      details: error.message 
    });
  }
}