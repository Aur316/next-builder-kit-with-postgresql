'use client'

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'

interface StoreContextProps {
  storeNumber: number
  setStoreNumber: (value: number) => void
  isDrawer: boolean
  toggleNavigation: () => void
}

const defaultStoreContext: StoreContextProps = {
  storeNumber: 0,
  setStoreNumber: () => {},
  isDrawer: false,
  toggleNavigation: () => {},
}

export const StoreContext =
  createContext<StoreContextProps>(defaultStoreContext)

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const initialIsDrawer = useMemo(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isDrawer') === 'true'
    }
    return false
  }, [])

  const [storeNumber, setStoreNumber] = useState<number>(0)
  const [isDrawer, setIsDrawer] = useState<boolean>(initialIsDrawer)

  const toggleNavigation = useCallback(() => {
    setIsDrawer((prev) => {
      const newValue = !prev
      localStorage.setItem('isDrawer', newValue.toString())
      return newValue
    })
  }, [])

  const contextValue = useMemo(
    () => ({ storeNumber, setStoreNumber, isDrawer, toggleNavigation }),
    [storeNumber, isDrawer, toggleNavigation],
  )

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}
