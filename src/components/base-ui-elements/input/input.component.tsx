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
  isTextArea?: boolean
  maxTextareaSize?: number
  legend?: string
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
    isTextArea,
    id,
    maxTextareaSize = 100,
    legend,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
) {
  const internalId = useId()
  const inputId = id ?? internalId

  const isVertical = labelPosition === 'top' || labelPosition === 'bottom'
  const isLabelFirst = labelPosition === 'top' || labelPosition === 'left'

  const baseStyle = 'px-3 outline-none focus:border-primary-midnight-blue-800'
  const baseFieldsetStyle = twMerge(
    'border-primary-midnight-blue-700 block rounded-lg border border-solid p-2',
    legend && 'pt-0.5',
  )

  const labelContent = label && !legend && (
    <label
      htmlFor={inputId}
      className={twMerge('cursor-pointer', labelClassName)}
    >
      {label}
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
      {isLabelFirst && !legend && labelContent}

      {isTextArea ? (
        <fieldset className={twMerge(legend && !label && baseFieldsetStyle)}>
          {legend && !label && (
            <legend className="isolate block p-0.5">{legend}</legend>
          )}
          <textarea
            id={inputId}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            className={twMerge(baseStyle, !legend && inputClassName)}
            autoComplete={props.autoComplete ?? 'off'}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            onInput={(e) => {
              const el = e.currentTarget
              el.style.height = 'auto'
              el.style.height =
                Math.min(el.scrollHeight, maxTextareaSize) + 'px'
            }}
          />
        </fieldset>
      ) : (
        <fieldset className={twMerge(legend && !label && baseFieldsetStyle)}>
          {legend && !label && (
            <legend className="isolate block p-0.5">{legend}</legend>
          )}
          <input
            id={inputId}
            ref={ref as ForwardedRef<HTMLInputElement>}
            className={twMerge(baseStyle, !legend && inputClassName)}
            autoComplete={props.autoComplete ?? 'off'}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        </fieldset>
      )}

      {!isLabelFirst && !legend && labelContent}
    </div>
  )
})
