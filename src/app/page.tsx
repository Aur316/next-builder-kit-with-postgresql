'use client'

import { useEffect, useRef, useState } from 'react'

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
import { FormData } from '../types'

export default function Home() {
  const { t } = useTranslation()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    framework: '',
    notification: false,
    isAgreed: false,
  })

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showToast({
      type: 'success',
      description: t('homePage.formSubmitted'),
    })
    setFormData({
      name: '',
      framework: '',
      notification: false,
      isAgreed: false,
    })
    inputRef.current?.focus()
  }

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-10 px-4">
      <section id="mainHeader">
        <h1 className="text-center text-3xl font-bold text-white">
          {t('homePage.title')}
        </h1>
        <p className="mt-2 max-w-md text-center text-sm text-white">
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
            ref={inputRef}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Dropdown
            label={t('homePage.dropdownLabel')}
            //legend={t('homePage.dropdownLabel')}
            name="Frameworks"
            setSelectedItem={(e) => setFormData({ ...formData, framework: e })}
            value={formData.framework}
            options={DROPDOWN_OPTIONS}
            nestedOption="Frameworks"
            required
          />
          <Toggle
            text={t('homePage.toggleText')}
            className="toggle-info"
            checked={formData.notification}
            onChange={(e) =>
              setFormData({ ...formData, notification: e.target.checked })
            }
          />
          <Checkbox
            label={t('homePage.checkboxText')}
            required
            checked={formData.isAgreed}
            onChange={(e) =>
              setFormData({ ...formData, isAgreed: e.target.checked })
            }
          />
          <Button
            text={t('homePage.submitButtonText')}
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
