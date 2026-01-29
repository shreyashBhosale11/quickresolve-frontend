import React from 'react'

function Button({text = "log in" ,   type = "button" ,...props}) {
  return (
    <>
   
    <button 
   
    type= {type} 
    // className="text-fg-brand !border-amber-50 !bg-transparent   bg-neutral-primary border border-brand hover:bg-brand hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 !rounded-full text-sm px-4 py-2.5 focus:outline-none"
    className="rounded-md  !bg-blue-600 px-4 py-2 text-sm font-medium  !text-white hover:bg-blue-700"
    {...props} >
    {text}</button>
   </>
  )
}

export default Button