'use client'

import React, { PropsWithChildren } from 'react'

import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'

import { PostRequest } from '../../types/post.type'
import { Input } from '../base-ui-elements'

type UpdatePostRequest = PostRequest & { id: string }

type PostFormInput = PostRequest | UpdatePostRequest

interface BasePostFormProps {
  id?: string
  title?: string
  content?: string
  onSubmit: (data: PostFormInput) => Promise<void>
}

type PostFormProps = PropsWithChildren<BasePostFormProps>

export const PostForm = ({
  children,
  id,
  title,
  content,
  onSubmit,
}: PostFormProps) => {
  const { t } = useTranslation()

  const form = useForm({
    defaultValues: {
      title: title ?? '',
      content: content ?? '',
    },

    onSubmit: async ({ value }) => {
      await onSubmit(
        id ? ({ ...value, id } as UpdatePostRequest) : (value as PostRequest),
      )
      form.reset()
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
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) =>
            !value.trim().length && t('postsPage.postFormErrors.title'),
        }}
      >
        {(field) => (
          <React.Fragment>
            <Input
              label={t('postsPage.postForm.title')}
              placeholder={t('postsPage.postForm.titlePlaceholder')}
              required
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              inputClassName="border-primary-midnight-blue-700 w-full h-8 rounded-lg border"
            />
            {!field.state.meta.isValid && (
              <em role="alert" className="text-sm text-red-500">
                {field.state.meta.errors.join(', ')}
              </em>
            )}
          </React.Fragment>
        )}
      </form.Field>

      <form.Field
        name="content"
        validators={{
          onChange: ({ value }) =>
            !value.trim().length && t('postsPage.postFormErrors.content'),
        }}
      >
        {(field) => (
          <React.Fragment>
            <Input
              label={t('postsPage.postForm.content')}
              placeholder={t('postsPage.postForm.contentPlaceholder')}
              required
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
          </React.Fragment>
        )}
      </form.Field>

      {children}
    </form>
  )
}
