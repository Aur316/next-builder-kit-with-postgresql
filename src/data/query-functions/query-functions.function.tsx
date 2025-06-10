import { CreatePostRequest, GetPostsResponse } from '../../types/post.type'
import { apiCallHandler } from '../api-call-handler/api-handler'
import { postApiClient } from '../clients'

export const createPostFn = async (payload: CreatePostRequest) => {
  return await apiCallHandler(() => postApiClient.create(payload), {
    showErrorToast: true,
    errorMessage: 'Failed to create post',
    showSuccessToast: true,
    successMessage: 'Post created successfully',
  })
}

export const getPostsFn = async () => {
  return await apiCallHandler<GetPostsResponse>(() => postApiClient.getAll(), {
    showErrorToast: true,
    errorMessage: 'Failed to load posts',
  })
}
