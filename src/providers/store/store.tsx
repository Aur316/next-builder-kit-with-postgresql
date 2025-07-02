'use client'

import { PropsWithChildren, createContext, useState } from 'react'

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

  return (
    <StoreContext value={{ storeNumber, setStoreNumber }}>
      {children}
    </StoreContext>
  )
}
