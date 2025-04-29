'use client'

import { Button } from '../../components'

export default function AboutPage() {
  return (
    <main className="bg-primary-midnight-blue-900 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 text-center text-white">
      <div className="max-w-xl space-y-6">
        <h1 className="text-3xl font-bold">About this project</h1>
        <p className="text-primary-midnight-blue-100">
          This is a clean and modular Next.js starter template built with
          TypeScript, Tailwind CSS, DaisyUI, and React Query. It follows strict
          coding conventions and includes reusable UI components, toast
          notifications, and API utilities.
        </p>
        <p className="text-primary-midnight-blue-100">
          The goal is to provide a solid foundation for rapidly building modern
          web applications with consistent patterns.
        </p>

        <div className="flex justify-center">
          <Button
            text="View Source on GitHub"
            variant="secondary"
            onClick={() =>
              window.open('https://github.com/Aur316/simple-model', '_blank')
            }
          />
        </div>
      </div>
    </main>
  )
}
