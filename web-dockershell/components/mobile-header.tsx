"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Terminal, Menu, Github, Download } from "lucide-react"
import Link from "next/link"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="md:hidden border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="h-6 w-6 text-blue-400" />
          <span className="text-lg font-bold text-white">dockershell</span>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
            v1.0.0
          </Badge>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="text-slate-300">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-slate-900 border-slate-700 w-80">
            <div className="flex flex-col space-y-6 mt-6">
              <div className="flex items-center space-x-2">
                <Terminal className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold text-white">dockershell</span>
              </div>

              <nav className="flex flex-col space-y-4">
                <Link
                  href="/docs"
                  className="text-slate-300 hover:text-white transition-colors text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Documentation
                </Link>
                <Link
                  href="/examples"
                  className="text-slate-300 hover:text-white transition-colors text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Examples
                </Link>
                <Link
                  href="/features"
                  className="text-slate-300 hover:text-white transition-colors text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
              </nav>

              <div className="flex flex-col space-y-3 pt-4 border-t border-slate-700">
                <Button variant="ghost" className="text-slate-300 hover:text-white justify-start">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
