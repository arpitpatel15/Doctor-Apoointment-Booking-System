import express from 'express';
import { bookAppointment, cancleAppointment, getProfile, listAppointments, registerUser, updateProfile, userLogin } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRoute = express.Router();

userRoute.post('/register',registerUser)
userRoute.post('/login',userLogin)

userRoute.get('/get-profile',authUser,getProfile)
userRoute.post('/update-profile',upload.single('image'),authUser, updateProfile)
userRoute.post('/book-appointment', authUser,bookAppointment)

userRoute.get('/appointments',authUser,listAppointments);
userRoute.post('/cancle-appointment',authUser, cancleAppointment);

export default userRoute;