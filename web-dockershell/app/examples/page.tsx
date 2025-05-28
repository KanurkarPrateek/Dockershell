import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"
import { MobileDocsNav } from "@/components/mobile-docs-nav"
import { DesktopDocsNav } from "@/components/desktop-docs-nav"
import { MobileHeader } from "@/components/mobile-header"
import { Terminal, Database, Code, Settings, Shield, Zap } from "lucide-react"

export default function ExamplesPage() {
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">Examples</h1>
              <p className="text-lg md:text-xl text-slate-300">Real-world examples and use cases for dockershell</p>
            </div>

            {/* Basic Examples */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Terminal className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-blue-400" />
                Basic Examples
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Quick Shell Access</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Get instant shell access to popular images
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Shell into Ubuntu
dockershell ubuntu:20.04

# Shell into Alpine Linux (lightweight)
dockershell alpine:latest

# Shell into CentOS
dockershell centos:8

# Shell into Debian
dockershell debian:bullseye`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Development Environments</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Access language-specific development environments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Node.js development
dockershell node:18 --mount-cwd

# Python development
dockershell python:3.9 --mount-cwd --tools curl,vim

# Go development
dockershell golang:1.19 --mount-cwd

# Rust development
dockershell rust:latest --mount-cwd`}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Advanced Examples */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Settings className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-green-400" />
                Advanced Usage
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Persistent Containers</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Keep containers running for long debugging sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Create persistent container
dockershell ubuntu:20.04 --persistent --tools curl,vim,htop

# Later, reattach to the same container
docker exec -it dockershell-ubuntu bash

# Or use dockershell again with the same image
dockershell ubuntu:20.04 --persistent`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Session Recording</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Record your debugging sessions for documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Record session for auditing
dockershell ubuntu:20.04 --record-session --tools curl,vim

# Session will be saved automatically
# Perfect for compliance and documentation`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Custom Entrypoints</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Override default entrypoints for specialized debugging
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Start with Python interpreter
dockershell python:3.9 --entrypoint "python3"

# Start with Node.js REPL
dockershell node:18 --entrypoint "node"

# Start with custom script
dockershell myimage:latest --entrypoint "/my/debug/script.sh"`}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Use Case Examples */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Code className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-purple-400" />
                Real-World Use Cases
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-lg md:text-xl">
                      <Database className="h-5 w-5 mr-2 text-blue-400" />
                      Database Debugging
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Debug database containers and inspect data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Debug PostgreSQL container
dockershell postgres:13 --tools curl,vim

# Debug MySQL container
dockershell mysql:8.0 --tools mysql-client

# Debug Redis container
dockershell redis:alpine --tools redis-tools`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-lg md:text-xl">
                      <Shield className="h-5 w-5 mr-2 text-green-400" />
                      Security Analysis
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Analyze container security and vulnerabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Security analysis with tools
dockershell ubuntu:20.04 --tools curl,wget,nmap,netstat

# Check for vulnerabilities
dockershell myapp:latest --tools docker-shell,curl

# Network debugging
dockershell alpine:latest --tools curl,wget,ping,traceroute`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-lg md:text-xl">
                      <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                      Performance Debugging
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Debug performance issues in containers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Performance monitoring
dockershell myapp:latest --tools htop,iotop,strace

# Memory analysis
dockershell myapp:latest --tools valgrind,gdb

# Network performance
dockershell myapp:latest --tools iperf3,tcpdump`}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Profile Examples */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Settings className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-orange-400" />
                Profile Management
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Creating and Using Profiles</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Save common configurations for reuse
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Create a development profile
dockershell --save-profile dev_env --mount-cwd --tools curl,vim,git,htop

# Create a debugging profile
dockershell --save-profile debug --tools docker-shell,curl,vim,strace --record-session

# Use saved profiles
dockershell ubuntu:20.04 --use-profile dev_env
dockershell myapp:latest --use-profile debug

# Combine profiles with additional options
dockershell node:18 --use-profile dev_env --persistent`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Team Profiles</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Standardize environments across your team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Frontend development profile
dockershell --save-profile frontend --mount-cwd --tools curl,vim,git --shell bash

# Backend debugging profile
dockershell --save-profile backend --tools docker-shell,curl,vim,htop,strace --record-session

# Database admin profile
dockershell --save-profile dba --tools curl,vim,mysql-client,postgresql-client

# Share profiles with team (profiles stored in ~/.dockershell_profiles)
scp ~/.dockershell_profiles teammate@server:~/`}
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Interactive Examples */}
            <section className="mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center">
                <Terminal className="h-6 md:h-8 w-6 md:w-8 mr-2 md:mr-3 text-cyan-400" />
                Interactive Features
              </h2>

              <div className="grid gap-4 md:gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Interactive Tool Selection</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Choose tools interactively instead of specifying them
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Interactive tool selection
dockershell ubuntu:20.04 --tools interactive

# This will present options like:
# [curl] [vim] [git] [htop] [strace] [gdb]
# Choose which tools to install`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Image Information</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Get detailed information about Docker images
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# Show image information before shelling in
dockershell ubuntu:20.04 --tools docker-shell

# This displays:
# - OS and distribution info
# - Image size and creation date
# - Layer information
# - Available shells
# Then drops you into the shell`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg md:text-xl">Dry Run Mode</CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      See what Docker command would be executed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      language="bash"
                      code={`# See the command without running it
dockershell ubuntu:20.04 --mount-cwd --tools curl,vim --dry-run

# Output shows the full docker run command:
# docker run --rm -it -v /current/path:/workspace -w /workspace ubuntu:20.04 bash -c "apt-get update && apt-get install -y curl vim && exec bash"`}
                    />
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
