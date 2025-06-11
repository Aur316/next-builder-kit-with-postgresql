import { Post } from '../../../generated/prisma'
import { db } from '../../../lib'
import { CreatePostRequestV1 } from '../types/post.type'

export const postRepository = {
  insert(data: CreatePostRequestV1): Promise<Post> {
    return db.post.create({ data })
  },

  fetchAll(): Promise<Array<Post>> {
    return db.post.findMany({
      orderBy: { updatedAt: 'desc' },
    })
  },

  fetchDeleted(): Promise<Array<Post>> {
    return db.post.findMany({
      where: { isDeleted: true },
      orderBy: { updatedAt: 'desc' },
    })
  },

  fetchActive(): Promise<Array<Post>> {
    return db.post.findMany({
      where: { isDeleted: false },
      orderBy: { updatedAt: 'desc' },
    })
  },

  fetchById(postId: string): Promise<Post | null> {
    return db.post.findUnique({
      where: { id: postId },
    })
  },

  softRemove(postId: string): Promise<Post> {
    return db.post.update({
      where: { id: postId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  },

  remove(postId: string): Promise<Post> {
    return db.post.delete({
      where: { id: postId },
    })
  },
}
