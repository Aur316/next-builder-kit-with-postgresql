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
  ): Promise<OperationResult<CreatePostResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.create(payload), {
      showErrorToast: true,
      errorMessage: 'Failed to create post',
      showSuccessToast: true,
      successMessage: 'Post created successfully',
    }),

  getAll: (): Promise<OperationResult<GetPostsResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getAll(), {
      showErrorToast: true,
      errorMessage: 'Failed to load posts',
    }),

  getDeleted: (): Promise<OperationResult<GetPostsResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getDeleted(), {
      showErrorToast: true,
      errorMessage: 'Failed to load posts',
    }),

  getActive: (): Promise<OperationResult<GetPostsResponse, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getActive(), {
      showErrorToast: true,
      errorMessage: 'Failed to load posts',
    }),

  getById: (postId: string): Promise<OperationResult<Post, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.getById(postId), {
      showErrorToast: true,
      errorMessage: 'Failed to load posts',
    }),

  softDelete: (
    postId: string,
  ): Promise<OperationResult<null, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.softDelete(postId), {
      showErrorToast: true,
      errorMessage: 'Failed to delete post',
      showSuccessToast: true,
      successMessage: 'Post deleted successfully',
    }),

  delete: (postId: string): Promise<OperationResult<null, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.delete(postId), {
      showErrorToast: true,
      errorMessage: 'Failed to delete post',
      showSuccessToast: true,
      successMessage: 'Post deleted successfully',
    }),

  update: (post: Post): Promise<OperationResult<Post, ApiErrorResult>> =>
    apiCallHandler(() => postApiClient.update(post), {
      showErrorToast: true,
      errorMessage: 'Failed to update post',
      showSuccessToast: true,
      successMessage: 'Post updated successfully',
    }),
}
