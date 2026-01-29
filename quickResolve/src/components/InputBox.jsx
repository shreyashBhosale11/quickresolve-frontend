import React, { useId } from 'react'


 const InputBox = React.forwardRef(function InputBox({
   label,
   type = "text",
   className = '',
   ...props
 } ,ref) {
  const id = useId();
   return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
          bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
          placeholder-gray-400 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          transition-colors duration-200 ${className}`}
        {...props}
      />
    </div>
   )
})

export default InputBox