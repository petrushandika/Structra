'use client'

import { useState } from 'react'
import {
  Search,
  Home,
  Monitor,
  Layers,
  Palette,
  Bookmark,
  Sparkles,
  MessageSquare,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Main')

  const menuItems = {
    components: [
      { icon: Home, label: 'Main', href: '#' },
      { icon: Layers, label: 'UI Components', href: '#' },
      { icon: Monitor, label: 'Screens', href: '#' },
      { icon: Palette, label: 'Themes', href: '#' },
      { icon: Bookmark, label: 'BookMark', href: '#' },
    ],
    legacy: [
      { icon: Sparkles, label: 'Magic MCP', href: '#' },
      { icon: MessageSquare, label: 'Magic Chat', href: '#' },
      { icon: LogOut, label: 'Logout', href: '#' },
    ],
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center text-white">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L2 6V14L10 18L18 14V6L10 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">Personal Projects</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent flex-1 space-y-6 overflow-y-auto p-3">
        {/* Components Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 py-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              Components
            </div>
            <button className="rounded px-2 py-1 text-[10px] font-bold text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white">
              + Publish
            </button>
          </div>
          <ul className="space-y-1">
            {menuItems.components.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    'group relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    activeItem === item.label
                      ? 'bg-zinc-800 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                  )}
                  onClick={() => setActiveItem(item.label)}
                >
                  {activeItem === item.label && (
                    <div className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-blue-500" />
                  )}
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="space-y-2 border-t border-zinc-800 p-4">
        {/* Legacy Tools Section */}
        <div className="px-3 py-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Legacy Tools
          </div>
        </div>
        <ul className="space-y-1">
          {menuItems.legacy.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className={cn(
                  'group relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  activeItem === item.label
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                )}
                onClick={() => setActiveItem(item.label)}
              >
                {activeItem === item.label && (
                  <div className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-blue-500" />
                )}
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
