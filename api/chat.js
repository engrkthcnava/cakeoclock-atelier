import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini SDK using the environment variable configured in Vercel
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  // 1. Only allow POST requests for chat interactions
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, menuContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    // 2. Formulate the system instruction prompt to feed to Gemini
    const systemPrompt = `
      ${menuContext}
      
      Customer's query: "${message}"
      
      Instructions: Respond concisely, keeping the tone warm, welcoming, and professional. 
      Format pricing explicitly using Philippine Pesos (₱). Do not hallucinate products outside the menu.
    `;

    // 3. Call the recommended gemini-2.5-flash model for fast, lightweight responses
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: systemPrompt,
    });

    const replyText = response.text || "I'm here to help! Could you please rephrase that?";

    // 4. Return the structured response to your Chatbot.jsx component
    return res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'The kitchen is a bit busy processing that request. Please try again!' 
    });
  }
}