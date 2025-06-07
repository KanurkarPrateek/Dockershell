# Dockershell

<p align="center">
  <img src="./Assets/GitHub Banner.png" alt="Dockershell GitHub Banner" style="max-width:100%; height:auto;">
</p>


Quick Shell into Any Docker Image
=================================

**dockershell** is a Python CLI tool that gives you instant interactive access to any Docker image with sensible defaults and powerful debugging tools. Stop writing complex `docker run` commands—get a shell in any image with just one command!

---

## Feature Overview

| Feature                       | CLI Flag(s) / Usage                 | Description |
|-------------------------------|-------------------------------------|-------------|
| Instant Shell Access          | *(default)*                          | Auto-detects `/bin/bash` or `/bin/sh` in the image |
| Smart Defaults                | *(default)*                          | Auto `--rm`, `-it`, `--hostname`, mounts, working dir |
| Mount Current Directory       | `--mount-cwd`, `-c`                  | Mounts current directory to `/workspace` |
| Custom Volume Mounts          | `--mount`, `-m`                      | Additional host:container mounts |
| Tool Injection                | `--tools`, `-t`                      | Installs tools (curl, vim, etc.) inside the container |
| Interactive Tool Prompt       | `--tools interactive`                | Choose tools to install interactively |
| Image Information             | `--tools docker-shell`               | Prints image OS, size, creation date, layers |
| Persistent Container          | `--persistent`                       | Keeps container running, names it for easy reattach |
| Session Recording             | `--record-session`                   | Records shell session for auditing/documentation |
| Custom Entrypoint             | `--entrypoint`                       | Override default entrypoint |
| Profiles/Aliases              | `--save-profile`, `--use-profile`    | Save/load reusable flag sets |
| Shell Type Enforcement        | `--shell [bash|sh]`                  | Force shell type instead of auto-detect |
| Auto-Cleanup                  | `--auto-cleanup <duration>`          | Timer-based shutdown of inactive containers |
| Distro Emulation              | `--emulate-distro <name>`            | Simulate other OS distros (experimental) |
| Dry Run Mode                  | `--dry-run`                          | Show the Docker command, don’t execute |
| Verbose/Debug Output          | `--verbose`, `--debug`               | More detailed output for troubleshooting |
| Version                       | `--version`                          | Print dockershell version |
| **One-Click GitHub Shell**    | `--github <repo_url>`                | Instantly shell into any GitHub repo with a Dockerfile |

---

## One-Click Shell for GitHub Repos

**dockershell** can instantly drop you into a shell for any GitHub repository that contains a Dockerfile. No manual cloning or building required!

### How it Works
- Clones the specified GitHub repo to a temporary directory.
- Builds the Docker image from the repo’s Dockerfile.
- Starts an interactive shell inside the built image, with all dockershell features available.
- Cleans up the temp directory after your session.

### Usage Example

```bash
python3 dockershell.py --github https://github.com/username/repo.git
```

- This command will:
  1. Clone the repo
  2. Build the Docker image
  3. Drop you into a shell inside the built container

### Comparison: Raw Docker vs. Dockershell

| Task                                   | Docker CLI Example                                                                                                                                      | Dockershell Example                                 |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Shell into a GitHub repo with Dockerfile| `git clone https://github.com/username/repo.git && cd repo && docker build -t myrepo . && docker run -it --rm myrepo /bin/bash`                         | `dockershell --github https://github.com/username/repo.git` |

- **Dockershell**: One command, no manual cleanup, auto-detects shell, supports all other dockershell options.
- **Docker CLI**: Multiple commands, manual cleanup, must specify shell, no tool injection or advanced features.

---

---

## Why Use Dockershell?

**dockershell** is designed to make working with Docker images as fast, easy, and powerful as possible. Here’s why you’ll love it:

- **Zero Docker Run Headaches:** No more memorizing or copying long `docker run` commands. Just use one short, smart command for any image.
- **Instant Debugging & Prototyping:** Quickly drop into a shell in any image—perfect for debugging, exploring, or trying out new tools.
- **Cross-Distro Tooling:** Need `curl`, `vim`, or `git` in any container? dockershell injects them for you, regardless of the base OS (supports apt, yum, apk).
- **Smart Volume Mounting:** Mount your current project directory with a single flag. No more path confusion.
- **Profiles & Reuse:** Save your favorite flags and setups as profiles. Onboard new team members instantly with ready-to-use environments.
- **Persistent & Auditable Sessions:** Keep containers alive for long debugging, or record your session for compliance and documentation.
- **Rich Developer Experience:** Colorful output, helpful errors, onboarding tips, and a dry-run mode make every workflow smoother.
- **Perfect for Teams:** Standardize dev, test, and debug workflows across your organization. Share profiles, scripts, and best practices.
- **Safe by Default:** Auto-cleanup, clear command previews, and minimal flags reduce mistakes and surprises.

Whether you’re a developer, SRE, data scientist, or just Docker-curious, dockershell gives you the fastest, friendliest way to interact with any Docker image.

---

## Dockershell vs. Docker

| Task                       | Docker CLI Example                                                                                                                                          | Dockershell Example                                   |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| **Shell into Ubuntu**      | `docker run --rm -it ubuntu:20.04 /bin/bash`<br>(or `/bin/sh` if bash not present)                                                                          | `dockershell ubuntu:20.04`                           |
| **Mount current directory**| `docker run --rm -it -v "$PWD":/workspace -w /workspace ubuntu:20.04 /bin/bash`                                                                            | `dockershell ubuntu:20.04 --mount-cwd`               |
| **Install curl, vim**      | `docker run --rm -it ubuntu:20.04 bash -c "apt-get update && apt-get install -y curl vim && exec bash"`                                                    | `dockershell ubuntu:20.04 --tools curl,vim`           |
| **Show image info**        | `docker image inspect ubuntu:20.04`<br>`docker history -q ubuntu:20.04`                                                                                      | `dockershell ubuntu:20.04 --tools docker-shell`       |
| **Persistent container**   | `docker run -it --name mydev ubuntu:20.04 /bin/bash`<br>*(then reattach with)*<br>`docker exec -it mydev /bin/bash`                                          | `dockershell ubuntu:20.04 --persistent`               |
| **Record session**         | `docker run --rm -it ubuntu:20.04 bash -c "apt-get update && apt-get install -y script && exec script -q /session.log /bin/bash"`                         | `dockershell ubuntu:20.04 --record-session`           |
| **Custom entrypoint**      | `docker run --rm -it --entrypoint python3 myimage:latest`                                                                                                   | `dockershell myimage:latest --entrypoint "python3"` |
| **Profiles/Aliases**       | *(Manual scripting, no built-in support)*                                                                                                                   | `dockershell --save-profile dev_env ...`<br>`dockershell --use-profile dev_env myimage` |
| **Dry run (show command)** | *(No built-in, must echo or script)*                                                                                                                        | `dockershell ubuntu:20.04 --dry-run`                  |

**dockershell** provides a dramatically simpler, safer, and more memorable workflow for all your Docker image exploration and debugging needs.

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
- `--mount-cwd`, `-c`: Mounts your current directory to `/workspace` and sets it as the working directory.
- `--mount`, `-m`: Additional volume mounts (`host_path:container_path`). Can be used multiple times.
- `--tools`, `-t`: Comma-separated list of tools to install (e.g. `curl,vim`).
    - Special keyword: `docker-shell` — displays image info before shelling in.
    - Special value: `interactive` — interactively choose common tools to install.
- `--persistent`: Keep the container running after shell exit. Assigns a unique name for reattachment.
- `--record-session`: Record the shell session using `script` or similar tool. Output saved for auditing/documentation.
- `--entrypoint`: Override the default container entrypoint (advanced debugging).
- `--save-profile <name>`: Save current flags as a reusable profile with the given name.
- `--use-profile <name>`: Use a saved profile by name, merging its flags with provided ones.
- `--shell [bash|sh]`: Force shell type instead of auto-detection.
- `--auto-cleanup <duration>`: Auto-stop/remove container after specified inactivity duration (e.g. `10m`).
- `--emulate-distro <name>`: Simulate a different OS distro using debootstrap/distrobox (experimental).
- `--dry-run`: Show the full Docker command that would run, without executing it.
- `--verbose`: Show more detailed output for debugging.
- `--debug`: Show debug information and full tracebacks.
- `--version`: Show dockershell version and exit.

---

## Advanced Usage Examples

### Persistent Container
```bash
dockershell ubuntu:20.04 --persistent
# Reattach later:
docker exec -it dockershell-ubuntu bash
```

### Record Session
```bash
dockershell ubuntu:20.04 --record-session
```

### Custom Entrypoint
```bash
dockershell myimage:latest --entrypoint "python3"
```

### Interactive Tool Prompt
```bash
dockershell --tools interactive
# Presents: [curl] [vim] [git] [htop] — choose which to install
```

### Profiles
```bash
dockershell --save-profile dev_env --tools curl,vim --mount-cwd
dockershell --use-profile dev_env myimage
```

### Shell Type Enforcement
```bash
dockershell ubuntu:20.04 --shell bash
```

### Container Auto-Cleanup
```bash
dockershell ubuntu --auto-cleanup 10m
```

### Dry Run Mode
```bash
dockershell ubuntu:20.04 --dry-run
```

---

## Developer Experience Enhancements

- **Helpful Error Messages:** Clear, actionable errors for common issues (e.g., missing Docker, bad image name).
- **Verbose & Debug Flags:** Use `--verbose` or `--debug` for more detailed output and troubleshooting.
- **Command Preview:** The final Docker command is always shown before execution.
- **Color Output:** Uses color for warnings, errors, and highlights (via `colorama` if available).
- **First-Time User Guidance:** Friendly onboarding message with config/profile location and shell completion tip.
- **Version Flag:** `--version` prints the current version.
- **Configurable Defaults:** Profiles/configs are stored at `~/.dockershell_profiles`.
- **Shell Completion:** (Coming soon!)
- **Quick Help & Examples:** Try `dockershell --help` or `dockershell --examples` for quick reference.

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

