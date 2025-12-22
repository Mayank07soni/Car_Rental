import mongoose from "mongoose"

const ReviewModel = new mongoose.Schema({
 user:{
    type: mongoose.Schema.Types.ObjectId,ref:"User", required:true},

 rating:{
    type:Number, min:1,max:5,required:true},
 comment:{
     type: String, required:true},
   
},{timestamps:true})
const Review = mongoose.model('Review',ReviewModel)
export default Review;