'use client'

import { Dispatch, SetStateAction } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface HamburgerButtonProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
export function HamburgerButton({ isOpen, setIsOpen }: HamburgerButtonProps) {
  return (
    <button
      className="cursor-pointer md:hidden"
      onClick={() => setIsOpen((prev) => !prev)}
      aria-label="Toggle Menu"
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
