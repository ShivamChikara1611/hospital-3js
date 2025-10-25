import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { LanguageContext } from "../context/LanguageContext";
import axios from "axios";
import { toast } from 'react-toastify';

const images = [assets.skincancer1, assets.skincancer2, assets.skincancer3];

const SkinCancerDetection = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { skinCancerUrl } = useContext(AppContext);
    const { language } = useContext(LanguageContext);

    // Texts for bilingual support
    const texts = {
        en: {
            title: "Conquering Skin Cancer Together",
            messageTitle: "A Message of Hope & Strength",
            messageText: "At the heart of every challenge lies the opportunity for triumph. Whether you are beginning your journey or have been battling skin cancer for some time, remember that early detection and proactive care are powerful tools. With cutting-edge technology and compassionate support, you are not alone on this journey.",
            whatIsTitle: "What Is Skin Cancer?",
            whatIsText: "Skin cancer affects millions, but knowledge is your first line of defense. By understanding the warning signs and risk factors, you empower yourself to take timely action. Our advanced detection tools are designed to provide you with the insights needed for early diagnosis and intervention.",
            approachTitle: "Our Innovative Approach",
            approachText: "Imagine a future where technology meets compassion—a future where smart tools help in detecting early signs of skin cancer, giving you the opportunity to act before it’s too late. With our AI-driven detection system, you gain clarity, support, and the chance to address skin cancer at its earliest stages.",
            stepsTitle: "Steps to Beat Skin Cancer:",
            steps: [
                "Early Detection: Regular screenings can save lives. Our tool helps identify potential issues early, giving you a head start in treatment.",
                "Informed Decisions: With accurate results and detailed insights, you can work closely with your healthcare provider to choose the best path forward.",
                "Support and Community: Lean on expert advice, supportive communities, and a network that understands your journey.",
                "Healthy Living: Embrace a lifestyle that nurtures your body and mind—balanced nutrition, sun safety, and regular checkups are key pillars of prevention and recovery."
            ],
            strongerTitle: "You Are Stronger Than You Think",
            strongerText: "Every step you take towards understanding and combating skin cancer is a step towards a healthier, brighter future. Embrace the spirit of resilience and know that every day brings new hope. With the right tools, information, and support, you can beat skin cancer and reclaim your life.",
            checkHere: "Check Here",
            result: "Result",
            detect: "Detect",
            detecting: "Detecting...",
            retake: "Retake Photo",
            errorFile: "Please upload a valid .jpg or .jpeg file.",
            errorSelect: "Please select a file first.",
            status: "Status",
            accuracy: "Accuracy",
            trueStatus: "True",
            falseStatus: "False"
        },
        jp: {
            title: "皮膚がんを共に克服する",
            messageTitle: "希望と力のメッセージ",
            messageText: "すべての挑戦の中心には、勝利へのチャンスがあります。あなたが旅を始めたばかりであれ、長い間皮膚がんと戦ってきたとしても、早期発見と積極的なケアが強力なツールであることを忘れないでください。最先端の技術と心のこもったサポートにより、あなたは一人ではありません。",
            whatIsTitle: "皮膚がんとは？",
            whatIsText: "皮膚がんは何百万人にも影響を与えますが、知識はあなたの第一の防御です。警告サインやリスク要因を理解することで、適切な行動を取る力を得られます。当院の先進的な検出ツールは、早期診断と介入に必要な洞察を提供するよう設計されています。",
            approachTitle: "革新的なアプローチ",
            approachText: "技術と思いやりが融合する未来を想像してください。スマートツールが皮膚がんの初期兆候を検出し、手遅れになる前に行動する機会を提供します。当院のAI駆動型検出システムにより、明確な情報とサポートを得て、皮膚がんを早期に対処することが可能です。",
            stepsTitle: "皮膚がん克服のステップ：",
            steps: [
                "早期発見：定期的な検診が命を救います。当ツールは潜在的な問題を早期に特定し、治療を先取りする手助けをします。",
                "情報に基づく判断：正確な結果と詳細な情報により、医療提供者と協力して最適な治療方針を選択できます。",
                "サポートとコミュニティ：専門家の助言、サポートコミュニティ、そしてあなたの旅を理解するネットワークに頼ってください。",
                "健康的な生活：体と心を養うライフスタイルを取り入れましょう。バランスの取れた栄養、日焼け防止、定期的な健診は予防と回復の重要な柱です。"
            ],
            strongerTitle: "あなたは思っているより強い",
            strongerText: "皮膚がんの理解と対策に向けた一歩一歩が、より健康で明るい未来への一歩です。回復力の精神を受け入れ、毎日が新たな希望をもたらすことを知ってください。正しいツール、情報、サポートがあれば、皮膚がんを克服し、人生を取り戻すことができます。",
            checkHere: "ここでチェック",
            result: "結果",
            detect: "検出",
            detecting: "検出中...",
            retake: "写真を撮り直す",
            errorFile: "有効な .jpg または .jpeg ファイルをアップロードしてください。",
            errorSelect: "まずファイルを選択してください。",
            status: "状態",
            accuracy: "精度",
            trueStatus: "陽性",
            falseStatus: "陰性"
        }
    };

    // Auto slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (
            selectedFile &&
            (selectedFile.type === "image/jpeg" || selectedFile.type === "image/jpg" || selectedFile.type === "image/png")
        ) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError(null);
            setShowPreview(false);
            setPrediction(null);
        } else {
            setFile(null);
            setPreviewUrl(null);
            setError(texts[language].errorFile);
        }
    };

    const handlePredict = async () => {
        if (!file) {
            setError(texts[language].errorSelect);
            return;
        }
        setShowPreview(true);
        setLoading(true);
        setError(null);
        setPrediction(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(skinCancerUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setPrediction(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-10 px-2 md:px-0 text-gray-200 flex flex-col w-full">
            <h1 className="text-2xl font-light tracking-wide mb-6 text-center">{texts[language].title}</h1>

            <article>
                {/* Slideshow Container */}
                <div className="relative h-full overflow-hidden md:w-[40%] float-left md:mr-5">
                    <div
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-contain flex-shrink-0 mb-5 md:mb-0"
                            />
                        ))}
                    </div>
                </div>

                {/* Detail Description */}
                <h3 className="text-primary font-bold text-lg">{texts[language].messageTitle}</h3>
                <p className="text-sm text-gray-400 font-light">{texts[language].messageText}</p>

                <br />

                <h3 className="text-primary font-bold text-lg">{texts[language].whatIsTitle}</h3>
                <p className="text-sm text-gray-400 font-light">{texts[language].whatIsText}</p>

                <br />

                <h3 className="text-primary font-bold text-lg">{texts[language].approachTitle}</h3>
                <p className="text-sm text-gray-400 font-light">{texts[language].approachText}</p>

                <br />

                <h3 className="text-primary font-bold text-lg">{texts[language].stepsTitle}</h3>
                <ol className="text-sm text-gray-400 font-light list-decimal list-inside">
                    {texts[language].steps.map((step, idx) => <li key={idx}>{step}</li>)}
                </ol>

                <br />

                <h3 className="text-primary font-bold text-lg">{texts[language].strongerTitle}</h3>
                <p className="text-sm text-gray-400 font-light">{texts[language].strongerText}</p>
            </article>

            <div className="bg-white/10 rounded-lg mt-16 px-2 py-4 max-w-[400px] mx-auto">
                <h3 className="text-center text-xl font-light tracking-wider text-gray-200">
                    {showPreview ? texts[language].result : texts[language].checkHere}
                </h3>

                <div className="w-full mt-5">
                    {!showPreview &&
                        (<input
                            type="file"
                            accept=".jpg, .jpeg"
                            onChange={handleFileChange}
                            className="p-1.5 rounded bg-white/20 cursor-pointer w-full mb-4 text-sm text-gray-400"
                        />)}

                    {!showPreview && (
                        <div className="flex justify-center w-full mt-6">
                            <button
                                onClick={handlePredict}
                                disabled={loading}
                                className="px-8 py-3 bg-red-600 text-gray-200 rounded-full text-sm cursor-pointer"
                            >
                                {loading ? texts[language].detecting : texts[language].detect}
                            </button>
                        </div>)
                    }
                </div>

                {showPreview && previewUrl && (
                    <div>
                        <img src={previewUrl} alt="Uploaded Preview" className="w-full" />
                    </div>
                )}

                {error && <p className="text-md mt-8 text-center tracking-wide text-red-600">{error}</p>}

                {prediction && showPreview && (
                    <div className="mt-5">
                        <p>{texts[language].status}: {prediction.prediction === "Malignant" ? texts[language].trueStatus : texts[language].falseStatus}</p>
                        <p>{texts[language].accuracy}: {prediction.confidence * 100}%</p>
                    </div>
                )}

                {showPreview && (
                    <div className="flex justify-center w-full mt-6">
                        <button className="px-8 py-3 bg-white/20 text-gray-200 rounded-full text-sm cursor-pointer" onClick={() => setShowPreview(!showPreview)}>
                            {texts[language].retake}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkinCancerDetection;
