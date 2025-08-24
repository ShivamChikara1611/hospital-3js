import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 px-2 py-[90px] md:py-16 text-gray-200 md:h-[80vh] md:mt-10 justify-center' id='speciality'>
            <h1 className='text-4xl md:text-6xl mb-4 font-semibold tracking-wider'>Find by <span className='text-primary'>Speciality</span></h1>
            <p className='text-gray-300 font-thin text-center text-sm sm:text-md max-w-2xl sm:mb-6'>Discover the right care for you by searching through our wide range of medical specialties. Whether you need a cardiologist, dermatologist, or any other specialist, our platform helps you easily connect with top doctors in the field. Find the expertise you need for your health concerns and book appointments with specialists at your convenience.</p>


            <div className='flex justify-evenly w-full overflow-scroll overflow-y-hidden max-w-[400px] md:max-w-[500px]'>
                {specialityData.map((item, index)=>(
                    <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center cursor-pointer flex-shrink-0' key={index} to={`/doctors/${item.speciality}`}>
                        <img className='w-[50px] md:w-[70px] rounded-full p-2 md:p-2.5 bg-primary/20 hover:bg-primary/50 transition-all duration-300' src={item.image} alt="" />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu