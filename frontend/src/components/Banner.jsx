import React from "react";
import { DnaCanvas } from "../canvas";

const Banner = () => {
    return (
        <div className="relative flex flex-col justify-center my-16 px-2 md:px-[10%] py-10 md:rounded-md bg-black/30 overflow-hidden backdrop-blur-md">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-200 tracking-wide">
                <p>Book Appointment</p>
                <p className="mt-4">With <span className="text-primary font-extrabold tracking-widest">100+ </span>Trusted Doctors</p>
            </div>
            <div>
                <button className="bg-white/20 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light mt-3 md:mt-5 tracking-wider text-xs md:text-xl">
                    <a href="#speciality">Book Now</a>
                </button>
            </div>
            <div className="absolute top-0 right-5 h-full opacity-60">
                <DnaCanvas />
            </div>
        </div>
    );
};

export default Banner;
