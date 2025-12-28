export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Components</h1>
          <p className="text-gray-400">Browse and manage your UI components</p>
        </div>

        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold">Newest</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(item => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white">
                    {item}
                  </div>
                  <div>
                    <h3 className="font-semibold">Component {item}</h3>
                    <p className="text-xs text-gray-500">Default</p>
                  </div>
                </div>
                <div className="flex h-40 items-center justify-center rounded-lg bg-zinc-800 text-gray-500">
                  Preview Area
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Popular</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[4, 5, 6].map(item => (
              <div
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 font-semibold text-white">
                    {item}
                  </div>
                  <div>
                    <h3 className="font-semibold">Component {item}</h3>
                    <p className="text-xs text-gray-500">Default</p>
                  </div>
                </div>
                <div className="flex h-40 items-center justify-center rounded-lg bg-zinc-800 text-gray-500">
                  Preview Area
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
