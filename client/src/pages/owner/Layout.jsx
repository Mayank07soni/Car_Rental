import React, { useEffect } from 'react'
import NavbarOwner from "../../components/owner/Navbarowner"
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'


const Layout = () => {
  const {isOwner,navigate}=useAppContext();

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  
  return (
    <div>
      <NavbarOwner />
         <div style={{ display: 'flex' }}>
        <Sidebar />
         <div className="flex-1 p-5 bg-[#efeedd] ">

          {/* This is where Dashboard/AddCar/etc will appear */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
