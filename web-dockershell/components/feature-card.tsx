import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          {icon}
          <CardTitle className="text-white text-lg md:text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-slate-300 text-sm md:text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
