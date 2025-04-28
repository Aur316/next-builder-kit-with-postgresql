import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge'

interface BaseButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  text?: string
  className?: string
}

export function BaseButton({
  children,
  text,
  className,
  ...props
}: BaseButtonProps) {
  const baseStyle = 'px-3 py-2'
  return (
    <button className={twMerge(baseStyle, className)} {...props}>
      {text}
      {children}
    </button>
  )
}
