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
        <div className='mx-2 md:mx-auto my-10'>
            <h1 className='text-2xl font-light text-center text-gray-200 tracking-wide'>My Profile</h1>

            <div className='text-gray-300 mt-6 flex flex-col bg-white/5 px-[3%] py-6 rounded-md max-w-[500px] md:max-w-[800px] mx-auto md:px-10'>

                {
                    isEdit
                        ? <label htmlFor='image'>
                            <div className='inline-block relative cursor-pointer rounded-full overflow-hidden'>
                                <img className='w-36 rounded opacity-70' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                            </div>
                            <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />

                        </label>
                        : <img className='w-36 rounded-full' src={userData.image} alt="" />
                }


                {
                    isEdit
                        ? <input className='bg-gray-400 rounded text-3xl font-medium max-w-60 mt-4 text-black' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
                        : <p className='font-medium text-4xl mt-4'>{userData.name}</p>
                }

                <hr className='h-[1px] border-none bg-white/20 mt-2' />

                <div className='md:flex md:justify-between'>
                    <div>
                        <p className='text-gray-300 mt-5 mb-3 font-thin tracking-wider text-xl'>Contact Information</p>
                        <div className='grid grid-cols-[1fr_3fr] gap-y-1 font-light tracking-wide text-sm text-gray-300 md:gap-x-4'>
                            <p>Email id:</p>
                            <p>{userData.email}</p>
                            <p>Phone:</p>
                            {
                                isEdit
                                    ? <input className='bg-white/20 max-w-[200px] rounded text-sm font-normal tracking-wide text-gray-200 py-0.5 px-2' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                                    : <p className='text-blue-500'>{userData.phone}</p>
                            }

                            <p>Address:</p>
                            {
                                isEdit
                                    ? <p>
                                        <input className='bg-white/20 rounded text-sm font-normal tracking-wide text-gray-200 max-w-[200px] py-0.5 px-2 mb-1' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                                        <br />
                                        <input className='bg-white/20 rounded text-sm font-normal tracking-wide text-gray-200 max-w-[200px] py-0.5 px-2' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
                                    </p>
                                    : <p className='font-light tracking-wide text-sm text-gray-300'>
                                        {userData.address.line1}
                                        <br />
                                        {userData.address.line2}
                                    </p>
                            }
                        </div>
                    </div>

                    <div>
                        <p className='text-gray-300 mt-5 mb-3 font-thin tracking-wider text-xl'>Basic Information</p>
                        <div className='grid grid-cols-[1fr_3fr] gap-y-1 font-light tracking-wide text-sm text-gray-300 md:gap-x-4'>
                            <p>Gender:</p>
                            {
                                isEdit
                                    ? <select className='bg-white/20 rounded text-sm font-normal tracking-wide text-gray-200 max-w-[200px] py-0.5 px-2 mb-1' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                                        <option className='text-gray-900' value="male">Male</option>
                                        <option className='text-gray-900' value="female">Female</option>
                                    </select>
                                    : <p className='text-gray-300'>{userData.gender.toUpperCase()}</p>
                            }
                            <p>Birthday:</p>
                            {
                                isEdit
                                    ? <input className='bg-white/20 rounded text-sm font-normal tracking-wide text-gray-200 max-w-[200px] py-0.5 px-2 mb-1' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={useState.dob} />
                                    : <p className='text-gray-300'>{userData.dob}</p>
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-10 text-center'>
                    {
                        isEdit
                            ? <button className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider' onClick={updateUserProfileData}>Save information</button>
                            : <button className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider' onClick={() => setIsEdit(true)}>Edit</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProfile