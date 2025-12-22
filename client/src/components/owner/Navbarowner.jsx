import React from 'react'
import {Link} from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Navbarowner = () => {
    
  const {user} =useAppContext();

  return (
  <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-4 bg-[#0d4b50] shadow-sm border-b border-gray-100">
        <Link to='/'  className="flex items-center gap-3">
        <img src="https://images.hdqwalls.com/download/car-minimalism-simple-art-1920x1080.jpg" alt="image"  className="h-8 w-8 sm:h-9 sm:w-9 object-cover rounded-md"/>
        <span className="hidden sm:inline e font-serif text-white text-lg md:text-lg font-bold tracking-wider hover:text-[#fdf9b3] transition-colors duration-300 cursor-pointer">
          CarRental
         </span>
        </Link>
        <p className="text-white text-sm sm:text-base font-medium">Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default Navbarowner;