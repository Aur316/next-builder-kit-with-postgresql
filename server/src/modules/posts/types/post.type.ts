export type CreatePostRequestV1 = {
  title: string
  content: string
}

export type CreatePostResponseV1 = {
  id: string
  title: string
  content: string
  createdAt: string
}
