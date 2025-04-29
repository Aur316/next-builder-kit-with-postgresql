'use client'

import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { Github } from 'lucide-react'

import { getRoutes } from '../../constants'
import { DesktopMenu } from './desktop-menu.component'
import { HamburgerButton } from './hamburger-button.component'
import { MobileMenu } from './mobile-menu.component'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const routes = getRoutes().routes.filter((r) => r.visibleInNavbar)

  if (!routes.some((route) => route.path === pathname)) {
    return null
  }

  return (
    <nav className="bg-primary-midnight-blue-800 mx-auto mt-2 w-[90%] rounded-2xl px-4 py-3 text-white">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">
          <Github />
        </span>
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        <DesktopMenu routes={routes} />
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} routes={routes} />
    </nav>
  )
}
