import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

const comparisons = [
  {
    task: "Shell into Ubuntu",
    docker: `docker run --rm -it ubuntu:20.04 /bin/bash
(or /bin/sh if bash not present)`,
    dockershell: "dockershell ubuntu:20.04",
  },
  {
    task: "Mount current directory",
    docker: `docker run --rm -it -v "$PWD":/workspace -w /workspace ubuntu:20.04 /bin/bash`,
    dockershell: "dockershell ubuntu:20.04 --mount-cwd",
  },
  {
    task: "Install curl, vim",
    docker: `docker run --rm -it ubuntu:20.04 bash -c "apt-get update && apt-get install -y curl vim && exec bash"`,
    dockershell: "dockershell ubuntu:20.04 --tools curl,vim",
  },
  {
    task: "Show image info",
    docker: `docker image inspect ubuntu:20.04
docker history -q ubuntu:20.04`,
    dockershell: "dockershell ubuntu:20.04 --tools docker-shell",
  },
  {
    task: "Persistent container",
    docker: `docker run -it --name mydev ubuntu:20.04 /bin/bash
# then reattach with
docker exec -it mydev /bin/bash`,
    dockershell: "dockershell ubuntu:20.04 --persistent",
  },
  {
    task: "Custom entrypoint",
    docker: "docker run --rm -it --entrypoint python3 myimage:latest",
    dockershell: 'dockershell myimage:latest --entrypoint "python3"',
  },
  {
    task: "Dry run (show command)",
    docker: "(No built-in, must echo or script)",
    dockershell: "dockershell ubuntu:20.04 --dry-run",
  },
]

export function ComparisonTable() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg md:text-xl">dockershell vs Docker CLI: Real-World Examples</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 md:space-y-8">
          {comparisons.map((comparison, index) => (
            <div key={index} className="border border-slate-700 rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">{comparison.task}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-red-300 mb-2">Docker CLI</h4>
                  <CodeBlock language="bash" code={comparison.docker} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-300 mb-2">dockershell</h4>
                  <CodeBlock language="bash" code={comparison.dockershell} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
