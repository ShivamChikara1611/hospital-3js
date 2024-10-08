import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { StethoscopeCanvas } from '../canvas'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    // Function to remove duplicates by speciality
    const uniqueSpecialityDoctors = doctors.reduce((acc, doctor) => {
        if (!acc.some((doc) => doc.speciality === doctor.speciality)) {
            acc.push(doctor)
        }
        return acc
    }, [])

    return (
        <div className='flex flex-col items-center gap-4 text-gray-300 md:mx-10'>
            <div className='relative flex flex-col items-center justify-center h-[80vh] z-[-2] w-full'>
                <h1 className='text-4xl sm:text-6xl mb-8 font-semibold text-center'>
                    Top <span className='text-primary'>Doctors</span> to Book
                </h1>
                <p className='text-gray-300 text-center text-md max-w-2xl'>
                    Discover the top-rated doctors available for booking in various specialities. Our highly experienced professionals are dedicated to providing exceptional healthcare services tailored to your needs. Browse through the list of trusted doctors and book your appointment with ease, ensuring the best care for you and your loved ones.
                </p>
                <div className='absolute top-0 cursor-pointer h-full w-full z-[-1]'>
                    <StethoscopeCanvas />
                </div>
            </div>

            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 mt-12'>
                {uniqueSpecialityDoctors.map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            scrollTo(0, 0)
                        }}
                        className='cursor-pointer opacity-60 hover:opacity-100 border-2 border-opacity-50 border-primary overflow-hidden rounded-xl hover:translate-y-[-10px] transition-all duration-300'
                        key={index}
                    >
                        <img className='bg-primary bg-opacity-50' src={item.image} alt="" />
                        <div className='p-4 bg-opacity-15 bg-primary h-full flex flex-col'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                                <p className={`${item.available ? 'text-green-500' : 'text-red-500'}`}>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-300 text-lg font-medium'>
                                {item.name.split(' ').slice(0, 1).join(' ')} <span className='text-primary'>
                                    {item.name.split(' ').slice(1, 2).join(' ')}
                                </span> {item.name.split(' ').slice(2, 3).join(' ')}
                            </p>
                            <p className='text-gray-400 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/doctors')
                    scrollTo(0, 0)
                }}
                className='text-white border-2 border-primary text-lg mt-6 bg-primary rounded-full py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'
            >
                More
            </button>
        </div>
    )
}

export default TopDoctors
