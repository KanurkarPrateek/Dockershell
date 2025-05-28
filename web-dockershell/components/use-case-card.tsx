import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

interface UseCaseCardProps {
  title: string
  description: string
  command: string
}

export function UseCaseCard({ title, description, command }: UseCaseCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-slate-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock language="bash" code={command} />
      </CardContent>
    </Card>
  )
}
