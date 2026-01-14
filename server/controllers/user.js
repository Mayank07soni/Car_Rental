import Usermodel from '../models/user.js'; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Car from '../models/Car.js';

const generateToken = (userId)=>{
    const payload=userId;
   return  jwt.sign(payload,process.env.JWT_SECRET)
}

// registration
export const registeruser= async (req, res)=>{

    try{
        const { name,email,password,role,phone_no}=req.body;

        if(!name || !email || ! password ){
            return res.json({message:"Fill all the fields", success: false})
        }
        if(role==="owner" && !phone_no){
            return res.json({message:"Phone number required", success: false})
        }
        const userexist =await Usermodel.findOne({email});
        if(userexist){
            return res.json({message:"User already exist", success: false})
        }
          const hashpassword= await bcrypt.hash(password,10);
          const user= await Usermodel.create({name,email,password: hashpassword,role:role||"user",phone_no:role=="owner"?phone_no:undefined})
           const token=generateToken(user._id.toString())
           res.json({success: true,token})
        }
    catch(error){
     return res.json({message:"Server Error !", success:false})
    }
};

//login user
export const loginuser =async (req,res)=>{
    try{
          const{email,password}=req.body;
          const user =await Usermodel.findOne({email});
          if(!user){
             return res.json({message:"User Not Found", success:false})
          }
          const ispass=await bcrypt.compare(password,user.password);
          
          if(!ispass){
            return res.json({message:"Invalid Password", success:false})
          }

          const token=generateToken(user._id.toString())
          res.json({success:true,token})
    }
    catch(error){
       return res.json({message:"Server Error !", success:false})
    }
}
// get user data
export const getUserData =async (req,res)=>{
    try{
            const {user}=req;
            res.json({success:true,user})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}
// get car data
export const getCars =async(req,res)=>{
    try{
     const cars= await Car.find({isAvailable:true})
     res.json({success:true, cars}) 
    }
    catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}