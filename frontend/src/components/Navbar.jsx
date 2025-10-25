import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { LanguageContext } from '../context/LanguageContext'

const Navbar = () => {

    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext);
    const { language, toggleLanguage } = useContext(LanguageContext);

    const [showMenu, setShowMenu] = useState(false);

    const logout = async () => {
        setToken(false);
        localStorage.removeItem('token');
        toast.success(language === 'en' ? 'Logged out successfully' : 'ログアウトしました');
        navigate('/login');
    };

    const texts = {
        en: {
            home: "HOME",
            doctors: "ALL DOCTORS",
            about: "ABOUT",
            contact: "CONTACT",
            profile: "My Profile",
            appointments: "My Appointments",
            logout: "Logout",
            createAccount: "Create account",
            contactUs: "CONTACT US",
            switch: "日本語"
        },
        jp: {
            home: "ホーム",
            doctors: "すべての医師",
            about: "概要",
            contact: "連絡先",
            profile: "マイプロフィール",
            appointments: "私の予約",
            logout: "ログアウト",
            createAccount: "アカウント作成",
            contactUs: "お問い合わせ",
            switch: "English"
        }
    };

    return (
        <div className={`flex items-center justify-between text-sm py-2 shadow-md ${showMenu ? 'md:backdrop-blur-lg' : 'backdrop-blur-lg'} text-gray-200 px-2 md:px-[10%]`}>
            <img onClick={() => navigate('/')} className='w-[60px] rounded-full cursor-pointer' src={assets.logo} alt="" />

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'><li className='py-1 tracking-widest'>{texts[language].home}</li></NavLink>
                <NavLink to='/doctors'><li className='py-1 tracking-widest'>{texts[language].doctors}</li></NavLink>
                <NavLink to='/about'><li className='py-1 tracking-widest'>{texts[language].about}</li></NavLink>
                <NavLink to='/contact'><li className='py-1 tracking-widest'>{texts[language].contact}</li></NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-[55px] h-[55px] rounded-full bg-primary p-1' src={userData.image} alt="" />
                            <div className='absolute top-0 right-0 p-12 z-20 hidden group-hover:block'>
                                <div className='min-w-48 text-gray-500 font-light tracking-wider bg-gray-200 backdrop-blur-md rounded-lg flex flex-col gap-4 p-5'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer'>{texts[language].profile}</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer'>{texts[language].appointments}</p>
                                    <p onClick={logout} className='hover:text-primary cursor-pointer'>{texts[language].logout}</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-3 rounded-full hover:bg-primary/70 transition-all duration-300 font-light hidden md:block'>
                            {texts[language].createAccount}
                        </button>
                }

                {/* Language Switch Button */}
                <button
                    onClick={toggleLanguage}
                    className="bg-secondary/40 px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-xs md:text-sm"
                >
                    {texts[language].switch}
                </button>

                <img onClick={() => setShowMenu(true)} className='w-[40px] md:hidden cursor-pointer' src={assets.menu_icon} alt="" />

                {/*--------Mobile Menu-----------*/}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 overflow-hidden transition-all text-gray-200 backdrop-blur-md bg-black/30`}>
                    <div className='flex items-center justify-between px-5 py-4'>
                        <img className='w-[60px] rounded-full cursor-pointer' src={assets.logo} alt="" />
                        <img className='w-[50px] cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-5 mt-12 px-5 text-lg font-medium w-full'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-10 py-2 rounded-full'>{texts[language].home}</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-10 py-2 rounded-full'>{texts[language].doctors}</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-10 py-2 rounded-full'>{texts[language].about}</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-10 py-2 rounded-full'>{texts[language].contactUs}</p></NavLink>

                        {
                            token && userData
                                ? ''
                                : <button onClick={() => navigate('/login') & setShowMenu(false)} className='bg-white/20 backdrop-blur-md text-gray-200 hover:bg-primary/70 transition-all duration-300 px-8 py-3 rounded-full font-light md:hidden absolute bottom-10'>
                                    {texts[language].createAccount}
                                </button>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
