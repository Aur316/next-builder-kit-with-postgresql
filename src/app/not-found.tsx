'use client'

import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-2">
      <h1 className="text-[120px] leading-none font-bold">
        <span className="text-primary-midnight-blue-900">404</span>
      </h1>
      <p className="text-primary-midnight-blue-800 mt-4 text-xl">Not found</p>
      <br />
      <Link href="/" className="text-primary-midnight-blue-700 flex gap-2">
        <ArrowLeft />
        {t('back')}
      </Link>
    </div>
  )
}
