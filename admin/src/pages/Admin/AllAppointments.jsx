import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

    const { getAllAppointments, appointments, aToken, cancelAppointment } = useContext(AdminContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);

    // Sort appointments in reverse order by slotDate
    const sortedAppointments = [...appointments].sort((a, b) => new Date(b.slotDate) - new Date(a.slotDate));

    return (
        <div className='w-full max-w-6xl m-5'>

            <div className='bg-primary bg-opacity-20 border border-primary rounded text-sm max-h-[85vh] overflow-y-scroll border-b-0'>

                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] grid-flow-col py-3 px-6 border-b border-primary text-primary'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {
                    sortedAppointments.map((item, index) => (
                        <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_2fr] items-center text-gray-300 py-3 px-6 border-b border-primary hover:bg-primary hover:bg-opacity-50'>
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img src={item.userData.image} alt="" className='w-8 rounded-full bg-primary' />
                                <p>{item.userData.name}</p>
                            </div>
                            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                            <p className='max-sm:hidden'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                            <div className='flex items-center gap-2'>
                                <img src={item.docData.image} alt="" className='w-8 rounded-full bg-primary' />
                                <p>{item.docData.name}</p>
                            </div>
                            <p>{currency}{item.docData.fees}</p>
                            {item.cancelled
                                ? <p className='text-red-500 text-sm font-medium'>Cancelled</p>
                                : item.isCompleted ? <p className='text-green-500 text-sm font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer' />
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default AllAppointments
