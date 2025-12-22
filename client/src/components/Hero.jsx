import React , { useState }  from 'react'
import { useAppContext } from '../context/AppContext'

const Hero = () => {

  const[pickupLocation, setPickupLocation]=useState('');
   
  const{pickupDate, setPickupDate, returnDate, setReturnDate, navigate}=useAppContext();

  const handleSearch =(e)=>{
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }
 
  const cityList=[
    "Delhi","Mumbai","Bengaluru","Chennai", "Kolkata", "Ahmedabad", "Hyderabad",
  ]
  return (
    <div  className="flex flex-col items-center justify-center text-center py-12 sm:py-16 bg-[#efeedd] px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0d4b50] mb-8"> Cars on Rent</h1>
        <form onSubmit={handleSearch} className="flex flex-wrap justify-center items-end gap-4 sm:gap-6 bg-white p-5 sm:p-6 rounded-2xl shadow-md w-full max-w-5xl">
          
            <div className="flex flex-col text-left w-full sm:w-48">
               <label className="text-sm font-medium text- -[#0d4b50]">Location</label>
              <select required  value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">  
                <option value="">Pickup Location</option>
                    {cityList.map((city)=> <option key={city} value={city}>{city}</option>
                    )}
                    </select>  
                   
            </div>
           
            <div className="flex flex-col text-left w-full sm:w-48"> 
                <label className="text-sm font-medium text-[#0d4b50] mb-1">Pick-Up Date</label>
               <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type='date' id='pickup-date' min={new Date().toISOString().split('T')[0]} required 
               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"/>
            </div>
            <div className="flex flex-col text-left w-full sm:w-48">
                <label  className="text-sm font-medium text-[#0d4b50] mb-1">Return Date</label>
                <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" min={new Date().toISOString().split('T')[0]} required
               className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"/>
            </div>
           
           
             <button type="submit"
             className="w-full sm:w-auto bg-blue-600 text-white font-semiboldpx-6 py-1.5 px-5 rounded-4xl hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base">Search</button>
        </form>
        <img src="https://www.freepngimg.com/thumb/car/2-2-car-transparent.png" alt="React logo" className="mt-10 w-full max-w-3xl "/>
    </div>
  )
}

export default Hero