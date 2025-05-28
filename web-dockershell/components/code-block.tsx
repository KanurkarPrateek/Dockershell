"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs md:text-sm text-slate-400 font-mono">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="h-3 md:h-4 w-3 md:w-4 text-green-400" />
            ) : (
              <Copy className="h-3 md:h-4 w-3 md:w-4" />
            )}
          </Button>
        </div>
        <div className="overflow-x-auto">
          <pre className="p-3 md:p-4">
            <code className="text-xs md:text-sm text-slate-300 font-mono whitespace-pre">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
