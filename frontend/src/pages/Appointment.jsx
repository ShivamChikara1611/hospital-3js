import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

    const {docId} = useParams()
    const {doctors, currencySymbol, getDoctorsData, backendUrl, token} = useContext(AppContext)
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

        for(let i=0; i<7; i++){
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21,0,0,0)

            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else{
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while(currentDate < endTime){
                let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})



                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();


                const slotDate = day + '-' + month + '-' + year;
                const slotTime = formattedTime;

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

                if(isSlotAvailable){

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
        if(!token){
            toast.warn('Login to book an appointment');
            return navigate('/login');
        }

        try{
            const date = docSlots[slotIndex][0].datetime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();


            const slotDate = day + '-' + month + '-' + year;

            const {  data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId, slotDate, slotTime}, {
                headers: {
                    token
                }
            });

            if(data.success){
                toast.success(data.message);
                getDoctorsData();
                navigate('/my-appointments');
            } else{
                toast.error(data.message);
            }

        } catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchDocInfo()
    },[doctors,docId])

    useEffect(()=>{
        getAvailableSlotes()
    },[docInfo])

    useEffect(()=>{
        console.log(docSlots)
    },[docSlots])

    return docInfo && (
        <div>
            <div className='mt-10 flex flex-col md:flex-row rounded-xl overflow-hidden max-w-[1200px] mx-auto'>
                <div className='bg-primary flex items-end justify-center'>
                    <img className='md:scale-120 lg:scale-100' src={docInfo.image} alt="" />
                </div>

                <div className='flex flex-col bg-third py-4 px-6 w-full'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-800'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt=""/></p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-primary font-medium'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border border-primary text-primary text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-600 mt-3'>About</p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-800 font-medium mt-4'>Appointment fee: <span className='text-primary'>{currencySymbol}{docInfo.fees}</span></p>
                </div>
            </div>

            {/* ---------------Booking Slot----------------------*/}

            <div className='mt-[100px] max-w-[800px] mx-auto'>
                <p className='text-xl font-medium text-gray-800 text-center mb-[40px]'><span className='text-primary'>Booking</span> Slots</p>

                <div className='flex gap-5 items-center w-full overflow-x-scroll mt-6'>
                    {
                        docSlots.length && docSlots.map((item,index)=>(
                            <div onClick={()=>setSlotIndex(index)} className={`text-center py-4 w-[60px] min-w-[60px] border border-primary rounded-b-full rounded-t-none cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'bg-third/50 text-primary hover:bg-third hover:text-gray-800 hover:border-transparent transition-all duration-200'}`} key={index}>
                                <p className='font-semibold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p className='text-sm font-medium'>{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>

                <div className='flex items-center gap-5 w-full overflow-x-scroll mt-6'>
                    {docSlots.length && docSlots[slotIndex].map((item,index)=>(
                        <p onClick={()=>setSlotTime(item.time)} className={`text-center py-1 w-[110px] min-w-[110px] border border-primary rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'bg-third/50 text-primary hover:bg-third hover:text-gray-800 hover:border-transparent transition-all duration-200'}`} key={index}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <div className='flex justify-center mb-[120px]'>
                    <button onClick={bookAppointment} className='text-white bg-primary mt-[50px] py-3 px-10 rounded-full font-medium border border-primary hover:bg-transparent hover:text-primary hover:scale-105 transition-all duration-300'>Book an Appointment</button>
                </div>
            </div>

            {/*Listing Related Doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointment