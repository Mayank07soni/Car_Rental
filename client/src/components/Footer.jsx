import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#072c2f] text-[#fbf6e8] px-6 pt-10 md:px-16 lg:px-36 w-full">
  
      <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-700 pb-10">
     
        <div className="md:max-w-sm">
          <h1 className="text-xl font-semibold text-white">Car Rental</h1>
          <p className="mt-4 text-sm leading-relaxed  text-[#f5f2dd]">
            CarRental makes booking and listing cars simple, secure, and reliable.
         Explore a wide range of vehicles, enjoy transparent pricing, and experience smooth rentals backed by verified owners and secure payments.
          </p>
          
          
        </div>

   
        <div className="flex-1 flex flex-wrap md:justify-end gap-10 md:gap-24">
         
          <div>
            <h2 className="text-white font-semibold mb-4 text-lg">Company</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="/#/reviews" className="hover:text-white transition-colors duration-200">Reviews</a></li>
              <li><a href="/#/contact-us" className="hover:text-white transition-colors duration-200">Contact us</a></li>
              <li><a href="/#/about-us" className="hover:text-white transition-colors duration-200">About Us</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold mb-4 text-lg">Get in touch</h2>
            <div className="space-y-2 text-sm text-[#faf9ea]">
              <p> +91 96444 80966</p>
              <p>car_rental@gmail.com</p>
            </div>
          </div>
        </div>
      </div>


      <p className="text-center text-sm text-[#f9f6d1] mt-6 pb-6">
        © {new Date().getFullYear()} <span className="text-blue-500 font-medium hover:underline cursor-pointer">Car Renatal</span>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
