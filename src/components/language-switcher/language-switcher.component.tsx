'use client'

import { useTranslation } from 'react-i18next'

import { LANGUAGES } from '../../constants'
import { Dropdown } from '../base-ui-elements'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  return (
    <div className="mr-2 ml-auto w-40">
      <Dropdown
        value={i18n.language}
        setSelectedItem={(lang) => i18n.changeLanguage(lang)}
        options={LANGUAGES}
        selectClassName="h-9 bg-primary-midnight-blue-900/40"
      />
    </div>
  )
}
