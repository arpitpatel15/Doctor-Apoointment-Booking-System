import React from 'react'
import {assets} from '../assets/assets'
const Header = () => {
  return (
    <div class="flex flex-col md:flex-row flex-wrap bg-[#5f6fff] rounded-lg px-6 md:px-10 lg:px-20 ">
        {/* left side */}
      <div class='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p class='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br />With out Doctors</p>
        <div class='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img class='w-28' src={assets.group_profiles} alt="" />
          <p>Simply browse through our extensive list of trusted doctors,<br class='hidden sm:block' />Schedule your appointment hassle-free</p>
        </div>
        <a class='font-semibold flex items-center bg-white gap-2 px-8 py-2 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciality">Book Appointment <img class='w-3'src={assets.arrow_icon} alt="" /></a>
      </div>
      {/* right side */}
      <div class='md:w-1/2 relative '>
        <img class='w-full md:absolute bottom-0 h-auto rounded-full' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
