import { useState } from 'react'

export const useModal = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  const toggleModal = () => setOpen((o) => !o)

  return {
    open,
    openModal,
    closeModal,
    toggleModal,
  }
}
