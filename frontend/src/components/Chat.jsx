import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const FAQS = [
    { key: "skin", label: "How to check skin cancer" },
    { key: "appointment", label: "Take an appointment" },
    { key: "inquire", label: "Inquire now!" },
];

export default function Chat() {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hello! I’m MAX. How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendUrl } = useContext(AppContext);

    // const backendUrl = 'http://localhost:5000/';

    const navigate = useNavigate();

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { from: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(`${backendUrl}/api/chat`, { text });
            const botReply = res.data.reply || "Sorry, I didn’t understand that.";
            setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "There was an error connecting. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleFAQ = (key) => {
        let reply = "";
        let userText = "";
        if (key === "skin") {
            userText = "How to check skin cancer";
            reply =
                `To check for skin cancer: look for unusual moles, changes in shape/color/size, or bleeding spots. Please consult a dermatologist for proper diagnosis.`;
        } else if (key === "appointment") {
            userText = "Take an appointment";
            reply =
                "Sure! Please provide your preferred date, time, and doctor specialty, and I’ll assist with booking.";
        } else if (key === "inquire") {
            userText = "Inquire now";
            reply =
                "What would you like to inquire about? Hospital timings, services, or doctors?";
        }

        setMessages((prev) => [
            ...prev,
            { from: "user", text: userText },
            { from: "bot", text: reply }
        ]);
    };

    return (
        <div className="flex flex-col max-w-md mx-auto h-[600px] border rounded-2xl shadow-lg overflow-hidden my-6">
            {/* Chat Header */}
            <div className="bg-primary text-white text-lg font-semibold p-3">
                MAX - Health Assistant
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded-xl max-w-[80%] ${m.from === "user"
                            ? "bg-primary/90 text-white self-end ml-auto"
                            : "bg-gray-200 text-gray-800 self-start"
                            }`}
                    >
                        {m.text}
                    </div>
                ))}
                {loading && (
                    <div className="p-2 bg-gray-300 rounded-xl w-fit">Typing...</div>
                )}
            </div>

            {/* FAQ Buttons */}
            <div className="flex gap-2 p-2 border-t bg-white">
                {FAQS.map((faq) => (
                    <button
                        key={faq.key}
                        onClick={() => handleFAQ(faq.key)}
                        className="flex-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-xl text-sm hover:bg-blue-200"
                    >
                        {faq.label}
                    </button>
                ))}
            </div>

            {/* Input Box */}
            <div className="flex p-2 border-t bg-white">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-xl px-3 py-2 mr-2 focus:outline-none"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && input.trim() && !loading) {
                            sendMessage(input);
                        }
                    }}
                />
                <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-xl disabled:opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
