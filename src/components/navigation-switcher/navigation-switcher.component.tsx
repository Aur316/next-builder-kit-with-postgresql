'use client'

import { HTMLAttributes, useContext } from 'react'

import { PanelRightClose, RectangleEllipsis } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { StoreContext } from '../../providers/store'

export function NavigationSwitcher({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { isDrawer, toggleNavigation } = useContext(StoreContext)
  const { t } = useTranslation()

  const style = 'cursor-pointer hover:text-gray-300 transition-colors'
  const strokeWidth = 1

  return (
    <div {...props}>
      {isDrawer ? (
        <RectangleEllipsis
          onClick={toggleNavigation}
          aria-label={t('switcher.navbar')}
          className={style}
          strokeWidth={strokeWidth}
        />
      ) : (
        <PanelRightClose
          onClick={toggleNavigation}
          aria-label={t('switcher.drawer')}
          className={style}
          strokeWidth={strokeWidth}
        />
      )}
    </div>
  )
}
