'use client'

import {
  ForwardedRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useId,
} from 'react'

import { twMerge } from 'tailwind-merge'

type CommonProps = {
  containerClassName?: string
  label?: string
  labelPosition?: 'top' | 'bottom' | 'left' | 'right'
  labelClassName?: string
  inputClassName?: string
  req?: boolean
  isTextArea?: boolean
}

type InputProps = CommonProps &
  (
    | ({ isTextArea?: false } & InputHTMLAttributes<HTMLInputElement>)
    | ({ isTextArea: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  )

export const Input = forwardRef(function Input(
  {
    containerClassName,
    label,
    labelPosition = 'top',
    labelClassName,
    inputClassName,
    req,
    isTextArea,
    id,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
) {
  const internalId = useId()
  const inputId = id ?? internalId

  const isVertical = labelPosition === 'top' || labelPosition === 'bottom'
  const isLabelFirst = labelPosition === 'top' || labelPosition === 'left'

  const labelContent = label && (
    <label
      htmlFor={inputId}
      className={twMerge('cursor-pointer', labelClassName)}
    >
      {label}
      {req && (
        <span className="text-qfont-2 text-primary-purple-100 ml-0.5 align-super">
          *
        </span>
      )}
    </label>
  )

  return (
    <div
      className={twMerge(
        'flex gap-1',
        isVertical ? 'flex-col items-start' : 'flex-row items-center',
        containerClassName,
      )}
    >
      {isLabelFirst && labelContent}

      {isTextArea ? (
        <textarea
          id={inputId}
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          className={twMerge('px-3', inputClassName)}
          autoComplete={props.autoComplete ?? 'off'}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          aria-required={req}
        />
      ) : (
        <input
          id={inputId}
          ref={ref as ForwardedRef<HTMLInputElement>}
          className={twMerge('px-3', inputClassName)}
          autoComplete={props.autoComplete ?? 'off'}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          aria-required={req}
        />
      )}

      {!isLabelFirst && labelContent}
    </div>
  )
})
