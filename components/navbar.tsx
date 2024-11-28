'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Star, Clock, Settings } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Favorites', href: '/favorites', icon: Star },
  { name: 'Recent', href: '/recent', icon: Clock },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Weather App
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-primary-foreground text-primary'
                    : 'hover:bg-primary-foreground hover:text-primary'
                }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

