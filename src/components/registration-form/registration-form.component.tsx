'use client'

import { useState } from 'react'

import { UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useRegistration } from '../../hooks/queries/auth/useRegistration'
import { RegistrationFormProps } from '../../types/registration.type'
import { Button, InfoBox, Input } from '../base-ui-elements'

export function RegistrationForm() {
  const { t } = useTranslation()
  const [registrationForm, setRegistrationForm] =
    useState<RegistrationFormProps>({
      name: '',
      email: '',
      password: '',
    })

  const { registration, isPending, isError, error } = useRegistration()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registration(registrationForm)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <label htmlFor="registration-form">{t('registration')}</label>
      <form
        id="registration-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <Input
          label="Name"
          type="text"
          value={registrationForm.name}
          onChange={(e) =>
            setRegistrationForm({ ...registrationForm, name: e.target.value })
          }
          required
        />
        <Input
          label="Email"
          type="email"
          value={registrationForm.email}
          onChange={(e) =>
            setRegistrationForm({ ...registrationForm, email: e.target.value })
          }
          required
        />
        <Input
          label="Password"
          type="password"
          value={registrationForm.password}
          onChange={(e) =>
            setRegistrationForm({
              ...registrationForm,
              password: e.target.value,
            })
          }
          required
        />
        <Button
          type="submit"
          disabled={isPending}
          loading={isPending}
          variant="secondary"
          icon={<UserPlus />}
          iconPosition="right"
        >
          {t('registration')}
        </Button>
      </form>
      {isError && (
        <InfoBox
          type="error"
          title={t('registrationPage.error')}
          description={error?.data.message as string}
        />
      )}
    </div>
  )
}
