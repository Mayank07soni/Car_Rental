import React,{useState} from 'react'
import {useLocation, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
 
  const{ user , axios, fetchUser, navigate} = useAppContext();
  const location=useLocation();
  const[image,setImage]=useState('')

  const updateImage =async()=>{
    try{
      const formData= new FormData()
      formData.append('image',image)

       const{data}=await axios.post('/owner/update-image',formData)
       
       if(data.success){
        fetchUser();
        toast.success(data.message);
        setImage('')
       }
       else{
        toast.error(data.message)
       }

    }
   
    catch(error){
      toast.error(error.message)
    }
  }
  
const DEFAULT_ICON =
  "https://cdn-icons-png.flaticon.com/512/1828/1828479.png";

    const ownerMenuLinks=[
    {name:"Dashboard" , path: "/owner" ,icon:"fa-solid fa-gauge",coloredIcon:"fa-solid fa-gauge-high"},
    {name:"Add Car" , path: "/owner/add-car" ,icon:"fa-solid fa-car-side",coloredIcon:"fa-solid fa-car-side"},
    {name:"Manage Car" , path: "/owner/manage-car" ,icon:"fa-solid fa-car-rear",coloredIcon:"fa-solid fa-car-rear"},
    {name:"Manage Booking" , path: "/owner/manage-booking-car" ,icon:"fa-solid fa-clipboard-list",coloredIcon:"fa-solid fa-clipboard-check"},
  ];

  return (
    <div className="w-23 sm:w-45  md:w-60 bg-white shadow-lg h-auto md:h-screen p-4 md:p-6 flex flex-col items-center border-r border-gray-200">
      

      <div className="mb-6 flex flex-col items-center">
        <label htmlFor="image" className="relative cursor-pointer group">
          {/* Profile Image */}
          <img
            src={image ? URL.createObjectURL(image) : user?.image} 
            alt="Profile"
            onError={(e) => { e.target.src = "https://th.bing.com/th?q=Profile+Person+Icon+No+Background&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.1&pid=InlineBlock&rm=3&ucfimg=1&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247";}}
           className="w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#185156] shadow-sm group-hover:opacity-80 transition-all duration-300"
          />
      
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden onChange={e=>setImage(e.target.files[0])} 
          />
          
          <div className="absolute inset-0 border-2 border-[#185156]  flex items-center justify-center rounded-full bg-[#ffff] opacity-1 group-hover:opacity-100 transition-all duration-300">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png" alt="Upload" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </label>
      </div>
       
       {image && (
        <button onClick={updateImage}className="mt-1 flex items-center px-4 py-1.5 sm:px-5 sm:py-2 bg-[#185156] text-white text-sm font-medium rounded-3xl shadow-sm hover:bg-[#0f3f42] transition-all duration-300">
           Save 
        </button>
       )}

     <p className="text-xs md:text-lg font-semibold text-[#0f2f2a] mb-4 md:mb-6 text-center ">
       {user?.name}
      </p>

  
      <div className="w-full space-y-1">

        {ownerMenuLinks.map((link,index)=>(
            <NavLink key={index} to={link.path} 
            className={`flex items-center gap-1 sm:gap-2 md:gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${link.path===location.pathname ? "bg-[#163e3d] text-white font-semibold" : "text-[#163e3d] font-medium border border-transparent hover:bg-[#fcfae2] hover:border-[#163e3d] transition-all duration-300"} `}>
              <i className={`${link.path === location.pathname ? link.coloredIcon: link.icon } text-[7px] sm:text-xs md:text-lg`}></i>
              <span  className="text-[7px] sm:text-xs md:text-lg">{link.name}</span>
              
            </NavLink>
        ))}
         <div  onClick={() =>{ navigate("/")}} className="flex items-center gap-1 sm:gap-2 md:gap-3  p-2 rounded-lg border border-transparent hover:bg-[#fcfae2]  cursor-pointer hover:border-[#163e3d] transition-all duration-300">
           <i className="fa-solid fa-house text-[#163e3d] text-[7px] sm:text-xs md:text-lg"></i>
          <span className="text-[#163e3d] font-medium text-[7px] sm:text-xs md:text-lg">Home</span>
        </div>
         <div  onClick={() =>{ navigate("/my-booking")}}className="flex items-center gap-1 sm:gap-2 md:gap-3  p-2 rounded-lg border border-transparent hover:bg-[#fcfae2]  cursor-pointer hover:border-[#163e3d] transition-all duration-300">
          <i className="fa-solid fa-bookmark text-[#163e3d] text-[7px] sm:text-xs md:text-lg"></i>
         <span className="text-[#163e3d] font-medium  text-[7px] sm:text-xs md:text-lg">My Bookings</span>
        </div>
        <div onClick={() =>{ navigate("/login")}} className="flex items-center gap-1 sm:gap-2 md:gap-3  p-2 rounded-lg border border-transparent hover:bg-[#fcfae2]  cursor-pointer hover:border-[#163e3d] transition-all duration-300">
          <i className="fa-solid fa-right-from-bracket text-[#163e3d] text-[7px] sm:text-xs md:text-lg"></i>
          <span className="text-[#163e3d] font-medium text-[7px] sm:text-xs md:text-lg">Logout</span>
        </div>
      </div>

    </div>
  )
}

export default Sidebar
