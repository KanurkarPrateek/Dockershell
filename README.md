# Dockershell

Quick Shell into Any Docker Image
=================================

**dockershell** is a Python CLI tool that gives you instant interactive access to any Docker image with sensible defaults and powerful debugging tools. Stop writing complex `docker run` commands—get a shell in any image with just one command!

---

## Features

- **Instant Shell Access:** One simple command for any image, with automatic detection of `/bin/bash` or `/bin/sh`.
- **Smart Defaults:** Interactive mode, automatic cleanup, and sensible working directory.
- **Automatic Volume Mounting:** Use `--mount-cwd` to mount your current directory to `/workspace` and set it as the working directory inside the container.
- **Custom Volume Mounts:** Use `--mount` for additional host:container mounts.
- **Tool Injection:** Use `--tools` to install debugging tools (like `curl`, `vim`) across distros (`apt`, `yum`, `apk` supported).
- **Amazing Feature:** If you include `docker-shell` in the `--tools` list, dockershell will display image info (OS, size, creation date, layers) before launching the shell.

---

## Why dockershell?

- No more memorizing `docker run` flags
- Automatic shell detection
- Cross-distro tool injection
- Instant workspace mapping
- Perfect for debugging, prototyping, and quick exploration

---

## Installation

### Run as a Python script (recommended for all platforms)

```bash
python3 dockershell.py <image> [options]
```

### (Optional) Install as a system-wide CLI

1. Copy or symlink `dockershell.py` to a directory in your `$PATH`, e.g. `/usr/local/bin/dockershell`.
2. Make it executable:
   ```bash
   chmod +x /usr/local/bin/dockershell
   ```
3. Now you can use `dockershell` anywhere.

### (Advanced) Build as a .deb package (Debian/Ubuntu)

See the `dockershell_1.0.0` directory for packaging files. Requires `dpkg-deb`.

---

## Usage

### Basic Example

```bash
# Instantly shell into Ubuntu with your current directory mounted:
dockershell ubuntu:20.04 --mount-cwd
```

### Inject Debugging Tools

```bash
dockershell ubuntu:20.04 --tools curl,vim
```

### Show Image Info (Amazing Feature)

```bash
dockershell ubuntu:20.04 --tools docker-shell
```

### Mount Extra Volumes

```bash
dockershell ubuntu:20.04 --mount /tmp:/mnt/tmp --mount-cwd
```

---

## Command Line Options

- `image` (required): Docker image to shell into (e.g. `ubuntu:20.04`)
- `--mount-cwd`: Mounts your current directory to `/workspace` and sets it as the working directory.
- `--mount`, `-m`: Additional volume mounts (`host_path:container_path`). Can be used multiple times.
- `--tools`, `-t`: Comma-separated list of tools to install (e.g. `curl,vim`).
    - Special keyword: `docker-shell` — displays image info before shelling in.

---

## Contributing

Pull requests are welcome! To contribute:

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## License

MIT License

