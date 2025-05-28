import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { MobileDocsNav } from "@/components/mobile-docs-nav"
import { DesktopDocsNav } from "@/components/desktop-docs-nav"
import { FeatureTable } from "@/components/feature-table"
import { MobileHeader } from "@/components/mobile-header"
import { Terminal, Download, Settings, Wrench } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <MobileHeader />

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Mobile Navigation */}
        <div className="md:hidden mb-6">
          <MobileDocsNav />
        </div>

        <div className="flex gap-8">
          {/* Desktop Navigation */}
          <DesktopDocsNav />

          <main className="flex-1 max-w-none md:max-w-4xl">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">Documentation</h1>
              <p className="text-lg md:text-xl text-slate-300">
                Complete guide to using dockershell for Docker container interaction
              </p>
            </div>

            {/* Installation */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Download className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-blue-400" />
                Installation
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Run as Python Script (Recommended)</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Works on all platforms with Python 3.6+
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Download the script
curl -O https://raw.githubusercontent.com/user/dockershell/main/dockershell.py

# Make it executable
chmod +x dockershell.py

# Run it
python3 dockershell.py <image> [options]`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Install as System-wide CLI</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      For convenient access from anywhere
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Copy to system PATH
sudo cp dockershell.py /usr/local/bin/dockershell
sudo chmod +x /usr/local/bin/dockershell

# Now use anywhere
dockershell ubuntu:20.04`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Build .deb Package (Debian/Ubuntu)</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      For package management integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# See the dockershell_1.0.0 directory for packaging files
# Requires dpkg-deb
dpkg-deb --build dockershell_1.0.0
sudo dpkg -i dockershell_1.0.0.deb`}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Feature Overview */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Settings className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-green-400" />
                Feature Overview
              </h2>
              <FeatureTable />
            </section>

            {/* Basic Usage */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Terminal className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-yellow-400" />
                Basic Usage
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Simple Shell Access</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Get instant shell access to any Docker image
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Shell into Ubuntu
dockershell ubuntu:20.04

# Shell into Alpine Linux
dockershell alpine:latest

# Shell into Node.js environment
dockershell node:18`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Mount Current Directory</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Access your project files inside the container
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Mount current directory to /workspace
dockershell ubuntu:20.04 --mount-cwd

# Short form
dockershell ubuntu:20.04 -c`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Install Debugging Tools</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Automatically install common tools across different distros
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Install specific tools
dockershell ubuntu:20.04 --tools curl,vim,git

# Interactive tool selection
dockershell ubuntu:20.04 --tools interactive

# Show image information
dockershell ubuntu:20.04 --tools docker-shell`}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Command Line Options */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Wrench className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-purple-400" />
                Command Line Options
              </h2>

              <div className="space-y-4 md:space-y-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Core Options</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300 w-fit text-xs">
                        image
                      </Badge>
                      <span className="text-sm md:text-base">
                        (required) Docker image to shell into (e.g. ubuntu:20.04)
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300 w-fit text-xs">
                        --mount-cwd, -c
                      </Badge>
                      <span className="text-sm md:text-base">
                        Mount current directory to /workspace and set as working directory
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300 w-fit text-xs">
                        --mount, -m
                      </Badge>
                      <span className="text-sm md:text-base">
                        Additional volume mounts (host_path:container_path). Can be used multiple times
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-blue-500/30 text-blue-300 w-fit text-xs">
                        --tools, -t
                      </Badge>
                      <span className="text-sm md:text-base">
                        Comma-separated list of tools to install (e.g. curl,vim)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Advanced Options</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-green-500/30 text-green-300 w-fit text-xs">
                        --persistent
                      </Badge>
                      <span className="text-sm md:text-base">
                        Keep container running after shell exit. Assigns unique name for reattachment
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-green-500/30 text-green-300 w-fit text-xs">
                        --record-session
                      </Badge>
                      <span className="text-sm md:text-base">Record shell session for auditing/documentation</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-green-500/30 text-green-300 w-fit text-xs">
                        --entrypoint
                      </Badge>
                      <span className="text-sm md:text-base">
                        Override default container entrypoint (advanced debugging)
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-green-500/30 text-green-300 w-fit text-xs">
                        --save-profile &lt;name&gt;
                      </Badge>
                      <span className="text-sm md:text-base">Save current flags as a reusable profile</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-green-500/30 text-green-300 w-fit text-xs">
                        --use-profile &lt;name&gt;
                      </Badge>
                      <span className="text-sm md:text-base">Use a saved profile by name</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Utility Options</h3>
                  <div className="space-y-3 text-slate-300">
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 w-fit text-xs">
                        --shell [bash|sh]
                      </Badge>
                      <span className="text-sm md:text-base">Force shell type instead of auto-detection</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 w-fit text-xs">
                        --auto-cleanup &lt;duration&gt;
                      </Badge>
                      <span className="text-sm md:text-base">
                        Auto-stop/remove container after inactivity (e.g. 10m)
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 w-fit text-xs">
                        --dry-run
                      </Badge>
                      <span className="text-sm md:text-base">Show Docker command without executing it</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 w-fit text-xs">
                        --verbose
                      </Badge>
                      <span className="text-sm md:text-base">Show detailed output for debugging</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 w-fit text-xs">
                        --version
                      </Badge>
                      <span className="text-sm md:text-base">Show dockershell version and exit</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
