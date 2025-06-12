import { Post, Prisma } from '../../../generated/prisma'
import { db } from '../../../lib'
import { PostRequestV1 } from '../types/post.type'

export const postRepository = {
  insert(data: PostRequestV1): Promise<Post> {
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

  fetchByQuery(query: Record<string, string>): Promise<Array<Post>> {
    const whereRaw: Record<string, unknown> = {}

    for (const [key, rawValue] of Object.entries(query)) {
      if (!rawValue) continue

      const value = decodeURIComponent(rawValue)

      if (value === 'true' || value === 'false') {
        whereRaw[key] = value === 'true'
      } else if (!isNaN(Number(value))) {
        whereRaw[key] = Number(value)
      } else if (value.includes('::')) {
        const [filterType, mode, actualValue] = value.split('::')
        whereRaw[key] = {
          [filterType]: actualValue,
          mode: mode as 'insensitive' | 'default',
        }
      } else {
        whereRaw[key] = {
          contains: value,
          mode: 'insensitive',
        }
      }
    }
    whereRaw.isDeleted = false
    const where: Prisma.PostWhereInput = whereRaw

    return db.post.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
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

  update(data: Partial<Post>): Promise<Post> {
    return db.post.update({
      where: { id: data.id },
      data,
    })
  },
}
