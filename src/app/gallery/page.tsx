import { useTranslation } from 'react-i18next'

import { Coverflow } from '../../components'
import { imageLinks } from '../../constants'

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <div className="overflow-y-hidden px-8">
      <Coverflow links={imageLinks} title={t('galleryPage.coverflow')} />
    </div>
  )
}
