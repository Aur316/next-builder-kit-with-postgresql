import {
  GetPostsResponse,
  Post,
  PostRequest,
  PostResponse,
} from '../../../types/post.type'
import { httpClient } from '../http'

const ROOT = '/posts'

export const postApiClient = {
  create: (payload: PostRequest): Promise<PostResponse> =>
    httpClient.post<PostResponse>(ROOT, payload),

  getAll: (): Promise<GetPostsResponse> =>
    httpClient.get<GetPostsResponse>(`${ROOT}/all`),

  getDeleted: (): Promise<GetPostsResponse> =>
    httpClient.get<GetPostsResponse>(`${ROOT}/deleted`),

  getActive: (): Promise<GetPostsResponse> =>
    httpClient.get<GetPostsResponse>(`${ROOT}/active`),

  getById: (postId: string): Promise<Post> =>
    httpClient.get<Post>(`${ROOT}/byId/${postId}`),

  getByQuery: (query: string): Promise<GetPostsResponse> =>
    httpClient.get<GetPostsResponse>(`${ROOT}/search?${query}`),

  softDelete: (postId: string): Promise<null> =>
    httpClient.patch<null>(`${ROOT}/${postId}/softDelete`, {}),

  delete: (postId: string): Promise<null> =>
    httpClient.delete<null>(`${ROOT}/${postId}`, {}),

  update: (post: Post): Promise<Post> => httpClient.patch(ROOT, post),
}
