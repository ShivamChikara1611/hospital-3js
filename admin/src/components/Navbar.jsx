import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        aToken && setAToken("");
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken("");
        dToken && localStorage.removeItem('dToken');
    }


    return (
        <div className='flex justify-between items-center px-4 py-3 sm:px-10 border-b border-b-primary'>
            <div className='flex items-center gap-5 text-xs'>
                <img className='w-[60px] rounded-full cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border border-primary text-primary px-2.5 py-0.5 rounded-full'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>

            <button onClick={logout} className='text-primary border border-2 border-primary hover:text-gray-200 hover:bg-primary transition-all duration-300 cursor-pointer px-10 text-sm py-2 rounded-full'>Logout</button>
        </div>
    )
}

export default Navbar