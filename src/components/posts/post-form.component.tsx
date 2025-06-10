'use client'

import { useForm } from '@tanstack/react-form'
import { SendHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useCreatePost } from '../../hooks'
import { Button, Input } from '../base-ui-elements'

export const PostForm = () => {
  const { createPost, isPending } = useCreatePost()
  const { t } = useTranslation()

  const form = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
    onSubmit: async ({ value }) => {
      await createPost(value)
    },
    validators: {
      onChange: ({ value }) => {
        return {
          fields: {
            title: !value.title.length && 'Title is required',
            content: !value.content.length && 'Content is required',
          },
        }
      },
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <form.Field name="title">
        {(field) => (
          <>
            <Input
              label={t('postsPage.postForm.title')}
              req
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              inputClassName="border-primary-midnight-blue-700 w-full h-8 rounded-lg border"
            />
            {!field.state.meta.isValid && (
              <em role="alert" className="text-sm text-red-500">
                {field.state.meta.errors.join(', ')}
              </em>
            )}
          </>
        )}
      </form.Field>

      <form.Field name="content">
        {(field) => (
          <>
            <Input
              label={t('postsPage.postForm.content')}
              req
              isTextArea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              inputClassName="border-primary-midnight-blue-700 w-full h-8 rounded-lg border"
            />
            {!field.state.meta.isValid && (
              <em role="alert" className="text-sm text-red-500">
                {field.state.meta.errors.join(', ')}
              </em>
            )}
          </>
        )}
      </form.Field>

      <Button
        type="submit"
        text={t('postsPage.postForm.createPost')}
        variant="secondary"
        icon={<SendHorizontal />}
        iconPosition="right"
        loading={isPending}
      />
    </form>
  )
}
