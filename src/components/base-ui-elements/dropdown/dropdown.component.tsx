'use client'

import { PropsWithChildren, SelectHTMLAttributes, useId } from 'react'

import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

interface DropdownProps
  extends PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>> {
  id?: string
  options: Array<{ value: string; label: string }>
  label?: string
  legend?: string
  placeholder?: string
  nestedOption?: string
  labelClassName?: string
  selectClassName?: string
  optionClassName?: string
}

export const Dropdown = ({
  id,
  options,
  label,
  legend,
  placeholder = 'Select...',
  nestedOption,
  labelClassName,
  selectClassName,
  optionClassName,
  ...props
}: DropdownProps) => {
  const internalId = useId()
  const dropDownId = id ?? internalId
  const { t } = useTranslation()

  if (legend && label) {
    throw new Error(t('componentErrors.legendAndLabel'))
  }

  const baseStyle =
    'w-full rounded-md border px-3 py-2 text-sm text-white focus:outline-none'
  const baseColors =
    'border-primary-midnight-blue-700 bg-primary-midnight-blue-900 hover:border-primary-midnight-blue-600'
  const baseOptionClassName =
    'hover:bg-primary-midnight-blue-700 cursor-pointer rounded px-3 py-2 text-sm text-white'
  const baseFieldsetStyle = twMerge(
    'border-primary-midnight-blue-700 block rounded-lg border border-solid p-2',
    legend && 'pt-0.5',
  )

  const renderOptions = () => {
    return options.map((option) => (
      <option
        key={option.value}
        value={option.value}
        className={twMerge(baseOptionClassName, optionClassName)}
      >
        {option.label}
      </option>
    ))
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <fieldset className={twMerge(legend && !label && baseFieldsetStyle)}>
        {legend && !label ? (
          <legend className="isolate block p-0.5">{legend}</legend>
        ) : (
          <label
            htmlFor={dropDownId}
            className={twMerge('cursor-pointer text-white', labelClassName)}
          >
            {label}
          </label>
        )}
        <select
          id={dropDownId}
          value={props.value}
          className={twMerge(
            'w-full outline-none',
            !legend && baseStyle,
            !legend && baseColors,
            !legend && 'flex cursor-pointer items-center justify-between',
            selectClassName,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {nestedOption ? (
            <optgroup label={nestedOption}>{renderOptions()}</optgroup>
          ) : (
            renderOptions()
          )}
        </select>
      </fieldset>
    </div>
  )
}
