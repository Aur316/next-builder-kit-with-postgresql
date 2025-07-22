'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useTranslation } from 'react-i18next'

import { authQueryFns } from '../../data'
import { AuthTokens, User } from '../../types'

type AuthContextType = {
  user: User | null
  tokens: AuthTokens | null
  setAuthData: (user: User | null, tokens: AuthTokens | null) => void
  logout: () => Promise<void>
  isInitializing: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isInitializing, setIsInitializing] = useState<boolean>(true)

  const { t } = useTranslation()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken) {
          try {
            const meResponse = await authQueryFns.getMe(t)
            if (meResponse.isSuccess) {
              setUser(meResponse.payload)
              setTokens({ accessToken })
              setIsInitializing(false)
              return
            }
          } catch (error) {
            console.error('Access token invalid, trying refresh...', error)
          }
        }

        const refreshResponse = await authQueryFns.refreshToken(t)
        if (refreshResponse.isSuccess) {
          localStorage.setItem(
            'accessToken',
            refreshResponse.payload.tokens.accessToken,
          )
          setTokens({ accessToken: refreshResponse.payload.tokens.accessToken })

          setUser(refreshResponse.payload.user)
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
        init()
      } finally {
        setIsInitializing(false)
      }
    }

    checkAuth()
  }, [t])

  const setAuthData = (user: User | null, tokens: AuthTokens | null) => {
    setUser(user)
    setTokens(tokens)
    if (tokens?.accessToken) {
      localStorage.setItem('accessToken', tokens.accessToken)
    } else {
      localStorage.removeItem('accessToken')
    }
  }

  const init = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    setTokens(null)
  }

  const logout = async () => {
    await authQueryFns.logout(t)
    init()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        setAuthData,
        logout,
        isInitializing,
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
