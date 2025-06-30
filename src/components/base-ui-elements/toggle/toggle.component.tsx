import { InputHTMLAttributes, useId } from 'react'

import { twMerge } from 'tailwind-merge'

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
  className?: string
}

export const Toggle = ({
  text,
  className = 'toggle-primary',
  id,
  ...props
}: ToggleProps) => {
  const internalId = useId()
  const inputId = id ?? internalId

  return (
    <div className="form-control flex items-center gap-2">
      <label htmlFor={inputId} className="label cursor-pointer">
        {text}
      </label>
      <input
        id={inputId}
        type="checkbox"
        className={twMerge('toggle', className)}
        {...props}
      />
    </div>
  )
}
