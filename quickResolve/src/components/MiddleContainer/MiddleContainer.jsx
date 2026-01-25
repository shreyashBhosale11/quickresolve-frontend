import React from 'react'

function MiddleContainer({children}) {
  return (
    <div className='bg-amber-400 h-[70%] text-white w-screen '>
        {children}
    </div>
  )
}

export default MiddleContainer