import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DashBoard = () => {

  const {dashData,getDashData,aToken} = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)

  const css = 'flex items-center gap-2 bg-white p-4 rounded min-w-52 border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'
  useEffect(()=>{
    getDashData()
  },[aToken])
  return dashData && (
    <div class='m-5'>
      <div class='flex flex-wrap gap-3'>
        <div class={css}>
          <img class='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p class='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p class='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div class={css}>
          <img class='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p class='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p class='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div class={css}>
          <img class='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p class='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p class='text-gray-400'>Patients</p>
          </div>
        </div>
        
      </div>

      <div class='bg-white '>
        <div class='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p class='font-semibold'>Latest Appointments</p>
        </div>
        <div class='pt-4 border border-t-0 '>
          {
            dashData.latestAppointmets.map((item,index)=>(
              <div class='flex items-center gap-3 px-6 py-3 hover:bg-gray-100' key={index}>
                <img class='w-10 rounded-full' src={item.doctorData.image} alt="" />
                <div class='flex-1 text-sm'>
                  <p class='text-gray-800 font-medium'>{item.doctorData.name}</p>
                  <p class='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
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
    </div>
  )
}

export default DashBoard
