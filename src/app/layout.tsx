import { PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge'

import { Drawer, Footer, Navbar, ToastProvider } from '../components'
import { I18nProvider, ReactQueryProvider, StoreProvider } from '../providers'
import './globals.css'

export const metadata = {
  title: 'Next Builder Kit',
  description: 'A modern Next.js application with TypeScript and Tailwind CSS',
}

export default function RootLayout({ children }: PropsWithChildren) {
  const isDrawer = true
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <ReactQueryProvider>
          <I18nProvider>
            <StoreProvider>
              <div className="bg-primary-midnight-blue-900 flex min-h-dvh flex-col">
                {isDrawer ? <Drawer /> : <Navbar />}
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
              <ToastProvider />
            </StoreProvider>
          </I18nProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
