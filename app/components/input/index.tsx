import React from 'react'

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 ${className}`}
    />
  )
}
