'use client'

import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { usePathname } from 'next/navigation'

import { Github } from 'lucide-react'

import { useRoutes } from '../../hooks'
import { RouteItems } from '../../route'
import { LanguageSwitcher } from '../language-switcher'
import { NavigationSwitcher } from '../navigation-switcher'
import { DesktopMenu, HamburgerButton, MobileMenu } from './components'

export const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const routes = useRoutes()

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
        <DesktopMenu
          routeItems={<RouteItems type="navbar" routes={routes} />}
        />
        <NavigationSwitcher className="ml-5" />
      </div>
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        routeItems={<RouteItems type="drawer" routes={routes} />}
      />
    </nav>
  )
}
