import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.bup2ycw.mongodb.net/doc-appointment`)
    .then(()=>console.log("DB Connected.."))
    .catch((error)=>console.log("Error : ",error))
}

