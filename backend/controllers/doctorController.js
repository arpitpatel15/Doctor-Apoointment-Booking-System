import doctorModel from "../models/doctormodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "availability changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      const userData = await userModel.findById(appointmentData.userId);
      const doctorData = await doctorModel.findById(appointmentData.docId);

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
        subject: "Your Appointment is Completed ✅",
        html: `
          <h2>Hi ${userData.name},</h2>
          <p>Your appointment with <strong>${
            doctorData.name
          }</strong> has been successfully completed.</p>
          <p><strong>Details:</strong></p>
          <ul>
            <li><strong>Date:</strong> ${appointmentData.slotDate.replace(
              "_",
              "/"
            )}</li>
            <li><strong>Time:</strong> ${appointmentData.slotTime}</li>
            <li><strong>Doctor:</strong> ${doctorData.name} (${
          doctorData.speciality
        })</li>
            <li><strong>Consultation Fee:</strong> ₹${doctorData.fees}</li>
          </ul>
          <p>We hope you had a great consultation. Stay healthy! 🩺</p>
          <br/>
          <p>Regards,<br/>MediBook Team</p>
        `,
      };
      await transporter.sendMail(mailOptions);
      res.json({success: true,message: "Appointment completed successfully",
      });
    } else {
      res.json({ success: false, message: "Mark Fail" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancle = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancle: true });

      const userData = await userModel.findById(appointmentData.userId);
      const doctorData = await doctorModel.findById(appointmentData.docId);

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
        subject: "Your Appointment is Cancelled ❌",
        html: `
          <h2>Hi ${userData.name},</h2>
          <p>Your appointment with <strong>${doctorData.name}</strong> has been <span style="color:red"><strong>cancelled</strong></span>.</p>
          <p><strong>Cancelled Appointment Details:</strong></p>
          <ul>
            <li><strong>Date:</strong> ${appointmentData.slotDate.replace("_", "/")}</li>
            <li><strong>Time:</strong> ${appointmentData.slotTime}</li>
            <li><strong>Doctor:</strong> ${doctorData.name} (${doctorData.speciality})</li>
            <li><strong>Consultation Fee:</strong> ₹${doctorData.fees}</li>
          </ul>
          <p>If this was a mistake, please reschedule a new appointment through our portal.</p>
          <br/>
          <p>Regards,<br/>MediBook Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        message: "Appointment cancelled and email sent successfully",
      });
    } else {
      res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  doctorLogin,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancle,
};
