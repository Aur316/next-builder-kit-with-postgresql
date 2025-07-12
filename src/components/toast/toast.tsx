import { memo } from 'react'

import { CircleAlert, CircleCheck, Copy } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 5000,
        closeButton: true,
      }}
      icons={{
        success: (
          <CircleCheck className="text-primary-midnight-blue-900" size={18} />
        ),
        error: (
          <CircleAlert
            className="text-secondary-red-900 stroke-current"
            size={18}
          />
        ),
        warning: (
          <CircleAlert className="text-secondary-desert-orange-800" size={18} />
        ),
      }}
    />
  )
}

type ToastTypes = 'success' | 'error' | 'warning'

interface IToastProps {
  description?: string
  requestId?: string
  type?: ToastTypes
}

export const showToast = ({
  description,
  requestId,
  type = 'success',
}: IToastProps) => {
  const copy = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    if (requestId) {
      await navigator.clipboard.writeText(requestId)
    }
  }

  const toastContent = (
    <Toast type={type} description={description} requestId={requestId} />
  )

  const toastConfig =
    type === 'error' ? { action: <CopyButton onClick={copy} /> } : {}

  const toastMethod = toast[type] || toast.success
  toastMethod(toastContent, toastConfig)
}

export const Toast = ({ description, requestId, type }: IToastProps) => {
  const textColor =
    type === 'success'
      ? 'text-primary-midnight-blue-900'
      : type === 'error'
        ? 'text-secondary-red-900'
        : 'text-secondary-desert-orange-800'
  return (
    <div className={twMerge(`flex flex-col text-sm`, textColor)}>
      {description && <span className="font-bold">{description}</span>}
      {requestId && <span>Request ID: {requestId}</span>}
    </div>
  )
}

interface CopyButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const CopyButton = memo(function CopyButton({ onClick }: CopyButtonProps) {
  return (
    <div
      onClick={onClick}
      className="hover:border-primary-midnight-blue-600 text-primary-midnight-blue-900 active:text-primary-midnight-blue-600 active:bg-primary-midnight-blue-300 ml-auto rounded-lg border border-transparent bg-transparent p-2 hover:cursor-pointer"
    >
      <Copy size={18} />
    </div>
  )
})
