import React, { useContext } from "react";
import { DnaCanvas } from "../canvas";
import { LanguageContext } from "../context/LanguageContext";

const Banner = () => {

    const { language } = useContext(LanguageContext);

    const texts = {
        en: {
            heading1: "Book Appointment",
            heading2: "With",
            highlight: "100+ ",
            heading3: "Trusted Doctors",
            button: "Book Now"
        },
        jp: {
            heading1: "予約をする",
            heading2: "",
            highlight: "100人以上の",
            heading3: "信頼できる医師と",
            button: "今すぐ予約"
        }
    };

    return (
        <div className="relative flex flex-col justify-center my-16 px-2 md:px-[10%] py-10 md:rounded-md bg-black/30 overflow-hidden backdrop-blur-md">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-200 tracking-wide">
                <p>{texts[language].heading1}</p>
                <p className="mt-4">
                    {texts[language].heading2}{" "}
                    <span className="text-primary font-extrabold tracking-widest">
                        {texts[language].highlight}
                    </span>
                    {texts[language].heading3}
                </p>
            </div>
            <div>
                <button className="bg-white/20 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light mt-3 md:mt-5 tracking-wider text-xs md:text-xl">
                    <a href="#speciality">{texts[language].button}</a>
                </button>
            </div>
            <div className="absolute top-0 right-5 h-full opacity-60">
                <DnaCanvas />
            </div>
        </div>
    );
};

export default Banner;
