'use client'

import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useLogin } from '../../hooks'
import { LoginFormProps } from '../../types'
import { Button, Input } from '../base-ui-elements'

export function LoginForm() {
  const { t } = useTranslation()
  const [loginForm, setLoginForm] = useState<LoginFormProps>({
    email: '',
    password: '',
  })

  const { login, isPending } = useLogin()

  const handleSubmit = async () => {
    await login(loginForm)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <label htmlFor="login-form">Login</label>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        id="login-form"
        className="flex flex-col gap-4"
      >
        <Input
          label="Email"
          type="email"
          value={loginForm.email}
          onChange={(e) =>
            setLoginForm({ ...loginForm, email: e.target.value })
          }
          autoComplete="email"
          required
        />
        <Input
          label="Password"
          type="password"
          value={loginForm.password}
          onChange={(e) =>
            setLoginForm({ ...loginForm, password: e.target.value })
          }
          required
        />
        <Button
          type="submit"
          variant="secondary"
          disabled={isPending}
          loading={isPending}
        >
          {t('login')}
        </Button>
      </form>
    </div>
  )
}
