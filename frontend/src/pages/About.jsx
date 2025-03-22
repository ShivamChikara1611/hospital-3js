import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    // Sample testimonials data
    const testimonials = [
        {
            img: assets.patient2,
            name: 'John Doe',
            text: "The care I received at MAX Multispeciality Hospital was exceptional. The doctors and staff were very attentive and made sure I was comfortable throughout my stay.",
            rating: 5,
        },
        {
            img: assets.patient1,
            name: 'Jane Smith',
            text: "I was impressed by the state-of-the-art facilities and the expertise of the medical team at MAX Multispeciality Hospital. They truly care about their patients.",
            rating: 5,
        },
        {
            img: assets.patient4,
            name: 'Michael Johnson',
            text: "The staff at MAX Multispeciality Hospital were very friendly and made me feel at ease during my treatment. I highly recommend them.",
            rating: 5,
        },
        {
            img: assets.patient3,
            name: 'Emily Brown',
            text: "MAX Multispeciality Hospital exceeded my expectations in every way. The doctors were knowledgeable and the care was top-notch.",
            rating: 5,
        },
        {
            img: assets.patient5,
            name: 'Tom Watson',
            text: "I was impressed by the cleanliness and organization of the hospital. The staff were very professional and courteous.",
            rating: 5,
        },
    ];

    // Function to handle next and previous buttons
    const handlePrev = () => {
        const newIndex = (activeIndex === 0) ? testimonials.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (activeIndex === testimonials.length - 1) ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };


    return (
        <div className='mt-10 flex flex-col items-center mb-[150px]'>
            <h1 className='text-4xl font-bold text-center text-gray-800'>About <span className='text-primary'>Us</span></h1>

            {/* About Banner */}
            <div className='bg-third/50 rounded-xl sm:flex items-center overflow-hidden justify-evenly mt-10 p-8 gap-8 xl:gap-10 xl:px-[100px] max-w-[1300px]'>
                <img className='w-[50%] sm:w-[35%] md:max-w-[28%] lg:max-w-[22%] xl:max-w-[20%] mb-8 sm:mb-0 m-auto' src={assets.about_banner} alt="" />
                <div className='text-center sm:text-left'>
                    <h1 className='text-2xl md:text-3xl md:mb-4 lg:text-4xl font-semibold text-primary'>Redefining Healthcare with Compassion, Innovation, and Care</h1>
                    <button onClick={() => navigate('/doctors')} className='bg-transparent sm:text-lg px-6 py-2 border text-primary border-primary rounded-full mt-4 hover:bg-primary hover:text-white transition-all hover:scale-105 duration-300'>Book your Appointment</button>
                </div>
            </div>

            {/* About Intro */}
            <div className='md:flex justify-center items-center gap-10 mt-[150px] max-w-[800px]'>
                <div className='md:w-1/2 justify-center flex '>
                    <img src={assets.about_image} alt="" className='object-contain max-h-[400px]' />
                </div>
                <div className='md:w-1/2 mt-8 md:mt-0'>
                    <h2 className='text-3xl font-semibold mb-4'><span className='text-primary'>Intro.</span></h2>
                    <p className='text-lg text-gray-800'>Welcome to MAX Multispeciality Hospital, where compassionate care meets cutting-edge technology...</p>
                </div>
            </div>

            {/* Mission, Vision, and Values */}
            <div className='flex flex-wrap justify-center gap-10 mt-[150px]'>
                {/* Mission */}
                <div className='flex flex-col items-center justify-center p-5 max-w-[400px] border border-4 border-secondary'>
                    <img src={assets.mission} alt="Mission Icon" className='mb-4' />
                    <h3 className='text-2xl font-semibold mb-2'>Mission</h3>
                    <p className='text-gray-500'>Our mission is to provide exceptional healthcare services by combining advanced medical treatments with personalized patient care...</p>
                </div>

                {/* Vision */}
                <div className='flex flex-col items-center justify-center p-5 max-w-[400px] border border-4 border-secondary'>
                    <img src={assets.vision} alt="Vision Icon" className='mb-4' />
                    <h3 className='text-2xl font-semibold mb-2'>Vision</h3>
                    <p className='text-gray-500'>Our vision is to be a global leader in healthcare by continuously innovating and improving our services...</p>
                </div>

                {/* Values */}
                <div className='flex flex-col items-center justify-center p-5 max-w-[400px] border border-4 border-secondary'>
                    <img src={assets.value} alt="Values Icon" className='mb-4' />
                    <h3 className='text-2xl font-semibold mb-2'>Values</h3>
                    <p className='text-gray-500'>We believe in integrity, empathy, excellence, and collaboration...</p>
                </div>
            </div>

            {/* Our Story */}
            <div className='mt-[150px] max-w-[800px]'>
                <h1 className='text-3xl font-semibold'>Our <span className='text-primary'>Story</span></h1>
                <p className='text-gray-800 mt-4'>Founded in 2009, MAX Multispeciality Hospital has grown from a small community clinic to one of the leading healthcare institutions in the region...</p>
            </div>

            {/* Testimonials */}
            <div className='mt-[150px] max-w-[800px] flex flex-col items-center'>
                <h1 className='text-3xl font-semibold'>Patient <span className='text-primary'>Testimonials</span></h1>

                <div className='carousel mt-10 relative'>

                    {/* Carousel Item */}
                    <div className='carousel-item text-center bg-primary p-8 rounded-lg fade-transition'>
                        <div className='bg-third w-[100px] h-[100px] mb-4 m-auto rounded-full overflow-hidden'>
                            <img src={testimonials[activeIndex].img} alt={`Patient ${activeIndex + 1}`} />
                        </div>
                        <h3 className='text-xl font-semibold mb-2 text-white'>{testimonials[activeIndex].name}</h3>
                        <p className='text-gray-800 mx-[50px] mb-4'>{`"${testimonials[activeIndex].text}"`}</p>
                        <div className='rating'>
                            {[...Array(testimonials[activeIndex].rating)].map((_, index) => (
                                <span key={index} className='text-yellow-500'>⭐️</span>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    <button onClick={handlePrev} className='absolute left-0 top-[50%] transform -translate-y-[50%] p-5 text-white'><img className='w-6' src={assets.arrow_l} alt="" /></button>
                    <button onClick={handleNext} className='absolute right-0 top-[50%] transform -translate-y-[50%] p-5 text-white'><img className='w-6' src={assets.arrow_r} alt="" /></button>

                    {/* Dots */}
                    <div className='absolute bottom-[-30px] flex justify-center w-full'>
                        {testimonials.map((_, index) => (
                            <div
                                key={index}
                                className={`dot w-3 h-3 rounded-full mx-1 ${activeIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default About;
