'use client'

import { PropsWithChildren } from 'react'

import { I18nextProvider } from 'react-i18next'

import { i18nInstance } from '../../i18n/i18n'

export function I18nProvider({ children }: PropsWithChildren) {
  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
