import React ,{useState} from 'react'
import Title from './Title'
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const Testimonial = ({ onReviewAdded}) => {
   
  const {axios,navigate}=useAppContext();

   const [rating, setRating]=useState(0);
   const [comment, setComment]=useState("");

   const onSubmitHandler=async (e)=>{
    e.preventDefault();
    if(!rating){
     toast.error("Please select a rating");
     return;
    }
     try{
      const {data} = await axios.post('/review/add-review',{rating,comment});
      if(data.success){
        toast.success(data.message);

      if(onReviewAdded){
        onReviewAdded(data.review)}

        setRating(0);
        setComment("");

     }
     else{
      toast.error(data.message);
     }
   }
   catch(error){
     toast.error(error.message);
   }
  }

  return (
    <div className="bg-[#efeedd] py-8 sm:py-10 px-3 sm:px-4">
      <Title title="Add Your Review"/>
      
    <form onSubmit={onSubmitHandler}
      className="bg-[#ffffff] p-4 sm:p-6 rounded-xl shadow-md max-w-sm sm:max-w-md mx-auto mt-5 sm:mt-6  border border-[#d2bdbd]">
      
      <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            onClick={() => setRating(i + 1)}
            className="cursor-pointer transition-transform duration-200 hover:scale-110"
            width="22"
            height="22"
            viewBox="0 0 22 20"
          >
            <path
              d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
              fill={i < rating ? "#FF532E" : "#E5E7EB"}
            />
          </svg>
        ))}
      </div>

      
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
         className=" w-full  border border-[#1f3e38] rounded-lg  p-2.5 sm:p-3 text-xs sm:text-sm mb-4 sm:mb-5 focus:outline-none  focus:ring-2  focus:ring-[#0d4b50] resize-none"
    />

      <button
        type="submit"
       className="w-30 h-10 sm:h-11 bg-[#0d4b50] text-white text-xs sm:text-sm rounded-lg font-medium hover:bg-[#0b3f43] transition disabled:opacity-60 mx-auto block">
           Submit
      </button>
    </form>
    </div>  

  );
};

export default Testimonial;