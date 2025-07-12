'use client'

import { SendHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button, PostForm, PostList, PostSearch } from '../../components'
import { useCreatePost, useGetActivePosts } from '../../hooks'
import { PostRequest } from '../../types/post.type'

export default function Posts() {
  const { t } = useTranslation()
  const { createPost, isPending } = useCreatePost()
  const { posts, isPending: isGetPending, isError } = useGetActivePosts()

  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-4">
        <PostForm
          onSubmit={async (data) => {
            await createPost(data as PostRequest)
          }}
        >
          <Button
            type="submit"
            variant="secondary"
            icon={<SendHorizontal />}
            iconPosition="right"
            loading={isPending}
          >
            {t('postsPage.postForm.createPost')}
          </Button>
        </PostForm>
        <PostList posts={posts} isLoading={isGetPending} isError={isError} />
      </div>
      <PostSearch />
    </div>
  )
}
