import type { PropsWithChildren } from 'react'

import { Loader } from '../base-ui-elements'

type Props = PropsWithChildren<{
  isLoading: boolean
  isError: boolean
  isEmpty?: boolean
  errorMessage: string
  emptyMessage: string
  style?: string
}>

export const QueryStateHandler = ({
  isLoading,
  isError,
  isEmpty,
  errorMessage,
  emptyMessage,
  children,
  style,
}: Props) => {
  if (isLoading) return <Loader />
  if (isError) return <p className="mx-auto">{errorMessage}</p>
  if (isEmpty) return <p className="mx-auto">{emptyMessage}</p>
  return <div className={style}>{children}</div>
}
