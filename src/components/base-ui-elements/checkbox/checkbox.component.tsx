import { InputHTMLAttributes, useId } from 'react'

import { twMerge } from 'tailwind-merge'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string
  className?: string
}

export const Checkbox = ({ text, className, id, ...props }: CheckboxProps) => {
  const internalId = useId()
  const inputId = id ?? internalId

  return (
    <div className="form-control">
      <label htmlFor={inputId} className="label cursor-pointer gap-2">
        <span className="label-text">{text}</span>
        <input
          id={inputId}
          type="checkbox"
          className={twMerge('checkbox checkbox-info', className)}
          {...props}
        />
      </label>
    </div>
  )
}
