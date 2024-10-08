import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";



const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    const {backendUrl, aToken} = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the form is submitted

        try {
            if (!docImg) {
                return toast.error('Please Upload Image');
            }

            const formData = new FormData();

            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({line1:address1, line2:address2}));

            // console the form data
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message);

                // Clear all fields after successful submission
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('');
                setFees('');
                setAbout('');
                setSpeciality('');
                setDegree('');
                setAddress1('');
                setAddress2('');
            } else {
                console.log(data);
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        } finally {
            setLoading(false); // Set loading to false after the form is submitted
        }
    };


    return (
        <form onSubmit={onSubmitHandler} className="m-5 w-full">

            <div className="bg-primary bg-opacity-20 px-8 py-8 border border-primary rounded w-full max-w-4xl max-h-[85vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-300">
                    <label htmlFor="doc-img">
                        <img className="w-16 bg-primary rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>
                        Upload Image
                    </p>
                </div>

                <div className="flex flex-col gap-10 lg:flex-row items-start text-gray-300">
                    <div className="flex w-full flex-col lg:flex-1 gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="border rounded px-3 py-2 bg-transparent border-gray-300" type="text" placeholder="Enter your name" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="border rounded px-3 py-2 bg-transparent border-gray-300" type="email" placeholder="Enter your email" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="border rounded px-3 py-2 bg-transparent border-gray-300"
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2 cursor-pointer bg-transparent border-gray-300" required name="" id="">
                                <option value="">Select Experience</option>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fee</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className="border rounded px-3 py-2 bg-transparent border-gray-300" type="number" placeholder="Enter your fee" required />
                        </div>
                    </div>

                    <div className="flex w-full flex-col lg:flex-1 gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2 cursor-pointer bg-transparent border-gray-300" required name="" id="">
                                <option value="">Select Speciality</option>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border rounded px-3 py-2 bg-transparent border-gray-300" type="text" placeholder="Enter your education" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2 bg-transparent border-gray-300" type="text" placeholder="Address 1" required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="border rounded px-3 py-2 bg-transparent border-gray-300" type="text" placeholder="Address 2" required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mt-4 mb-2 text-gray-300">About Doctor</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about}
                        className="border w-full rounded px-4 py-2 bg-transparent border-gray-300 text-gray-300"
                        placeholder="Write About Doctor"
                        rows={5}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="bg-primary text-white px-10 py-3 rounded-full mt-4 flex items-center justify-center" disabled={loading}>
                    {loading ? (
                        <div className="flex items-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                            </svg>
                            <span>Loading...</span>
                        </div>
                    ) : (
                        "Add Doctor"
                    )}
                </button>
            </div>
        </form>
    );
};

export default AddDoctor;
