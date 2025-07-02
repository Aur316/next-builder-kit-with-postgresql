import { InputHTMLAttributes, useId } from 'react'

import { twMerge } from 'tailwind-merge'

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  extraSimpleRadioClassName?: string
}
export function RadioButton({
  label,
  extraSimpleRadioClassName,
  ...props
}: RadioButtonProps) {
  const internalId = useId()
  const id = props.id || internalId

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {label && (
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
      )}
      <input
        id={id}
        type="radio"
        className={twMerge(
          'radio radio-info radio-sm',
          extraSimpleRadioClassName,
        )}
        {...props}
      />
    </div>
  )
}
