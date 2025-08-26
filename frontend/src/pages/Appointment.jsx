import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, getDoctorsData, backendUrl, token } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const navigate = useNavigate()

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlotes] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSlotes = async () => {
        setDocSlotes([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })



                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();


                const slotDate = day + '-' + month + '-' + year;
                const slotTime = formattedTime;

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

                if (isSlotAvailable) {

                    // add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment the time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlotes(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book an appointment');
            return navigate('/login');
        }

        try {
            const date = docSlots[slotIndex][0].datetime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();


            const slotDate = day + '-' + month + '-' + year;

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, {
                headers: {
                    token
                }
            });

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])

    useEffect(() => {
        getAvailableSlotes()
    }, [docInfo])

    useEffect(() => {
        console.log(docSlots)
    }, [docSlots])

    return docInfo && (
        <div className='my-10 md:my-16 mx-2 md:mx-0'>
            <h1 className='text-gray-200 text-center tracking-wider text-2xl md:text-4xl mb-8 md:mb-12'>Book Your <span className='text-primary'>Appointment </span>Now.</h1>

            <div className='max-w-[500px] mx-auto lg:flex lg:justify-around lg:items-start lg:gap-5 lg:max-w-[1000px] lg:mb-[120px]'>
                {/* doc profile card */}
                <div className='relative bg-white/10 rounded flex flex-col items-center justify-center mx-auto lg:mx-0 lg:max-w-[380px]'>
                    <img className='absolute top-2 right-2 w-4' src={assets.verified_icon} alt="" />
                    <div className='w-full flex items-center justify-between gap-3 p-2'>
                        <img className='w-[100px]' src={docInfo.image} alt="" />
                        <div className='flex flex-col w-full'>
                            <p className='items-center text-xl text-gray-200'>
                                {docInfo.name}
                            </p>
                            <p className='text-gray-400 font-light text-sm tracking-wide'>{docInfo.speciality}</p>
                            <div className='flex items-center gap-2 mt-2 text-sm'>
                                <p className='text-gray-400'>{docInfo.degree}</p>
                                <button className='text-primary border border-primary px-2 text-xs tracking-wider rounded-full'>{docInfo.experience}</button>
                            </div>
                        </div>
                    </div>

                    <div className='bg-primary/40 px-3 py-4 rounded-t-xl text-sm w-full'>
                        <p className='text-gray-400 font-light'>{docInfo.about}</p>
                        <p className='text-gray-300 mt-1'>Appointment fee: <span className='text-gray-100 tracking-widest text-md'>{currencySymbol}{docInfo.fees}</span></p>
                    </div>

                </div>

                {/* ---------------Booking Slot----------------------*/}

                <div className='mt-[60px] lg:mt-0'>
                    <p className='text-xl font-thin tracking-wide text-gray-200 text-center lg:hidden'> Booking Slots</p>

                    <div className='flex gap-2 justify-start overflow-x-scroll mt-6 lg:mt-0 w-fit mx-auto'>
                        {
                            docSlots.length && docSlots.map((item, index) => (
                                <div onClick={() => setSlotIndex(index)} className={`text-center py-3 w-[60px] min-w-[60px] rounded-b-xl tracking-wider rounded-t-none cursor-pointer ${slotIndex === index ? 'bg-gray-200 text-primary' : 'bg-white/10 text-gray-400 hover:bg-white/20 transition-all duration-200'}`} key={index}>
                                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                    <p className='text-sm'>{item[0] && item[0].datetime.getDate()}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className='flex gap-1 w-fit mx-auto max-w-[470px] justify-start overflow-x-scroll mt-4'>
                        {docSlots.length && docSlots[slotIndex].map((item, index) => (
                            <p onClick={() => setSlotTime(item.time)} className={`text-center py-1.5 text-xs font-light px-6 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-gray-200 text-primary' : 'bg-white/10 text-gray-400 hover:bg-white/20 transition-all duration-200'}`} key={index}>
                                {item.time.toLowerCase()}
                            </p>
                        ))}
                    </div>

                    <div className='flex justify-center lg:mt-10'>
                        <button onClick={bookAppointment} className='mt-6 bg-white/5 backdrop-blur-md text-gray-300 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider'>Book</button>
                    </div>
                </div>
            </div>


            {/*Listing Related Doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointment