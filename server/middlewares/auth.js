import Joi from "joi";
import jwt from "jsonwebtoken";
import Usermodel from "../models/user.js";

export const signupValidation=(req,res,next)=>{
    const Schema=Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(10).required(),
    });
    const {error}=Schema.validate(req.body);
    if(error){
        return res.json({message:"BAD REQUEST",error: error.details[0].message})
    }
    next();
}
//login
export const LoginValidation=(req,res,next)=>{
    const Schema=Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(10).required(),
    });
    const {error}=Schema.validate(req.body);
    if(error){
        return res.json({message:"BAD REQUEST",error:error.details[0].message})
    }
    next();
}

//protect
export const protect =async (req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.json({success:false, message:"Not Authorized"})
    }
    try{
         const userid=jwt.decode(token,process.env.JWT_SECRET)
         if(!userid){
            return res.json({message:"Not Authorized",success:false})
         }
         req.user= await Usermodel.findById(userid).select("-password")
         next();
    }
    catch(error){
        return res.json({message:"Not Authorized",success:false})
    }
}
