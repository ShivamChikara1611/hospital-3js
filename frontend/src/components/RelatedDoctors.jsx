import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()


    const [relDoc, setRelDocs] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 max-w-[1200px] mx-auto'>
            <h1 className='text-3xl font-medium text-gray-200'>Top <span className='text-primary'>Doctors</span> to Book.</h1>
            <p className='w-[240px] text-center text-md text-gray-400'>Simply browse through our extensive list of trusted doctors.</p>


            <div className='w-full grid grid-cols-auto gap-4 pt-10 gap-y-6'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='cursor-pointer opacity-60 hover:opacity-100 border-2 border-opacity-50 border-primary overflow-hidden rounded-xl hover:translate-y-[-10px]  transition-all duration-300' key={index}>
                        <img className='bg-primary bg-opacity-50' src={item.image} alt="" />
                        <div className='p-4 bg-opacity-15 bg-primary h-full flex flex-col'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'}  rounded-full`}></p><p className={`${item.available ? 'text-green-500' : 'text-red-500'}`}>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-300 text-lg font-medium'>{item.name.split(' ').slice(0, 1).join(' ')} <span className='text-primary'>{item.name.split(' ').slice(1, 2).join(' ')}</span> {item.name.split(' ').slice(2, 3).join(' ')}</p>
                            <p className='text-gray-400 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='text-white border-2 border-primary text-lg mt-6 bg-primary rounded-full py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'>More</button>
        </div>
    )
}

export default RelatedDoctors