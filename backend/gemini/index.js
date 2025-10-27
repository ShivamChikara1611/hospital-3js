import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey });

export const chatWithGemini = async (message) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: message }] }],
        });

        return (
            response.output?.[0]?.content?.parts?.[0]?.text ||
            response.text ||
            "I’m sorry, I didn’t understand that."
        );
    } catch (error) {
        console.error("Gemini API error:", error.message);
        return "There was an error connecting to the health assistant. Please try again later.";
    }
};

// Add this test block only for local testing
if (process.env.NODE_ENV !== "production") {
    (async () => {
        const reply = await chatWithGemini("Explain how AI works in one line.");
        console.log("Gemini reply:", reply);
    })();
}
