import { JSX, useMemo } from 'react'

import Link from 'next/link'

import { useTranslation } from 'react-i18next'

import { getRoutes } from '../route'
import { Route } from '../types'

interface UseRoutes {
  routes: Array<Route>
  routeItems: JSX.Element
}

export function useRoutes(): UseRoutes {
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

  return {
    routes,
    routeItems,
  }
}
