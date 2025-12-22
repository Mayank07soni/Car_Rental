import React from 'react'
import Title from'./Title'
import CarCards from './CarCards.jsx'
import { useAppContext } from '../context/AppContext.jsx'

const FeaturedSection = () => {

  const {cars,navigate } = useAppContext();

  return (
    <div className="bg-[#efeedd]  py-5 px-4 sm:px-6 md:px-16 lg:px-24">
        <div className="text-center mb-8 sm:mb-10">
            <Title title=' Featured Vehicles' subTitle="Explore our premium selection of cars"/>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {
                cars.slice(0,6).map((car)=>(
                  <div key={car._id} className="transition-transform duration-300 hover:-translate-y-1">
                   <CarCards car={car}/>
                   </div>
                ))
            }
        </div> 

        <div className="flex justify-center mt-10 sm:mt-12">
          <button onClick={(e)=>navigate("/cars")} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-3xl hover:bg-blue-700 hover:shadow-md  transition duration-300 text-sm sm:text-base">
            Explore all Cars
        </button>
        </div>
        
    </div>
  )
}

export default FeaturedSection