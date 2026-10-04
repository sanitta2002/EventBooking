import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black placeholder:text-gray-500 focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
