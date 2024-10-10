import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
    const {
        dToken,
        appointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
    } = useContext(DoctorContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    return (
        <div className="w-full max-w-6xl m-5">

            <div className="bg-primary bg-opacity-20 border border-primary rounded text-sm max-h-[85vh] overflow-y-scroll border-b-0">
                
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-primary text-primary">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {appointments.reverse().map((item, index) => (
                    <div
                        className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b items-center text-gray-300 border-b border-primary hover:bg-primary hover:bg-opacity-50"
                        key={index}
                    >
                        <p className="max-sm:hidden">{index + 1}</p>
                        <div className="flex items-center gap-2">
                            <img
                                className="w-8 h-8 rounded-full bg-primary"
                                src={item.userData.image}
                                alt=""
                            />
                            <p>{item.userData.name}</p>
                        </div>
                        <div>
                            <p className="text-green-500 text-xs inline border border-green-500 rounded-full px-2 py-0.5">
                                {item.payment ? "Online" : "Cash"}
                            </p>
                        </div>
                        <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                        <p>
                            {slotDateFormat(item.slotDate)}, {item.slotTime}
                        </p>
                        <p>
                            {currency}
                            {item.amount}
                        </p>
                        {item.cancelled ? (
                            <p className="text-red-500 text-xs font-medium">Cancelled</p>
                        ) : item.isCompleted ? (
                            <p className="text-green-500 text-xs font-medium">Completed</p>
                        ) : (
                            <div className="flex items-center">
                                <img
                                    className="w-10 cursor-pointer"
                                    src={assets.cancel_icon}
                                    alt=""
                                    onClick={() => cancelAppointment(item._id)}
                                />
                                <img
                                    className="w-10 cursor-pointer"
                                    src={assets.tick_icon}
                                    alt=""
                                    onClick={() => completeAppointment(item._id)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointment;
