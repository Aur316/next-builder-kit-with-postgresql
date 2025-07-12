'use client'

import { BaseModal } from '../base-modal'
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
  const confirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <BaseModal
      title={title}
      description={description}
      onClose={onClose}
      open={open}
      closeOnEscape
      extraStyles="bg-primary-midnight-blue-900"
    >
      <div className="flex justify-end gap-2">
        <Button variant="primary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="secondary" onClick={confirm} loading={pending}>
          {confirmText}
        </Button>
      </div>
    </BaseModal>
  )
}
