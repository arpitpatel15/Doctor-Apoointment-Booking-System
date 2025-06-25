import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { assets } from '../assets/assets'
import ReletedDoc from '../componants/ReletedDoc'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Appointment = () => {

  const {docId} = useParams()
  const {doctors,backendUrl,getDoctorsData,token} = useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [docInfo,setDocInfo] = useState(null)
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')
  const navigate = useNavigate()


  const fetchDocInfo = async() =>{
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo);
  }

  const getAvailableSlot = async()=>{
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate()+i)

        let endTime = new Date()
        endTime.setDate(today.getDate()+i)
        endTime.setHours(21,0,0,0)

        if(today.getDate()===currentDate.getDate()){
          currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours()+1 : 10)
          currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 : 0)
        }
        else{
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        }
        let timeSlot = []
        while(currentDate < endTime){
          let formattedTime = currentDate.toLocaleTimeString([],{hour : '2-digit',minute:'2-digit',hour12: true})

          timeSlot.push({
            datetime : new Date(currentDate),
            time : formattedTime
          })

          currentDate.setMinutes(currentDate.getMinutes()+30)
        }
        setDocSlots(prev => ([...prev , timeSlot]))
    }
  }

  useEffect(()=>{
    getAvailableSlot()
  },[docInfo])

  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])

  useEffect(()=>{
    console.log(docSlots); 
  },[docSlots])

  const bookAppointment = async() =>{
    if(!token){
      toast.warn('Please login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1 
      let year = date.getFullYear()

      const slotDate = `${day}_${month}_${year}`

      const {data} = await axios.post(`${backendUrl}/api/user/book-appointment`,{docId,slotDate,slotTime},{headers : {token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointment')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)    
    }
  }

  return docInfo && (
    <div>
      <div class='flex flex-col sm:flex-row gap-4'>
        <img class='bg-[#5f6fff] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />

        <div class='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p class='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} 
          <img class='w-5' src={assets.verified_icon} alt="" /></p>
          <div class='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button class='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p class='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p class='text-sm text-gray-600 mt-1 max-w-[700px]'>{docInfo.about}</p>
          </div>
          <p class='text-gray-500 font-medium mt-4'>Appointment Fees : ₹<span class='text-gray-600'>{docInfo.fees}</span></p>
      </div>

    </div>

    {/*Booking slots*/ }

    <div class='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600'>
      <p>Booking Slots</p>
      <div class='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length && docSlots.map((item,index)=>(
            <div onClick={()=>setSlotIndex(index)} class={`text-center py-6 cursor-pointer rounded-full min-w-16 ${slotIndex===index ? 'bg-[#5f6fff] text-white' : 'border border-gray-200' }`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))
        }
      </div>

      <div  class='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {
          docSlots.length && docSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} class={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time ===slotTime ? 'bg-[#5f6fff] text-white' : 'border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))
        }
      </div>
      <button onClick={bookAppointment} class='bg-[#5f6fff] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book Appointment</button>
    </div>
    
    {/* Releted Doc */}

    <ReletedDoc docId={docId} speciality={docInfo.speciality}/>
    
  </div>
  )
}

export default Appointment
