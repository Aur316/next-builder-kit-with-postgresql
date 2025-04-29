import { PropsWithChildren } from 'react'

import { Footer, Navbar, ToastProvider } from '../components'
import { I18nProvider, ReactQueryProvider, StoreProvider } from '../providers'
import './globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col overflow-hidden">
        <ReactQueryProvider>
          <I18nProvider>
            <StoreProvider>
              <div className="bg-primary-midnight-blue-900 flex min-h-screen flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-auto">{children}</main>
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
