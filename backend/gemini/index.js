// gemini/index.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);

export const chatWithGemini = async (message) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);
        const response = await result.response;
        return response.text() || "I’m sorry, I didn’t understand that.";
    } catch (error) {
        console.error("Gemini API error:", error.message);
        return "There was an error connecting to the health assistant. Please try again later.";
    }
};
