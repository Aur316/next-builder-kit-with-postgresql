'use client'

import { useState } from 'react'

import { MousePointerClick } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Toggle,
  showToast,
} from '../components'
import { DROPDOWN_OPTIONS } from '../constants'

export default function Home() {
  const { t } = useTranslation()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const triggerToast = () => {
    showToast({
      type: 'success',
      description: t('homePage.toastSuccess'),
    })
  }

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-10 px-4">
      <section id="mainHeader">
        <h1 className="text-center text-3xl font-bold">
          {t('homePage.title')}
        </h1>
        <p className="text-primary-midnight-blue-100 mt-2 max-w-md text-center text-sm">
          {t('homePage.description')}
        </p>
      </section>

      <section id="mainContent" className="flex flex-col items-center gap-4">
        <Button
          text={t('homePage.buttonText')}
          variant="secondary"
          icon={<MousePointerClick />}
          iconPosition="left"
          onClick={triggerToast}
        />
        <Input
          label={t('homePage.inputLabel')}
          placeholder={t('homePage.inputPlaceholder')}
          inputClassName="border-primary-midnight-blue-700 w-full h-8 rounded-lg border"
        />
        <Toggle text={t('homePage.toggleText')} className="toggle-info" />
        <Dropdown
          label={t('homePage.dropdownLabel')}
          value={selectedItem ?? undefined}
          onValueChange={setSelectedItem}
          options={DROPDOWN_OPTIONS}
        />
        <Checkbox text={t('homePage.checkboxText')} />
      </section>
    </div>
  )
}

// TODO:
// restore posts + végleges törlés lehetőség
