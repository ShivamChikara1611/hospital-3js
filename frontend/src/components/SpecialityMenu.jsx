import React, { useContext } from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext'

const SpecialityMenu = () => {

    const { language } = useContext(LanguageContext);

    const texts = {
        en: {
            title1: "Find by",
            title2: "Speciality",
            description: `Discover the right care for you by searching through our wide range of medical specialties. Whether you need a cardiologist, dermatologist, or any other specialist, our platform helps you easily connect with top doctors in the field. Find the expertise you need for your health concerns and book appointments with specialists at your convenience.`
        },
        jp: {
            title1: "診療科別に探す",
            title2: "",
            description: `幅広い診療科から、あなたに最適な医療を見つけましょう。
心臓専門医、皮膚科医、または他の専門医が必要な場合でも、当プラットフォームを通じて簡単に信頼できる医師とつながることができます。
健康に関するお悩みに対応する専門家を見つけ、便利に予約できます。`
        }
    };

    const t = texts[language];

    return (
        <div className='flex flex-col items-center gap-4 px-2 py-[90px] md:py-16 text-gray-200 md:h-[80vh] md:mt-10 justify-center' id='speciality'>
            <h1 className='text-4xl md:text-6xl mb-4 font-semibold tracking-wider'>
                {t.title1} {t.title2 && <span className='text-primary'>{t.title2}</span>}
            </h1>

            <p className='text-gray-300 font-thin text-center text-sm sm:text-md max-w-2xl sm:mb-6 whitespace-pre-line'>
                {t.description}
            </p>

            <div className='flex justify-evenly w-full overflow-scroll overflow-y-hidden max-w-[400px] md:max-w-[500px]'>
                {specialityData.map((item, index) => (
                    <Link
                        onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center cursor-pointer flex-shrink-0'
                        key={index}
                        to={`/doctors/${item.speciality}`}
                    >
                        <img
                            className='w-[70px] rounded-full p-2.5 bg-primary/20 hover:bg-primary/50 transition-all duration-300 mx-1'
                            src={item.image}
                            alt=""
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
