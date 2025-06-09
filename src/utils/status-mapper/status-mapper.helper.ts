export const ERROR_MESSAGES: { [key: number]: string } = {
  400: 'The request was invalid or cannot be otherwise served.',
  401: 'A request failed due to an authorization error.',
  403: 'User not authorized to perform the operation.',
  404: 'The requested resource was not found.',
  409: 'A conflict occurred while processing the request.',
  410: 'The requested resource is no longer available.',
  422: 'The request was invalid or cannot be otherwise served.',
  500: 'An internal server error occurred.',
  501: 'The requested operation is not implemented.',
  503: 'The server is temporarily unavailable.',
  0: 'The request failed.',
}

export const getErrorMessageByStatus = (status?: number): string => {
  return ERROR_MESSAGES[status ?? 0] ?? ERROR_MESSAGES[0]
}
