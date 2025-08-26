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
        <div className='my-10 flex flex-col items-center mx-2 md:mx-0'>
            <h1 className='text-2xl text-center tracking-wider text-gray-200'>About Us</h1>

            {/* About Intro */}
            <p className='text-gray-400 text-center font-light text-sm tracking-wide mt-5 max-w-[500px] md:max-w-[700px]'>
                MAX Superspeciality Hospital Management System is a comprehensive digital solution designed to modernize and streamline hospital operations. From patient registrations to AI-powered disease detection, the system empowers hospitals, doctors, and patients with seamless, technology-driven healthcare experiences.
            </p>

            {/* Mission, Vision */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-16 max-w-[350px] md:max-w-[800px]'>
                {/* Mission */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <img src={assets.mission} alt="Mission Icon" className='mb-2 w-10' />
                    <h3 className='text-lg mb-1 text-gray-300 font-thin tracking-widest'>Mission</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>Our mission is to simplify hospital workflows with technology and AI, ensuring efficiency, transparency, and patient-centric care. We strive to make quality healthcare more accessible, smarter, and seamless for everyone.</p>
                </div>

                {/* Vision */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <img src={assets.vision} alt="Vision Icon" className='mb-2 w-10' />
                    <h3 className='text-lg mb-1 text-gray-300 font-thin tracking-widest'>Vision</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>To revolutionize healthcare by reducing waiting times, eliminating overcrowding, and empowering patients with digital access to appointments, reports, and payments—while enabling doctors to focus more on care through AI-driven solutions.</p>
                </div>
            </div>

            {/* Challenges We Solve */}
            <div className='my-16 text-center'>
                <h1 className='text-gray-200 text-lg font-normal tracking-wider'>Challenges We Solve</h1>
                <p className='mt-2 text-gray-500 text-sm font-light tracking-wide max-w-[600px] md:max-w-[900px]'>
                    Hospitals often face challenges such as long queues, overcrowded waiting areas, and time-consuming manual processes that create frustration for both patients and staff. Managing paper-based medical records can lead to errors, miscommunication, and difficulties in retrieving critical information when needed. Patients struggle with delayed appointments, lack of transparency in billing, and limited access to their medical history, while doctors spend valuable time handling administrative tasks instead of focusing on patient care. MAX Superspeciality Hospital Management System addresses these challenges by digitizing hospital workflows, streamlining communication, and integrating AI-based tools to provide faster, more reliable, and patient-friendly healthcare services.
                </p>
            </div>

            {/* Key Features */}
            <h1 className='text-gray-200 text-lg font-normal tracking-wider text-center mb-3'>Key Features</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[350px] md:max-w-[800px]'>

                {/* patient panel */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <h3 className='text-lg mb-1 text-gray-200 font-light tracking-widest'>Patient Panel</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>
                        The Patient Panel is designed to make healthcare more convenient and accessible. Patients can easily book or cancel appointments online, make secure digital payments, and access their medical history and lab reports anytime. To enhance early detection, the system also integrates an AI-based skin cancer preliminary checkup with an impressive 94% accuracy rate.
                    </p>
                </div>

                {/* Doctor Panel */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <h3 className='text-lg mb-1 text-gray-200 font-light tracking-widest'>Doctor Panel</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>
                        The Doctor Panel provides doctors with powerful tools to manage their schedules and appointments efficiently. With instant access to patient history, automated reminders, and intelligent slot management, doctors can save time and focus more on delivering quality care. AI-powered insights further support faster and more accurate diagnoses, enabling doctors to provide better treatment outcomes.
                    </p>
                </div>
            </div>

            {/* Testimonials */}
            <h1 className='mt-16 text-gray-200 text-lg font-light tracking-wide'>Impact & Achievements</h1>
            <div className='text-gray-300 text-xs mt-3 w-full flex flex-col gap-2 text-center max-w-[500px]'>
                <p className='bg-primary/40 py-3 rounded-full'>60% reduction in patient waiting time.</p>
                <p className='bg-primary/40 py-3 rounded-full'>30–40% reduction in hospital crowding.</p>
                <p className='bg-primary/40 py-3 rounded-full'>Improved patient experience with at-home access to healthcare services.</p>
                <p className='bg-primary/40 py-3 rounded-full'>Enhanced efficiency for doctors and staff.</p>
            </div>

            {/* future section */}
            <h1 className='mt-16 text-gray-200 text-lg font-light tracking-wide'>Future Enhancements</h1>
            <div className='text-gray-400 text-xs mt-3 w-full flex flex-col gap-2 text-center max-w-[500px] mb-16'>
                <p>
                    In the future, MAX Superspeciality Hospital Management System aims to further transform healthcare delivery by integrating with wearable health devices to track real-time patient data and provide continuous monitoring. Telemedicine and video consultations will be introduced to make healthcare more accessible beyond hospital walls, allowing patients to connect with doctors remotely. The system will also feature automated pharmacy and inventory management to ensure efficient resource utilization and reduce shortages. Additionally, AI-driven predictive analytics will be leveraged to identify potential health risks early, enabling proactive interventions and improving patient outcomes.
                </p>
            </div>
        </div>
    )
}

export default About;
