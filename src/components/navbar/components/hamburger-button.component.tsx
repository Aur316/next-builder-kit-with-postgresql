'use client'

import { Dispatch, SetStateAction } from 'react'

import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

interface HamburgerButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
export function HamburgerButton({ isOpen, setIsOpen }: HamburgerButtonProps) {
  const { t } = useTranslation()
  return (
    <button
      className="cursor-pointer md:hidden"
      onClick={() => setIsOpen((prev) => !prev)}
      aria-expanded={isOpen}
      aria-label={isOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={28} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={28} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
