// backend/gemini/index.js
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// Load API key from environment
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey });

/**
 * Generate a concise (~50-word) response using Gemini AI.
 * @param {string} message - User's input text.
 * @returns {Promise<string>} - AI-generated refined response.
 */
export const chatWithGemini = async (message) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text:
                                `You are a helpful hospital AI assistant. Reply clearly and professionally within 50 words. ` +
                                `Avoid long explanations, repetition, or disclaimers. Be factual and precise. ` +
                                `If the user input is unclear, ask for clarification. ` +
                                `If the user asks for medical advice, give the general medication name for instant relief ` +
                                `and recommend consulting a healthcare professional.\n\nUser: ${message}`,
                        },
                    ],
                },
            ],

            // Response control configuration
            generationConfig: {
                temperature: 0.4, // Balanced factual tone
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 80, // ~50 words
            },
        });

        // Extract and clean response text
        let reply =
            response.output?.[0]?.content?.parts?.[0]?.text ||
            response.text ||
            "I’m sorry, I didn’t understand that.";

        reply = reply.trim();
        if (reply.length > 350) reply = reply.slice(0, 350) + "...";

        return reply;
    } catch (error) {
        console.error("Gemini API error:", error.message);
        return "There was an error connecting to the health assistant. Please try again later.";
    }
};

// Local testing block (skipped in production)
if (process.env.NODE_ENV !== "production") {
    (async () => {
        const reply = await chatWithGemini("Explain how AI works in one line.");
        console.log("Gemini reply:", reply);
    })();
}
