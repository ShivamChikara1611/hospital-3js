import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { LanguageContext } from '../context/LanguageContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const { language } = useContext(LanguageContext)

    // Function to remove duplicates by speciality
    const uniqueSpecialityDoctors = doctors.reduce((acc, doctor) => {
        if (!acc.some((doc) => doc.speciality === doctor.speciality)) {
            acc.push(doctor)
        }
        return acc
    }, [])

    const texts = {
        en: {
            heading1: "Top",
            heading2: "Doctors",
            heading3: "to Book",
            description: `Discover the top-rated doctors available for booking in various specialities. Our highly experienced professionals are dedicated to providing exceptional healthcare services tailored to your needs. Browse through the list of trusted doctors and book your appointment with ease, ensuring the best care for you and your loved ones.`,
            available: "Available",
            notAvailable: "Not Available",
            more: "More"
        },
        jp: {
            heading1: "予約できる",
            heading2: "トップドクター",
            heading3: "",
            description: `様々な診療科で予約可能な評価の高い医師を見つけましょう。
経験豊富な専門家が、あなたのニーズに合わせた優れた医療サービスを提供します。
信頼できる医師のリストを確認し、簡単に予約して最高のケアを受けられます。`,
            available: "利用可能",
            notAvailable: "利用不可",
            more: "もっと見る"
        }
    }

    const t = texts[language]

    return (
        <div className='flex flex-col items-center gap-4 text-gray-200 md:mx-10 px-2 md:px-0'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl md:text-6xl mb-5 font-semibold text-center tracking-wider'>
                    {t.heading1} <span className='text-primary'>{t.heading2}</span> {t.heading3}
                </h1>
                <p className='text-gray-300 font-thin text-center text-sm max-w-2xl whitespace-pre-line'>
                    {t.description}
                </p>
            </div>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 mt-5'>
                {uniqueSpecialityDoctors.map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            scrollTo(0, 0)
                        }}
                        className='cursor-pointer overflow-hidden rounded-xl'
                        key={index}
                    >
                        <img className='bg-primary/20' src={item.image} alt="" />
                        <div className='p-2 bg-black/20 h-full flex flex-col'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-700'>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-700' : 'bg-red-600'} rounded-full`}></p>
                                <p className={`${item.available ? 'text-green-700' : 'text-red-600'}`}>
                                    {item.available ? t.available : t.notAvailable}
                                </p>
                            </div>
                            <p className='text-gray-200 text-md md:text-lg font-medium'>
                                {item.name.trim().split(' ').slice(0, 1)} <span className='text-primary'>
                                    {item.name.trim().split(' ').slice(1, 2)}
                                </span>
                            </p>
                            <p className='text-gray-400 text-xs md:text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/doctors')
                    scrollTo(0, 0)
                }}
                className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light mt-3 md:mt-5 tracking-wider'
            >
                {t.more}
            </button>
        </div>
    )
}

export default TopDoctors
