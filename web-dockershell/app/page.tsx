import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Zap, Shield, Wrench, Download, Github, ArrowRight, BookOpen } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { FeatureCard } from "@/components/feature-card"
import { ComparisonTable } from "@/components/comparison-table"
import { MobileHeader } from "@/components/mobile-header"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Desktop Header */}
      <header className="hidden md:block border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">dockershell</span>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              v1.0.0
            </Badge>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/docs" className="text-slate-300 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/examples" className="text-slate-300 hover:text-white transition-colors">
              Examples
            </Link>
            <Link href="/features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader />

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Quick Shell into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}
                Any Docker Image
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 leading-relaxed px-2">
              A Python CLI tool that gives you instant interactive access to any Docker image with sensible defaults and
              powerful debugging tools. Stop writing complex{" "}
              <code className="bg-slate-800 px-2 py-1 rounded text-blue-300">docker run</code> commands—get a shell in
              any image with just one command!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-base md:text-lg px-6 md:px-8 py-3"
                asChild
              >
                <Link href="/docs">
                  <BookOpen className="h-4 md:h-5 w-4 md:w-5 mr-2" />
                  Get Started
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 text-base md:text-lg px-6 md:px-8 py-3"
                asChild
              >
                <Link href="/examples">
                  <Terminal className="h-4 md:h-5 w-4 md:w-5 mr-2" />
                  View Examples
                </Link>
              </Button>
            </div>

            {/* Hero Code Example */}
            <div className="max-w-full md:max-w-2xl mx-auto px-2">
              <CodeBlock
                language="bash"
                code={`# Instead of this mess:
docker run --rm -it -v "$PWD":/workspace -w /workspace ubuntu:20.04 /bin/bash

# Just do this:
dockershell ubuntu:20.04 --mount-cwd`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Dockershell */}
      <section className="py-12 md:py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Why Use Dockershell?</h2>
            <p className="text-lg md:text-xl text-slate-300 px-2">
              Designed to make working with Docker images fast, easy, and powerful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<Zap className="h-6 md:h-8 w-6 md:w-8 text-yellow-400" />}
              title="Zero Docker Run Headaches"
              description="No more memorizing or copying long docker run commands. Just use one short, smart command for any image."
            />
            <FeatureCard
              icon={<Terminal className="h-6 md:h-8 w-6 md:w-8 text-blue-400" />}
              title="Instant Debugging & Prototyping"
              description="Quickly drop into a shell in any image—perfect for debugging, exploring, or trying out new tools."
            />
            <FeatureCard
              icon={<Wrench className="h-6 md:h-8 w-6 md:w-8 text-green-400" />}
              title="Cross-Distro Tooling"
              description="Need curl, vim, or git in any container? dockershell injects them for you, regardless of the base OS."
            />
            <FeatureCard
              icon={<Shield className="h-6 md:h-8 w-6 md:w-8 text-purple-400" />}
              title="Smart Volume Mounting"
              description="Mount your current project directory with a single flag. No more path confusion."
            />
            <FeatureCard
              icon={<BookOpen className="h-6 md:h-8 w-6 md:w-8 text-orange-400" />}
              title="Profiles & Reuse"
              description="Save your favorite flags and setups as profiles. Onboard new team members instantly."
            />
            <FeatureCard
              icon={<Terminal className="h-6 md:h-8 w-6 md:w-8 text-cyan-400" />}
              title="Safe by Default"
              description="Auto-cleanup, clear command previews, and minimal flags reduce mistakes and surprises."
            />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Dockershell vs Docker CLI</h2>
            <p className="text-lg md:text-xl text-slate-300 px-2">See the dramatic difference in complexity</p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-12 md:py-16 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Quick Start</h2>
            <p className="text-lg md:text-xl text-slate-300 px-2">Get up and running in seconds</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <Download className="h-5 w-5 mr-2 text-blue-400" />
                  Installation
                </CardTitle>
                <CardDescription className="text-sm md:text-base">Run as a Python script (recommended)</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="bash"
                  code={`# Download the script
curl -O https://raw.githubusercontent.com/user/dockershell/main/dockershell.py

# Make it executable
chmod +x dockershell.py

# Run it
python3 dockershell.py ubuntu:20.04`}
                />
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <Terminal className="h-5 w-5 mr-2 text-green-400" />
                  Basic Usage
                </CardTitle>
                <CardDescription className="text-sm md:text-base">Your first dockershell command</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="bash"
                  code={`# Shell into Ubuntu with current directory mounted
dockershell ubuntu:20.04 --mount-cwd

# Install debugging tools
dockershell ubuntu:20.04 --tools curl,vim

# Show image information
dockershell ubuntu:20.04 --tools docker-shell`}
                />
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base md:text-lg px-6 md:px-8" asChild>
              <Link href="/docs">
                Read Full Documentation
                <ArrowRight className="h-4 md:h-5 w-4 md:w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 px-2">
            Ready to Simplify Your Docker Workflow?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Join developers who have streamlined their Docker debugging and exploration with dockershell.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-base md:text-lg px-6 md:px-8 py-3">
              <Download className="h-4 md:h-5 w-4 md:w-5 mr-2" />
              Download Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 text-base md:text-lg px-6 md:px-8 py-3"
            >
              <Github className="h-4 md:h-5 w-4 md:w-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold text-white">dockershell</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-slate-400 text-sm">
              <Link href="/docs" className="hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/examples" className="hover:text-white transition-colors">
                Examples
              </Link>
              <Link href="/features" className="hover:text-white transition-colors">
                Features
              </Link>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
