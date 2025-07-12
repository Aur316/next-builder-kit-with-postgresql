'use client'

import { JSX, memo } from 'react'

interface DesktopMenuProps {
  routeItems: JSX.Element
}

export const DesktopMenu = memo(function DesktopMenu({
  routeItems,
}: DesktopMenuProps) {
  return routeItems
})
