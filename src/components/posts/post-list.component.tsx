'use client'

import { useTranslation } from 'react-i18next'

import { baseQueryStateHandlerStyle } from '../../constants'
import { useGetPosts } from '../../hooks'
import { QueryStateHandler } from '../query-state-handler'

export const PostList = () => {
  const { t } = useTranslation()
  const { posts, isLoading, isError } = useGetPosts()

  return (
    <QueryStateHandler
      isLoading={isLoading}
      isError={isError}
      isEmpty={!posts || !posts.length}
      errorMessage={t('queryStateHandler.errorMessage')}
      emptyMessage={t('queryStateHandler.emptyMessage')}
      style={baseQueryStateHandlerStyle}
    >
      {posts?.map((post) => (
        <div
          key={post.id}
          className="rounded-lg border border-gray-300 p-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.content}</p>
          <p className="text-xs text-gray-400">
            {post.createdAt.toLocaleDateString()}
          </p>
        </div>
      ))}
    </QueryStateHandler>
  )
}
