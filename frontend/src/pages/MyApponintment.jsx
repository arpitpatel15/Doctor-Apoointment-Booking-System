import React, { useContext,useState,useEffect } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyApponintment = () => {

  const {doctors,backendUrl,token,getDoctorsData} = useContext(AppContext)
  const [appointment, setAppointment] = useState([])
  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }
  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`,{ headers: { token } })

      if(data.success) {
        setAppointment(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);     
    }
  }

  const cancleAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancle-appointment`, { appointmentId }, { headers: { token } })
      if(data.success) {
        toast.success(data.message);
        getUsersAppointments();
        getDoctorsData();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token) {
      getUsersAppointments()
    } else {
      toast.warn('Please login to view appointments')
    }
  },[token])

  return (
    <div>
      <p class='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {
          appointment.map((item,index)=>(
            <div class='grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img class='w-32 bg-indigo-50' src={item.doctorData.image} alt="" />
              </div>
              <div class='flex-1 text-sm text-zinc-600'>
                <p class='text-neutral-800 font-semibold'>{item.doctorData.name}</p>
                <p>{item.doctorData.speciality}</p>
                <p class='text-zinc-700 font-medium mt-1'>Address</p>
                <p class='text-xs '>{item.doctorData.address.line1}</p>
                <p class='text-xs '>{item.doctorData.address.line2}</p>
                <p class='text-xs mt-1'>Date & Time : <span class='text-sm text-neutral-700 font-medium'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span></p>
              </div>
              <div>

              </div>
              <div class='flex flex-col gap-2 justify-end'>
                {!item.cancelled && <button class='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-200'>Pay Online</button>}
                {!item.cancelled && <button onClick={(e)=>cancleAppointment(item._id)} class='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-200'>Cancle Appointment</button>}
                {item.cancelled && <button class='text-sm text-red-600 text-center sm:min-w-48 py-2 border rounded'>Appointment Cancelled</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyApponintment
