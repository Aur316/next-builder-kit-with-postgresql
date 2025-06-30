'use client'

import { useState } from 'react'

import { SendHorizontal } from 'lucide-react'
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
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showToast({
      type: 'success',
      description: t('homePage.formSubmitted'),
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

      <section id="mainContent">
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            // label={t('homePage.inputLabel')}
            legend={t('homePage.inputLabel')}
            placeholder={t('homePage.inputPlaceholder')}
            inputClassName="border-primary-midnight-blue-700 w-full h-8 rounded-lg border"
            required
          />
          <Dropdown
            label={t('homePage.dropdownLabel')}
            //legend={t('homePage.dropdownLabel')}
            name="Frameworks"
            setSelectedItem={setSelectedItem}
            value={selectedItem}
            options={DROPDOWN_OPTIONS}
            nestedOption="Frameworks"
            required
          />
          <Toggle text={t('homePage.toggleText')} className="toggle-info" />
          <Checkbox label={t('homePage.checkboxText')} required />
          <Button
            text={t('homePage.buttonText')}
            variant="secondary"
            icon={<SendHorizontal strokeWidth={1.5} />}
            iconPosition="right"
            type="submit"
          />
        </form>
      </section>
    </div>
  )
}
