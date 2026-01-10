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

return (
   <div className="min-h-screen bg-[#efeedd] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  {/* Header Section */}
  <div className="mx-auto max-w-4xl">
    <Title title="Reviews" />
    
    <div className="mt-4 sm:mt-6">
      <p className="text-center text-sm font-semibold text-[#0d4b50] sm:text-base">
        What our <span className="text-[#FF532E]">{reviews.length}</span> customers say
      </p>
      <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-[#FF532E]"></div>
    </div>
  </div>

  {/* Reviews Container */}
  <div className="mx-auto mt-8 max-w-4xl space-y-6 sm:mt-10">
    {reviews.length === 0 ? (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <p className="text-gray-500">No reviews yet</p>
      </div>
    ) : (
      reviews.map((review) => (
        <div
          key={review._id}
          className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:p-8"
        >
          {/* User Name */}
          <div className="mb-3">
            <p className="text-center text-sm font-semibold text-[#0d4b50] sm:text-base">
              {review.user.name}
            </p>
          </div>

          {/* Rating Stars */}
          <div className="mb-5 flex justify-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-6 w-6 transition-transform duration-200 group-hover:scale-110 sm:h-7 sm:w-7"
                viewBox="0 0 22 20"
              >
                <path
                  d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                  fill={i < review.rating ? "#FF532E" : "#E5E7EB"}
                />
              </svg>
            ))}
          </div>

          {/* Review Comment */}
          <div className="mb-6">
            <p className="mx-auto max-w-2xl rounded-2xl border border-[#0d4b50]/20 bg-gray-50 px-6 py-5 text-center text-xs leading-relaxed text-gray-700 shadow-sm sm:text-sm md:text-base">
              {review.comment || "No comment provided"}
            </p>
          </div>

          {/* Delete Button - Only for review owner */}
          {review.user._id === user._id && (
            <div className="flex justify-center">
              <button
                onClick={() => deleteReview(review._id)}
                className="group/btn inline-flex items-center gap-2.5 rounded-lg bg-[#123736] px-6 py-2.5 text-xs font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:shadow-lg sm:px-8 sm:text-sm"
              >
                <i className="fa-solid fa-trash text-xs transition-transform duration-300 group-hover/btn:rotate-12 sm:text-sm" title="Delete Review"></i>
                Delete Review
              </button>
            </div>
          )}
        </div>
      ))
    )}
  </div>
</div>
  )}

export default Review