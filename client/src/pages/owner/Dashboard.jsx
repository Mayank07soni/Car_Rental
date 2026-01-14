import React , {useState,useEffect} from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext'
import toast from "react-hot-toast"

const Dashboard = () => {
  
const {axios, isOwner, currency,navigate}=useAppContext();
  
  const[data,setData]=useState({
    totalCars:0,
    totalBookings:0,
    completeBookings:0,
    pendingBookings:0,
    recentBookings:[],        
    monthlyRevenue:0,
  })

  const dashboardCards=[
    {title: "Total Cars", value:data.totalCars,icon: "fa-solid fa-car"},
    {title: "Total Booking", value:data.totalBookings,icon: "fa-solid fa-calendar-check"},
    {title: "Confirmed", value:data.completeBookings, icon: "fa-solid fa-circle-check"},
     {title: "Pending", value:data.pendingBookings,icon: "fa-solid fa-clock"},
  ]
  
   const fetchdashBoardData =async ()=>{
      try{
        const {data}= await axios.get('/owner/dashboard')
        if(data.success){
          setData(data.dashboardData)
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
    if(isOwner){
      fetchdashBoardData();
    }
  },[isOwner])
  return (

   <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-10 bg-[#efeedd] min-h-screen">
     <Title title="Admin Dashboard" subTitle="Monitor overall performance including total cars, total bookings, revenue and recent activities"/>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

      {dashboardCards.map((card,index)=>(
        <div key={index} className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center hover:shadow-xl transition-all duration-300"> 
       
        <div>
         <h1  className="text-[#144c45] font-medium text-sm sm:text-base">{card.title}</h1>
         <p className="text-2xl font-semibold text-[#112e2d] mt-2">{card.value}</p>
        </div>

        <div className="h-12 w-12 rounded-full bg-[#f3f3c7] border border-[#267570] flex items-center justify-center">
          <i className={`${card.icon} text-[#0f4653] text-xl`}></i>
        </div>
        </div>
      ))}
     </div>

     <div className='flex flex-wrap items-start gap-6 mb-8 mt-6 w-full'>
     <div className="w-full lg:w-[65%] bg-white rounded-xl shadow-md p-6">

          <h1 className="text-lg font-semibold text-[#112e2d] ">Recent Bookings</h1>  
          <p className="text-[#2b5453]  text-sm mb-6">Latest customer bookings</p>
          
          { data.recentBookings.map((booking,index)=>(
         <div key={index} className="flex justify-between items-center py-4 border-b last:border-none">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                   <i className="fa-solid fa-file-lines text-[#0b3636]"></i>
                </div>

                <div>
                  <p className="font-medium text-[#0b3636]">{booking.car.model}</p>
                  <p className="text-xs text-[#0b3636] ">{booking.createdAt.split('T')[0]}</p>
                </div> 
               </div>
                 
         <div className="text-right">
           <p className="font-semibold text-[#0e4444] ">{currency}{booking.price}</p>
           <p className="text-sm text-[#2b5453]  ">{booking.status}</p>
         </div> 
      </div>
            
      ))}
      </div>
      <div className="w-full lg:w-[32%] bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
       <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
         <i className="fa-solid fa-wallet text-[#0f4653]"></i>Monthly Revenue</h1>
        <p className="text-gray-500 text-sm mt-1">Revenue for current month</p>
         <p className="text-2xl font-bold text-[#11292e] mt-6">{currency}{data.monthlyRevenue}</p>
    </div>
  </div>
        
  </div>
  )
}

export default Dashboard