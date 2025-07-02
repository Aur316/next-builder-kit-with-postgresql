'use client'

import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { BaseModal } from '../base-ui-elements'
import { Button } from '../base-ui-elements/button/button.component'

interface ModalProps {
  isModalOpen: boolean
  closeModal: () => void
}

export function Modal({ isModalOpen, closeModal }: ModalProps) {
  const { t } = useTranslation()

  return (
    <BaseModal
      open={isModalOpen}
      onClose={closeModal}
      title={t('modal.title')}
      description={t('modal.description')}
    >
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="secondary" onClick={closeModal}>
          {t('modal.closeButton')}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            toast.success(t('modal.successMessage'))
            closeModal()
          }}
        >
          {t('modal.actionButton')}
        </Button>
      </div>
    </BaseModal>
  )
}
