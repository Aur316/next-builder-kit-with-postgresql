'use client'

import { useMemo, useState } from 'react'

import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useGetByQuery } from '../../hooks/queries/posts/useGetByQuery'
import { Button, Dropdown, Input } from '../base-ui-elements'
import { PostList } from './post-list.component'

export const PostSearch = () => {
  const [titleValue, setTitleValue] = useState('')
  const [titleFilter, setTitleFilter] = useState('contains')
  const [titleMode, setTitleMode] = useState('insensitive')

  const [contentValue, setContentValue] = useState('')
  const [contentFilter, setContentFilter] = useState('contains')
  const [contentMode, setContentMode] = useState('insensitive')
  const [queryString, setQueryString] = useState<string>('')

  const { t } = useTranslation()

  const filterTypeOptions = useMemo(
    () => [
      { value: 'equals', label: t('filters.equals') },
      { value: 'contains', label: t('filters.contains') },
      { value: 'startsWith', label: t('filters.startsWith') },
      { value: 'endsWith', label: t('filters.endsWith') },
    ],
    [t],
  )

  const modeOptions = useMemo(
    () => [
      { value: 'insensitive', label: t('filters.caseInsensitive') },
      { value: 'default', label: t('filters.caseSensitive') },
    ],
    [t],
  )

  const handleSubmit = () => {
    const params = new URLSearchParams()

    if (titleValue) {
      params.set('title', `${titleFilter}::${titleMode}::${titleValue}`)
    }
    if (contentValue) {
      params.set('content', `${contentFilter}::${contentMode}::${contentValue}`)
    }

    const finalQuery = params.toString()
    setQueryString(finalQuery)
  }

  const { posts, isLoading, isError } = useGetByQuery(queryString)

  return (
    <div className="mx-auto max-w-xl space-y-6 rounded-xl border border-white p-4 shadow-md">
      {/* Title section */}
      <div className="space-y-2">
        <Input
          label={t('postsPage.postForm.title')}
          placeholder={t('postsPage.postForm.titlePlaceholder')}
          value={titleValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitleValue(e.target.value)
          }
          containerClassName="w-full"
          inputClassName="border-primary-midnight-blue-700 w-full h-8 rounded-lg border"
        />
        <div className="flex gap-2">
          <Dropdown
            label="Title filter"
            value={titleFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTitleFilter(e.target.value)
            }
            options={filterTypeOptions}
          />
          <Dropdown
            label="Title mode"
            value={titleMode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTitleMode(e.target.value)
            }
            options={modeOptions}
          />
        </div>
      </div>

      {/* Content section */}
      <div className="space-y-2">
        <Input
          label={t('postsPage.postForm.content')}
          placeholder={t('postsPage.postForm.contentPlaceholder')}
          value={contentValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContentValue(e.target.value)
          }
          containerClassName="w-full"
          inputClassName="border-primary-midnight-blue-700 w-full h-8 rounded-lg border"
        />
        <div className="flex gap-2">
          <Dropdown
            label="Content filter"
            value={contentFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setContentFilter(e.target.value)
            }
            options={filterTypeOptions}
          />
          <Dropdown
            label="Content mode"
            value={contentMode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setContentMode(e.target.value)
            }
            options={modeOptions}
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        variant="secondary"
        icon={<Search />}
        iconPosition="right"
        disabled={!titleValue && !contentValue}
        loading={isLoading}
        className="w-full"
      >
        {t('search')}
      </Button>
      {posts && (
        <PostList posts={posts} isLoading={isLoading} isError={isError} />
      )}
    </div>
  )
}
