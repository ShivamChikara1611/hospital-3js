import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { backendUrl, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [state, setState] = useState('Sign Up')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try{
            if(state === 'Sign Up'){
                const {data} = await axios.post(`${backendUrl}/api/user/register`, {name, email, password});

                if(data.success){
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                }
                else{
                    toast.error(data.message);
                }
            } else{
                const {data} = await axios.post(`${backendUrl}/api/user/login`, {email, password});

                if(data.success){
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    toast.success('Logged in successfully');
                }
                else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(token){
            navigate('/');
        }
    }, [token]);

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center text-gray-800'>
            <div className='border-2 border-opacity-70 border-primary bg-third/50 flex flex-col gap-4 m-auto items-start p-5 sm:p-10 w-fit] sm:min-w-96 rounded-xl text-gray-800 text-sm'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
                <p>Please {state === 'Sign Up' ? 'sign up ' : 'log in'} to book appointment</p>

                {
                    state === 'Sign Up' &&
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input className='border border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent' type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>
                    </div>
                }

                

                <div className='w-full'>
                    <p>Email</p>
                    <input className='border-2 border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                </div>

                <div className='w-full'>
                    <p>Password</p>
                    <input className='border-2 border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
                </div>

                <button type='submit' className='text-white border-2 border-primary text-md mt-4 w-full bg-primary rounded-md py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>

                {
                    state === 'Sign Up'
                    ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer font-semibold'>Login here</span></p>
                    : <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer font-semibold'>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login