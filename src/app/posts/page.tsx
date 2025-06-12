'use client'

import { SendHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button, PostForm, PostList } from '../../components'
import { useCreatePost } from '../../hooks'
import { CreatePostRequest } from '../../types/post.type'

export default function Posts() {
  const { t } = useTranslation()
  const { createPost, isPending } = useCreatePost()

  return (
    <div className="flex flex-col gap-4">
      <PostForm
        onSubmit={async (data) => {
          await createPost(data as CreatePostRequest)
        }}
      >
        <Button
          type="submit"
          text={t('postsPage.postForm.createPost')}
          variant="secondary"
          icon={<SendHorizontal />}
          iconPosition="right"
          loading={isPending}
        />
      </PostForm>
      <PostList />
    </div>
  )
}
