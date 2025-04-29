'use client'

import Head from 'next/head'

interface MetaProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

export const Meta = ({
  title = 'My App',
  description = 'This is the default description.',
  image = '/default-og-image.png',
  noIndex = false,
}: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  )
}
