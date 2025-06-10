import { CreatePostRequest, CreatePostResponse } from '../../../types/post.type'
import { httpClient } from '../http'

const ROOT = '/posts'

export const postApiClient = {
  create: (payload: CreatePostRequest): Promise<CreatePostResponse> =>
    httpClient.post<CreatePostResponse>(ROOT, payload),
}
