'use client'

import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="bg-primary-midnight-blue-800 text-primary-midnight-blue-100 m-2 flex-shrink-0 rounded-xl px-6 py-4 text-center text-sm">
      <p>
        © {currentYear} Next Builder Kit - {t('footer.rights')}
      </p>
    </footer>
  )
}
