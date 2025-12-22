import React from 'react'

const Title = (title ,subTitle) => {
  return (
    <div className="text-center mb-8"><h1 className="text-3xl md:text-4xl font-semibold text-gray-800">{title}</h1>
    <p className="text-gray-500 mt-2 text-sm md:text-base">{subTitle}</p>
     </div>
  )
}

export default Title