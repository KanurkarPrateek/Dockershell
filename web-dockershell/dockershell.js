#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

// Parse command line arguments
const args = process.argv.slice(2);
const image = args[0];
const options = {
  mountCwd: args.includes('--mount-cwd') || args.includes('-m'),
  network: args.includes('--network') || args.includes('-n'),
  tools: args.includes('--tools') || args.includes('-t'),
  shell: args.find(arg => arg.startsWith('--shell='))?.split('=')[1] || '/bin/bash'
};

function showHelp() {
  console.log(`
🐳 dockershell - Quick Shell into Any Image

Usage: node dockershell.js <image> [options]

Arguments:
  image                 Docker image name (e.g., ubuntu:20.04, node:18, alpine)

Options:
  -m, --mount-cwd      Mount current working directory to /workspace
  -n, --network        Enable network access (host networking)
  -t, --tools          Install common debugging tools (curl, vim, etc.)
  --shell=<shell>      Specify shell to use (default: /bin/bash)
  -h, --help           Show this help message

Examples:
  node dockershell.js ubuntu:20.04
  node dockershell.js alpine --mount-cwd --tools
  node dockershell.js node:18 -m -n --shell=/bin/sh
  node dockershell.js postgres:13 --tools
`);
}

function buildDockerCommand(image, options) {
  const cmd = ['docker', 'run'];
  
  // Always interactive with TTY
  cmd.push('-it');
  
  // Remove container after exit
  cmd.push('--rm');
  
  // Mount current directory if requested
  if (options.mountCwd) {
    const cwd = process.cwd();
    cmd.push('-v', `${cwd}:/workspace`);
    cmd.push('-w', '/workspace');
  }
  
  // Enable network access
  if (options.network) {
    cmd.push('--network', 'host');
  }
  
  // Set hostname for easier identification
  cmd.push('--hostname', 'dockershell');
  
  // Add the image
  cmd.push(image);
  
  // Install tools if requested, then start shell
  if (options.tools) {
    const installCmd = `
      echo "🔧 Installing debugging tools..." && 
      (apt-get update && apt-get install -y curl wget vim nano htop procps net-tools || 
       apk add --no-cache curl wget vim nano htop procps net-tools || 
       yum install -y curl wget vim nano htop procps net-tools || 
       echo "⚠️  Could not install tools automatically") 2>/dev/null && 
      echo "✅ Tools installed!" && 
      ${options.shell}
    `;
    cmd.push('/bin/sh', '-c', installCmd);
  } else {
    // Try different shells in order of preference
    const shellCmd = `
      if [ -x "${options.shell}" ]; then 
        exec ${options.shell}
      elif [ -x "/bin/bash" ]; then 
        exec /bin/bash
      elif [ -x "/bin/sh" ]; then 
        exec /bin/sh
      else 
        echo "No shell found!" && exit 1
      fi
    `;
    cmd.push('/bin/sh', '-c', shellCmd);
  }
  
  return cmd;
}

function runDockerShell(image, options) {
  console.log(`🚀 Launching shell into ${image}...`);
  
  if (options.mountCwd) {
    console.log(`📁 Mounting ${process.cwd()} to /workspace`);
  }
  
  if (options.network) {
    console.log(`🌐 Network access enabled`);
  }
  
  if (options.tools) {
    console.log(`🔧 Will install debugging tools`);
  }
  
  const cmd = buildDockerCommand(image, options);
  console.log(`\n💻 Running: ${cmd.join(' ')}\n`);
  
  const child = spawn(cmd[0], cmd.slice(1), {
    stdio: 'inherit',
    shell: false
  });
  
  child.on('error', (error) => {
    if (error.code === 'ENOENT') {
      console.error('❌ Docker not found. Please install Docker first.');
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
    process.exit(1);
  });
  
  child.on('exit', (code) => {
    if (code === 0) {
      console.log('\n👋 Shell session ended.');
    } else {
      console.log(`\n❌ Shell exited with code ${code}`);
    }
    process.exit(code);
  });
}

// Main execution
if (args.includes('--help') || args.includes('-h') || !image) {
  showHelp();
  process.exit(0);
}

// Validate image name
if (!image || image.startsWith('-')) {
  console.error('❌ Please provide a valid Docker image name.');
  showHelp();
  process.exit(1);
}

console.log('🐳 dockershell - Quick Shell into Any Image\n');

// Run the shell
runDockerShell(image, options);
