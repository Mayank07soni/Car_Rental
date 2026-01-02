import Booking from "../models/Booking.js"
import Car from "../models/Car.js";
const checkAvailability= async (car,pickupDate,returnDate)=>{
 const bookings =await Booking.find({
    car,
    pickupDate: {$lte: returnDate},
    returnDate: {$gte: pickupDate},
 })
 return bookings.length===0;
}

export const checkAvailabilityOfCar = async (req , res)=>{
    try{
        const {location,pickupDate,returnDate}=req.body;
        const cars =await Car.find({location,isAvailable:true})
        
        const availableCarsPromise=cars.map(async(car)=>{
         const isAvailable = await checkAvailability(car._id,pickupDate,returnDate)
         return {...car._doc, isAvailable:isAvailable}
        })
        let availableCars = await Promise.all(availableCarsPromise);
        availableCars=availableCars.filter(car=>car.isAvailable===true)
        res.json({success:true, availableCars})
    }
    catch(error){
        res.json({message:error.message, success:false})
    }
}

//Api to create Booking
export const createBooking =async (req ,res)=>{
 try{
    const {_id}=req.user;
    const {car,pickupDate,returnDate}=req.body;

    const isAvailable=await checkAvailability(car,pickupDate,returnDate);
    if(!isAvailable){
        return res.json({message:"Car is not Available", success:false})
    }
    const carData =await Car.findById(car);
    const picked=new Date(pickupDate);
    const returned =new Date(returnDate);
    const noOfDays=Math.ceil((returned-picked)/(1000*60*60*24))
    const price= carData.pricePerDay * noOfDays

    await Booking.create({car,owner:carData.owner, user:_id, pickupDate, returnDate, price})
     
    res.json({success:true,message:"Booking Craeted"})
}
 catch(error){
 res.json({message:error.message, success:false})
 }
}

//Api to list user Booking 

export const getUserBooking =async (req ,res)=>{
 try{
   const {_id} =req.user;
   const booking = await Booking.find({user:_id}).populate('car').sort({createAt:-1})     
    res.json({success:true,booking})
}
 catch(error){
 res.json({message:error.message, success:false})
 }
}

//api to get owner booking 

export const getOwnerBooking =async (req ,res)=>{
 try{
    if(req.user.role!=="owner"){
        return res.json({success:false,message:"Not Authorized"})
    }

   const booking =await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt:-1}) 
    res.json({success:true,booking})
}
 catch(error){
 res.json({message:error.message, success:false})
 }
}

// Api to change the booking status
export const changeBookingStatus =async (req ,res)=>{
 try{
   const {_id} =req.user;
   const {bookingId,status}=req.body;
   const booking = await Booking.findById(bookingId)

   if(booking.owner.toString()!==_id.toString()){
    return res.json({success:false, message:"Unauthorized"})
   }
   booking.status=status;
   await booking.save();
  res.json({success:true,message:"Status Updated"})
}
 catch(error){
 res.json({message:error.message, success:false})
 }
}

export const deleteBooking= async(req,res)=>{
    
    try{
    const {_id}=req.user;
    const {bookingId}=req.body;
     const booking = await Booking.findById(bookingId);
     if(!booking){
        return res.json({success:false, message:"Booking not found"})
     }
     if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message:"Unauthorized"});
            }
     const today=new Date();
     const endDate=new Date(booking.returnDate);
     if(endDate>=today){
       return res.json({success:false, message:"Return Date Not passed yet"})
     }
         await Booking.findByIdAndDelete(bookingId);
          res.json({success: true, message: "Booking deleted successfully" });
    }
    catch(error){
    res.json({message:error.message, success:false})
 }
}


