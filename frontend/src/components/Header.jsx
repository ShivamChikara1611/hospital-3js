import React from 'react'
import { DnaCanvas } from '../canvas'

const Header = () => {
    return (
        <div className='relative h-[88vh] flex flex-col justify-center'>
            <div className='absolute top-0 h-[88vh] z-[-1] flex justify-between w-full overflow-hidden'>
                <DnaCanvas />
            </div>
            <div className='flex flex-col gap-4'>
                <p className='text-gray-200 text-5xl lg:text-7xl font-semibold leading-tight'>
                    <span className='text-primary font-bold'>Book</span> Appointment <br /> With Trusted Doctors.
                </p>
                <div className='text-white border-4 border-primary font-medium py-4 text-xl mt-6 bg-primary rounded-full px-4 py-2 w-fit hover:bg-transparent hover:text-primary hover:border-4 hover:border-primary hover:scale-105 transition-all'>
                    <a className='px-6' href="#speciality">
                        Book Appointment
                    </a>
                </div>

            </div>
        </div>

    )
}

export default Header