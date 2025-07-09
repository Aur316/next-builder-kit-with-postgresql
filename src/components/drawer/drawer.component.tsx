'use client'

import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useRoutes, useToggle } from '../../hooks'
import { RouteItems } from '../../route/route-items.component'
import { Button } from '../base-ui-elements'

interface DrawerProps {
  className?: string
  drawerClassName?: string
  overlayClassName?: string
}

export function Drawer({
  className,
  drawerClassName,
  overlayClassName,
}: DrawerProps) {
  const { t } = useTranslation()
  const { isOpen, toggle, close } = useToggle()
  const routes = useRoutes()

  return (
    <div className={twMerge('relative', className)}>
      {/* Toggle Button */}
      <Button
        onClick={toggle}
        aria-label={t('drawer.toggleMenu')}
        icon={<Menu className="size-5" />}
        className="m-1"
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className={twMerge(
            'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm',
            overlayClassName,
          )}
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        className={twMerge(
          'bg-primary-midnight-blue-900 fixed top-0 left-0 z-50 h-full w-80 transform shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          drawerClassName,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold text-white">
            {t('drawer.menu')}
          </h2>
          <Button
            onClick={close}
            aria-label={t('drawer.closeMenu')}
            icon={<X className="size-5" />}
            size="sm"
            variant="primary"
          />
        </div>

        {/* Navigation */}
        <RouteItems type="drawer" routes={routes} />

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-gray-500 p-4">
          <div className="text-center text-sm text-gray-500">
            {t('drawer.footer')}
          </div>
        </div>
      </div>
    </div>
  )
}
