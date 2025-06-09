'use client'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'

import { Route } from '../../../types'

interface DesktopMenuProps {
  routes: Array<Route>
}

export function DesktopMenu({ routes }: DesktopMenuProps) {
  const { t } = useTranslation()
  return (
    <div className="hidden gap-6 md:flex">
      {routes.map((route) => (
        <Link key={route.path} href={route.path}>
          {t(route.name)}
        </Link>
      ))}
    </div>
  )
}
