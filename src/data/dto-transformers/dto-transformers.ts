import { GetPostsResponse, Post } from '../../types/post.type'

export const mapGetPostsResponseToPostList = (
  data: GetPostsResponse,
): Array<Post> => {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    createdAt: new Date(item.createdAt),
  }))
}
