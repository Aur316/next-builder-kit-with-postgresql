'use client'

import { use, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { Button, SpinnableBorderWrapper } from '../../components'
import { StoreContext } from '../../providers'

export default function AboutPage() {
  const { t } = useTranslation()
  const { storeNumber } = use(StoreContext)

  const viewSource = useCallback(() => {
    window.open('https://github.com/Aur316/simple-model', '_blank')
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center text-white">
      <div className="max-w-xl space-y-6">
        <h1 className="text-3xl font-bold">{t('aboutPage.title')}</h1>
        <p className="text-primary-midnight-blue-100">
          {t('aboutPage.description1')}
        </p>
        <p className="text-primary-midnight-blue-100">
          {t('aboutPage.description2')}
        </p>
        <p className="bg-primary-midnight-blue-800 text-primary-midnight-blue-200 rounded-lg p-4">
          {t('store.context.storeMessage')}
          <span className="text-primary-midnight-blue-100">{storeNumber}</span>
        </p>
        <div className="flex justify-center">
          <SpinnableBorderWrapper isSpinning baseStyle="rounded-2xl">
            <Button
              text={t('aboutPage.buttonText')}
              variant="secondary"
              onClick={viewSource}
            />
          </SpinnableBorderWrapper>
        </div>
      </div>
    </div>
  )
}
