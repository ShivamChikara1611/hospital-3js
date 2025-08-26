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
        <div className='my-10 flex flex-col items-center mx-2 md:mx-0'>
            <h1 className='text-2xl text-center tracking-wider text-gray-200'>Drop an Email</h1>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className='mt-8 max-w-[450px] flex flex-col gap-4 w-full bg-white/10 px-3 py-5 md:px-5 md:py-7 rounded-lg'
            >
                <label className='flex flex-col'>
                    <span className='text-gray-300 font-medium text-md'>Your Name</span>
                    <input
                        type='text'
                        required
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name."
                        className='rounded w-full py-3 px-2 text-sm mt-1 bg-white/15 placeholder:text-gray-400 tracking-wide text-gray-300'
                    />
                </label>
                <label className='flex flex-col'>
                    <span className='text-gray-300 font-medium text-md'>Your email</span>
                    <input
                        type='email'
                        required
                        name='email'
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your Mail-ID."
                        className='rounded w-full py-3 px-2 text-sm mt-1 bg-white/15 placeholder:text-gray-400 tracking-wide text-gray-300'
                    />
                </label>
                <label className='flex flex-col'>
                    <span className='text-gray-300 font-medium text-md'>Your Message</span>
                    <textarea
                        rows={7}
                        name='message'
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder='What you want to say?'
                        className='rounded w-full py-3 px-2 text-sm mt-1 bg-white/15 placeholder:text-gray-400 tracking-wide text-gray-300'
                    />
                </label>

                <div className="mx-auto">
                <button
                    type='submit'
                    className='bg-white/5 backdrop-blur-md text-gray-200 px-8 py-2 rounded-full hover:bg-primary/70 transition-all duration-300 font-light tracking-wider'
                >
                    {loading ? "Sending..." : "Send"}
                </button>
                </div>
                
            </form>
        </div>
    )
}

export default Contact;