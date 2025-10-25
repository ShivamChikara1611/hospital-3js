import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { LanguageContext } from "../context/LanguageContext";

const FAQS = [
    { key: "skin", label_en: "How to check skin cancer", label_jp: "皮膚がんの確認方法" },
    { key: "appointment", label_en: "Take an appointment", label_jp: "予約を取る" },
    { key: "inquire", label_en: "Inquire now!", label_jp: "今すぐ問い合わせ！" },
];

export default function Chat() {
    const [messages, setMessages] = useState([
        { from: "bot", text_en: "Hello! I’m MAX. How can I help you today?", text_jp: "こんにちは！私はMAXです。今日はどのようにお手伝いできますか？" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { backendUrl } = useContext(AppContext);
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMsg = { from: "user", text_en: text, text_jp: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(`${backendUrl}/api/chat`, { text });
            const botReply =
                res.data.reply ||
                (language === "en"
                    ? "Sorry, I didn’t understand that."
                    : "すみません、理解できませんでした。");
            setMessages((prev) => [
                ...prev,
                { from: "bot", text_en: botReply, text_jp: botReply },
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text_en: "There was an error connecting. Please try again.",
                    text_jp: "接続中にエラーが発生しました。もう一度お試しください。",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleFAQ = (key) => {
        let reply_en = "", reply_jp = "", userText_en = "", userText_jp = "";

        if (key === "skin") {
            userText_en = "How to check skin cancer";
            userText_jp = "皮膚がんの確認方法";
            reply_en = `To check for skin cancer: look for unusual moles, changes in shape/color/size, or bleeding spots. Please consult a dermatologist for proper diagnosis.`;
            reply_jp = `皮膚がんを確認するには、形・色・大きさの変化や出血するほくろなどをチェックしてください。正確な診断のためには皮膚科医にご相談ください。`;
        } else if (key === "appointment") {
            userText_en = "Take an appointment";
            userText_jp = "予約を取る";
            reply_en = "Sure! Please provide your preferred date, time, and doctor specialty, and I’ll assist with booking.";
            reply_jp = "承知しました！希望する日時と医師の専門分野を教えていただければ、予約をお手伝いします。";
        } else if (key === "inquire") {
            userText_en = "Inquire now";
            userText_jp = "今すぐ問い合わせ";
            reply_en = "What would you like to inquire about? Hospital timings, services, or doctors?";
            reply_jp = "何についてお問い合わせですか？病院の営業時間、サービス、または医師についてですか？";
        }

        setMessages((prev) => [
            ...prev,
            { from: "user", text_en: userText_en, text_jp: userText_jp },
            { from: "bot", text_en: reply_en, text_jp: reply_jp },
        ]);
    };

    return (
        <div className="flex flex-col max-w-md mx-auto h-[600px] border rounded-2xl shadow-lg overflow-hidden my-6">
            {/* Chat Header */}
            <div className="bg-primary text-white text-lg font-semibold p-3">
                {language === "en" ? "MAX - Health Assistant" : "MAX - ヘルスアシスタント"}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded-xl max-w-[80%] ${
                            m.from === "user"
                                ? "bg-primary/90 text-white self-end ml-auto"
                                : "bg-gray-200 text-gray-800 self-start"
                        }`}
                    >
                        {language === "en" ? m.text_en : m.text_jp}
                    </div>
                ))}
                {loading && (
                    <div className="p-2 bg-gray-300 rounded-xl w-fit">
                        {language === "en" ? "Typing..." : "入力中..."}
                    </div>
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
                        {language === "en" ? faq.label_en : faq.label_jp}
                    </button>
                ))}
            </div>

            {/* Input Box */}
            <div className="flex p-2 border-t bg-white">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={language === "en" ? "Type your message..." : "メッセージを入力..."}
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
                    {language === "en" ? "Send" : "送信"}
                </button>
            </div>
        </div>
    );
}
