import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div class='md:mx-10'>
      <div class='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
        {/* {left} */}
        <div>
            <img class='mb-5 w-55' src={assets.Medibook} alt="" />
            <p class='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quisquam sit accusantium nesciunt officiis praesentium quaerat illum eligendi explicabo unde error aspernatur ex eos ullam similique necessitatibus vel nostrum incidunt?</p>
        </div>
        {/* Center */}
        <div>
            <p class='text-xl mb-5 font-medium'>Company</p>
            <ul class='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contect us</li>
                <li>Policy</li>
            </ul>
        </div>
        {/* Right */}
        <div>
            <p class='text-xl mb-5 font-medium'>Get in Touch</p>
            <ul class='flex flex-col gap-2 text-gray-600'>
                <li>+918521473214</li>
                <li>doctor.appointment@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p class='py-5 text-sm text-center'>&copy; 2025 Prescripto : All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
