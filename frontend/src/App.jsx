import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import SkinCancerDetection from './pages/SkinCancerDetection'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './components/Chat'
import { assets } from './assets/assets'



const App = () => {
  const [chatToggle, setChatToggle] = useState(false);

  // Block/unblock scroll on chat toggle
  useEffect(() => {
    if (chatToggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [chatToggle]);

  return (
    <div className='relative overflow-hidden'>
      <div className='fixed z-[99] w-full'>
          <Navbar />
        </div>

      {/* actual pages */}
      <div className='md:mx-[10%] pt-[77px]'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/skin-cancer' element={<SkinCancerDetection />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
        <Footer />
      </div>

      {/* image of chat bot */}
      <div className='fixed right-5 md:right-[2.5vw] bottom-4 md:bottom-7 z-[90] cursor-pointer animate-bounce-y hover:[animation-play-state:paused]'>
        <img src={assets.maxBot} alt="chat" className='w-12' onClick={() => setChatToggle(!chatToggle)} />
      </div>

      {/* chat bot component */}
      <div className='fixed bottom-[8vh] md:bottom-0 right-0 md:right-[12vw] xl:right-[8vw] z-[90]'>
        {chatToggle ?
          (
            <div>
              <Chat />
            </div>
          ) :
          (null)
        }
      </div>
    </div>
  )
}

export default App