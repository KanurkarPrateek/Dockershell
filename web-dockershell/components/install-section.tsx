"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"

export function InstallSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get Started</h2>
          <p className="text-xl text-slate-300">Choose your preferred installation method</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
              <TabsTrigger value="npm" className="data-[state=active]:bg-slate-700">
                npm
              </TabsTrigger>
              <TabsTrigger value="curl" className="data-[state=active]:bg-slate-700">
                curl
              </TabsTrigger>
              <TabsTrigger value="git" className="data-[state=active]:bg-slate-700">
                Git
              </TabsTrigger>
            </TabsList>

            <TabsContent value="npm" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Install via npm</CardTitle>
                  <CardDescription>Global installation for easy access</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language="bash"
                    code={`# Install globally
npm install -g dockershell

# Or use npx (no installation required)
npx dockershell ubuntu:20.04`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curl" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Install via curl</CardTitle>
                  <CardDescription>Direct download and install</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language="bash"
                    code={`# Download and install
curl -fsSL https://raw.githubusercontent.com/user/dockershell/main/install.sh | bash

# Make it executable
chmod +x ~/.local/bin/dockershell`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="git" className="mt-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Clone from Git</CardTitle>
                  <CardDescription>Get the latest development version</CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    language="bash"
                    code={`# Clone the repository
git clone https://github.com/user/dockershell.git
cd dockershell

# Run directly
node dockershell.js ubuntu:20.04`}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
