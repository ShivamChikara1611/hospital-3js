import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


const MyProfile = () => {

    const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false);

    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            image && formData.append('image', image);

            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
                headers: {
                    token
                }
            });

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    return userData && (
        <div className='max-w-[800px] mx-auto mt-10'>
            <h1 className='text-4xl font-bold text-center text-gray-300'>My <span className='text-primary'>Profile</span></h1>


            <div className='text-gray-300 flex flex-col gap-2 text-md bg-primary bg-opacity-20 p-5 md:p-8 lg:p-10 rounded-lg mt-10'>

                {
                    isEdit
                        ? <label htmlFor='image'>
                            <div className='inline-block relative cursor-pointer'>
                                <img className='w-36 rounded opacity-70' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                            </div>
                            <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />

                        </label>
                        : <img className='w-36 rounded' src={userData.image} alt="" />
                }


                {
                    isEdit
                        ? <input className='bg-gray-400 rounded text-3xl font-medium max-w-60 mt-4 text-black' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                        : <p className='font-medium text-4xl mt-4'>{userData.name}</p>
                }

                <hr className='h-[2px] border-none bg-primary my-5' />

                <div>
                    <p className='text-gray-400 underline mb-5 text-lg'>CONTACT INFORMATION</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-300'>
                        <p className='font-medium'>Email id:</p>
                        <p className='text-blue-500'>{userData.email}</p>
                        <p className='font-medium'>Phone:</p>
                        {
                            isEdit
                                ? <input className='bg-gray-400 rounded text-sm font-medium max-w-52 p-0.5 text-black' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                                : <p className='text-blue-500'>{userData.phone}</p>
                        }

                        <p className='font-medium'>Address:</p>
                        {
                            isEdit
                                ? <p>
                                    <input className='bg-gray-400 rounded text-sm font-medium max-w-52 p-0.5 text-black' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                                    <br />
                                    <input className='bg-gray-400 rounded text-sm font-medium max-w-52 p-0.5 text-black mt-1' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
                                </p>
                                : <p className='text-gray-500'>
                                    {userData.address.line1}
                                    <br />
                                    {userData.address.line2}
                                </p>
                        }
                    </div>
                </div>

                <div>
                    <p className='text-gray-400 underline mt-8 mb-5 text-lg'>BASIC INFORMATION</p>
                    <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-300'>
                        <p className='font-medium'>Gender:</p>
                        {
                            isEdit
                                ? <select className='max-w-20 bg-gray-400 rounded text-sm font-medium max-w-52 p-0.5 text-black' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                    <option className='text-gray-900' value="Male">Male</option>
                                    <option className='text-gray-900' value="Female">Female</option>
                                </select>
                                : <p className='text-gray-500'>{userData.gender}</p>
                        }
                        <p className='font-medium'>Birthday:</p>
                        {
                            isEdit
                                ? <input className='bg-gray-400 rounded text-sm font-medium max-w-52 p-0.5 text-black' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={useState.dob} />
                                : <p className='text-gray-500'>{userData.dob}</p>
                        }
                    </div>
                </div>

                <div className='mt-10'>
                    {
                        isEdit
                            ? <button className='text-white border-2 border-primary text-md mt-4 bg-primary rounded-md py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10' onClick={updateUserProfileData}>Save information</button>
                            : <button className='text-white border-2 border-primary text-md mt-4 bg-primary rounded-md py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10' onClick={() => setIsEdit(true)}>Edit</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProfile