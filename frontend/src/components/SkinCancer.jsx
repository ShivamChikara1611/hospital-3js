import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { NavLink } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const SkinCancer = () => {

    const { language } = useContext(LanguageContext);

    const texts = {
        en: {
            badge: "New Feature",
            title: "Skin Cancer Detector",
            subtitle: "Your Trusted Skin Cancer Check",
            description: `Discover our new, free home diagnostic feature!
Our hospital is proud to offer a state-of-the-art, online tool that lets you check for signs of skin cancer from the comfort of your own home — without any expense.
Get reliable, expert-approved results quickly and easily.`,
            button: "Diagnose Yourself"
        },
        jp: {
            badge: "新機能",
            title: "皮膚がん検出器",
            subtitle: "信頼できる皮膚がんチェック",
            description: `新しい無料の在宅診断機能をご利用ください！
当院は、最先端のオンラインツールを提供しており、自宅にいながら皮膚がんの兆候を無料でチェックできます。
専門家が承認した信頼性の高い結果を、迅速かつ簡単に取得できます。`,
            button: "自己診断する"
        }
    };

    const t = texts[language];

    return (
        <div className="relative flex flex-col items-center justify-center h-[55vh] md:h-[70vh] md:rounded-xl overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${assets.skinCancerBg})`
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center gap-5 md:gap-10 bg-black/60 backdrop-blur-sm h-full w-full px-2">
                <h1 className="text-4xl text-gray-200 tracking-wider sm:text-6xl font-semibold text-center">
                    {t.title}
                </h1>

                <div className='md:flex gap-5 justify-center items-center'>
                    <div className='max-w-[600px]'>
                        <h2 className='text-gray-300 text-lg mb-1'>“{t.subtitle}”</h2>
                        <p className='text-gray-300 italic text-sm font-thin whitespace-pre-line'>
                            {t.description}
                        </p>
                    </div>

                    <div className='mt-5 md:mt-0 min-w-[180px]'>
                        <NavLink to='/skin-cancer'>
                            <button className='bg-transparent rounded-full tracking-wider border-2 text-green-500 px-5 py-3 border-green-500 hover:bg-green-500 hover:text-gray-200 transition-all duration-200'>
                                {t.button}
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            <button className='absolute top-0 left-0 z-10 bg-primary tracking-wider text-white px-4 py-2'>
                {t.badge}
            </button>
        </div>
    );
};

export default SkinCancer;
