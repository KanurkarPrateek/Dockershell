"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { BookOpen, Terminal, Zap } from "lucide-react"

const navItems = [
  {
    title: "Documentation",
    href: "/docs",
    icon: BookOpen,
    description: "Complete guide and API reference",
  },
  {
    title: "Examples",
    href: "/examples",
    icon: Terminal,
    description: "Real-world usage examples",
  },
  {
    title: "Features",
    href: "/features",
    icon: Zap,
    description: "Complete feature overview",
  },
]

export function DesktopDocsNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="sticky top-8">
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-start space-x-3 p-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white",
                  )}
                >
                  <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-slate-400">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-400 mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="#installation" className="block text-slate-300 hover:text-white">
                Installation
              </Link>
              <Link href="#basic-usage" className="block text-slate-300 hover:text-white">
                Basic Usage
              </Link>
              <Link href="#advanced" className="block text-slate-300 hover:text-white">
                Advanced Features
              </Link>
              <Link href="#profiles" className="block text-slate-300 hover:text-white">
                Profiles
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  )
}
