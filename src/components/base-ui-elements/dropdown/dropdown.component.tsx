'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface DropdownProps {
  value?: string
  onValueChange?: (value: string) => void
  options: Array<{ value: string; label: string }>
  label?: string
  placeholder?: string
  labelClassName?: string
  triggerClassName?: string
  pickClassName?: string
  optionClassName?: string
  placeholderColor?: string
}

export const Dropdown = ({
  value,
  onValueChange,
  options,
  label,
  placeholder = 'Select...',
  labelClassName,
  triggerClassName,
  pickClassName,
  optionClassName,
  placeholderColor = 'text-gray-400',
}: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? placeholder

  const baseStyle =
    'w-full rounded-md border px-3 py-2 text-sm text-white focus:outline-none'
  const baseColors =
    'border-primary-midnight-blue-700 bg-primary-midnight-blue-900'
  const baseOptionClassName =
    'hover:bg-primary-midnight-blue-700 cursor-pointer rounded px-3 py-2 text-sm text-white'

  return (
    <div className="relative flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={`dropdown-${label}`}
          className={twMerge(
            'cursor-pointer text-sm text-white',
            labelClassName,
          )}
        >
          {label}
        </label>
      )}

      <button
        type="button"
        id={`dropdown-${label}`}
        onClick={() => setOpen((prev) => !prev)}
        className={twMerge(
          baseStyle,
          baseColors,
          'flex cursor-pointer items-center justify-between',
          triggerClassName,
        )}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={twMerge(
            'ml-2 h-4 w-4 transition-transform duration-200',
            open ? 'rotate-180' : '',
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: -2 },
              visible: {
                opacity: 1,
                y: 4,
                transition: { duration: 0.35, staggerChildren: 0.05 },
              },
            }}
            className={twMerge(
              'absolute top-full left-0 z-50 mt-1 w-full',
              baseStyle,
              baseColors,
              pickClassName,
            )}
          >
            {placeholder && (
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: -2 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={twMerge(
                  placeholderColor,
                  'px-3 py-2 text-sm select-none',
                )}
              >
                {placeholder}
              </motion.li>
            )}
            {options.map((option) => (
              <motion.li
                key={option.value}
                variants={{
                  hidden: { opacity: 0, y: -2 },
                  visible: { opacity: 1, y: 0 },
                }}
                onClick={() => {
                  onValueChange?.(option.value)
                  setOpen(false)
                }}
                className={twMerge(baseOptionClassName, optionClassName)}
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
