import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LanguageContext } from '../context/LanguageContext';

const Doctors = () => {

    const { speciality } = useParams();
    const [filterDoc, setFilterDocs] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [doctorsToShow, setDoctorsToShow] = useState(window.innerWidth < 720 ? 6 : 12); // Initial number of doctors

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    const { language } = useContext(LanguageContext);

    const texts = {
        en: {
            heading: "Browse through the",
            highlight: "Doctors Specialist.",
            filter: "Filter",
            available: "Available",
            notAvailable: "Not Available",
            more: "More",
            specialties: {
                "General physician": "General physician",
                "Gynecologist": "Gynecologist",
                "Dermatologist": "Dermatologist",
                "Pediatricians": "Pediatricians",
                "Neurologist": "Neurologist",
                "Gastroenterologist": "Gastroenterologist"
            }
        },
        jp: {
            heading: "専門医を",
            highlight: "閲覧する",
            filter: "フィルター",
            available: "利用可能",
            notAvailable: "利用不可",
            more: "もっと見る",
            specialties: {
                "General physician": "一般医",
                "Gynecologist": "婦人科医",
                "Dermatologist": "皮膚科医",
                "Pediatricians": "小児科医",
                "Neurologist": "神経科医",
                "Gastroenterologist": "消化器科医"
            }
        }
    };

    const t = texts[language];

    const applyFilter = () => {
        if (speciality) {
            setFilterDocs(doctors.filter(doc => doc.speciality === speciality));
        } else {
            setFilterDocs(doctors);
        }
    }

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    const loadMoreDoctors = () => {
        setDoctorsToShow(prevCount => prevCount + (window.innerWidth < 720 ? 4 : 6)); // Load more doctors
    }

    return (
        <div className='my-10 md:my-16 mx-2 md:mx-0'>
            <h1 className='text-gray-200 text-center tracking-wider text-2xl md:text-4xl mb-8 md:mb-12'>
                {t.heading} <span className='text-primary'>{t.highlight}</span>
            </h1>

            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
                {/* Filter Button */}
                <button
                    className={`bg-white/5 backdrop-blur-md text-gray-200 px-6 py-1.5 rounded-full hover:bg-primary/70 transition-all duration-300 tracking-widest font-thin sm:hidden ${showFilter ? 'bg-primary/70' : ''}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    {t.filter}
                </button>

                {/* Filter Section */}
                <div className={`flex-col gap-2 text-xs text-gray-300 font-thin tracking-wider w-full sm:w-[20vw] ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    {Object.keys(t.specialties).map((spec, idx) => (
                        <p
                            key={idx}
                            onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                            className={`w-[94vw] sm:w-auto sm:max-w-[20vw] pl-3 py-1.5 pr-16 bg-white/10 rounded transition-all duration-200 cursor-pointer hover:bg-primary/70 hover:text-white ${speciality === spec ? "bg-primary/70 text-white" : ""}`}
                        >
                            {t.specialties[spec]}
                        </p>
                    ))}
                </div>

                {/* Doctors List */}
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2'>
                    {
                        filterDoc.slice(0, doctorsToShow).map((item, index) => (
                            <div onClick={() => navigate(`/appointment/${item._id}`)} className='cursor-pointer overflow-hidden rounded-xl' key={index}>
                                <img className='bg-primary/20' src={item.image} alt="" />
                                <div className='p-2 bg-black/20 h-full flex flex-col'>
                                    <div className='flex items-center gap-2 text-sm text-center text-green-700'>
                                        <p className={`w-2 h-2 ${item.available ? 'bg-green-700' : 'bg-red-600'}  rounded-full`}></p>
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
                        ))
                    }
                </div>
            </div>

            {/* Load More Button */}
            <div className='flex justify-center w-full mt-10'>
                {doctorsToShow < filterDoc.length && (
                    <button
                        onClick={loadMoreDoctors}
                        className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider'
                    >
                        {t.more}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Doctors;
