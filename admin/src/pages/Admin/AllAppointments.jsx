import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {

  const {aToken,backendUrl,getAllApoointments,appointments,cancleAppointment} = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)
  useEffect(()=>{
    if(aToken) {
      getAllApoointments()
    }
  },[aToken])

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }
  return (
    <div class='w-full max-w-6xl m-5'>
      <p class='mb-3 text-lg font-medium'>All Appointments</p>
      <div class='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll scrollbar-hidden'>
        <div class='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p></p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.map((item,index)=>(
            <div class='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
              <p class='max-sm:hidden'>{index+1}</p>
              <div class='flex items-center gap-2'>
                <img class='w-10 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <p class='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p class='max-sm:hidden'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div class='flex items-center gap-2'>
                <img class='w-10 rounded-full bg-gray-200' src={item.doctorData.image} alt="" />
                <p>{item.doctorData.name}</p>
              </div>
              <p>₹{item.amount}</p>
              {
                item.cancelled ?
                <p class='text-red-400 text-xs font-medium'>Canclled</p> : 
                <img onClick={() =>cancleAppointment(item._id)} class='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }         
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllAppointments
