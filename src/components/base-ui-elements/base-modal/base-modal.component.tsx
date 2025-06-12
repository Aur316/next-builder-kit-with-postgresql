'use client'

import { PropsWithChildren, useEffect } from 'react'

import { X } from 'lucide-react'

interface BaseModalProps {
  title?: string
  description?: string
  onClose: () => void
  open: boolean
  closeOnEscape?: boolean
}

type BaseModal = PropsWithChildren<BaseModalProps>

export function BaseModal({
  children,
  title,
  description,
  onClose,
  open,
  closeOnEscape,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <section className="mb-2 flex items-center justify-between gap-3">
          {title && (
            <h2 className="text-primary-midnight-blue-900 text-lg font-semibold">
              {title}
            </h2>
          )}
          <X
            onClick={onClose}
            className="text-primary-midnight-blue-500 hover:text-primary-midnight-blue-900 cursor-pointer transition-colors duration-200"
          />
        </section>
        {description && (
          <p className="text-primary-midnight-blue-600 mb-6 text-sm">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
