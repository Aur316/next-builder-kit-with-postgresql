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

export const createPostFn = async (
  payload: CreatePostRequest,
): Promise<OperationResult<CreatePostResponse, ApiErrorResult>> => {
  return await apiCallHandler(() => postApiClient.create(payload), {
    showErrorToast: true,
    errorMessage: 'Failed to create post',
    showSuccessToast: true,
    successMessage: 'Post created successfully',
  })
}

export const getAllPostsFn = async (): Promise<
  OperationResult<GetPostsResponse, ApiErrorResult>
> => {
  return await apiCallHandler(() => postApiClient.getAll(), {
    showErrorToast: true,
    errorMessage: 'Failed to load posts',
  })
}

export const getDeletedPostsFn = async (): Promise<
  OperationResult<GetPostsResponse, ApiErrorResult>
> => {
  return await apiCallHandler(() => postApiClient.getDeleted(), {
    showErrorToast: true,
    errorMessage: 'Failed to load posts',
  })
}

export const getActivePostsFn = async (): Promise<
  OperationResult<GetPostsResponse, ApiErrorResult>
> => {
  return await apiCallHandler(() => postApiClient.getActive(), {
    showErrorToast: true,
    errorMessage: 'Failed to load posts',
  })
}

export const getPostByIdFn = async (
  postId: string,
): Promise<OperationResult<Post, ApiErrorResult>> => {
  return await apiCallHandler(() => postApiClient.getById(postId), {
    showErrorToast: true,
    errorMessage: 'Failed to load posts',
  })
}

export const deletePostFn = async (
  postId: string,
): Promise<OperationResult<null, ApiErrorResult>> => {
  return await apiCallHandler(() => postApiClient.delete(`${postId}`), {
    showErrorToast: true,
    errorMessage: 'Failed to delete post',
    showSuccessToast: true,
    successMessage: 'Post deleted successfully',
  })
}
