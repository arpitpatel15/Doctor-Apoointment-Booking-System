import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const TopDoctors = () => {

  const nevigate = useNavigate()
  const {doctors} = useContext(AppContext)

  return (
    <div class='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10 '>
      <h1 class='text-3xl font-medium'>Top Doctors to Book</h1>
      <p class='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of our trusted doctors</p>
      <div class='w-full grid  gap-4 pt-5 gap-y-6 px-3 sm:px-0' style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {
            doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>{nevigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} class='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img class='bg-blue-50' src={item.image} alt="" />
                    <div class='p-4'>
                        <div class='flex items-center gap-2 text-sm text-center text-green-500'>
                          <p class='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                    </div>
                    <p class='text-gray-900 font-medium text-lg pl-3'>{item.name}</p>
                    <p class='text-gray-600 text-sm pb-3 pl-3'>{item.speciality}</p>
                </div>
            ))
        }
      </div>
      <button onClick={()=>{nevigate('/doctors'); moveTo(0,0)}} class='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer'>More</button>
    </div>
  )
}

export default TopDoctors
