import type {
  OperationResult,
  OperationResultError,
  OperationResultSuccess,
} from './operation-result'

export const success = <TSuccess>(
  payload: TSuccess,
): OperationResultSuccess<TSuccess> => ({
  isSuccess: true,
  isError: false,
  payload,
})

export const error = <TError = string>(
  err: TError,
): OperationResultError<TError> => ({
  isSuccess: false,
  isError: true,
  error: err,
})

export const isSuccess = <TSuccess, TError>(
  result: OperationResult<TSuccess, TError>,
): result is OperationResultSuccess<TSuccess> => result.isSuccess

export const isError = <TSuccess, TError>(
  result: OperationResult<TSuccess, TError>,
): result is OperationResultError<TError> => result.isError
