import { ApiErrorResult } from '../../api'
import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsResponse,
  Post,
} from '../../types/post.type'
import { OperationResult } from '../api-call-handler'
import { apiCallHandler } from '../api-call-handler/api-handler'
import { postApiClient } from '../clients'

export const postQueryFns = {
  create: (
    payload: CreatePostRequest,
    t: (key: string) => string,
  ): Promise<OperationResult<CreatePostResponse, ApiErrorResult>> =>
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
