import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from 'react-toastify';


const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                "service_r42ligq",
                "template_t7xp3b3",
                {
                    from_name: form.name,
                    to_name: "MAX Mutispeciality Hospital",
                    from_email: form.email,
                    to_email: "s.chikara6885@gmail.com",
                    message: form.message,
                },
                "Gl_U61j1E8cdpW-55"
            )
            .then(
                () => {
                    setLoading(false);
                    toast.success('Email Sent Successfully!');
                    
                    setForm({
                        name: "",
                        email: "",
                        message: "",
                    });
                },
                (error) => {
                    setLoading(false);
                    console.error(error);
                    toast.success('Email Failed, Try Again!');

                }
            );
    };


    return (
        <div className='mt-10 text-white flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-center text-gray-300'>Drop an <span className='text-primary'>Mail.</span></h1>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className='mt-12 flex flex-col gap-8 w-full max-w-[700px] bg-primary bg-opacity-10 p-5 md:p-8 lg:p-12 rounded-lg'
            >
                <label className='flex flex-col'>
                    <span className='text-white font-medium mb-4'>Your Name</span>
                    <input
                        type='text'
                        required
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name."
                        className='border-2 border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent'
                    />
                </label>
                <label className='flex flex-col'>
                    <span className='text-white font-medium mb-4'>Your email</span>
                    <input
                        type='email'
                        required
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your Mail-ID."
                        className='border-2 border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent'
                    />
                </label>
                <label className='flex flex-col'>
                    <span className='text-white font-medium mb-4'>Your Message</span>
                    <textarea
                        rows={7}
                        name='message'
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder='What you want to say?'
                        className='border-2 border-opacity-70 border-primary rounded w-full p-2 mt-1 bg-transparent'
                    />
                </label>

                <div className="mx-auto">
                <button
                    type='submit'
                    className='text-white border-2 border-primary text-md mt-4 bg-primary rounded-md py-2 hover:bg-transparent hover:text-primary hover:border-2 hover:border-primary hover:scale-105 transition-all duration-300 px-10'
                >
                    {loading ? "Sending..." : "Send"}
                </button>
                </div>
                
            </form>
        </div>
    )
}

export default Contact;