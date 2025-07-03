'use client'

import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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
  const modalRef = useRef<HTMLDivElement>(null)

  const escape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

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

    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [escape, closeOnEscape, open])

  if (!open) return null

  return (
    <FocusLock returnFocus>
      <RemoveScroll>
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
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
              ref={modalRef}
              className={twMerge(
                'w-full max-w-md rounded-xl bg-white p-6 shadow-xl focus:outline-none',
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
                  <h2
                    id="modal-title"
                    className="text-lg font-semibold text-gray-900"
                  >
                    {title}
                  </h2>
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
                <p
                  id="modal-description"
                  className="mb-6 text-sm text-gray-600"
                >
                  {description}
                </p>
              )}
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </RemoveScroll>
    </FocusLock>
  )
}
