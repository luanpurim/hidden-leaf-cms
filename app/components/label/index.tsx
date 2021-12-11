import React from 'react'

export default function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={`text-xs font-semibold text-gray-600 uppercase ${className}`}
    >
      {children}
    </label>
  )
}
