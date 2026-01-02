import React from 'react';
import Title from './Title';

const ContactUs=()=>{
return (
     <div className="min-h-screen bg-[#efeedd] px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
        <Title title="Contact Us"/>
       <div  className="mt-6 flex flex-col items-center text-center text-[#5c5a3d] text-lg font-medium">
       <p>Email: car_rental@email.com</p>
       <p>Phone no: +91 9644480966</p>
       </div>
        
     </div>
)
}
export default ContactUs;