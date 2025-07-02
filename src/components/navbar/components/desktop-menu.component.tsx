'use client'

import { memo, useMemo } from 'react'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'

import { Route } from '../../../types'

interface DesktopMenuProps {
  routes: Array<Route>
}

export const DesktopMenu = memo(function DesktopMenu({
  routes,
}: DesktopMenuProps) {
  const { t } = useTranslation()

  const routeItems = useMemo(
    () =>
      routes.map((route) => (
        <Link key={route.path} href={route.path}>
          {t(route.name)}
        </Link>
      )),
    [routes, t],
  )

  return <div className="hidden gap-6 md:flex">{routeItems}</div>
})
