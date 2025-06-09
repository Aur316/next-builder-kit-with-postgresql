import { isAxiosError } from 'axios'

import { ApiErrorResult } from '../../api'
import { showToast } from '../../components'
import { getErrorMessageByStatus } from '../../utils/status-mapper'
import { OperationResult, error, success } from './operation-result'

type QueryProps = {
  showErrorToast?: boolean
  errorMessage?: string
  showSuccessToast?: boolean
  successMessage?: string
  onError?: (error?: ApiErrorResult) => void
}

export const apiCallHandler = async <T>(
  queryFunction: () => Promise<T>,
  queryProps?: QueryProps,
): Promise<OperationResult<T, ApiErrorResult>> => {
  try {
    const response = await queryFunction()

    if (queryProps?.showSuccessToast) {
      showToast({
        type: 'success',
        description: queryProps?.successMessage,
      })
    }

    return success(response)
  } catch (err) {
    const status = isAxiosError(err) ? err.response?.status : 0
    const message = queryProps?.errorMessage ?? getErrorMessageByStatus(status)

    const requestId = isAxiosError(err)
      ? err.response?.data?.requestId
      : undefined

    const formattedError: ApiErrorResult = {
      status,
      data: {
        message,
        requestId,
      },
    }

    if (queryProps?.onError) {
      queryProps.onError(formattedError)
    }

    if (queryProps?.showErrorToast) {
      showToast({
        type: 'error',
        description: message,
        requestId,
      })
    }

    return error(formattedError)
  }
}
