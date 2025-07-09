import Link from 'next/link'

import { useTranslation } from 'react-i18next'

import { Route } from '../types'

interface RouteItemsProps {
  type: 'navbar' | 'drawer'
  routes: Array<Route>
}

export function RouteItems({ type, routes }: RouteItemsProps) {
  const { t } = useTranslation()

  const baseClasses =
    type === 'navbar' ? 'hidden gap-6 md:flex' : 'flex flex-col space-y-2'

  return (
    <ul className={baseClasses}>
      {routes.map((route) => (
        <li key={route.path}>
          <Link
            href={route.path}
            className={
              type === 'drawer'
                ? 'hover:bg-primary-midnight-blue-800 m-1 block rounded-lg px-4 py-3 text-white transition-colors'
                : ''
            }
          >
            {t(route.name)}
          </Link>
        </li>
      ))}
    </ul>
  )
}
