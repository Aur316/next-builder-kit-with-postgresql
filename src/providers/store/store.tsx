'use client'

import { PropsWithChildren, createContext, useMemo, useState } from 'react'

interface StoreContextProps {
  storeNumber: number
  setStoreNumber: (value: number) => void
}

const defaultStoreContext: StoreContextProps = {
  storeNumber: 0,
  setStoreNumber: () => {},
}

export const StoreContext =
  createContext<StoreContextProps>(defaultStoreContext)

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [storeNumber, setStoreNumber] = useState<number>(0)

  const contextValue = useMemo(
    () => ({ storeNumber, setStoreNumber }),
    [storeNumber],
  )

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}
