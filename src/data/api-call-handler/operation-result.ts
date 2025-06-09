export type OperationResult<TSuccess = undefined, TError = string> =
  | OperationResultSuccess<TSuccess>
  | OperationResultError<TError>

export type OperationResultSuccess<TSuccess> = {
  isSuccess: true
  isError: false
  payload: TSuccess
}

export type OperationResultError<TError> = {
  isSuccess: false
  isError: true
  error: TError
}

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
): result is OperationResultSuccess<TSuccess> => result.isSuccess === true

export const isError = <TSuccess, TError>(
  result: OperationResult<TSuccess, TError>,
): result is OperationResultError<TError> => result.isError === true
