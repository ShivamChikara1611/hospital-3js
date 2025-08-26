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

    const [doctorsToShow, setDoctorsToShow] = useState(window.innerWidth < 720 ? 4 : 6);

    const loadMoreDoctors = () => {
        setDoctorsToShow(prevCount => prevCount + (window.innerWidth < 720 ? 2 : 3)); // Load more doctors
    }

    return (
        <div className='my-10 mx-2 md:mx-0'>
            <h1 className='text-2xl text-center tracking-wide text-gray-200'>My Appointments</h1>

            <div className='mt-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[350px] mx-auto md:max-w-full'>
                {
                    appointments.slice(0, doctorsToShow).map((item, index) => (
                        <div className='bg-white/10 mb-2 md:mb-0 p-2 lg:p-3'>

                            {/* image and details */}
                            <div className='grid grid-cols-[1fr_3fr] gap-2' key={index}>
                                <div>
                                    <img className='w-32 bg-white/30' src={item.docData.image} alt="" />
                                </div>
                                <div className='flex-1 text-gray-300'>
                                    <p className='text-gray-200 text-lg md:text-xl font-medium'>
                                        {item.docData.name.trim().split(' ').slice(0, 1)} {item.docData.name.trim().split(' ').slice(1, 2)} {item.docData.name.trim().split(' ').slice(2, 3)}
                                    </p>
                                    <p className='text-xs'>{item.docData.speciality}</p>
                                    <p className='text-xs'><span className='text-gray-400'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                                </div>
                            </div>

                            {/* buttons div */}
                            <div className='flex mt-2 gap-1 md:gap-2 justify-center w-full'>
                                {!item.cancelled && item.payment && !item.isCompleted && <button className='text-sm text-gray-300 bg-green-600 text-center border py-2 border-green-600 font-light tracking-wide w-full'>Paid</button>}

                                {/* pay online */}
                                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-green-600 py-2 text-center border border-green-600 font-light tracking-wide hover:text-gray-300 hover:bg-green-600 transition-all duration-200 w-full'>Pay Online</button>}

                                {/* cancel appointment */}
                                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-red-600 text-center border py-2 border-red-600 font-light tracking-wide hover:text-gray-300 hover:bg-red-600 transition-all duration-200 w-full'>Cancel</button>}

                                {/* appointment cancelled and completed*/}
                                {item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-gray-300 bg-red-600 text-center border py-2 border-red-600 font-light tracking-wide w-full'>Appointment cancelled</button>}
                                {
                                    item.isCompleted && <button className='text-sm text-gray-300 bg-primary text-center border py-2 border-primary font-light tracking-wide w-full'>Completed</button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* more button */}
            {appointments.length > doctorsToShow &&
                <div className='flex justify-center w-full mt-6 mb-16'>
                    <button onClick={loadMoreDoctors} className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider'>
                        More
                    </button>
                </div>
            }
        </div>
    )
}

export default MyAppointments