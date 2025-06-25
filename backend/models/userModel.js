import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name : { type:String , required : true},
    email : { type:String , required : true, unique : true},
    password : { type:String , required : true },
    image : { type : String, default : "https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"},
    address : {type:Object , default : {line1 : "",line2 : ""}},
    gender : {type:String , default : ""},
    dob : {type:String , default : ""},
    phone : {type:String , default : "0000000000"},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
},{ minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel
