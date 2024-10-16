import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

    const { profileData, getProfileData, dToken, setProfileData, backendUrl } = useContext(DoctorContext);
    const { currency} = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try{
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available,
            }

            const {data} = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
                headers: {
                    dToken
                }
            })

            if(data.success){
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }


        } catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5 items-center md:items-start'>
                <div>
                    <img className='bg-primary bg-opacity-50 w-[250px] rounded-lg' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 rounded-lg p-8 py-7 bg-primary bg-opacity-20'>
                    {/*-------Doc Info: name, degree, exprerience */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-primary'>{profileData.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-300'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border border-primary text-primary text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    {/* ------- Doc about ------- */}
                    <div>
                        <p className='flex items-center gap-1 text-gray-400 text-sm font-medium mt-3'>About</p>
                        <p className='text-sm text-gray-400 max-w-[700px] mt-1'>{profileData.about}</p>
                    </div>

                    <p className='text-gray-300 font-medium mt-4'>Appointment Fee: <span className='text-primary'>{currency}{isEdit ? <input type='number' onChange={(e) => { setProfileData(prev => ({ ...prev, fees: e.target.value })) }} value={profileData.fees} className='bg-transparent border border-primary px-1 rounded mx-1' /> : profileData.fees}</span></p>

                    <div className='flex gap-2 py-2 text-gray-400 mt-3'>
                        <p>Address</p>
                        <p className='text-sm'>
                            {isEdit ? <input className='bg-transparent border border-primary px-1 rounded mx-1' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />{isEdit ? <input className='bg-transparent border border-primary px-1 rounded mx-1 mt-1' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}</p>
                    </div>

                    <div className='flex gap-1 pt-2 text-gray-300'>
                        <input onChange={()=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
                        <label htmlFor="">Available</label>
                    </div>

                    {
                        isEdit
                        ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                        : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }

                    
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile