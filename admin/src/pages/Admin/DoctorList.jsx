import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { use } from 'react'
import { useEffect } from 'react'

const DoctorList = () => {

  const {doctors, aToken , getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
  },[aToken])
  return (
    <div class='m-5 max-h-[90vh] overflow-y-scroll hide-scrollbar'>
      <h1 class='text-lg font-medium'>All Doctors</h1>
        <div class='flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div class='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img class='bg-indigo-50 group-hover:bg-[#5f6fff] transition-all duration-500' src={item.image} alt="" />
              <div class='p-4'>
                <p class='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p class='text-zinc-600 text-sm'>{item.speciality}</p>
                <div class='mt-2 flex items-center text-sm gap-1'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
        </div>
    </div>
  )
}

export default DoctorList
