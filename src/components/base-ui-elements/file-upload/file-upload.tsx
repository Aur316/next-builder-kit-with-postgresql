'use client'

import { InputHTMLAttributes, useCallback, useId } from 'react'

import { File, FileImage, FileText, Music, Video, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { formatFileSize } from '../../../utils'
import { InfoBox } from '../info-box/info-box.component'

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  onFilesChange?: (files: Array<File>) => void
  containerClassName?: string
  maxFileCount?: number
  maxTotalSize?: number // in Mb
  fileError: string | null
  setFileError: (error: string | null) => void
  selectedFiles: Array<File>
  setSelectedFiles: (files: Array<File>) => void
  inputType?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  extraInputClassName?: string
  fileUploadButtonClassName?: string
  uploadButtonText: string
}

export function FileUpload({
  id,
  onFilesChange,
  onChange,
  containerClassName,
  maxFileCount,
  maxTotalSize,
  fileError,
  setFileError,
  selectedFiles,
  setSelectedFiles,
  inputType = 'info',
  extraInputClassName,
  fileUploadButtonClassName,
  uploadButtonText,
  ...props
}: FileUploadProps) {
  const { t } = useTranslation()
  const internalId = useId()
  const inputId = id ?? internalId

  const getFileIcon = useCallback((file: File) => {
    if (!file.type) {
      return <File className="size-4" />
    }
    const type = file.type.split('/')[0]
    switch (type) {
      case 'image':
        return <FileImage className="size-4" />
      case 'video':
        return <Video className="size-4" />
      case 'audio':
        return <Music className="size-4" />
      case 'text':
        return <FileText className="size-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }, [])

  const validateFiles = useCallback(
    (files: Array<File>): { isValid: boolean; error?: string } => {
      // Check file count limit
      if (maxFileCount && files.length > maxFileCount) {
        return {
          isValid: false,
          error: t('fileUpload.tooManyFiles', { maxCount: maxFileCount }),
        }
      }

      // Check total size limit
      if (maxTotalSize) {
        const totalSize = files.reduce((sum, file) => sum + file.size, 0)
        const maxSizeInBytes = maxTotalSize * 1024 * 1024
        if (totalSize > maxSizeInBytes) {
          return {
            isValid: false,
            error: t('fileUpload.totalSizeExceeded', {
              maxSize: formatFileSize(maxSizeInBytes),
            }),
          }
        }
      }

      return { isValid: true }
    },
    [maxFileCount, maxTotalSize, t],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(e.target.files || [])

      const uniqueFiles = newFiles.filter(
        (newFile) =>
          !selectedFiles.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size &&
              existingFile.lastModified === newFile.lastModified,
          ),
      )

      const updatedFiles = [...selectedFiles, ...uniqueFiles]

      // Always add files to selectedFiles, regardless of validation
      setSelectedFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
      onChange?.(e)

      // Validate the updated files and set error if needed
      const validation = validateFiles(updatedFiles)
      if (!validation.isValid) {
        setFileError(validation.error || null)
      } else {
        setFileError(null)
      }
    },
    [
      selectedFiles,
      onFilesChange,
      onChange,
      validateFiles,
      setFileError,
      setSelectedFiles,
    ],
  )

  const removeFile = useCallback(
    (fileToRemove: File) => {
      const updatedFiles = selectedFiles.filter(
        (file) =>
          !(
            file.name === fileToRemove.name &&
            file.size === fileToRemove.size &&
            file.lastModified === fileToRemove.lastModified
          ),
      )
      setSelectedFiles(updatedFiles)
      onFilesChange?.(updatedFiles)

      // Clear error if files are now valid
      if (fileError) {
        const validation = validateFiles(updatedFiles)
        if (validation.isValid) {
          setFileError(null)
        }
      }
    },
    [
      selectedFiles,
      onFilesChange,
      fileError,
      validateFiles,
      setFileError,
      setSelectedFiles,
    ],
  )

  const currentTotalSize = selectedFiles.reduce(
    (sum, file) => sum + file.size,
    0,
  )
  const isAtFileLimit = maxFileCount
    ? selectedFiles.length >= maxFileCount
    : false
  const isAtSizeLimit = maxTotalSize
    ? currentTotalSize >= maxTotalSize * 1024 * 1024
    : false

  const getBorderClass = (type: string) => {
    switch (type) {
      case 'primary':
        return 'border-primary'
      case 'secondary':
        return 'border-secondary'
      case 'accent':
        return 'border-accent'
      case 'info':
        return 'border-info'
      case 'success':
        return 'border-success'
      case 'warning':
        return 'border-warning'
      case 'error':
        return 'border-error'
      default:
        return 'border-primary'
    }
  }

  return (
    <div className={twMerge('w-full', containerClassName)}>
      <label className="flex items-center">
        <span
          className={twMerge(
            getBorderClass(inputType),
            `btn rounded-r-none border-r-0 focus:outline-none`,
            fileUploadButtonClassName,
          )}
        >
          {uploadButtonText}
        </span>
        <input
          id={inputId}
          type="file"
          className={twMerge(
            `file-input rounded-l-none border-l-0 pl-2 focus:outline-none [&::file-selector-button]:hidden`,
            getBorderClass(inputType),
            extraInputClassName,
          )}
          onChange={handleFileChange}
          disabled={isAtFileLimit || isAtSizeLimit}
          {...props}
        />
      </label>

      {(maxFileCount || maxTotalSize) && (
        <div className="mt-2 text-xs text-gray-500">
          {maxFileCount && (
            <div>
              {t('fileUpload.fileCountInfo', {
                current: selectedFiles.length,
                max: maxFileCount,
              })}
            </div>
          )}
          {maxTotalSize && (
            <div>
              {t('fileUpload.totalSizeInfo', {
                current: formatFileSize(currentTotalSize),
                max: formatFileSize(maxTotalSize * 1024 * 1024),
              })}
            </div>
          )}
        </div>
      )}

      {fileError && (
        <InfoBox
          type="error"
          title={t('fileUpload.errorTitle')}
          description={fileError}
        />
      )}

      {selectedFiles.length > 0 && (
        <>
          <h4 className="mt-4 mb-2 text-sm font-medium text-gray-400">
            {t('fileUpload.selectedFiles', { count: selectedFiles.length })}
          </h4>
          <div className="max-h-40 space-y-2 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-200">
                    {getFileIcon(file)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="p-1 text-gray-400 transition-colors hover:text-red-500"
                  type="button"
                  aria-label={t('fileUpload.removeFile', { name: file.name })}
                >
                  <X className="size-5 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
