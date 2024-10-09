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
                <div className='bg-primary text-white w-fit mt-5 py-2 px-8 rounded-full text-lg'>
                    <a className='' href="#speciality">
                        Book Appointment
                    </a>
                </div>

            </div>
        </div>

    )
}

export default Header