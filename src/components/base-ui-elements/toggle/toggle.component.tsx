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
    <div className="form-control">
      <label htmlFor={inputId} className="label cursor-pointer gap-2">
        <span className="label-text">{text}</span>
        <input
          id={inputId}
          type="checkbox"
          className={twMerge('toggle', className)}
          {...props}
        />
      </label>
    </div>
  )
}
