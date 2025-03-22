import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const MyAppointments = () => {

    const { backendUrl, token, getDoctorsData } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('-');
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    }

    const navigate = useNavigate();
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
                headers: {
                    token
                }
            })

            if (data.success) {
                setAppointments(data.appointments.reverse())
                // console.log(data.appointments);
            } else {
                console.log(data.message)
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, {
                appointmentId
            }, {
                headers: {
                    token
                }
            })

            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }

        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: 'Appointment Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response);

                try {

                    const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, {
                        headers: {
                            token
                        }
                    })

                    if (data.success) {
                        toast.success(data.message);
                        getUserAppointments();
                        navigate('/my-appointments');
                    } else {
                        toast.error(data.message);
                    }

                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();

    }

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, {
                appointmentId
            }, {
                headers: {
                    token
                }
            })

            if (data.success) {
                initPay(data.order);
            } else {
                toast.error(data.message);
            }

        }
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    })

    const [doctorsToShow, setDoctorsToShow] = useState(window.innerWidth < 720 ? 5 : 5);

    const loadMoreDoctors = () => {
        setDoctorsToShow(prevCount => prevCount + (window.innerWidth < 720 ? 2 : 3)); // Load more doctors
    }

    return (
        <div className='mb-[150px]'>
            <h1 className='mt-[80px] text-4xl font-bold text-center text-gray-800'>My <span className='text-primary'>Appointments.</span></h1>

            <div className='mt-[60px] max-w-[1000px] mx-auto'>
                {
                    appointments.slice(0, doctorsToShow).map((item, index) => (
                        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 bg-third mb-5 p-5 rounded-lg' key={index}>
                            <div>
                                <img className='w-32 bg-primary rounded' src={item.docData.image} alt="" />
                            </div>
                            <div className='flex-1 text-sm text-gray-600'>
                            <p className='text-gray-800 text-lg font-medium'>
                                {item.docData.name.split(' ').slice(0, 1).join(' ')} <span className='text-primary'>
                                    {item.docData.name.split(' ').slice(1, 2).join(' ')}
                                </span> {item.docData.name.split(' ').slice(2, 3).join(' ')}
                            </p>
                                <p>{item.docData.speciality}</p>
                                <p className='text-zinc-500 font-medium mt-1'>Address:</p>
                                <p className='text-xs'>{item.docData.address.line1}</p>
                                <p className='text-xs'>{item.docData.address.line2}</p>
                                <p className='text-xs mt-1'><span className='text-sm text-neutral-500 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                            </div>
                            <div></div>
                            <div className='flex flex-col gap-2 justify-end'>
                                {!item.cancelled && item.payment && !item.isCompleted && <button className='text-sm text-gray-800 border-gray-800 text-center sm:min-w-48 py-2 border rounded hover:bg-green-500 hover:border-transparent hover:text-black transition-all duration-200'>Paid</button>}
                                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-gray-800 text-center border-gray-800 sm:min-w-48 py-2 border rounded hover:bg-primary hover:border-transparent hover:text-white transition-all duration-200'>Pay Online</button>}
                                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-gray-800 text-center border-gray-800 sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:border-transparent hover:text-white transition-all duration-200'>Cancel appointment</button>}
                                {item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-center sm:min-w-48 py-2 border border-red-500 bg-red-500 text-white rounded'>Appointment cancelled</button>}
                                {
                                    item.isCompleted && <button className='text-sm text-white text-center sm:min-w-48 py-2 border border-green-500 bg-green-500 rounded'>Completed</button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-center w-full mt-10'>
                {doctorsToShow && (
                    <button onClick={loadMoreDoctors} className='text-white border-2 border-primary text-lg mt-6 bg-primary rounded-full py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'>
                        More
                    </button>
                )}
            </div>
        </div>
    )
}

export default MyAppointments