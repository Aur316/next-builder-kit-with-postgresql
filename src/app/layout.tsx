import { PropsWithChildren } from 'react'

import { ToastProvider } from '../components'
import {
  AuthProvider,
  I18nProvider,
  ReactQueryProvider,
  StoreProvider,
} from '../providers'
import { App } from './app'
import './globals.css'

export const metadata = {
  title: 'Next Builder Kit',
  description: 'A modern Next.js application with TypeScript and Tailwind CSS',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <AuthProvider>
          <ReactQueryProvider>
            <I18nProvider>
              <StoreProvider>
                <App>{children}</App>
                <ToastProvider />
              </StoreProvider>
            </I18nProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
