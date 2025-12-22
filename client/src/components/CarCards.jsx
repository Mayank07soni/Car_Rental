import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const CarCards = ({car}) => {
    const currency=import.meta.env.VITE_CURRENCY;
    const navigate =useNavigate();

  return (

 <div onClick={()=>{navigate(`/car-details/${car._id}`);scrollTo(0,0)}} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-3 sm:p-5 cursor-pointer w-full max-w-sm sm:max-w-md md:max-w-lg">

  <div className="flex items-start justify-between gap-2 sm:gap-3">
   <img src={car.image} alt="Car-Image" 
    className="w-20 h-14 sm:w-26 sm:h-19 object-cover rounded-lg"/>
    {car.isAvailable && (
        <p className="text-[10px] sm:text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-md whitespace-nowrap">Available Now</p>
      )}

   <div className="text-right">
      <span className="text-sm sm:text-base md:text-lg font-semibold text-[#163e3d]">{currency}{car.pricePerDay}</span>
      <span className="text-sm sm:text-base md:text-lg font-semibold text-[#163e3d]">/ day</span>
    </div>
  </div>

   <div className="mt-3 sm:mt-4">
    <div>
     <div>
        <h3 className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight">{car.brand} {car.model}</h3>
        <p className="text-[11px] sm:text-sm text-gray-500">{car.category} • {car.year}</p>
     </div>
   </div>

   <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-600">
     <div className="flex items-center gap-2">
      <i className="fa-solid fa-user-group text-gray-500 text-xs sm:text-sm"></i>
      <span>{car.seating_capacity} Seats</span>
    </div>

   <div className="flex items-center gap-2">
        <i className="fa-solid fa-gas-pump text-gray-500 text-xs sm:text-sm"></i>
    <span>{car.fuel_type}</span>
   </div>
<div className="flex items-center gap-2">
        <i className="fa-solid fa-car-side text-gray-500 text-xs sm:text-sm"></i>
    <span>{car.transmission}</span>
   </div>
   <div className="flex items-center gap-2">
        <i className="fa-solid fa-location-dot text-gray-500 text-xs sm:text-sm"></i>
     <span>{car.location}</span>
   </div>
   
  </div>
 </div>
</div>
  )
}

export default CarCards