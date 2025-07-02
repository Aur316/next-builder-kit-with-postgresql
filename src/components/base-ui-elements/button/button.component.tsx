import {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef,
} from 'react'

import { twJoin } from 'tailwind-merge'

interface BaseButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'primary' | 'secondary'
  text?: string
  size?: 'xl' | 'lg' | 'md' | 'sm'
  disabled?: boolean
  className?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  isConfirmSignaling?: boolean
  loading?: boolean
}

const typeClasses = {
  primary: [
    'bg-primary-midnight-blue-900',
    'text-white',
    'hover:bg-primary-midnight-blue-900',
    'active:bg-primary-midnight-blue-800',
  ],
  secondary: [
    'bg-white',
    'text-primary-midnight-blue-800',
    'hover:border-primary-midnight-blue-100',
    'hover:bg-primary-midnight-blue-400',
    'active:bg-primary-midnight-blue-200',
    'active:border-primary-midnight-blue-800',
  ],
}

const sizeClasses = {
  xl: 'px-6 py-4 text-lg h-14',
  lg: 'px-6 py-3.5 text-sm h-12',
  md: 'px-6 py-3.5 text-sm h-10',
  sm: 'px-4 py-2.5 text-xs h-8',
}

const disabledClasses = [
  'border-primary-midnight-blue-400',
  'bg-primary-midnight-blue-400',
  'text-primary-midnight-blue-600',
  'pointer-events-none',
]

export const Button = forwardRef<HTMLButtonElement, BaseButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      className,
      icon,
      iconPosition,
      isConfirmSignaling,
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) {
    const isLoadingOrDisabled = disabled || loading

    const buttonClasses = twJoin(
      'flex gap-2 items-center w-full justify-center rounded-2xl font-medium transition-colors duration-300 ease-in-out tracking-wider cursor-pointer',
      isConfirmSignaling
        ? 'pointer-events-none bg-secondary-ghaf-green-800'
        : null,
      sizeClasses[size],
      ...(isLoadingOrDisabled ? disabledClasses : typeClasses[variant]),
      className,
    )

    return (
      <button
        {...props}
        className={buttonClasses}
        aria-disabled={isLoadingOrDisabled}
        disabled={isLoadingOrDisabled}
        ref={ref}
      >
        {!loading ? (
          <>
            {iconPosition === 'left' && icon}
            {children}
            {iconPosition === 'right' && icon}
          </>
        ) : (
          <Loader />
        )}
      </button>
    )
  },
)

const Loader = () => {
  return (
    <div className="flex justify-center">
      <svg
        className="h-5 w-5 animate-spin text-white"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}
