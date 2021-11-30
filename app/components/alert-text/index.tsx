export default function AlertText({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      className={`text-red-500 text-base ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </p>
  )
}
