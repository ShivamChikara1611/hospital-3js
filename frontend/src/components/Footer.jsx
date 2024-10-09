import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[2fr_2fr_2fr] gap-10 my-10 mt-60 text-sm'>
                {/*----------Left Section------------*/}
                <div>
                    <img className='mb-5 w-[150px] rounded-full' src={assets.logo} alt="" />
                    <p className='w-full text-gray-500 leading-6'>MAX Multispeciality Hospital provides a fully operational platform for booking appointments, managing patient records, and accessing a wide range of medical services across all departments. Supported by cutting-edge infrastructure and advanced equipment, we ensure the highest standards of care.</p>
                </div>

                {/*----------Center Section------------*/}
                <div className='flex sm:flex-col gap-5 xl:flex-row xl:justify-evenly'>
                    <div>
                        <p className='text-xl font-medium mb-5 text-gray-200'>COMPANY</p>
                        <ul className='flex flex-col gap-1 text-gray-500'>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Services</li>
                            <li>Contact us</li>
                            <li>FAQs</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-xl font-medium mb-5 text-gray-200'>Working Hours</p>
                        <ul className='flex flex-col gap-1 text-gray-500'>
                            <li><span className='text-primary'>Monday - Friday:</span> 9:00 AM - 5:00 PM</li>
                            <li><span className='text-primary'>Saturday:</span> 9:00 AM - 1:00 PM</li>
                            <li><span className='text-primary'>Sunday:</span> Closed</li>
                        </ul>
                    </div>
                </div>




                {/*----------Right Section------------*/}
                <div>
                    <p className='text-xl font-medium mb-5 text-gray-200'>Contact Information</p>
                    <ul className='flex flex-col gap-2 text-gray-500'>
                        <ul>
                            <p className='text-primary'>Address</p>
                            <li>NH-58, Bhopa Road Flyover, Muzaffarnagar (251001), Uttar Pradesh, India</li>
                        </ul>
                        <ul>
                            <p className='text-primary'>Phone</p>
                            <li>+91 7521456987</li>
                        </ul>
                        <ul>
                            <p className='text-primary'>Emergency</p>
                            <li>+91 9845312678</li>
                        </ul>
                        <ul>
                            <p className='text-primary'>Email</p>
                            <li>hospital@max.in</li>
                        </ul>
                    </ul>
                </div>
            </div>

            <hr className='bg-zinc-600 h-[1px] border-none' />

            <div className='md:flex md:gap-3 md:justify-center'>
                <div>
                <p className='py-5 text-sm text-center text-gray-500'>Copyright 2024@ MAX Multispeciality Hospital - <span className='text-primary'>All Right Reserved.</span></p>
                </div>

                <button className='flex flex-col items-center justify-center w-full md:w-fit mb-3 md:mb-0'><a className='border border-primary rounded-full py-1 px-3 text-primary hover:text-gray-200 hover:bg-primary transition-all duration-300' href="https://www.max-hospital-admin.shivamchikara.xyz/" target="_blank" rel="noopener noreferrer">Switch to Admin</a></button>
            </div>
        </div>
    )
}

export default Footer