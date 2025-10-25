import React, { useContext } from 'react'
import { DnaCanvas } from '../canvas'
import { LanguageContext } from '../context/LanguageContext'

const Header = () => {

    const { language } = useContext(LanguageContext);

    const texts = {
        en: {
            heading1: "Book",
            heading2: "Appointment",
            heading3: "With Trusted Doctors.",
            button: "Book Appointment"
        },
        jp: {
            heading1: "予約",
            heading2: "をする",
            heading3: "信頼できる医師とともに",
            button: "予約する"
        }
    };

    return (
        <div className='relative h-[calc(100vh-77px)] flex flex-col justify-center'>
            <div className='absolute top-0 h-full z-[-1] flex justify-between w-full overflow-hidden'>
                <DnaCanvas />
            </div>
            <div className='flex flex-col gap-4 h-full w-full justify-center p-2 text-wrap'>
                <p className='text-gray-200 text-5xl lg:text-7xl font-semibold leading-tight'>
                    <span className='text-primary font-extrabold'>{texts[language].heading1}</span> {texts[language].heading2} <br /> {texts[language].heading3}
                </p>
                <div className='bg-primary text-white w-fit mt-5 py-4 px-8 rounded-full text-xl tracking-widest font-thin'>
                    <a href="#speciality">
                        {texts[language].button}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header
