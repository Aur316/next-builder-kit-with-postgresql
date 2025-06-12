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
  return (
    <BaseModal
      title={title}
      description={description}
      onClose={onClose}
      open={open}
      closeOnEscape
    >
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
    </BaseModal>
  )
}
