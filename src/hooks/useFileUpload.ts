import { useState } from 'react'

interface FileUploadHook {
  fileError: string | null
  setFileError: (error: string | null) => void
  selectedFiles: Array<File>
  setSelectedFiles: (files: Array<File>) => void
}

export function useFileUpload(): FileUploadHook {
  const [fileError, setFileError] = useState<string | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])

  return { fileError, setFileError, selectedFiles, setSelectedFiles }
}
