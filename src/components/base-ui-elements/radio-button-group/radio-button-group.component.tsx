'use client'

import { InputHTMLAttributes } from 'react'

import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { RadioButton } from '../radio-button'

interface RadioOption {
  label: string
  value: string
}

interface RadioButtonGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  options: Array<RadioOption>
  extraRadioButtonGroupClassName?: string
  extraSimpleRadioClassName?: string
  label: string
}

export function RadioButtonGroup({
  options,
  extraSimpleRadioClassName,
  extraRadioButtonGroupClassName,
  label,
  ...props
}: RadioButtonGroupProps) {
  const { t } = useTranslation()

  return (
    <fieldset
      className={twMerge(
        'flex w-full flex-col',
        extraRadioButtonGroupClassName,
      )}
    >
      {label && (
        <legend className="mb-1.5 text-sm font-semibold">{t(label)}</legend>
      )}
      <div
        className={twMerge(
          'flex w-full flex-col gap-1',
          extraRadioButtonGroupClassName,
        )}
      >
        {options.map((option) => (
          <RadioButton
            key={option.value}
            extraSimpleRadioClassName={extraSimpleRadioClassName}
            {...props}
            value={option.value}
            checked={props.value === option.value}
            label={t(option.label)}
          />
        ))}
      </div>
    </fieldset>
  )
}
