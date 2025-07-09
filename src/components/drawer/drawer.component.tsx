'use client'

import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useRoutes, useToggle } from '../../hooks'
import { RouteItems } from '../../route/route-items.component'
import { Button } from '../base-ui-elements'

export function Drawer() {
  const { t } = useTranslation()
  const { isOpen, toggle, close } = useToggle()
  const routes = useRoutes()

  return (
    <div className="relative">
      {/* Overlay csak nagy drawer esetén */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        className={twMerge(
          'fixed top-0 left-0 z-50 h-full transform transition-all duration-300 ease-in-out',
          isOpen ? 'w-80' : 'w-16',
          'bg-primary-midnight-blue-900 shadow-2xl',
        )}
      >
        {/* Header */}
        <div
          className={twMerge(
            'flex items-center',
            isOpen ? 'justify-between p-4' : 'justify-center p-2',
          )}
        >
          {isOpen && (
            <h2 className="text-lg font-semibold text-white">
              {t('drawer.menu')}
            </h2>
          )}
          <Button
            onClick={toggle}
            aria-label={t(isOpen ? 'drawer.closeMenu' : 'drawer.openMenu')}
            icon={
              isOpen ? <X className="size-5" /> : <Menu className="size-5" />
            }
            size="sm"
            variant="primary"
          />
        </div>

        {/* Routes */}
        <RouteItems
          type={isOpen ? 'drawer' : 'mini'}
          routes={routes}
          showIcon
          closeDrawer={close}
        />

        {/* Footer (csak nagy drawer) */}
        {isOpen && (
          <div className="absolute bottom-0 w-full border-t border-gray-500 p-4">
            <div className="text-center text-sm text-gray-500">
              {t('drawer.footer')}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
