'use client'

import { PropsWithChildren, useCallback, useEffect } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'
import { RemoveScroll } from 'react-remove-scroll'
import { twMerge } from 'tailwind-merge'

import { IconWrapper } from '../icon-wrapper'

interface BaseModalProps {
  title?: string
  description?: string
  onClose: () => void
  open: boolean
  closeOnEscape?: boolean
  extraStyles?: string
  closeOnClickOutside?: boolean
}

type BaseModal = PropsWithChildren<BaseModalProps>

export function BaseModal({
  children,
  title,
  description,
  onClose,
  open,
  closeOnEscape = true,
  extraStyles,
  closeOnClickOutside,
}: BaseModal) {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (!closeOnClickOutside) return
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [closeOnClickOutside, onClose],
  )

  useEffect(() => {
    if (!closeOnEscape || !open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, closeOnEscape, open])

  if (!open) return null

  return createPortal(
    <FocusLock returnFocus>
      <RemoveScroll>
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
            onClick={handleBackdropClick}
          >
            <motion.div
              className={twMerge(
                'w-full max-w-md rounded-xl bg-white p-6 focus:outline-none',
                extraStyles,
              )}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              tabIndex={-1}
            >
              <section className="mb-2 flex items-center justify-between gap-3">
                {title && (
                  <h1 className="text-lg font-semibold text-white">{title}</h1>
                )}

                <IconWrapper
                  Icon={X}
                  onClick={onClose}
                  size={20}
                  className="text-gray-500 transition-colors hover:text-gray-700"
                  aria-label="Close modal"
                />
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
      </RemoveScroll>
    </FocusLock>,
    document.body,
  )
}
