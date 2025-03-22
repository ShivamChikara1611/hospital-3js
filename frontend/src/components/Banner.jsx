import React from 'react'
import { DnaCanvas } from '../canvas'

const Banner = () => {

    return (
        <div className='w-full h-[70vh] flex flex-col justify-center'>
            <div className='flex rounded-lg h-[50vh] bg-third justify-evenly pl-4'>
                <div className='flex justify-center flex flex-col'>
                    <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-800'>
                        <p>Book Appointment</p>
                        <p className='mt-4'>With 100+ Trusted Doctors</p>
                    </div>
                    <button className='text-white border-2 border-primary text-lg mt-10 bg-primary rounded-full py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-6 w-fit'>
                    <a href="#speciality">
                        Book Now
                    </a>
                </button>
                </div>
                <div className='hidden sm:block'>
                    <DnaCanvas />
                </div>
            </div>
        </div>
    )
}

export default Banner