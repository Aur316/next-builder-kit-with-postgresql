'use client'

import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useUpdatePost } from '../../hooks'
import { Post } from '../../types/post.type'
import { BaseModal, Button } from '../base-ui-elements'
import { PostForm } from './post-form.component'

interface UpdateModalProps {
  open: boolean
  onClose: () => void
  post: Post
}

export const PostUpdate = ({ open, onClose, post }: UpdateModalProps) => {
  const { updatePost, isPending } = useUpdatePost()
  const { t } = useTranslation()

  return (
    <BaseModal
      title={t('postsPage.updatePost.modalTitle')}
      open={open}
      onClose={onClose}
      closeOnEscape
      extraStyles="bg-primary-midnight-blue-900"
    >
      <PostForm
        id={post.id}
        title={post.title}
        content={post.content}
        onSubmit={async (data) => {
          await updatePost(data as Post)
          onClose()
        }}
      >
        <div className="justify-space-between flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            text={t('cancel')}
            onClick={onClose}
          />
          <Button
            type="submit"
            size="sm"
            text={t('confirm')}
            variant="secondary"
            icon={<Check />}
            iconPosition="right"
            loading={isPending}
          />
        </div>
      </PostForm>
    </BaseModal>
  )
}
