'use client'

import { Dispatch, JSX, SetStateAction, memo } from 'react'

import { AnimatePresence, motion } from 'motion/react'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  routeItems: JSX.Element
}

export const MobileMenu = memo(function MobileMenu({
  isOpen,
  setIsOpen,
  routeItems,
}: MobileMenuProps) {
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
          onClick={() => setIsOpen(false)}
        >
          {routeItems}
        </motion.div>
      )}
    </AnimatePresence>
  )
})
