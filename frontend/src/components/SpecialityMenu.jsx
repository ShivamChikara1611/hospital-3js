import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-300 h-[80vh] justify-center' id='speciality'>
            <h1 className='text-4xl sm:text-6xl mb-4 font-semibold'>Find by <span className='text-primary'>Speciality</span></h1>
            <p className='text-gray-400 text-center text-sm sm:text-md max-w-2xl sm:mb-6'>Discover the right care for you by searching through our wide range of medical specialties. Whether you need a cardiologist, dermatologist, or any other specialist, our platform helps you easily connect with top doctors in the field. Find the expertise you need for your health concerns and book appointments with specialists at your convenience.</p>


            <div className='flex justify-start xl:justify-center gap-4 sm:gap-8 pt-5 w-full overflow-scroll overflow-y-hidden'>
                {specialityData.map((item, index)=>(
                    <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                        <img className='w-[80px] sm:w-[120px] rounded-full p-3 sm:p-5 border-4 sm:border-8 border-[#890c93]' src={item.image} alt="" />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu