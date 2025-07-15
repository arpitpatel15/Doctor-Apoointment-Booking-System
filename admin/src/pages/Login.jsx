import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'
const Login = () => {

    const [state,setState] = useState('Admin')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const {setAtoken,backendUrl} = useContext(AdminContext)
    const {setdToken} = useContext(DoctorContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if(state==='Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login', {
                    email,password
                })
                if(data.success){
                    setAtoken(data.token);
                    localStorage.setItem('aToken', data.token);
                    
                }
                else{
                    toast.error(data.message);
                }
            }
            else{
              const {data} = await axios.post(backendUrl + '/api/doctor/login', {email,password})
              if(data.success){
                setdToken(data.token);
                localStorage.setItem('dToken', data.token);
                console.log(data.token);
              }
                else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            
        }
    }
    
  return (
    <form onSubmit={onSubmitHandler} class="min-h-[80vh] flex items-center">
      <div class="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p class="text-2xl font-semibold m-auto">
          <span class="text-[#5f6fff]">{state}</span> Login
        </p>
        <div class="w-full">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} class="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
        </div>
        
        <div class="w-full">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} class="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required/>
        </div>
        
        <button class="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer">
          Login
        </button>
        
        {
          state === 'Admin' ? 
          <p> Doctor Login? <span class='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
          :
          <p> Admin Login? <span class='text-[#5f6fff] underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>

  )
}

export default Login
