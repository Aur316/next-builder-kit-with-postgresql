import { InputHTMLAttributes, memo, useId } from 'react'

import { twMerge } from 'tailwind-merge'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: string
}

export const Checkbox = memo(function Checkbox({
  label,
  className,
  id,
  ...props
}: CheckboxProps) {
  const internalId = useId()
  const inputId = id ?? internalId

  return (
    <div className="form-control flex items-center gap-2">
      <label
        htmlFor={inputId}
        className="label text-primary-midnight-blue-600 cursor-pointer"
      >
        {label}
      </label>
      <input
        id={inputId}
        type="checkbox"
        className={twMerge('checkbox checkbox-info', className)}
        {...props}
      />
    </div>
  )
})
