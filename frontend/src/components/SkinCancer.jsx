import React from 'react';
import { assets } from "../assets/assets";
import { NavLink } from 'react-router-dom';

const SkinCancer = () => {
    return (
        <div className="relative text-white mt-[150px] h-[80vh] rounded-xl w-full px-10 py-[100px] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${assets.skincancer3})`,
                    opacity: 0.3
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 h-full">
                <h1 className="text-4xl sm:text-6xl mb-12 font-semibold text-center">
                    Skin Cancer <span className="text-primary">Detector</span>
                </h1>

                <div className='md:flex gap-5 justify-center items-center h-full'>
                    <div className='max-w-[600px]'>
                        <h2 className='text-primary text-xl mb-2 font-semibold'>"Your Trusted Skin Cancer Check"</h2>
                        <p className='text-gray-300 italic font-light'>Discover our new, free home diagnostic feature! <br />Our hospital is proud to offer a state-of-the-art, online tool that lets you check for signs of skin cancer from the comfort of your own home -without any expense. Get reliable, expert-approved results quickly and easily.</p>
                    </div>

                    <div className='mt-5 md:mt-0 min-w-[180px]'>
                        <NavLink to='/skin-cancer'>
                            <button className='bg-transparent rounded-lg border-2 text-green-600 px-5 py-3 border-green-600 hover:bg-green-600 hover:text-white transition-all'>Diagnose Yourself</button>
                        </NavLink>
                    </div>
                </div>

            </div>

            <button className='absolute top-0 left-0 bg-primary px-4 py-2'>New Feature</button>
        </div>
    );
};

export default SkinCancer;
