'use client'

import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { useVerifyEmail } from '../../../../hooks/queries/auth'

export default function VerifyEmailSlugPage() {
  const router = useRouter()
  const params = useParams() as { userId: string; token: string }
  const { verifyEmail, isPending, isError } = useVerifyEmail()

  useEffect(() => {
    if (!params.userId || !params.token) {
      router.push('/')
      return
    }

    verifyEmail({ userId: params.userId, token: params.token })
      .then(() => router.push('/login'))
      .catch(() => router.push('/'))
  }, [params.userId, params.token, router, verifyEmail])

  return <p>{isPending ? 'Verifying...' : isError ? 'Invalid token' : null}</p>
}
