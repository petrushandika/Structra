import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">🧠 Structra</h1>
        <p className="text-xl mb-8">
          AI-powered UI Structure Engineering Engine
        </p>
        <div className="space-y-4">
          <p>
            Structra is ready! Start building your frontend application.
          </p>
          <div className="flex gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">Documentation</Button>
          </div>
          <p className="text-sm text-gray-500">
            Check the documentation in <code>docs/</code> folder for more information.
          </p>
        </div>
      </div>
    </main>
  )
}

