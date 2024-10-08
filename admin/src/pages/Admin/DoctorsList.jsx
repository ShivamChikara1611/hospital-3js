import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
    const [searchTerm, setSearchTerm] = useState(''); // State to store search input

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    // Filter doctors based on search term (by name or speciality)
    const filteredDoctors = doctors.filter((doctor) => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='m-5 max-h-[85vh] overflow-y-scroll'>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name or speciality"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-primary bg-primary bg-opacity-20 rounded px-2 py-1.5 text-gray-300 "
            />

            {/* Doctors List */}
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {filteredDoctors.map((item, index) => (
                    <div className='opacity-60 hover:opacity-100 border-2 border-opacity-50 border-primary overflow-hidden rounded-xl hover:translate-y-[-10px] transition-all duration-300 max-w-56 overflow-hidden cursor-pointer group' key={index}>
                        <img className='bg-primary bg-opacity-50' src={item.image} alt="" />
                        <div className='p-4 bg-opacity-15 bg-primary h-full flex flex-col'>
                            <p className='text-gray-300 text-lg font-medium'>
                                {item.name.split(' ').slice(0, 1).join(' ')} <span className='text-primary'>
                                    {item.name.split(' ').slice(1, 2).join(' ')}
                                </span> {item.name.split(' ').slice(2, 3).join(' ')}
                            </p>
                            <p className='text-gray-400 text-sm'>{item.speciality}</p>
                            <div className='mt-2 flex items-center gap-1 text-sm text-gray-300'>
                                <input type="checkbox" checked={item.available} onChange={() => changeAvailability(item._id)} />
                                <p>Available</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
