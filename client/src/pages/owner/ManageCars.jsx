import React, { useState,useEffect } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {
  
  const{isOwner,axios,currency,cars,setCars}=useAppContext();

  const fetchOwnerCars =async()=>{
    try{
      const {data} =await axios.get('/owner/cars')
      if(data.success){
        setCars(data.cars)
      }
      else{
        toast.error(data.message)
      }     
    }
    catch(error){
      toast.error(error.message)
    }
  }

  const toggleAvailability =async(carId)=>{
    try{
      const {data} =await axios.post('/owner/toggle-car',{carId})
      if(data.success){
       toast.success(data.message)
       fetchOwnerCars()
      }
      else{
        toast.error(data.message)
      }   
    }
    catch(error){
      toast.error(error.message)
    }
  }

  const deleteCar =async(carId)=>{
    try{
      const confirm=window.confirm('Are you sure you want to delete this car?')
      
      if(!confirm){
        return null
      }

      const {data} =await axios.post('/owner/delete-car',{carId})
      if(data.success){
         toast.success(data.message)
        fetchOwnerCars()
      }
      else{
        toast.error(data.message)
      }
        
    }
    catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
   isOwner && fetchOwnerCars()
  },[isOwner])

 return (
 <div className=" sm:px-6 md:px-8 lg:px-12 bg-[#efeedd] min-h-screen">
      <Title title="Manage Cars" subTitle="Manage all listed vehicles, update availability, pricing, and car details in one place." />

    <div className="mt-3 sm:mt-6 md:mt-8 bg-white rounded-lg shadow-md overflow-hidden">
     <table className="w-full border border-[#a7afaf]">
      <thead className=" md:table-header-group bg-gray-100 text-[#214650] uppercase text-[7px] sm:text-xs md:text-base">
        <tr>
              <th className="py-2 sm:py-3 px-1 sm:px-4 text-left border-b ">Car</th>
              <th className="py-2 sm:py-3 px-1 sm:px-4 text-left border-b ">Category</th>
              <th className="py-2 sm:py-3 px-1 sm:px-4 text-left border-b ">Price</th>
              <th className="py-2 sm:py-3 px-1 sm:px-4 text-left border-b ">Status</th>
              <th className="py-2 sm:py-3 px-1 sm:px-4 text-center border-b ">Actions</th>
            </tr>
           </thead>

          <tbody className="text-[7px] sm:text-sm text-[#224d4f]">
             {cars.map((car,index)=>(
            <tr key={index} className="hover:bg-gray-50 transition border-b">
              <td  className="py-2 sm:py-3 px-1 sm:px-4">
                <img src={car.image} alt="car.img"  className="w-5 h-4 sm:w-25 sm:h-14 object-cover rounded"/>
                <div>
                  <p className="font-medium text-gray-800">{car.brand} {car.model} </p>
                  <p className="text-[6px] sm:text-xs text-gray-500">{car.seating_capacity} • {car.transmission} </p>
                </div>
              </td>

              <td className="py-1 sm:py-3 px-1 sm:px-4 whitespace-nowrap">{car.category}</td>
              <td className="py-1 sm:py-3 px-1 sm:px-4 whitespace-nowrap">{currency}{car.pricePerDay}/day</td>

              <td className="py-1 sm:py-3 px-1 sm:px-4">
                <span className={`px-2 py-0.5 rounded text-[7px] sm:text-xs font-medium ${car.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                  {car.isAvailable ? "Available" :"Unavailable"}
                </span>

              </td>
               <td className="py-1 sm:py-3 px-2 sm:px-4 text-center">
                <i onClick={()=>toggleAvailability(car._id)} className={`fa-solid ${car.isAvailable ? "fa-eye-slash" : "fa-eye"} text-[#214650] hover:text-blue-600 cursor-pointer transition text-[10px] sm:text-base`} title="Toggle Availability"  ></i> 
                <i onClick={()=>deleteCar(car._id)}className="px-1.5 sm:px-5 fa-solid fa-trash hover:text-red-700 cursor-pointer transition text-[10px] sm:text-base" title="Delete Car"  ></i> 
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCars