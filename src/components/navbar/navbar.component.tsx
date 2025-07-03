'use client'

import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Github } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { getRoutes } from '../../route'
import { LanguageSwitcher } from '../language-switcher'
import { DesktopMenu, HamburgerButton, MobileMenu } from './components'

export const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  const routes = useMemo(
    () => getRoutes().routes.filter((r) => r.visibleInNavbar),
    [],
  )

  const routeItems = useMemo(
    () => (
      <ul className="hidden gap-6 md:flex">
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{t(route.name)}</Link>
          </li>
        ))}
      </ul>
    ),
    [routes, t],
  )

  const handleSetIsOpen = useCallback<Dispatch<SetStateAction<boolean>>>(
    (value) => {
      setIsOpen(value)
    },
    [],
  )

  if (!routes.some((route) => route.path === pathname)) {
    return null
  }

  return (
    <nav
      role="navigation"
      className="bg-primary-midnight-blue-800 m-2 rounded-xl px-6 py-4 text-white"
    >
      <div className="flex items-center justify-between">
        <Github />
        <LanguageSwitcher />
        <HamburgerButton isOpen={isOpen} setIsOpen={handleSetIsOpen} />
        <DesktopMenu routeItems={routeItems} />
      </div>
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        routeItems={routeItems}
      />
    </nav>
  )
}
