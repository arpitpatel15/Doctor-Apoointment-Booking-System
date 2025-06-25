import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Login = () => {

  const [state,setState] = useState('Sign up')

  const [email,SetEmail] = useState('')
  const [password,SetPassword] = useState('')
  const [name,setName] = useState('')
  const {backendUrl,token,setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandalr = async(event) =>{
    event.preventDefault()
    try {
      if(state === 'Sign up'){
        const {data} = await axios.post(`${backendUrl}/api/user/register`,{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(`${backendUrl}/api/user/login`,{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          
        }
        else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandalr} class='min-h-[80vh] flex items-center' action="">
      <div class='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p class='text-2xl font-semibold'>{state === 'Sign up' ? "Create Account" : "Login"}</p>
        <p >Please {state === 'Sign up' ? "sign up" : "login"} to book appointment</p>
        {
          state === 'Sign up' && <div class='w-full '>
          <p>Full Name</p>
          <input class='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>
        </div>
        }
        
        <div class='w-full '>
          <p>Email</p>
          <input class='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>SetEmail(e.target.value)} value={email} required/>
        </div>
        <div class='w-full '>
          <p>Password</p>
          <input class='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>SetPassword(e.target.value)} value={password} required/>
        </div>
        <button type='submit' class='bg-[#5f6fff] text-white w-full py-2 rounded-md text-base cursor-pointer'>{state === 'Sign up' ? "sign up" : "login"}</button>

        {
          state === 'Sign up' ? 
          <p>Already have an Account? <span onClick={()=>setState('Login')}class='text-[#5f6fff] underline cursor-pointer'>Login here</span></p> : 
          <p>Create a new account? <span onClick={()=>setState('Sign up')} class='text-[#5f6fff] underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
