'use client'

import { PropsWithChildren, useContext } from 'react'

import { twMerge } from 'tailwind-merge'

import { Drawer, Footer, Navbar } from '../components'
import { StoreContext } from '../providers/store'

export function App({ children }: PropsWithChildren) {
  const { isDrawer, toggleNavigation } = useContext(StoreContext)

  return (
    <div className="bg-primary-midnight-blue-900 flex min-h-dvh flex-col">
      {isDrawer ? (
        <Drawer toggleNavigation={toggleNavigation} isDrawer={isDrawer} />
      ) : (
        <Navbar />
      )}
      <main
        className={twMerge(
          'flex flex-1 items-center justify-center overflow-y-auto',
          isDrawer && 'pl-16',
        )}
      >
        {children}
      </main>
      <div className={isDrawer ? 'pl-16' : ''}>
        <Footer />
      </div>
    </div>
  )
}
