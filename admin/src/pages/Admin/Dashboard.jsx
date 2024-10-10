import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
    const { dashData, getDashData, aToken, cancelAppointment } = useContext(AdminContext);

    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    return (
        dashData && (
            <div className="m-5">
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 p-4 min-w-52 border border-primary rounded cursor-pointer hover:scale-105 transition-all">
                        <img className="w-14 rounded-full" src={assets.doctor_icon} alt="" />
                        <div>
                            <p className="text-xl font-semibold text-primary">
                                {dashData.doctors}
                            </p>
                            <p className="text-gray-300">Doctors</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 min-w-52 border border-primary rounded cursor-pointer hover:scale-105 transition-all">
                        <img className="w-14 rounded-full" src={assets.appointments_icon} alt="" />
                        <div>
                            <p className="text-xl font-semibold text-primary">
                                {dashData.appointments}
                            </p>
                            <p className="text-gray-300">Appointments</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 min-w-52 border border-primary rounded cursor-pointer hover:scale-105 transition-all">
                        <img className="w-14 rounded-full" src={assets.patients_icon} alt="" />
                        <div>
                            <p className="text-xl font-semibold text-primary">
                                {dashData.patients}
                            </p>
                            <p className="text-gray-300">Patients</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary bg-opacity-20">
                    <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-primary">
                        <img className="w-8" src={assets.list_icon} alt="" />
                        <p className="font-semibold text-primary">Latest Appointments</p>
                    </div>

                    <div className="pt-4 border border-primary border-t-0">
                        {dashData.latestAppointments.map((item, index) => (
                            <div className="flex items-center gap-3 px-6 py-3 hover:bg-primary hover:bg-opacity-50" key={index}>
                                <img src={item.docData.image} alt="" className="w-10 h-10 rounded-full bg-primary" />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-100 font-medium">{item.docData.name}</p>
                                    <p className="text-gray-400">
                                        {slotDateFormat(item.slotDate)}, {item.slotTime}
                                    </p>
                                </div>
                                {item.cancelled
                                    ? <p className='text-red-500 text-sm font-medium'>Cancelled</p>
                                    : item.isCompleted ? <p className='text-green-500 text-sm font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" className='w-10 cursor-pointer' />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default Dashboard;
