import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

const Cardetails = () => {

  const {currency,cars,axios,pickupDate, setPickupDate, returnDate, setReturnDate,navigate}=useAppContext()

  const{id}=useParams()
  
  const[car,setCar]=useState(null)

  const handleSubmit= async(e)=>{
    e.preventDefault();
     if (pickupDate === returnDate) {
    toast.error("Pickup date and return date cannot be the same");
       return;
  }

   if (new Date(returnDate) < new Date(pickupDate)) {
    toast.error("Return date must be after pickup date");
    return;
  }

    try{
      const {data} = await axios.post('bookings/create',{car:id, pickupDate, returnDate})
    
      if(data.success){
        toast.success(data.message)
        navigate('/my-booking')
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
 setCar(cars.find(car=>car._id === id))
 },[cars,id])

 

return car? (
  <div className="px-3 sm:px-6 md:px-10 py-4 sm:py-6 bg-[#efeedd] min-h-screen">
    <button onClick={()=>navigate(-1)}  className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-gray-600 hover:text-blue-600 mb-4 sm:mb-6 transition">
       <i className="fa-solid fa-arrow-left"></i>
      Back to all cars
    </button>
     
     <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

       <div className="flex-1 bg-white rounded-xl shadow-md p-3 sm:p-5 md:p-6">
        <img src={car.image} alt="car-image"  className="w-full sm:w-72 md:w-80 h-44 sm:h-48 object-cover rounded-lg mb-4"/>
       <div className="space-y-3">
         <div>
           <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{car.brand} {car.model}</h1>
           <p className="text-xs sm:text-sm text-gray-500">{car.category} • {car.year}</p>
         </div>
          <hr className="border-gray-200" />

         <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
          {[{icon: "fa-solid fa-user-group", text:`${car.seating_capacity} Seats`},
            {icon: "fa-solid fa-gas-pump", text:car.fuel_type},
            {icon: "fa-solid fa-car-side", text:car.transmission},
            {icon: "fa-solid fa-location-dot", text:car.location},
          ].map(({icon,text})=>(
            <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-gray-500 text-xs sm:text-sm`}></i>
                {text}
            </div>
          ))}
         </div>

          <div>
           <h1 className="font-semibold text-gray-800 text-sm sm:text-base mt-4">Discreption</h1>
           <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{car.description}</p>
          </div>
           
          <div>
           <h1 className="font-semibold text-gray-800 text-sm sm:text-base mt-4">Features</h1>
            <ul className="grid grid-cols-2 gap-2 mt-2 text-xs sm:text-sm text-gray-600">
              {
                ["360 Camera", "Bluetooth","GPS", "Heated Seats", "Rear View Mirror"].map((item)=>(
                 <li className="flex items-center gap-2" key={item}>
                    <i className="fa-solid fa-check text-green-500 text-xs"></i>
                    {item}
                  </li>
                ))
              }
            </ul>
           </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}  className="w-full lg:w-80 bg-white rounded-xl shadow-md p-3 sm:p-5 md:p-6 space-y-4">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">{currency}{car.pricePerDay}</p>
          <span className="text-xs sm:text-sm text-gray-500">per day</span>
         <hr className="border-gray-200" />
       
       <div className="space-y-1">
        <label className="text-xs sm:text-sm font-medium text-gray-700">Pickup Date</label>
        <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)} type="date" required id='pickup-date' min={new Date().toISOString().split('T')[0]}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"></input>
       </div>

       <div className="space-y-1">
        <label className="text-xs sm:text-sm font-medium text-gray-700">Return Date</label>
        <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} type="date" required id='return-date' min={new Date().toISOString().split('T')[0]}
         className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"></input>
       </div>

       <button  type="submit"
       className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base font-medium">Book Now</button>
         <p className="text-[10px] sm:text-xs text-gray-500 text-center"> No credit card required to reserve</p>
      </form>
    </div>
    
  </div>
  ):<Loader/>
}

export default Cardetails
