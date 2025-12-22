import React from 'react'

const Title = ({title,subTitle,align}) => {
  return (
    <div className="text-center space-y-2">
   <h1 className="text-base sm:text-xl md:text-2xl font-bold text-[#0d4b50]">{title}</h1>
   <p className="text-[10px] sm:text-base md:text-lg text-[#12646a] max-w-2xl mx-auto">{subTitle}</p>
    </div>
  )
}

export default Title