import React,{useState,useEffect} from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import Title from '../components/Title';

const Review = () => {

  const {reviews,setReviews,axios,navigate,user}=useAppContext();

  const getReview =async()=>{
    try{
      const {data}=await axios.get("/review/get-review")
    
      if(data.success){
        setReviews(data.reviews);
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
      return;
    }
  }


  const deleteReview =async(reviewId)=>{
    try{
      const confirm=window.confirm('Are you sure you want to delete this review?')
      if(!confirm){
        return null
      }
      const {data} =await axios.post("/review/delete-review",{reviewId});
      
      if(data.success){
        toast.success(data.message);
        getReview();
      }
      else{
         toast.error(data.message);
      }
    }
    catch(error){
       toast.error(error.message);
    }
  }

useEffect(()=>{
   if (!user) return;
  getReview();
},[user]);


return(
<div className="bg-[#efeedd] min-h-screen py-8 sm:py-12 px-3 sm:px-6">
  <Title title=" Reviews"/>
        <div className="text-center mt-3 sm:mt-4 text-sm sm:text-base text-[#0d4b50] font-medium">What our {reviews.length} customers say</div>
  <div className="max-w-sm sm:max-w-md mx-auto mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
   
    {
      reviews.map((review) => (
        <div key={review._id} className="flex flex-col items-center">
          
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="20"
                height="20"
                viewBox="0 0 22 20"
              >
                <path
                  d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                  fill={i < review.rating ? "#FF532E" : "#E5E7EB"}
                />
              </svg>
            ))} 
            
          </div>
         
          <p className="text-gray-700 border border-solid border-black px-5 py-3 rounded-2xl text-[10px] sm:text-sm text-center mb-6 leading-relaxed">
            {review.comment || "No comment provided"}
          </p>
        

{review.user._id===user._id &&(
          <button
            onClick={()=>deleteReview(review._id)}
            className=" w-27 sm:w-48 h-10 bg-[#123736] mb-10 text-white rounded-lg text-[10px] sm:text-sm font-medium hover:bg-red-500 transition mx-auto">
              <i className="px-1.5 sm:px-5 fa-solid fa-trash transition text-[10px] sm:text-base" title="Delete Car"></i>
            Delete Review
          </button>
          
)  }
        
        </div>
      ))
  }
  </div>
</div>

) }

export default Review