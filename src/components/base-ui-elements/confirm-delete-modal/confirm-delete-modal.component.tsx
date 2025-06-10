'use client'

import { useEffect } from 'react'

import { X } from 'lucide-react'

import { Button } from '../button'

type ConfirmDeleteModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText: string
  cancelText: string
  pending: boolean
}

export const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  pending,
}: ConfirmDeleteModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <section className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-primary-midnight-blue-900 text-lg font-semibold">
            {title}
          </h2>
          <X
            onClick={onClose}
            className="text-primary-midnight-blue-500 hover:text-primary-midnight-blue-900 cursor-pointer transition-colors duration-200"
          />
        </section>
        <p className="text-primary-midnight-blue-600 mb-6 text-sm">
          {description}
        </p>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            text={cancelText}
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="sm"
            text={confirmText}
            onClick={() => {
              onConfirm()
              onClose()
            }}
            loading={pending}
          />
        </div>
      </div>
    </div>
  )
}
