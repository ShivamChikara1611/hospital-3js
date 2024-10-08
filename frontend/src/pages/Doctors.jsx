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
        <div>
            <h1 className='text-gray-300 text-center font-semibold text-4xl mt-[50px] mb-12'>Browse through the <span className='text-primary'>Doctors Specialist.</span></h1>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                {/* Filter Button */}
                <button className={`py-1 px-5 text-white border border-primary bg-primary hover:bg-transparent hover:text-primary rounded-md text-md transition-all sm:hidden ${showFilter ? 'bg-primary border-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>

                {/* Filter Section */}
                <div className={` flex-col gap-4 text-sm text-primary ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-primary rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${speciality === "General physician" ? "bg-primary text-white" : ""}`}>General physician</p>
                    <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-primary rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${speciality === "Gynecologist" ? "bg-primary text-white" : ""}`}>Gynecologist</p>
                    <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-primary rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${speciality === "Dermatologist" ? "bg-primary text-white" : ""}`}>Dermatologist</p>
                    <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-primary rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${speciality === "Pediatricians" ? "bg-primary text-white" : ""}`}>Pediatricians</p>
                    <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-primary rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${speciality === "Neurologist" ? "bg-primary text-white" : ""}`}>Neurologist</p>
                    <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-primary rounded transition-all cursor-pointer hover:bg-primary hover:text-white ${speciality === "Gastroenterologist" ? "bg-primary text-white" : ""}`}>Gastroenterologist</p>
                </div>

                {/* Doctors List */}
                <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
                    {
                        filterDoc.slice(0, doctorsToShow).map((item, index) => (
                            <div onClick={() => navigate(`/appointment/${item._id}`)} className='cursor-pointer opacity-60 hover:opacity-100 border-2 border-opacity-50 border-primary overflow-hidden rounded-xl hover:translate-y-[-10px]  transition-all duration-300' key={index}>
                                <img className='bg-primary bg-opacity-50' src={item.image} alt="" />
                                <div className='p-4 bg-opacity-15 bg-primary h-full flex flex-col'>
                                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'}  rounded-full`}></p><p className={`${item.available ? 'text-green-500' : 'text-red-500'}`}>{item.available ? 'Available' : 'Not Available'}</p>
                                    </div>
                                    <p className='text-gray-300 text-lg font-medium'>{item.name.split(' ').slice(0, 1).join(' ')} <span className='text-primary'>{item.name.split(' ').slice(1, 2).join(' ')}</span> {item.name.split(' ').slice(2, 3).join(' ')}</p>
                                    <p className='text-gray-400 text-sm'>{item.speciality}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Load More Button */}
            <div className='flex justify-center w-full mt-10'>
                {doctorsToShow < filterDoc.length && (
                    <button onClick={loadMoreDoctors} className='text-white border-2 border-primary text-lg mt-6 bg-primary rounded-full py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'>
                        More
                    </button>
                )}
            </div>
        </div>
    )
}

export default Doctors;
