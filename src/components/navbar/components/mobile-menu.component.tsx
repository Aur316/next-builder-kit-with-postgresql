'use client'

import {
  Dispatch,
  JSX,
  SetStateAction,
  cloneElement,
  memo,
  useCallback,
} from 'react'

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
  const linkClick = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const MobileRouteItems = useCallback(() => {
    // Clone the ul element and add onClick to each li
    const ulElement = routeItems
    const liElements = ulElement.props.children

    const mobileLiElements = liElements.map((li: JSX.Element, index: number) =>
      cloneElement(li, {
        key: li.key || index,
        onClick: linkClick,
      }),
    )

    return cloneElement(
      ulElement,
      {
        className: 'mt-4 flex flex-col gap-3',
      },
      mobileLiElements,
    )
  }, [routeItems, linkClick])

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
          <MobileRouteItems />
        </motion.div>
      )}
    </AnimatePresence>
  )
})
