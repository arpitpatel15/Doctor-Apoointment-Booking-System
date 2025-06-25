import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctormodel.js'
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import nodemailer from 'nodemailer';
import userModel from '../models/userModel.js'
//API for adding doctors
const addDoctor = async(req,res) =>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file
        console.log(req.file);
        
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing details"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})
        }
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageurl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageurl,
            password:hashedPassword,
            speciality
            ,degree
            ,experience
            ,about
            ,fees
            ,address:JSON.parse(address)
            ,date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//API for admin login
const loginAdmin = async(req,res) =>{
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const allDoctors = async(req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const appointmentsAdmin = async(req,res) =>{
    try {
        const appointments = await appointmentModel.find({})
        return res.json({success:true,appointments})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const cancelAppointmentByAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Cancel the appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime, userId } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    const userData = await userModel.findById(userId);

    // Update the doctor's booked slots
    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // Send cancellation email to the patient
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email_User,
        pass: process.env.Email_Password,
      },
    });

    const mailOptions = {
      from: process.env.Email_User,
      to: userData.email,
      subject: `Appointment Cancelled by Admin due to some reasons with - ${doctorData.name}`,
      html: `
        <h2>Appointment Cancelled</h2>
        <p>Dear ${userData.name},</p>
        <p>Your appointment with <strong>${doctorData.name}</strong> on 
        <strong>${slotDate.replace(/_/g, '/')}</strong> at <strong>${slotTime}</strong> has been cancelled by the admin due to some reasons.</p>
        <p>If you have any questions, please contact support.</p>
        <p>Thanks,<br/>MediBook Team</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Failed to send cancellation email:", error);
      } else {
        console.log("Cancellation email sent:", info.response);
      }
    });

    return res.json({ success: true, message: "Appointment cancelled by admin successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminDashboard = async(req,res) =>{
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {doctors: doctors.length, patients: users.length, appointments: appointments.length,latestAppointmets:appointments.reverse().slice(0,5)}

        res.json({success:true,dashData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,cancelAppointmentByAdmin,adminDashboard}