'use client'

import { Dispatch, SetStateAction } from 'react'

import Link from 'next/link'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { Route } from '../../../types'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  routes: Array<Route>
}

export function MobileMenu({ isOpen, setIsOpen, routes }: MobileMenuProps) {
  const { t } = useTranslation()

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
          <div className="mt-4 flex flex-col gap-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsOpen(false)}
              >
                {t(route.name)}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
