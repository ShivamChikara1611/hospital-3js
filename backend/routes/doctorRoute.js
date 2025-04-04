import express from 'express';
import { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';



const doctorRoute = express.Router();

doctorRoute.get('/list', doctorList);
doctorRoute.post('/login', loginDoctor);
doctorRoute.get('/appointments',authDoctor, appointmentsDoctor);
doctorRoute.post('/complete-appointment',authDoctor, appointmentComplete);
doctorRoute.post('/cancel-appointment',authDoctor, appointmentCancel);
doctorRoute.get('/dashboard',authDoctor, doctorDashboard);
doctorRoute.get('/profile',authDoctor, doctorProfile);
doctorRoute.post('/update-profile',authDoctor, updateDoctorProfile);

export default doctorRoute;
