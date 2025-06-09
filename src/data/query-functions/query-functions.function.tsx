import { CreatePostRequest } from '../../types/post.type'
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
