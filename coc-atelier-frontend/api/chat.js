const { GoogleGenAI } = require('@google/genai');

// Initialize the Gemini SDK using the environment variable configured in Vercel
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { message, menuContext } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing Gemini API Key configuration on Vercel.' });
    }

    // Direct, zero-dependency raw REST endpoint execution for gemini-2.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `
      ${menuContext}
      
      Customer's query: "${message}"
      
      Instructions: Respond concisely, keeping the tone warm, welcoming, and professional. 
      Format pricing explicitly using Philippine Pesos (₱). Do not hallucinate products outside the menu.
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error('Gemini Raw API Failure:', errData);
      throw new Error('Gemini REST connection failed');
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "How can I sweeten your day?";

    return res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: 'Internal server breakdown in the kitchen.' });
  }
}