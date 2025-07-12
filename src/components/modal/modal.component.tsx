'use client'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { BaseModal } from '../base-ui-elements'
import { Button } from '../base-ui-elements/button/button.component'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export function Modal({ open = false, onClose }: ModalProps) {
  const { t } = useTranslation()

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={t('modal.title')}
      description={t('modal.description')}
      extraStyles="bg-primary-midnight-blue-900 border border-primary-midnight-blue-800"
    >
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="primary" onClick={onClose}>
          {t('modal.closeButton')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            toast.success(t('modal.successMessage'))
            onClose()
          }}
        >
          {t('modal.actionButton')}
        </Button>
      </div>
    </BaseModal>
  )
}
