import React from 'react'
import {assets} from '../assets/assets'
const Contect = () => {


  return (
    <div>
      
      <div class='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span class='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div class='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img class='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div class='flex flex-col justify-center items-start gap-6'>
          <p class='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p class='text-gray-500'>401 , FORTH FLOOR,<br />SHUKAN MALL, AHMEDABAD , INDIA</p>
          <p class='text-gray-500'>Tel : (+91)52014-57420 <br />Email : doctor.appointment@gmail.com</p>
          <p class='font-semibold text-lg text-gray-600'>Career at Prescripto</p>
          <p class='text-gray-500'> Learn more about our Team and Job opportunites</p>
          <button class='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore job</button>
        </div>
      </div>
    </div>
  )
}

export default Contect
