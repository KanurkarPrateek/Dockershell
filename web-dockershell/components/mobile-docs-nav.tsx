"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Terminal, Zap, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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

export function MobileDocsNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
          <Menu className="h-4 w-4 mr-2" />
          Navigation
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-slate-900 border-slate-700 w-80">
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
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
              <Link
                href="#installation"
                className="block text-slate-300 hover:text-white py-1"
                onClick={() => setIsOpen(false)}
              >
                Installation
              </Link>
              <Link
                href="#basic-usage"
                className="block text-slate-300 hover:text-white py-1"
                onClick={() => setIsOpen(false)}
              >
                Basic Usage
              </Link>
              <Link
                href="#advanced"
                className="block text-slate-300 hover:text-white py-1"
                onClick={() => setIsOpen(false)}
              >
                Advanced Features
              </Link>
              <Link
                href="#profiles"
                className="block text-slate-300 hover:text-white py-1"
                onClick={() => setIsOpen(false)}
              >
                Profiles
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
