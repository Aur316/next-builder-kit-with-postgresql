'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'

interface StoreContextProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined)

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  return (
    <StoreContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
