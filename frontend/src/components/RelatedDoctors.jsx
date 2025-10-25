import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)
    const { language } = useContext(LanguageContext)
    const navigate = useNavigate()

    const [relDoc, setRelDocs] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    const texts = {
        en: {
            heading: "Top Doctors to Book.",
            subtext: "Simply browse through our extensive list of trusted doctors.",
            available: "Available",
            notAvailable: "Not Available",
            more: "More"
        },
        jp: {
            heading: "予約できるトップドクター",
            subtext: "信頼できる医師のリストを簡単に閲覧できます。",
            available: "利用可能",
            notAvailable: "利用不可",
            more: "もっと見る"
        }
    }

    return (
        <div className='flex flex-col items-center max-w-[1200px] mx-auto my-16'>
            <h1 className='text-2xl font-light tracking-wide text-gray-200'>{texts[language].heading}</h1>
            <p className='w-[250px] text-center text-sm font-light text-gray-400'>{texts[language].subtext}</p>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-flow-cols-4 xl:grid-cols-6 gap-2 mt-8'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='cursor-pointer overflow-hidden rounded-xl'
                        key={index}
                    >
                        <img className='bg-primary/20' src={item.image} alt="" />
                        <div className='p-2 bg-black/20 h-full flex flex-col'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-700'>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                                <p className={`${item.available ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.available ? texts[language].available : texts[language].notAvailable}
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

            {
                relDoc.length > 2 &&
                <button
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                    className='text-white border-2 border-primary text-lg mt-6 bg-primary rounded-full py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'
                >
                    {texts[language].more}
                </button>
            }
        </div>
    )
}

export default RelatedDoctors
