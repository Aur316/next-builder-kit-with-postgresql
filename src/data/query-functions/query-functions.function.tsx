import { ApiErrorResult } from '../../api'
import {
  RegistrationFormProps,
  RegistrationResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '../../types'
import {
  GetPostsResponse,
  Post,
  PostRequest,
  PostResponse,
} from '../../types/post.type'
import { OperationResult } from '../api-call-handler'
import { apiCallHandler } from '../api-call-handler/api-handler'
import { postApiClient } from '../clients'
import { authApiClient } from '../clients/auth'

export const postQueryFns = {
  create: (
    payload: PostRequest,
    t: (key: string) => string,
  ): Promise<OperationResult<PostResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.create(payload), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.create.errorMessage'),
      showSuccessToast: true,
      successMessage: t('toastMessages.post.create.successMessage'),
    }),

  getAll: (
    t: (key: string) => string,
  ): Promise<OperationResult<GetPostsResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getAll(), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.getAll.errorMessage'),
    }),

  getDeleted: (
    t: (key: string) => string,
  ): Promise<OperationResult<GetPostsResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getDeleted(), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.getDeleted.errorMessage'),
    }),

  getActive: (
    t: (key: string) => string,
  ): Promise<OperationResult<GetPostsResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getActive(), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.getActive.errorMessage'),
    }),

  getById: (
    postId: string,
    t: (key: string) => string,
  ): Promise<OperationResult<Post, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getById(postId), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.getById.errorMessage'),
    }),

  getByQuery: (
    query: string,
    t: (key: string) => string,
  ): Promise<OperationResult<GetPostsResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getByQuery(query), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.getByQuery.errorMessage'),
    }),

  softDelete: (
    postId: string,
    t: (key: string) => string,
  ): Promise<OperationResult<null, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.softDelete(postId), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.softDelete.errorMessage'),
      showSuccessToast: true,
      successMessage: t('toastMessages.post.softDelete.successMessage'),
    }),

  delete: (
    postId: string,
    t: (key: string) => string,
  ): Promise<OperationResult<null, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.delete(postId), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.delete.errorMessage'),
      showSuccessToast: true,
      successMessage: t('toastMessages.post.delete.successMessage'),
    }),

  update: (
    post: Post,
    t: (key: string) => string,
  ): Promise<OperationResult<Post, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.update(post), {
      showErrorToast: true,
      errorMessage: t('toastMessages.post.update.errorMessage'),
      showSuccessToast: true,
      successMessage: t('toastMessages.post.update.successMessage'),
    }),
}

export const authQueryFns = {
  verifyEmail: (
    payload: VerifyEmailRequest,
    t: (key: string) => string,
  ): Promise<OperationResult<VerifyEmailResponse, ApiErrorResult>> =>
    apiCallHandler(() => authApiClient.verifyEmail(payload), {
      showErrorToast: true,
      errorMessage: t('toastMessages.auth.verifyEmail.errorMessage'),
    }),

  registration: (
    payload: RegistrationFormProps,
    t: (key: string) => string,
  ): Promise<OperationResult<RegistrationResponse, ApiErrorResult>> =>
    apiCallHandler(() => authApiClient.registration(payload), {
      showErrorToast: true,
      errorMessage: t('toastMessages.auth.registration.errorMessage'),
      showSuccessToast: true,
      successMessage: t('toastMessages.auth.registration.successMessage'),
    }),
}
