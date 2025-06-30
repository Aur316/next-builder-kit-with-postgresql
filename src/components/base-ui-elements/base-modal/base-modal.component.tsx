'use client'

import { PropsWithChildren, useEffect } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { twMerge } from 'tailwind-merge'

import { IconWrapper } from '../icon-wrapper'

interface BaseModalProps {
  title?: string
  description?: string
  onClose: () => void
  open: boolean
  closeOnEscape?: boolean
  extraStyles?: string
}

type BaseModal = PropsWithChildren<BaseModalProps>

export function BaseModal({
  children,
  title,
  description,
  onClose,
  open,
  closeOnEscape,
  extraStyles,
}: BaseModal) {
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose, closeOnEscape])

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className={twMerge(
            'w-full max-w-md rounded-xl bg-white p-6 shadow-xl',
            extraStyles,
          )}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <section className="mb-2 flex items-center justify-between gap-3">
            {title && (
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            )}

            <IconWrapper Icon={X} onClick={onClose} size={20} />
          </section>
          {description && (
            <p className="text-primary-midnight-blue-600 mb-6 text-sm">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
