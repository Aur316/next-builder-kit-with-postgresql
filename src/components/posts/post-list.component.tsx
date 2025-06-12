'use client'

import React, { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Pen, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { baseQueryStateHandlerStyle } from '../../constants'
import { useGetActivePosts, useSoftDeletePost } from '../../hooks'
import { ConfirmDeleteModal, IconWrapper } from '../base-ui-elements'
import { QueryStateHandler } from '../query-state-handler'
import { PostUpdate } from './post-update.component'

export const PostList = () => {
  const { t } = useTranslation()
  const {
    posts,
    isPending: isGetPending,
    isError: isGetError,
  } = useGetActivePosts()

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const { softDeletePost, isPending: isDeletePending } = useSoftDeletePost()

  const selectedPost = posts?.find((p) => p.id === selectedPostId)
  return (
    <QueryStateHandler
      isLoading={isGetPending}
      isError={isGetError}
      isEmpty={!posts || !posts.length}
      errorMessage={t('queryStateHandler.errorMessage')}
      emptyMessage={t('queryStateHandler.emptyMessage')}
      style={baseQueryStateHandlerStyle}
    >
      <AnimatePresence>
        {posts?.map((post) => (
          <React.Fragment key={post.id}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="rounded-lg border border-gray-300 p-4 shadow-sm"
            >
              <section className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <div className="flex items-center gap-1">
                  <IconWrapper
                    Icon={Pen}
                    onClick={() => {
                      setSelectedPostId(post.id)
                      setIsUpdateModalOpen(true)
                    }}
                  />

                  <IconWrapper
                    Icon={Trash2}
                    onClick={() => {
                      setSelectedPostId(post.id)
                      setIsDeleteModalOpen(true)
                    }}
                  />
                </div>
              </section>
              <p className="text-sm text-gray-600">{post.content}</p>
              <p className="text-xs text-gray-400">
                {post.createdAt.toLocaleDateString()}
              </p>
            </motion.div>
            {isUpdateModalOpen && selectedPost && (
              <PostUpdate
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                post={selectedPost}
              />
            )}
            {isDeleteModalOpen && (
              <ConfirmDeleteModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                  softDeletePost(selectedPostId!)
                  setIsDeleteModalOpen(false)
                }}
                title={t('postsPage.confirmDeleteTitle')}
                description={t('postsPage.confirmDeleteDescription')}
                confirmText={t('yes')}
                cancelText={t('no')}
                pending={isDeletePending}
              />
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </QueryStateHandler>
  )
}
