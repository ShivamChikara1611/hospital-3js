import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    const logout = async () => {
        setToken(false);
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/login');
    }


    return (
        <div className='flex items-center justify-between text-sm py-2 mb-5 border-b border-b-secondary text-gray-800'>
            <img onClick={() => navigate('/')} className='w-[60px] rounded-full cursor-pointer' src={assets.logo} alt="" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-[55px] h-[55px] rounded-full bg-primary p-1' src={userData.image} alt="" />
                            <div className='absolute top-0 right-0 p-12 z-20 hidden group-hover:block'>
                                <div className='min-w-48 text-primary bg-white border-2 border-primary rounded flex flex-col gap-4 p-5'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                }

                <img onClick={() => setShowMenu(true)} className='w-[40px] md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

                {/*--------Mobile Menu-----------*/}

                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden transition-all text-gray-300 backdrop-blur-md bg-opacity-80 bg-gray-800`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-[60px] rounded-full cursor-pointer' src={assets.logo} alt="" />
                        <img className='w-[50px] cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-5 mt-12 px-5 text-lg font-medium w-full'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-10 py-2 rounded-full'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-10 py-2 rounded-full'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-10 py-2 rounded-full'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-10 py-2 rounded-full'>CONTACT US</p></NavLink>

                        {
                            token && userData
                                ? ''
                                : <button onClick={() => navigate('/login') & setShowMenu(false)} className='bg-primary text-white px-8 py-3 rounded-full font-light md:hidden absolute bottom-10'>Create account</button>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar