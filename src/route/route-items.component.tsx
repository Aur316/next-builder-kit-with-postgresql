'use client'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { Route } from '../types'

interface RouteItemsProps {
  type: 'navbar' | 'drawer' | 'mini'
  routes: Array<Route>
  showIcon?: boolean
  closeDrawer?: () => void
}

export function RouteItems({
  type,
  routes,
  showIcon = false,
  closeDrawer,
}: RouteItemsProps) {
  const { t } = useTranslation()

  const baseClasses =
    type === 'navbar'
      ? 'hidden md:flex gap-6'
      : type === 'mini'
        ? 'flex flex-col space-y-2 p-2'
        : 'flex flex-col space-y-2 p-2'

  return (
    <ul className={baseClasses}>
      {routes.map((route) => (
        <li key={route.path}>
          <Link
            href={route.path}
            onClick={() => closeDrawer?.()}
            className={twMerge(
              'flex cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-white transition-colors',
              type === 'drawer' && 'hover:bg-primary-midnight-blue-800 px-4',
              type === 'mini' && 'justify-center rounded-lg p-1',
            )}
          >
            {/* Icon or Initial - only for mini type */}
            {type === 'mini' && (
              <div className="flex size-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30">
                {route.icon ? (
                  <route.icon className="size-5" />
                ) : (
                  <span className="text-lg font-semibold">
                    {route.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            )}

            {/* Name for navbar and drawer */}
            {(type === 'drawer' || type === 'navbar') && (
              <span className="flex items-center gap-2">
                {route.icon && showIcon && <route.icon className="size-5" />}
                {t(route.name)}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
