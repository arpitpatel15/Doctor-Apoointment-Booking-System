import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctormodel.js';
import appointmentModel from '../models/appointmentModel.js';
import nodemailer from 'nodemailer';
const registerUser = async(req,res) =>{
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({success : false, message : "Please fill all the fields"});
        }
        if(!validator.isEmail(email)){
            return res.json({success : false, message : "Please enter a valid email"});
        }
        if(password.length < 8){
            return res.json({success : false, message : "Password must be at least 8 characters long"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token  = jwt.sign({id : user._id},process.env.JWT_SECRET)
        return res.json({success : true, token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const userLogin = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({success : false, message : "User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success : false, message : "Invalid credentials"});
        }
        else{
            const token = jwt.sign({id : user._id},process.env.JWT_SECRET);
            return res.json({success : true, token});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const getProfile = async(req,res) =>{
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select("-password");
        res.json({success : true, userData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateProfile = async(req,res) =>{
    try {
        const {userId, name, phone, address,dob,gender} = req.body
        const imageFile = req.file 

        if(!userId || !name || !phone || !dob || !gender){
            return res.json({success : false, message : "Data Missing"});
        }
        const updatedData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender,
        };
            
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        updatedData.image = imageUpload.secure_url;
        }
        await userModel.findByIdAndUpdate(userId, updatedData);
        return res.json({success : true, message : "Profile updated successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const bookAppointment = async(req,res) =>{
    try {
        const {userId , docId ,slotDate , slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password');
        console.log(docData);
        
        if(!docData.available){
            return res.json({success : false, message : "Doctor not available"});
        }

        let slots_booked = docData.slots_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success : false, message : "Slot not available"});
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            doctorData : docData,
            amount: docData.fees,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Email_User,
                pass: process.env.Email_Password,
                },
            });
        const mailOptions = {
            from: `"MediBook Appointment" <${process.env.Email_User}>`,
            to: userData.email,
            subject: "Appointment Confirmation - MediBook",
            html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p>Dear <strong>${userData.name}</strong>,</p>

    <p>Your appointment with <strong>${docData.name}</strong> (<em>${docData.speciality}</em>) has been successfully booked.</p>

    <p>
      <strong>📅 Date:</strong> ${slotDate.replaceAll('_', '/')}<br>
      <strong>⏰ Time:</strong> ${slotTime}<br>
      <strong>📍 Doctor:</strong> ${docData.name}<br>
      <strong>💵 Fees:</strong> ₹${docData.fees}
    </p>

    <p>Thank you for choosing <strong>MediBook</strong>!</p>

    <p>Best regards,<br/>MediBook Team</p>
  </div>
`

        };

            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Email sending failed:", error);
                // Optionally log but don't block response
            } else {
                console.log("Email sent:", info.response);
            }
            });
        return res.json({success : true, message : "Appointment booked successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const listAppointments = async(req,res) =>{
    try {
        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId}).sort({date: -1})

        res.json({success : true, appointments});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const cancleAppointment = async(req,res) =>{
    try {
        const {userId, appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (appointmentData.userId.toString() !== userId) {
            return res.json({success : false, message : "You are not authorized to cancel this appointment"});
        }

        // Cancel appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);
        const userData = await userModel.findById(userId); // ✅ FIXED HERE

        let slots_booked = doctorData.slots_booked;
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Email_User,
                pass: process.env.Email_Password,
            },
        });

        const mailOptions = {
          from: `"MediBook Appointment" <${process.env.Email_User}>`,
          to: userData.email,
          subject: `Appointment Cancellation - ${doctorData.name}`,
          html: `
            <h2>Appointment Cancelled</h2>
            <p>Dear ${userData.name},</p>
            <p>Your appointment with <strong>${doctorData.name}</strong> on 
            <strong>${slotDate.replace(/_/g, '/')}</strong> at <strong>${slotTime}</strong> has been successfully cancelled.</p>
            <p>We hope to see you again soon.</p>
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

        return res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { registerUser,userLogin,getProfile, updateProfile,bookAppointment,listAppointments ,cancleAppointment};