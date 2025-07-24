'use client'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { jwtDecode } from 'jwt-decode'
import { useTranslation } from 'react-i18next'

import { showToast } from '../../components'
import { authQueryFns, setGlobalLogout } from '../../data'
import { useLogOut } from '../../hooks/queries/auth'
import { AuthTokens, User } from '../../types'

type AuthContextType = {
  user: User | null
  tokens: AuthTokens | null
  setAuthData: (user: User | null, tokens: AuthTokens | null) => void
  logout: () => Promise<void>
  isInitializing: boolean
  init: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isInitializing, setIsInitializing] = useState<boolean>(true)
  const { t } = useTranslation()

  const init = useCallback(() => {
    localStorage.removeItem('accessToken')
    setUser(null)
    setTokens(null)
  }, [])

  const { logout: logoutMutation } = useLogOut(init)

  const logout = useCallback(async () => {
    try {
      await logoutMutation()
    } catch (error) {
      console.error('LOGOUT: Logout failed:', error)
      init()
    }
  }, [logoutMutation, init])

  const autoLogout = useCallback(() => {
    showToast({
      type: 'warning',
      description: t('toastMessages.auth.autoLogout.message'),
    })
    init()
  }, [init, t])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
          const meResponse = await authQueryFns.getMe(t)
          if (meResponse.isSuccess) {
            setUser(meResponse.payload.user)
            setTokens({ accessToken })
            return
          }
        }

        const refreshResponse = await authQueryFns.refreshToken()
        if (refreshResponse.isSuccess) {
          localStorage.setItem(
            'accessToken',
            refreshResponse.payload.tokens.accessToken,
          )
          setTokens({ accessToken: refreshResponse.payload.tokens.accessToken })
          setUser(refreshResponse.payload.user)
        } else {
          init()
        }
      } catch (error) {
        console.error('CHECK_AUTH: Authentication check failed:', error)
        init()
      } finally {
        setIsInitializing(false)
      }
    }

    checkAuth()
  }, [t, init])

  useEffect(() => {
    if (tokens?.accessToken) {
      const { exp } = jwtDecode<{ exp: number }>(tokens.accessToken)
      const now = Date.now() / 1000
      const timeout = (exp - now) * 1000

      const timer = setTimeout(() => {
        autoLogout()
      }, timeout)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [tokens, autoLogout])

  useEffect(() => {
    setGlobalLogout(async () => {
      try {
        await logout()
      } catch (error) {
        console.error('Global logout failed:', error)
        init()
      }
    })
  }, [logout, init])

  const setAuthData = (user: User | null, tokens: AuthTokens | null) => {
    setUser(user)
    setTokens(tokens)

    if (tokens?.accessToken) {
      localStorage.setItem('accessToken', tokens.accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        setAuthData,
        logout,
        isInitializing,
        init,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
