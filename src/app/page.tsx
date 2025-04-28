'use client'

import { Button } from '../components'
import { showToast } from '../components/toast'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <Button
        variant="primary"
        text="Show Success Toast"
        onClick={() =>
          showToast({
            description: 'Operation was successful!',
            requestId: 'REQ12345',
            type: 'success',
          })
        }
      />

      <Button
        variant="secondary"
        text="Show Error Toast"
        onClick={() =>
          showToast({
            description: 'Something went wrong!',
            requestId: 'REQ67890',
            type: 'error',
          })
        }
      />

      <Button
        variant="primary"
        text="Show Warning Toast"
        onClick={() =>
          showToast({
            description: 'This is a warning message!',
            requestId: 'REQ54321',
            type: 'warning',
          })
        }
      />
    </div>
  )
}
