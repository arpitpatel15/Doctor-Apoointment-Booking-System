import express from 'express';
import { appointmentCancle, appointmentComplete, appointmentDoctor, doctorList, doctorLogin } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRoute = express.Router();

doctorRoute.get('/list',doctorList)
doctorRoute.post('/login',doctorLogin);
doctorRoute.get('/appointments',authDoctor,appointmentDoctor)
doctorRoute.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRoute.post('/cancle-appointment',authDoctor,appointmentCancle)

export default doctorRoute;