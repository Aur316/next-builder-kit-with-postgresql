'use client'

import {
  ForwardedRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useId,
} from 'react'

import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  if (legend && label) {
    throw new Error(t('componentErrors.legendAndLabel'))
  }

  const isVertical = labelPosition === 'top' || labelPosition === 'bottom'
  const isLabelFirst = labelPosition === 'top' || labelPosition === 'left'

  const borderStyle =
    'outline-none border border-primary-midnight-blue-700 focus:border-primary-midnight-blue-800 hover:border-primary-midnight-blue-600'

  const baseStyle = twMerge(
    'px-3 outline-none rounded-lg placeholder:text-primary-midnight-blue-700 text-white',
    !legend && 'py-1',
  )

  const baseFieldsetStyle = twMerge(
    'block rounded-lg border p-2',
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
        'flex w-full gap-1',
        isVertical ? 'flex-col items-start' : 'flex-row items-center',
        containerClassName,
      )}
    >
      {isLabelFirst && !legend && labelContent}

      <fieldset
        className={twMerge(
          legend && !label && [baseFieldsetStyle, borderStyle],
        )}
      >
        {legend && !label && (
          <legend className="isolate block p-0.5 text-white">{legend}</legend>
        )}
        {isTextArea ? (
          <textarea
            id={inputId}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            className={twMerge(
              baseStyle,
              !legend && [inputClassName, borderStyle],
            )}
            autoComplete={props.autoComplete ?? 'off'}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            onInput={(e) => {
              const el = e.currentTarget
              el.style.height = 'auto'
              el.style.height =
                Math.min(el.scrollHeight, maxTextareaSize) + 'px'
            }}
          />
        ) : (
          <input
            id={inputId}
            ref={ref as ForwardedRef<HTMLInputElement>}
            className={twMerge(
              baseStyle,
              !legend && [inputClassName, borderStyle],
            )}
            autoComplete={props.autoComplete ?? 'off'}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </fieldset>

      {!isLabelFirst && !legend && labelContent}
    </div>
  )
})
