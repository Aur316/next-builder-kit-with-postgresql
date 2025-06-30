'use client'

import { PropsWithChildren, SelectHTMLAttributes, useId } from 'react'

import { twMerge } from 'tailwind-merge'

interface DropdownProps
  extends PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>> {
  id?: string
  options: Array<{ value: string; label: string }>
  label?: string
  placeholder?: string
  nestedOption?: string
  setSelectedItem?: (value: string) => void
  labelClassName?: string
  selectClassName?: string
  optionClassName?: string
}

export const Dropdown = ({
  id,
  options,
  label,
  placeholder = 'Select...',
  nestedOption,
  setSelectedItem,
  labelClassName,
  selectClassName,
  optionClassName,
  ...props
}: DropdownProps) => {
  const internalId = useId()
  const dropDownId = id ?? internalId

  const baseStyle =
    'w-full rounded-md border px-3 py-2 text-sm text-white focus:outline-none'
  const baseColors =
    'border-primary-midnight-blue-700 bg-primary-midnight-blue-900'
  const baseOptionClassName =
    'hover:bg-primary-midnight-blue-700 cursor-pointer rounded px-3 py-2 text-sm text-white'

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
      {label && (
        <label
          htmlFor={`dropdown-${dropDownId}`}
          className={twMerge(
            'cursor-pointer text-sm text-white',
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <fieldset>
        <select
          id={`dropdown-${dropDownId}`}
          value={props.value}
          onChange={(event) => {
            setSelectedItem?.(event.target.value)
          }}
          className={twMerge(
            baseStyle,
            baseColors,
            'flex cursor-pointer items-center justify-between',
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
            <optgroup className="mt-6" label={nestedOption}>
              {renderOptions()}
            </optgroup>
          ) : (
            renderOptions()
          )}
        </select>
      </fieldset>
    </div>
  )
}
