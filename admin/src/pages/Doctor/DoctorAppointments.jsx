import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import {AppContext} from '../../context/AppContext'
import { assets } from '../../assets/assets'
const DoctorAppointments = () => {

  const {dToken,getAppointment,appointments,cancleAppointment,completeAppointment} = useContext(DoctorContext)
  const {calculateAge,slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if(dToken){
      getAppointment()
    }
    
  },[dToken])
  return (
    <div class='w-full max-w-6xl m-5'>
      <p class='mb-3 text-lg font-medium'>All Appointments</p>
      <div class='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>
        <div class='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.map((item,index)=>(
            <div class='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
              <p class='max-sm:hidden '>{index+1}</p>
              <div class='flex items-center gap-2'>
                <img class='w-8 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p class='text-xs inline border border-[#5f6fff] px-2 rounded-full '>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>
              <p class='max-sm:hidden'>
                {calculateAge(item.userData.dob)}          
              </p>
              <p>{slotDateFormat(item.slotDate)} ,{item.slotTime}</p>
              <p>₹{item.amount}</p>
              {
                 item.cancelled ? 
                 <p class='text-red-500'>Canclelled</p> : 
                 item.isCompleted ? <p class='text-green-500'>Completed</p> :
                  <div class='flex'>
                <img onClick={()=>cancleAppointment(item._id)} class='w-8 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img onClick={()=>completeAppointment(item._id)} class='w-8 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
              }
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments
