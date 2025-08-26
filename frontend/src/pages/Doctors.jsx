import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {

    const { speciality } = useParams();
    const [filterDoc, setFilterDocs] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [doctorsToShow, setDoctorsToShow] = useState(window.innerWidth < 720 ? 6 : 12); // Initial number of doctors

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

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
            <h1 className='text-gray-200 text-center tracking-wider text-2xl md:text-4xl mb-8 md:mb-12'>Browse through the <span className='text-primary'>Doctors Specialist.</span></h1>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                {/* Filter Button */}
                <button className={`bg-white/5 backdrop-blur-md text-gray-200 px-6 py-1.5 rounded-full hover:bg-primary/70 transition-all duration-300 tracking-widest font-thin sm:hidden ${showFilter ? 'bg-primary/70' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>

                {/* Filter Section */}
                <div className={`flex-col gap-2 text-xs text-gray-300 font-thin tracking-wider ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

                    <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 bg-white/10 rounded transition-all duration-200 cursor-pointer hover:bg-primary/70 hover:text-white ${speciality === "General physician" ? "bg-primary/70 text-white" : ""}`}>General physician</p>

                    <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 bg-white/10 rounded transition-all duration-200 cursor-pointer hover:bg-primary/70 hover:text-white ${speciality === "Gynecologist" ? "bg-primary/70 text-white" : ""}`}>Gynecologist</p>

                    <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 bg-white/10 rounded transition-all duration-200 cursor-pointer hover:bg-primary/70 hover:text-white ${speciality === "Dermatologist" ? "bg-primary/70 text-white" : ""}`}>Dermatologist</p>

                    <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 bg-white/10 rounded transition-all duration-200 cursor-pointer hover:bg-primary/70 hover:text-white ${speciality === "Pediatricians" ? "bg-primary/70 text-white" : ""}`}>Pediatricians</p>

                    <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 bg-white/10 rounded transition-all duration-200 cursor-pointer hover:bg-primary/70 hover:text-white ${speciality === "Neurologist" ? "bg-primary/70 text-white" : ""}`}>Neurologist</p>

                    <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 bg-white/10 rounded transition-all duration-200 cursor-pointer hover:bg-primary/70 hover:text-white ${speciality === "Gastroenterologist" ? "bg-primary/70 text-white" : ""}`}>Gastroenterologist</p>
                </div>

                {/* Doctors List */}
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2'>
                    {
                        filterDoc.slice(0, doctorsToShow).map((item, index) => (
                            <div onClick={() => navigate(`/appointment/${item._id}`)} className='cursor-pointer overflow-hidden rounded-xl' key={index}>
                                <img className='bg-primary/20' src={item.image} alt="" />
                                <div className='p-2 bg-black/20 h-full flex flex-col'>
                                    <div className='flex items-center gap-2 text-sm text-center text-green-700'>
                                        <p className={`w-2 h-2 ${item.available ? 'bg-green-700' : 'bg-red-600'}  rounded-full`}></p><p className={`${item.available ? 'text-green-700' : 'text-red-600'}`}>{item.available ? 'Available' : 'Not Available'}</p>
                                    </div>

                                    <p className='text-gray-200 text-md md:text-lg font-medium'>{item.name.trim().split(' ').slice(0, 1)} <span className='text-primary'>
                                    {item.name.trim().split(' ').slice(1, 2)}
                                </span></p>

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
                    <button onClick={loadMoreDoctors} className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider'>
                        More
                    </button>
                )}
            </div>
        </div>
    )
}

export default Doctors;
