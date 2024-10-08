import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {

    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);


    return (
        <div className='min-h-screen min-w-[50px] md:min-w-fit border-r border-primary'>
            {
                aToken && <ul className='text-primary mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary bg-opacity-40 border-r-4 border-primary' : ''}`} to='/admin-dashboard'>
                        <img className='w-6' src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary bg-opacity-40 border-r-4 border-primary' : ''}`} to='/all-appointments'>
                        <img className='w-6' src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary bg-opacity-40 border-r-4 border-primary' : ''}`} to='/add-doctor'>
                        <img className='w-6' src={assets.add_icon} alt="" />
                        <p className='hidden md:block'>Add Doctor</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary bg-opacity-40 border-r-4 border-primary' : ''}`} to='/doctor-list'>
                        <img className='w-6' src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Doctors List</p>
                    </NavLink>
                </ul>
            }

            {
                dToken && <ul className='text-primary mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary bg-opacity-40 border-r-4 border-primary' : ''}`} to='/doctor-dashboard'>
                        <img className='w-6' src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary bg-opacity-40 border-r-4 border-primary' : ''}`} to='/doctor-appointments'>
                        <img className='w-6' src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-primary bg-opacity-40 border-r-4 border-primary' : ''}`} to='/doctor-profile'>
                        <img className='w-6' src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>
                </ul>
            }

        </div>
    )
}

export default Sidebar