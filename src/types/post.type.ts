export type PostRequest = {
  title: string
  content: string
}

export type PostResponse = {
  id: string
  title: string
  content: string
  createdAt: string
}

export type GetPostsResponse = Array<PostResponse>

export type Post = {
  id: string
  title: string
  content: string
  createdAt: Date
}
