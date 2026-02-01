import React, { useId } from "react"

const Select = React.forwardRef(function Select(
  { label, options = [], className = "", ...props },
  ref
) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label
  htmlFor={id}
  className="block mb-1 text-left text-sm font-medium text-neutral-700"
>
  {label}
</label>

      )}

      <select
        id={id}
        ref={ref}
        className={`
          w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2
          text-neutral-900
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select
