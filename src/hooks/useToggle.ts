import { useState } from 'react'

export const useToggle = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((o) => !o)

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
