import React,{useContext, useState} from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from 'react-toastify';


const Login = () => {
    const [state, setState] = useState('Admin');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setAToken, backendUrl} = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try{

            if(state === 'Admin'){

                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                }
                else{
                    toast.error(data.message);
                }

            } else if (state === 'Doctor') {
                const {data} = await axios.post(backendUrl + '/api/doctor/login', { email, password });

                if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    console.log(data.token);
                    toast.success("Doctor logged in Successfully");
                }
                else{
                    toast.error(data.message);
                }

            }
        }
        catch(error){
            console.log(error.response);
            toast.error(error.message);
        }
    };


    return(
        <form onSubmit={onSubmitHandler} className="h-[100vh] flex items-center text-gray-200">
            <div className="border-2 border-opacity-70 border-primary bg-gray-600 bg-opacity-20 backdrop-blur-md backdrop-filter flex flex-col gap-4 m-auto items-start p-10 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-300 text-sm">
                <p className="text-2xl font-semibold m-auto"><span className="text-primary"> {state} </span> Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input className="border border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input className="border border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="w-full bg-primary text-white bg-opacity-70 py-2 rounded-md text-base mt-4">Login</button>

                {
                    state === 'Admin' ? (
                        <p className="text-center text-sm mt-2">Doctor Login? <span onClick={() => setState('Doctor')} className="text-primary cursor-pointer">Click Here</span></p>
                    ) : (
                        <p className="text-center text-sm mt-2">Admin Login? <span onClick={() => setState('Admin')} className="text-primary cursor-pointer">Click Here</span></p>
                    )
                }
            </div>
        </form>
    );
};

export default Login;
