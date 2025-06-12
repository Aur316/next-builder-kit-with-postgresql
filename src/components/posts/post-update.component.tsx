'use client'

import { SendHorizontal } from 'lucide-react'
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
    <BaseModal title="Update post" open={open} onClose={onClose} closeOnEscape>
      <PostForm
        id={post.id}
        title={post.title}
        content={post.content}
        onSubmit={async (data) => {
          await updatePost(data as Post)
        }}
      >
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            text={'Cancel'}
            onClick={onClose}
          />
          <Button
            type="submit"
            text={t('postsPage.postForm.createPost')}
            variant="secondary"
            icon={<SendHorizontal />}
            iconPosition="right"
            loading={isPending}
          />
        </div>
      </PostForm>
    </BaseModal>
  )
}
