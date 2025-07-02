'use client'

import { Dispatch, SetStateAction, memo, useCallback, useMemo } from 'react'

import Link from 'next/link'

import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { Route } from '../../../types'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  routes: Array<Route>
}

export const MobileMenu = memo(function MobileMenu({
  isOpen,
  setIsOpen,
  routes,
}: MobileMenuProps) {
  const { t } = useTranslation()

  const linkClick = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const routeItems = useMemo(
    () =>
      routes.map((route) => (
        <Link key={route.path} href={route.path} onClick={linkClick}>
          {t(route.name)}
        </Link>
      )),
    [routes, t, linkClick],
  )

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden md:hidden"
        >
          <div className="mt-4 flex flex-col gap-3">{routeItems}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
