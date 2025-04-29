'use client'

import { useState } from 'react'

import { MousePointerClick } from 'lucide-react'

import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Toggle,
  showToast,
} from '../components'
import { DROPDOWN_OPTIONS } from '../constants'

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const triggerToast = () => {
    showToast({
      type: 'success',
      description: 'You successfully triggered a toast.',
    })
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Simple Model</h1>
        <p className="text-primary-midnight-blue-100 mt-2 max-w-md text-sm">
          This is a clean starter template with TypeScript, Tailwind, DaisyUI,
          reusable components and best practices.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          text="Click Me"
          variant="secondary"
          icon={<MousePointerClick />}
          iconPosition="left"
          onClick={triggerToast}
        />
        <Input
          label="Your Name"
          placeholder="John Doe"
          inputClassName="border-primary-midnight-blue-700 w-[180px] rounded-xl border"
        />
        <Toggle text="Enable notifications" />
        <Dropdown
          label="Choose one"
          value={selectedItem ?? undefined}
          onValueChange={setSelectedItem}
          options={DROPDOWN_OPTIONS}
        />
        <Checkbox text="I agree to the terms" />
      </div>
    </div>
  )
}
