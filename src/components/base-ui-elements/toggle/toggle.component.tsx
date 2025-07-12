import { InputHTMLAttributes, memo, useId } from 'react'

import { twMerge } from 'tailwind-merge'

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
  className?: string
}

export const Toggle = memo(function Toggle({
  text,
  className = 'toggle-primary',
  id,
  ...props
}: ToggleProps) {
  const internalId = useId()
  const inputId = id ?? internalId

  return (
    <div className="form-control flex items-center gap-2">
      <label
        htmlFor={inputId}
        className="label text-primary-midnight-blue-600 cursor-pointer"
      >
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
})
