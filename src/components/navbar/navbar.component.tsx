'use client'

import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { usePathname } from 'next/navigation'

import { Github } from 'lucide-react'

import { useRoutes } from '../../hooks'
import { LanguageSwitcher } from '../language-switcher'
import { DesktopMenu, HamburgerButton, MobileMenu } from './components'

export const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { routeItems, routes } = useRoutes()

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
