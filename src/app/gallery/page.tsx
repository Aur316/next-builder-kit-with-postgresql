'use client'

import { useTranslation } from 'react-i18next'

import { Coverflow } from '../../components'
import { imageLinks } from '../../constants'

export default function Gallery() {
  const { t } = useTranslation()

  return <Coverflow links={imageLinks} title={t('galleryPage.coverflow')} />
}
