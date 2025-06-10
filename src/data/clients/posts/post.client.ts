import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsResponse,
} from '../../../types/post.type'
import { httpClient } from '../http'

const ROOT = '/posts'

export const postApiClient = {
  create: (payload: CreatePostRequest): Promise<CreatePostResponse> =>
    httpClient.post<CreatePostResponse>(ROOT, payload),

  getAll: (): Promise<GetPostsResponse> =>
    httpClient.get<GetPostsResponse>(ROOT),
}
