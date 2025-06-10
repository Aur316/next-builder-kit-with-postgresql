'use client'

import { useState } from 'react'

import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { baseQueryStateHandlerStyle } from '../../constants'
import { useDeletePost, useGetPosts } from '../../hooks'
import { ConfirmDeleteModal } from '../base-ui-elements'
import { QueryStateHandler } from '../query-state-handler'

export const PostList = () => {
  const { t } = useTranslation()
  const { posts, isPending: isGetPending, isError: isGetError } = useGetPosts()

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const {
    deletePost,
    // isPending: isDeletePending,
    // isError: isDeleteError,
  } = useDeletePost()

  return (
    <QueryStateHandler
      isLoading={isGetPending}
      isError={isGetError}
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
          <section className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <Trash2
              size={16}
              onClick={() => {
                setSelectedPostId(post.id)
                setIsModalOpen(true)
              }}
              className="hover:text-primary-midnight-blue-500 cursor-pointer transition-colors duration-200"
            />
          </section>
          <p className="text-sm text-gray-600">{post.content}</p>
          <p className="text-xs text-gray-400">
            {post.createdAt.toLocaleDateString()}
          </p>
        </div>
      ))}
      {isModalOpen && (
        <ConfirmDeleteModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            deletePost(selectedPostId!)
            setIsModalOpen(false)
          }}
          title={t('postsPage.confirmDeleteTitle')}
          description={t('postsPage.confirmDeleteDescription')}
          confirmText={t('yes')}
          cancelText={t('no')}
        />
      )}
    </QueryStateHandler>
  )
}
