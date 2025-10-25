import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { LanguageContext } from '../context/LanguageContext'

const Footer = () => {

    const { language } = useContext(LanguageContext);

    const texts = {
        en: {
            about: "MAX Multispeciality Hospital provides a fully operational platform for booking appointments, managing patient records, and accessing a wide range of medical services across all departments. Supported by cutting-edge infrastructure and advanced equipment, we ensure the highest standards of care.",
            company: "COMPANY",
            working: "Working Hours",
            contact: "Contact Information",
            home: "Home",
            aboutUs: "About us",
            services: "Services",
            contactUs: "Contact us",
            faqs: "FAQs",
            privacy: "Privacy policy",
            monFri: "Monday - Friday:",
            saturday: "Saturday:",
            sunday: "Sunday:",
            closed: "Closed",
            address: "Address",
            phone: "Phone",
            emergency: "Emergency",
            email: "Email",
            copyright: "Copyright 2024@ MAX Multispeciality Hospital -",
            rights: "All Right Reserved.",
            switch: "Switch to Admin"
        },
        jp: {
            about: "MAX総合病院は、予約、患者記録の管理、すべての診療科にわたる幅広い医療サービスへのアクセスを可能にする完全運用型プラットフォームを提供しています。最先端の設備と高度な機器を備え、最高水準の医療を保証します。",
            company: "会社情報",
            working: "営業時間",
            contact: "連絡先情報",
            home: "ホーム",
            aboutUs: "私たちについて",
            services: "サービス",
            contactUs: "お問い合わせ",
            faqs: "よくある質問",
            privacy: "プライバシーポリシー",
            monFri: "月曜日 - 金曜日:",
            saturday: "土曜日:",
            sunday: "日曜日:",
            closed: "休業",
            address: "住所",
            phone: "電話",
            emergency: "緊急連絡先",
            email: "メール",
            copyright: "著作権 2024@ MAX総合病院 -",
            rights: "全著作権所有。",
            switch: "管理者画面へ"
        }
    };

    return (
        <div className='bg-white/5 p-5 rounded-t-3xl'>
            <div className='flex flex-col sm:grid grid-cols-[2fr_2fr_2fr] gap-10 my-10 text-sm'>
                {/*----------Left Section------------*/}
                <div>
                    <img className='mb-5 w-[150px] rounded-full' src={assets.logo} alt="" />
                    <p className='w-full text-gray-300 italic font-thin tracking-wider'>
                        {texts[language].about}
                    </p>
                </div>

                {/*----------Center Section------------*/}
                <div className='flex sm:flex-col gap-5 xl:flex-row xl:justify-evenly'>
                    <div>
                        <p className='text-xl font-medium mb-5 text-primary'>{texts[language].company}</p>
                        <ul className='flex flex-col gap-1 text-gray-300'>
                            <li>{texts[language].home}</li>
                            <li>{texts[language].aboutUs}</li>
                            <li>{texts[language].services}</li>
                            <li>{texts[language].contactUs}</li>
                            <li>{texts[language].faqs}</li>
                            <li>{texts[language].privacy}</li>
                        </ul>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-xl font-medium mb-5 text-primary'>{texts[language].working}</p>
                        <ul className='flex flex-col gap-1 text-gray-300'>
                            <li><span className='text-gray-400'>{texts[language].monFri}</span> 9:00 AM - 5:00 PM</li>
                            <li><span className='text-gray-400'>{texts[language].saturday}</span> 9:00 AM - 1:00 PM</li>
                            <li><span className='text-gray-400'>{texts[language].sunday}</span> {texts[language].closed}</li>
                        </ul>
                    </div>
                </div>

                {/*----------Right Section------------*/}
                <div>
                    <p className='text-xl font-medium mb-5 text-primary'>{texts[language].contact}</p>
                    <ul className='flex flex-col gap-2 text-gray-300'>
                        <ul>
                            <p className='text-gray-400'>{texts[language].address}</p>
                            <li>NH-58, Bhopa Road Flyover, Muzaffarnagar (251001), Uttar Pradesh, India</li>
                        </ul>
                        <ul>
                            <p className='text-gray-400'>{texts[language].phone}</p>
                            <li>+91 7521456987</li>
                        </ul>
                        <ul>
                            <p className='text-gray-400'>{texts[language].emergency}</p>
                            <li>+91 9845312678</li>
                        </ul>
                        <ul>
                            <p className='text-gray-400'>{texts[language].email}</p>
                            <li>hospital@max.in</li>
                        </ul>
                    </ul>
                </div>
            </div>

            <hr className='bg-primary h-[1px] border-none' />

            <div className='md:flex md:gap-3 md:justify-center'>
                <div>
                    <p className='py-5 text-sm text-center text-gray-300'>
                        {texts[language].copyright}{" "}
                        <span className='text-primary'>{texts[language].rights}</span>
                    </p>
                </div>

                <button className='flex flex-col items-center justify-center w-full md:w-fit mb-3 md:mb-0'>
                    <a
                        className='bg-white/5 backdrop-blur-md text-gray-200 px-6 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider py-2.5 text-xs'
                        href="https://www.max-hospital-admin.shivamchikara.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {texts[language].switch}
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Footer
