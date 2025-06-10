export type CreatePostRequest = {
  title: string
  content: string
}

export type CreatePostResponse = {
  id: string
  title: string
  content: string
  createdAt: string
}

export type GetPostsResponse = Array<CreatePostResponse>

export type Post = {
  id: string
  title: string
  content: string
  createdAt: Date
}
