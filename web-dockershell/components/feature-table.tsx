import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    feature: "Instant Shell Access",
    flags: "(default)",
    description: "Auto-detects /bin/bash or /bin/sh in the image",
  },
  {
    feature: "Smart Defaults",
    flags: "(default)",
    description: "Auto --rm, -it, --hostname, mounts, working dir",
  },
  {
    feature: "Mount Current Directory",
    flags: "--mount-cwd, -c",
    description: "Mounts current directory to /workspace",
  },
  {
    feature: "Custom Volume Mounts",
    flags: "--mount, -m",
    description: "Additional host:container mounts",
  },
  {
    feature: "Tool Injection",
    flags: "--tools, -t",
    description: "Installs tools (curl, vim, etc.) inside the container",
  },
  {
    feature: "Interactive Tool Prompt",
    flags: "--tools interactive",
    description: "Choose tools to install interactively",
  },
  {
    feature: "Image Information",
    flags: "--tools docker-shell",
    description: "Prints image OS, size, creation date, layers",
  },
  {
    feature: "Persistent Container",
    flags: "--persistent",
    description: "Keeps container running, names it for easy reattach",
  },
  {
    feature: "Session Recording",
    flags: "--record-session",
    description: "Records shell session for auditing/documentation",
  },
  {
    feature: "Custom Entrypoint",
    flags: "--entrypoint",
    description: "Override default entrypoint",
  },
  {
    feature: "Profiles/Aliases",
    flags: "--save-profile, --use-profile",
    description: "Save/load reusable flag sets",
  },
  {
    feature: "Shell Type Enforcement",
    flags: "--shell [bash|sh]",
    description: "Force shell type instead of auto-detect",
  },
  {
    feature: "Auto-Cleanup",
    flags: "--auto-cleanup <duration>",
    description: "Timer-based shutdown of inactive containers",
  },
  {
    feature: "Dry Run Mode",
    flags: "--dry-run",
    description: "Show the Docker command, don't execute",
  },
  {
    feature: "Verbose/Debug Output",
    flags: "--verbose, --debug",
    description: "More detailed output for troubleshooting",
  },
]

export function FeatureTable() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg md:text-xl">Feature Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300 text-sm md:text-base min-w-[140px]">Feature</TableHead>
                <TableHead className="text-slate-300 text-sm md:text-base min-w-[160px]">CLI Flag(s) / Usage</TableHead>
                <TableHead className="text-slate-300 text-sm md:text-base min-w-[200px]">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow key={index} className="border-slate-700">
                  <TableCell className="text-white font-medium text-sm md:text-base">{feature.feature}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-blue-500/30 text-blue-300 font-mono text-xs whitespace-nowrap"
                    >
                      {feature.flags}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm md:text-base">{feature.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
