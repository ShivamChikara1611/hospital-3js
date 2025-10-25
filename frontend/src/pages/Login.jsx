import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { LanguageContext } from '../context/LanguageContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { backendUrl, token, setToken } = useContext(AppContext);
    const { language } = useContext(LanguageContext);
    const navigate = useNavigate();

    const [state, setState] = useState('Sign Up')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const texts = {
        en: {
            createAccount: "Create Account",
            login: "Login",
            signUpText: "Please sign up to book appointment",
            loginText: "Please log in to book appointment",
            fullName: "Full Name",
            email: "Email",
            password: "Password",
            alreadyAccount: "Already have an account?",
            loginHere: "Login here",
            newAccount: "Create a new account?",
            clickHere: "Click here",
        },
        jp: {
            createAccount: "アカウント作成",
            login: "ログイン",
            signUpText: "予約するにはサインアップしてください",
            loginText: "予約するにはログインしてください",
            fullName: "氏名",
            email: "メールアドレス",
            password: "パスワード",
            alreadyAccount: "すでにアカウントをお持ちですか？",
            loginHere: "ここでログイン",
            newAccount: "新しいアカウントを作成しますか？",
            clickHere: "ここをクリック"
        }
    };

    const t = texts[language];

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                    toast.success(t.login + " successfully");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <form onSubmit={onSubmitHandler} className='h-[calc(100vh-77px)] flex items-center'>
            <div className='bg-white/5 backdrop-blur-md flex flex-col gap-4 m-auto items-start p-5 sm:p-10 w-fit] sm:min-w-96 rounded-xl text-gray-200 text-sm'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? t.createAccount : t.login}</p>
                <p>{state === 'Sign Up' ? t.signUpText : t.loginText}</p>

                {
                    state === 'Sign Up' &&
                    <div className='w-full'>
                        <p>{t.fullName}</p>
                        <input
                            className='border border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                }

                <div className='w-full'>
                    <p>{t.email}</p>
                    <input
                        className='border-2 border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent'
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className='w-full'>
                    <p>{t.password}</p>
                    <input
                        className='border-2 border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent'
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='text-white border-2 border-primary text-md mt-4 w-full bg-primary rounded-md py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'
                >
                    {state === 'Sign Up' ? t.createAccount : t.login}
                </button>

                {
                    state === 'Sign Up'
                        ? <p>{t.alreadyAccount} <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer font-semibold'>{t.loginHere}</span></p>
                        : <p>{t.newAccount} <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer font-semibold'>{t.clickHere}</span></p>
                }
            </div>
        </form>
    )
}

export default Login
