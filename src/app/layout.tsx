import { PropsWithChildren } from 'react'

import { ToastProvider } from '../components'
import { I18nProvider, StoreProvider } from '../providers'
import './globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <StoreProvider>
            {children}
            <ToastProvider />
          </StoreProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
