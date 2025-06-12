import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { LucideIcon } from 'lucide-react'

interface IconWrapperProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  Icon: LucideIcon
  size?: number
}
export function IconWrapper({ Icon, size = 16, ...props }: IconWrapperProps) {
  return (
    <button
      className="group flex cursor-pointer items-center justify-center p-1"
      {...props}
    >
      <Icon
        size={size}
        className="group-hover:text-primary-midnight-blue-500 transition-colors duration-200"
      />
    </button>
  )
}
