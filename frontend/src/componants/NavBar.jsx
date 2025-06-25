import React, { useState } from 'react'
import { assets } from '../assets/assets'
import {NavLink, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const NavBar = ({profile = assets.profile_pic,name = ""}) => {

    const nevigate = useNavigate()
    const {token,setToken} = useContext(AppContext)
    const [showMenu,setShowMenu] = useState(false)  

    const logout = () =>{
      setToken(false)
      localStorage.removeItem('token')
      nevigate('/')
    }

    return (
    <div class='flex items-center justify-between border-b text-sm py-4 mb-5 border-b-gray-400'>
      <img onClick={()=>nevigate('/')} src={assets.Medibook} alt="" class='w-44 cursor-pointer pt-2'/>
      <ul class='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to={'/'} >
          <li class='py-1'>Home</li>
          <hr class='border-none outline-none h-0.5 bg-[#5f6fff] w-full m-auto hidden ' />
        </NavLink>
        <NavLink to={'/doctors'}>
          <li class='py-1'>All Doctors</li>
          <hr class='border-none outline-none h-0.5 bg-[#5f6fff] w-full m-auto hidden' />
        </NavLink>
        <NavLink to={'/about'}>
          <li class='py-1'>About</li>
          <hr class='border-none outline-none h-0.5 bg-[#5f6fff] w-full m-auto hidden' />
        </NavLink>
        <NavLink to={'/contact'}>
          <li class='py-1'>Contact</li>
          <hr class='border-none outline-none h-0.5 bg-[#5f6fff] w-full m-auto hidden' />
        </NavLink>
      </ul>
      <div class='flex items-center gap-4'>
        {
          token ? 
          <div class='flex items-center cursor-pointer gap-2 group relative'> 
            <img src={profile} class='w-8 rounded-full' alt="" />
            <img src={assets.dropdown_icon} class='w-2.5' alt="" />
            <div class='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div class='min-w-40 bg-stone-100 rounded flex flex-col '>
                <p onClick={()=>nevigate('/myprofile')} class='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>nevigate('/my-appointment')} class='hover:text-black cursor-pointer'>My Apoointment</p>
                <p onClick={logout} class='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
            <p class='font-medium text-lg'>Hello, {name}</p>
          </div>
          :
        <button onClick={()=>nevigate('/login')} class='bg-[#5f6fff] cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
        }

        <img onClick={()=>setShowMenu(true)} class='w-6 md:hidden' src={assets.menu_icon} alt="" />

        <div class={`${showMenu ? 'fixed w-full' : 'h-0 w-0'}md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div class='flex items-center justify-between'>
            <img class='w-36'src={assets.logo} alt="" />
            <img class='w-7' onClick={()=>setShowMenu(false)}src={assets.cross_icon} alt="" />
          </div>
          <ul class='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink class='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/'>Home</NavLink>
            <NavLink class='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='doctors'>All Doctors</NavLink>
            <NavLink class='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='/about'>About</NavLink>
            <NavLink class='px-4 py-2 rounded inline-block' onClick={()=>setShowMenu(false)} to='contact'>Contact</NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
