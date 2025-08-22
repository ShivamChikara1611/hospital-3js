// routes/geminiRoute.js
import express from "express";
import { chatWithGemini } from "../gemini/index.js";

const router = express.Router();

// POST /api/chat
router.post("/", async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Message text is required" });

    try {
        const reply = await chatWithGemini(text);
        res.json({ reply });
    } catch (error) {
        console.error("Gemini chat error:", error.message);
        res.status(500).json({ reply: "There was an error connecting to the health assistant. Please try again later." });
    }
});

export default router;
