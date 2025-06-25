import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
const NavBar = () => {

    const {aToken,setAtoken} = useContext(AdminContext)
    const navigate = useNavigate();
    const logout = () => {
        navigate('/')
        aToken && setAtoken("");
        if(aToken){
            localStorage.removeItem('aToken');
        }
    }
  return (
    <div class="flex justify-between px-4 sm:px-10 py-3 border-b bg-white items-center">
      <div class="flex items-center gap-2 text-xs">
        <img class="w-36 sm:w-40 cursor-pointer" src={assets.Medibook} alt="Admin Logo"/>
        <p class="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button onClick={logout} class="bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full">
        LogOut
      </button>
    </div>

  )
}

export default NavBar
