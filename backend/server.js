import express, { urlencoded } from 'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from '../config/mongodb.js'
import connectCloudinary from '../config/cloudinary.js'
import adminRouter from '../routes/adminRoute.js'
import doctorRoute from '../routes/doctorRoute.js'
import userRoute from '../routes/userRoute.js'

import serverless from 'serverless-http'
const app = express()
const PORT = 3000
connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())
//api endpoints
app.use('/api/admin',adminRouter) //localhost:3000/api/admin
app.use('/api/doctor',doctorRoute) //localhost:3000/api/doctor
app.use('/api/user',userRoute) //localhost:3000/api/user


app.get('/',(req,res)=>{
    res.send('API working!!!???')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})