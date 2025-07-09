'use client'

import { useCallback, useState } from 'react'

import Link from 'next/link'

import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { getRoutes } from '../../route'

interface DrawerProps {
  className?: string
  buttonClassName?: string
  drawerClassName?: string
  overlayClassName?: string
}

export function Drawer({
  className,
  buttonClassName,
  drawerClassName,
  overlayClassName,
}: DrawerProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { routes } = getRoutes()

  const toggleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const visibleRoutes = routes.filter((route) => route.visibleInNavbar)

  return (
    <div className={twMerge('relative', className)}>
      {/* Toggle Button */}
      <button
        onClick={toggleDrawer}
        className={twMerge(
          'btn btn-ghost btn-sm p-2 text-white hover:bg-white/10',
          buttonClassName,
        )}
        aria-label={t('drawer.toggleMenu')}
      >
        <Menu className="size-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={twMerge(
            'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm',
            overlayClassName,
          )}
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={twMerge(
          'fixed top-0 right-0 z-50 h-full w-80 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          drawerClassName,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t('drawer.menu')}
          </h2>
          <button
            onClick={closeDrawer}
            className="btn btn-ghost btn-sm p-1 text-gray-500 hover:text-gray-700"
            aria-label={t('drawer.closeMenu')}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4">
          <ul className="space-y-2">
            {visibleRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  onClick={closeDrawer}
                  className="block rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {t(route.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <div className="text-center text-sm text-gray-500">
            {t('drawer.footer')}
          </div>
        </div>
      </div>
    </div>
  )
}
