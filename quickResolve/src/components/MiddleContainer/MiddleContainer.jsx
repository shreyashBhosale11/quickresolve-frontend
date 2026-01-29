import React from 'react'

function MiddleContainer({children}) {
  return (
    <main className="min-h-screen bg-gray-50 pt-16 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
        {children}
      </div>
    </main>
  )
}

export default MiddleContainer