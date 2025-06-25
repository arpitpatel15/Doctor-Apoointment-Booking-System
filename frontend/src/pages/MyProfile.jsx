import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
const MyProfile = () => {

  const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)
  const imageadd = 'https://as2.ftcdn.net/v2/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg'
  const [isEdit,setisEdit] = useState(false)
  const [image,setImage] = useState(false)
  console.log(userData);
  
  const updateProfileData = async()=>{
    try {
      const formData = new FormData()
      formData.append('userId', userData._id)
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('dob',userData.dob)
      formData.append('gender',userData.gender)
      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl+'/api/user/update-profile',formData,{headers : {token}})
      if(data.success){
        toast.success("Profile Updated Successfully")
        await loadUserProfileData()
        setisEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div class='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit ? <label htmlFor="image">
                  <div class='cursor-pointer'>
                    <img class='w-36 rounded' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                  </div>
                  <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="image" hidden/>
                </label> 
        : <img class='w-36 rounded' src={userData.image || imageadd} alt={imageadd} />
      }
      

      {
        isEdit ? 
        <input class='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))} /> : <p class='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr class='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p class='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div class='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p class='font-medium'>Email Id : </p>
          <p class='text-blue-500'>{userData.email}</p>
          <p class='font-medium'>Phone : </p>
          {
            isEdit ? 
            <input class='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} /> : <p class='text-blue-400'>{userData.phone}</p>
          }
          <p class='font-medium'>Address : </p>
          {
            isEdit ? 
            <p>
              <input class='bg-gray-50 ' type="text" value={userData.address.line1} onChange={(e)=>setUserData((prev)=>({...prev,address:{ ...prev.address, line1: e.target.value },}))} />
              <br />
              <input class='bg-gray-50 'type="text" value={userData.address.line2} onChange={(e)=>setUserData((prev)=>({...prev,address:{...prev.address,line2:e.target.value}}))}/>
            </p> : 
            <p class='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}

            </p>
          }

        </div>
      </div>
      <div>
        <p class='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div class='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
           <p class='font-medium'>Gender : </p>
           {
            isEdit ? 
            <select class='max-w-20 bg-gray-100' onChange={e => setUserData(prev => ({...prev,gender:e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select> : <p class='text-gray-400'>{userData.gender}</p>
          }
          <p class='font-medium'>DOB : </p>
          {
            isEdit ? 
            <input class='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={e => setUserData(prev => ({...prev,dob : e.target.value}))}/> : <p class='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div class='mt-10 '>
        {
          isEdit ? 
          <button class='cursor-pointer border border-[#5f6fff] px-10 py-2 rounded-full hover:text-white hover:bg-[#5f6fff] transition-all duration-200' onClick={updateProfileData}>Save Information</button>
          : <button class='cursor-pointer border border-[#5f6fff] px-10 py-2 rounded-full hover:text-white hover:bg-[#5f6fff] transition-all duration-200' onClick={()=>setisEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
