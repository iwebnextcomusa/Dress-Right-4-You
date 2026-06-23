import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure GEMINI_API_KEY is available
const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chatbot will run in demo/offline mode.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Chatbot Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback demo responses if API key is missing
        const demoResponses = [
          "I'd be happy to help you find the perfect outfit! For a professional boardroom look, I highly recommend our **California Royal Navy Bespoke Suit** paired with a **Royal Oxford White Dress Shirt**.",
          "Our California store line offers tailored fits. For sizing, our suits generally fit true-to-size. What is your typical jacket size (e.g. 40R)?",
          "For casual West Coast weekends, look no further than our **West Coast Smart Casual Chinos** in Khaki or Navy, combined with the **Pacific Micro-Pattern Premium Shirt**.",
          "Feel free to ask me anything about our fabric compositions, custom tailoring, or shipping policies. DressRight4You is dedicated to helping you look sharp!"
        ];
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        return res.json({ text: randomResponse + " *(Stylist Demo Mode - Connect GEMINI_API_KEY for real-time recommendations)*" });
      }

      // Convert history to Gemini contents format
      // history is an array of { role: 'user' | 'model', text: string }
      const contents = [];
      
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }]
          });
        }
      }

      // Append the latest user message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const systemInstruction = `You are "DressRight AI", the elite virtual men's fashion stylist and fit consultant for DressRight4You, a premium clothing brand based in California, USA.
Your business details:
- Domain: dressright4you.com
- Location: California, USA
- Phone: 818-913-8520
- Email: roy460@hotmail.com

About DressRight4You:
- Specializes in stylish, high-quality men's fashion, including dress shirts, suits, blazers, casual shirts, pants, accessories, business attire, and formal wear.
- Color palette: Navy blue, black, white, silver, and gold accents.
- Core brand attributes: Professionalism, Confidence, Modern style, Affordability, Premium quality.

Guidelines for your replies:
1. Be extremely warm, confident, elegant, and professional. You are a highly skilled stylist advising gentleman clients.
2. Pitch the products available on the DressRight4You store:
   - "California Royal Navy Bespoke Suit" (Special Super-130s Merino Wool, $499, sale $425)
   - "Royal Oxford Premium Dress Shirt" (100% Egyptian Cotton, easy-iron, $89)
   - "Onyx Fitted Tuxedo Dinner Blazer" (Wool-Silk blend, Satin shawl lapel, $299, sale $249)
   - "Presidential Gold Dial Chronograph" (18k Gold plating, chronograph, $189)
   - "West Coast Smart Casual Chinos" (Cotton-spandex stretch tapered fit, $95, sale $79)
   - "Pacific Micro-Pattern Premium Shirt" (100% breathable yarn-dyed pattern, $79)
   - "Sterling Silver & Gold Cufflink Set" (Solid silver with 18k gold inlay, $65)
   - "Lafayette Textured Tweed Wool Blazer" (Virgin wool-silk-cashmere tweed blend, $249)
3. Support sizing inquiries, outfit combinations, care guides, shipping and returns information (Free shipping over $150, 30-day returns).
4. Use clean Markdown formatting for your responses. Bold product names when recommending them. Keep responses concise (under 200 words) so they fit nicely in a mobile-responsive floating chat window.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "I am here to help you coordinate the perfect outfit. How can I assist you today?";
      return res.json({ text: responseText });

    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({ error: "Failed to fetch response from DressRight Stylist AI" });
    }
  });

  // Serve static assets in production, otherwise Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DressRight4You Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
