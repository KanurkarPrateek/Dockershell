import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MobileDocsNav } from "@/components/mobile-docs-nav"
import { DesktopDocsNav } from "@/components/desktop-docs-nav"
import { ComparisonTable } from "@/components/comparison-table"
import { FeatureTable } from "@/components/feature-table"
import { MobileHeader } from "@/components/mobile-header"
import { Zap, Shield, Wrench, Terminal, Database, Code, Settings, Users } from 'lucide-react'

export default function FeaturesPage() {
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">Features</h1>
              <p className="text-lg md:text-xl text-slate-300">
                Comprehensive overview of dockershell capabilities and benefits
              </p>
            </div>

            {/* Feature Overview Table */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                Complete Feature List
              </h2>
              <FeatureTable />
            </section>

            {/* Core Features */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Zap className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-yellow-400" />
                Core Features
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-lg md:text-xl">
                      <Terminal className="h-5 w-5 mr-2 text-blue-400" />
                      Instant Shell Access
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Get immediate interactive access to any Docker image
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>
                        • Automatic detection of <code className="bg-slate-700 px-1 rounded">/bin/bash</code> or{" "}
                        <code className="bg-slate-700 px-1 rounded">/bin/sh</code>
                      </li>
                      <li>• No need to remember complex Docker flags</li>
                      <li>• Works with any Docker image</li>
                      <li>• Intelligent fallback between shell types</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-lg md:text-xl">
                      <Shield className="h-5 w-5 mr-2 text-green-400" />
                      Smart Defaults
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Sensible configuration out of the box
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>
                        • Automatic <code className="bg-slate-700 px-1 rounded">--rm</code> for cleanup
                      </li>
                      <li>
                        • Interactive mode with TTY (<code className="bg-slate-700 px-1 rounded">-it</code>)
                      </li>
                      <li>• Custom hostname for easy identification</li>
                      <li>• Proper working directory setup</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-lg md:text-xl">
                      <Wrench className="h-5 w-5 mr-2 text-purple-400" />
                      Cross-Distro Tool Injection
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Install debugging tools regardless of base OS
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>
                        • Supports <code className="bg-slate-700 px-1 rounded">apt</code> (Debian/Ubuntu)
                      </li>
                      <li>
                        • Supports <code className="bg-slate-700 px-1 rounded">yum</code> (CentOS/RHEL)
                      </li>
                      <li>
                        • Supports <code className="bg-slate-700 px-1 rounded">apk</code> (Alpine)
                      </li>
                      <li>• Common tools: curl, vim, git, htop, strace, gdb</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Advanced Features */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Settings className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-orange-400" />
                Advanced Features
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Volume Mounting</CardTitle>
                    <CardDescription className="text-sm md:text-base">Flexible file system access</CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300 mb-2 text-xs">
                          --mount-cwd
                        </Badge>
                        <p className="text-sm md:text-base">
                          Mount current directory to <code className="bg-slate-700 px-1 rounded">/workspace</code>
                        </p>
                      </div>
                      <div>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300 mb-2 text-xs">
                          --mount
                        </Badge>
                        <p className="text-sm md:text-base">
                          Custom volume mounts with <code className="bg-slate-700 px-1 rounded">host:container</code>{" "}
                          syntax
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Session Management</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Persistent containers and session recording
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <Badge variant="outline" className="border-green-500/30 text-green-300 mb-2 text-xs">
                          --persistent
                        </Badge>
                        <p className="text-sm md:text-base">Keep containers running for reattachment</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="border-green-500/30 text-green-300 mb-2 text-xs">
                          --record-session
                        </Badge>
                        <p className="text-sm md:text-base">Record shell sessions for auditing and documentation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Profile System</CardTitle>
                    <CardDescription className="text-sm md:text-base">Save and reuse configurations</CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300 mb-2 text-xs">
                          --save-profile
                        </Badge>
                        <p className="text-sm md:text-base">Save current flags as a reusable profile</p>
                      </div>
                      <div>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300 mb-2 text-xs">
                          --use-profile
                        </Badge>
                        <p className="text-sm md:text-base">Load saved profiles for consistent environments</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Developer Experience */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Code className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-cyan-400" />
                Developer Experience
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Enhanced Output</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Clear, colorful, and informative feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>• Color-coded output for warnings and errors</li>
                      <li>• Command preview before execution</li>
                      <li>• Helpful error messages with suggestions</li>
                      <li>• First-time user guidance</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Debugging Tools</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Built-in debugging and troubleshooting
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>
                        • <code className="bg-slate-700 px-1 rounded">--dry-run</code> mode to preview commands
                      </li>
                      <li>
                        • <code className="bg-slate-700 px-1 rounded">--verbose</code> for detailed output
                      </li>
                      <li>
                        • <code className="bg-slate-700 px-1 rounded">--debug</code> for full tracebacks
                      </li>
                      <li>
                        • Image information display with{" "}
                        <code className="bg-slate-700 px-1 rounded">docker-shell</code>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Interactive Features</CardTitle>
                    <CardDescription className="text-sm md:text-base">User-friendly interactive options</CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>
                        • Interactive tool selection with{" "}
                        <code className="bg-slate-700 px-1 rounded">--tools interactive</code>
                      </li>
                      <li>• Shell completion (coming soon)</li>
                      <li>• Quick help and examples</li>
                      <li>• Configurable defaults</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Comparison */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Database className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-red-400" />
                dockershell vs Docker CLI
              </h2>
              <ComparisonTable />
            </section>

            {/* Team Features */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Users className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-pink-400" />
                Team & Enterprise Features
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Standardization</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Consistent environments across teams
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>• Shared profiles for team consistency</li>
                      <li>• Standardized debugging workflows</li>
                      <li>• Onboarding new team members</li>
                      <li>• Best practices enforcement</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Compliance & Auditing</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Session recording and audit trails
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>• Session recording for compliance</li>
                      <li>• Command history and audit trails</li>
                      <li>• Documentation generation</li>
                      <li>• Security analysis workflows</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Safety & Security</CardTitle>
                    <CardDescription className="text-sm md:text-base">Built-in safety features</CardDescription>
                  </CardHeader>
                  <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm md:text-base">
                      <li>• Auto-cleanup prevents resource leaks</li>
                      <li>• Command preview reduces mistakes</li>
                      <li>• Minimal required flags</li>
                      <li>• Clear error messages</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
