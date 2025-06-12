export type PostRequestV1 = {
  title: string
  content: string
}

export type PostResponseV1 = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}
