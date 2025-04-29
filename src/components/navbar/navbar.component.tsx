'use client'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'

import { getRoutes } from '../../constants'

export const Navbar = () => {
  const { t } = useTranslation()
  const routes = getRoutes().routes.filter((r) => r.visibleInNavbar)
  return (
    <nav>
      {routes.map((route) => (
        <Link className="text-black" key={route.path} href={route.path}>
          {t(route.name)}
        </Link>
      ))}
    </nav>
  )
}
