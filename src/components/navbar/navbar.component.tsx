'use client'

import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { Github } from 'lucide-react'

import { getRoutes } from '../../route'
import { LanguageSwitcher } from '../language-switcher'
import { DesktopMenu, HamburgerButton, MobileMenu } from './components'

export const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const routes = getRoutes().routes.filter((r) => r.visibleInNavbar)

  if (!routes.some((route) => route.path === pathname)) {
    return null
  }

  return (
    <nav className="bg-primary-midnight-blue-800 m-2 rounded-xl px-6 py-4 text-white">
      <div className="flex items-center justify-between">
        <Github />
        <LanguageSwitcher />
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <DesktopMenu routes={routes} />
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} routes={routes} />
    </nav>
  )
}
