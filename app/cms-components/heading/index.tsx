import React from 'react'

export function H1({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...props}>{children}</h1>
}

export function H2({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props}>{children}</h2>
}

export function H3({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props}>{children}</h3>
}

export function H4({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 {...props}>{children}</h4>
}
