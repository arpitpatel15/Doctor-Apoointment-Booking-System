import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Doctors() {

  const {speciality} = useParams()
  const [filterDoc,setFilterDoc] = useState([])
  const {doctors} = useContext(AppContext)
  const nevigate = useNavigate()
  const applyFilter = () =>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
    <div>
      <p class='text-gray-600'>Browser through the doctors speciality</p>
      <div class='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div class='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=> speciality === 'General physician'  ? nevigate('/doctors') : nevigate('/doctors/General physician')} class={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black " : ""}`}>General Physician</p>

          <p onClick={()=> speciality === 'Gynecologist'  ? nevigate('/doctors') : nevigate('/doctors/Gynecologist')} class={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black " : ""}`}>Gynecologist</p>

          <p onClick={()=> speciality === 'Dermatologist'  ? nevigate('/doctors') : nevigate('/doctors/Dermatologist')} class={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black " : ""}`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians'  ? nevigate('/doctors') : nevigate('/doctors/Pediatricians')} class={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black " : ""}`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist'  ? nevigate('/doctors') : nevigate('/doctors/Neurologist')} class={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black " : ""}`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist'  ? nevigate('/doctors') : nevigate('/doctors/Gastroenterologist')} class={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black " : ""}`}>Gastroenterologist</p>
        </div>
        <div class='w-full grid  gap-4 gap-y-6 'style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }} >
          {
            filterDoc.map((item,index)=>(
              <div onClick={()=>nevigate(`/appointment/${item._id}`)} key={index} class='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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
      </div>
    </div>
  )
}

export default Doctors
