import React from 'react';
import { assets } from "../assets/assets";
import { NavLink } from 'react-router-dom';

const SkinCancer = () => {
    return (
        <div className="relative flex flex-col items-center justify-center h-[55vh] md:h-[70vh] md:rounded-xl overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${assets.skincancer3})`
                }}
            ></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center gap-5 md:gap-10 bg-black/65 backdrop-blur-sm h-full w-full px-2">
                <h1 className="text-4xl text-gray-200 tracking-wider sm:text-6xl font-semibold text-center">
                    Skin Cancer <span className="text-primary">Detector</span>
                </h1>

                <div className='md:flex gap-5 justify-center items-center '>
                    <div className='max-w-[600px]'>
                        <h2 className='text-primary text-lg mb-1'>"Your Trusted Skin Cancer Check"</h2>
                        <p className='text-gray-300 italic text-sm font-thin'>Discover our new, free home diagnostic feature! <br />Our hospital is proud to offer a state-of-the-art, online tool that lets you check for signs of skin cancer from the comfort of your own home -without any expense. Get reliable, expert-approved results quickly and easily.</p>
                    </div>

                    <div className='mt-5 md:mt-0 min-w-[180px]'>
                        <NavLink to='/skin-cancer'>
                            <button className='bg-transparent rounded-full tracking-wider border-2 text-green-800 px-5 py-3 border-green-800 hover:bg-green-800 hover:text-gray-200 transition-all duration-200'>Diagnose Yourself</button>
                        </NavLink>
                    </div>
                </div>

            </div>

            <button className='absolute top-0 left-0 z-10 bg-primary tracking-wider text-white px-4 py-2'>New Feature</button>
        </div>
    );
};

export default SkinCancer;
