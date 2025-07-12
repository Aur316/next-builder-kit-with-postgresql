import { useMemo } from 'react'

import { getRoutes } from '../route'

export function useRoutes() {
  return useMemo(() => getRoutes().routes.filter((r) => r.visibleInNavbar), [])
}
