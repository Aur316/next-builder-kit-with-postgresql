import { PropsWithChildren } from 'react'

import { Footer, Navbar, ToastProvider } from '../components'
import { I18nProvider, ReactQueryProvider, StoreProvider } from '../providers'
import './globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <ReactQueryProvider>
          <I18nProvider>
            <StoreProvider>
              <div className="bg-primary-midnight-blue-900 flex min-h-dvh flex-col">
                <Navbar />
                <main className="flex flex-1 items-center justify-center overflow-y-auto">
                  {children}
                </main>
                <Footer />
              </div>
              <ToastProvider />
            </StoreProvider>
          </I18nProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
