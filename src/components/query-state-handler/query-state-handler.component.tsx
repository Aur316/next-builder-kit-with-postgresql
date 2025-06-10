type Props = {
  isLoading: boolean
  isError: boolean
  isEmpty?: boolean
  errorMessage?: string
  emptyMessage?: string
  children: React.ReactNode
}

export const QueryStateHandler = ({
  isLoading,
  isError,
  isEmpty,
  errorMessage = 'Something went wrong.',
  emptyMessage = 'No data found.',
  children,
}: Props) => {
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>{errorMessage}</p>
  if (isEmpty) return <p>{emptyMessage}</p>
  return <>{children}</>
}
