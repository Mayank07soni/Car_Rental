import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'

const Navbar = ( ) => {
 
const {user,logout,isOwner,axios,setIsOwner,navigate}=useAppContext();
   
const location=useLocation()
const [open,setOpen]=useState(false);


  const changeRoleToOwner= async()=>{
    try{
     const {data}= await axios.post('/owner/change-role')
     if(data.success){
      setIsOwner(true)
      toast.success(data.message)
     }
     else{
      toast.error(data.message)
     }
    }
    catch(error){
     toast.error(error.message)
    }
  }

  const navlink = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "MyBooking", path: "/my-booking" },
  ];



  return (
    <div>
     <nav className="bg-[#0d4b50] text-white  shadow-md px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between relative">

        
        <div  className="flex items-center gap-2 cursor-pointer "> 
          <img src="https://images.hdqwalls.com/download/car-minimalism-simple-art-1920x1080.jpg" alt="Car Rental Logo" className="h-6 w-6 sm:w-10 sm:h-10 rounded-md object-cover cursor-pointer hover:scale-105 transition-transform duration-300" />
          <p className="text-[10px] sm:text-lg font-semibold tracking-wide font-['Outfit'] text-white hover:text-[#fdf9b3] transition-colors duration-200">Car Rental</p>
          </div>

      <div className="flex items-center text-[8px] sm:text-base  sm:gap-4 md:gap-6">


          {navlink.map((link) => (
            <div key={link.name} className="nav-item ">
              <Link to={link.path} className="text-[#f3eee5] font-medium hover:text-[#0d4b50] transition-colors duration-300 px-3 py-2 rounded-md hover:bg-[#f1ecd5]">{link.name}</Link>
            </div>
          ))}
        </div>

      


        <div className=" space-x-1 sm:space-x-3 sm:flex">
          
          <button onClick={() => {isOwner? navigate('/owner') : changeRoleToOwner()}} className="px-1 sm:px-4 py-1.5 sm:py-2 bg-[#f5ebd4] text-[#0d4b50] text-[8.5px] sm:text-base font-semibold rounded-md hover:bg-[#ebd8b0] border-[#083a3f] p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:p-8 ">{isOwner? 'Dashboard' : 'List Cars'}</button>
          
          <button onClick={() =>{ user? logout() : navigate("/login")}} className="px-1 sm:px-4 py-1.5 sm:py-2 bg-[#f5ebd4] text-[#0d4b50] text-[8.5px] sm:text-base font-semibold rounded-md hover:bg-[#ebd8b0] border-[#083a3f] p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:p-8"> {user? 'Logout' : 'Login'}</button>
        </div>
      </nav>

    </div>
  );
};

export default Navbar;
