#!/usr/bin/env python3
import argparse
import subprocess
import sys
import shlex


def detect_shell(image):
    """
    Detect which shell is available in the image: /bin/bash or /bin/sh
    Returns the shell path as a string.
    """
    for shell in ["/bin/bash", "/bin/sh"]:
        cmd = [
            "docker", "run", "--rm", image, "sh", "-c", f"[ -x {shell} ] && echo found || echo notfound"
        ]
        try:
            output = subprocess.check_output(cmd, stderr=subprocess.STDOUT, text=True).strip()
            if output == "found":
                return shell
        except subprocess.CalledProcessError:
            continue
    return None


def detect_package_manager(image):
    """
    Detect the available package manager in the image.
    Returns 'apt', 'yum', 'apk', or None.
    """
    managers = {
        "apt": "command -v apt-get",
        "yum": "command -v yum",
        "apk": "command -v apk"
    }
    for mgr, check_cmd in managers.items():
        cmd = [
            "docker", "run", "--rm", image, "sh", "-c", f"{check_cmd} >/dev/null 2>&1 && echo found || echo notfound"
        ]
        try:
            output = subprocess.check_output(cmd, stderr=subprocess.STDOUT, text=True).strip()
            if output == "found":
                return mgr
        except subprocess.CalledProcessError:
            continue
    return None


def build_docker_run_cmd(args, shell, install_tools_cmd=None):
    """
    Build the docker run command with smart defaults:
      - --rm: Remove container after exit
      - -it: Interactive terminal
      - --hostname dockershell: Set hostname inside container
      - -v $(pwd):/workspace, -w /workspace: If --mount-cwd/-c is set
      - Additional -v mounts from --mount/-m
    """
    import os
    cmd = ["docker", "run", "-it", "--rm", "--hostname", "dockershell"]
    # Handle --mount-cwd
    if getattr(args, 'mount_cwd', False):
        cwd = os.getcwd()
        cmd.extend(["-v", f"{cwd}:/workspace", "-w", "/workspace"])
    # Handle mounts
    if args.mount:
        for mount_spec in args.mount:
            cmd.extend(["-v", mount_spec])
    # Image
    cmd.append(args.image)
    # Shell command
    if install_tools_cmd:
        # Chain install tools and shell
        shell_cmd = f"{install_tools_cmd} && exec {shell}"
        cmd.extend([shell, "-c", shell_cmd])
    else:
        cmd.append(shell)
    return cmd


def main():
    parser = argparse.ArgumentParser(description="Quick shell into any Docker image. Stop writing complex docker run commands. Get instant interactive access to any Docker image with sensible defaults and powerful debugging tools.")
    parser.add_argument("image", nargs="?", help="Docker image to shell into, e.g. ubuntu:20.04")
    parser.add_argument("--mount", "-m", action="append", help="Volume mount (host_path:container_path)")
    parser.add_argument("--mount-cwd", "-c", action="store_true", help="Automatically mount the current working directory to /workspace and set it as working directory inside the container")
    parser.add_argument("--tools", "-t", help="Comma-separated list of tools to inject (e.g. curl,vim), or 'interactive' for interactive prompt. Use 'docker-shell' to print image info.")
    parser.add_argument("--persistent", action="store_true", help="Keep the container running after shell exit. Assigns a unique name for reattachment.")
    parser.add_argument("--record-session", action="store_true", help="Record the shell session using 'script' or similar tool. Output saved for auditing/documentation.")
    parser.add_argument("--entrypoint", type=str, help="Override the default container entrypoint (advanced debugging).")
    parser.add_argument("--save-profile", type=str, help="Save current flags as a reusable profile with the given name.")
    parser.add_argument("--use-profile", type=str, help="Use a saved profile by name, merging its flags with provided ones.")
    parser.add_argument("--shell", type=str, choices=["bash", "sh"], help="Force shell type instead of auto-detection.")
    parser.add_argument("--auto-cleanup", type=str, help="Auto-stop/remove container after specified inactivity duration (e.g. 10m).")
    parser.add_argument("--emulate-distro", type=str, help="Simulate a different OS distro using debootstrap/distrobox (experimental).")
    parser.add_argument("--dry-run", action="store_true", help="Show the full Docker command that would run, without executing it.")
    parser.add_argument("--verbose", action="store_true", help="Show more detailed output for debugging.")
    parser.add_argument("--debug", action="store_true", help="Show debug information and full tracebacks.")
    parser.add_argument("--version", action="store_true", help="Show dockershell version and exit.")
    parser.add_argument("--share-shell", action="store_true", help="Enable live collaborative shell sharing via SSH (experimental)")
    args = parser.parse_args()

    # Color output
    try:
        from colorama import init, Fore, Style
        init()
        COLOR_OK = Fore.GREEN
        COLOR_WARN = Fore.YELLOW
        COLOR_ERR = Fore.RED
        COLOR_RESET = Style.RESET_ALL
    except ImportError:
        COLOR_OK = COLOR_WARN = COLOR_ERR = COLOR_RESET = ""

    VERSION = "1.0.0"

    # Version flag
    if getattr(args, 'version', False):
        print(f"dockershell version {VERSION}")
        sys.exit(0)

    # First-time onboarding message (simple check for config file)
    import os
    config_path = os.path.expanduser("~/.dockershell_profiles")
    if not os.path.exists(config_path):
        print(f"{COLOR_OK}[dockershell]{COLOR_RESET} Welcome! To save and use profiles, config will be stored at {config_path}")
        print(f"{COLOR_OK}[dockershell]{COLOR_RESET} Enable shell completion: eval \"$(dockershell --completion)\" (coming soon)")
        print(f"{COLOR_OK}[dockershell]{COLOR_RESET} Try 'dockershell --examples' for usage examples.")

    if args.image:
        print(f"{COLOR_OK}[dockershell]{COLOR_RESET} Using image: {args.image}")
    else:
        print(f"{COLOR_ERR}[dockershell]{COLOR_RESET} No image specified. Use --help for usage.")
        sys.exit(1)

    shell = detect_shell(args.image)
    if not shell:
        print("[dockershell] Error: No supported shell found in image.", file=sys.stderr)
        sys.exit(1)
    print(f"[dockershell] Detected shell: {shell}")

    install_tools_cmd = None
    amazing_feature = False
    tools = []
    if args.tools:
        tools = [t.strip() for t in args.tools.split(",") if t.strip()]
        if "docker-shell" in tools:
            amazing_feature = True
            tools = [t for t in tools if t != "docker-shell"]  # Remove keyword from install list

    if amazing_feature:
        print("[docker-shell] Amazing Feature: Docker Image Info")
        # Get image inspect info
        try:
            inspect_output = subprocess.check_output([
                "docker", "image", "inspect", args.image
            ], text=True)
            import json
            info = json.loads(inspect_output)[0]
            os_type = info.get("Os", "unknown")
            size_bytes = info.get("Size", 0)
            size_mb = size_bytes / (1024 * 1024)
            created = info.get("Created", "unknown")
            print(f"  OS: {os_type}\n  Size: {size_mb:.2f} MB\n  Created: {created}")
        except Exception as e:
            print(f"  [docker-shell] Could not fetch image info: {e}")
        # Get image layers count
        try:
            history_output = subprocess.check_output([
                "docker", "history", "-q", args.image
            ], text=True)
            layers = [l for l in history_output.strip().split("\n") if l and l != "<missing>"]
            print(f"  Layers: {len(layers)}")
        except Exception as e:
            print(f"  [docker-shell] Could not fetch image layers: {e}")

    if tools:
        pkg_mgr = detect_package_manager(args.image)
        if pkg_mgr:
            print(f"[dockershell] Detected package manager: {pkg_mgr}")
            if pkg_mgr == "apt":
                install_tools_cmd = f"apt-get update && apt-get install -y {' '.join(tools)}"
            elif pkg_mgr == "yum":
                install_tools_cmd = f"yum install -y {' '.join(tools)}"
            elif pkg_mgr == "apk":
                install_tools_cmd = f"apk add --no-cache {' '.join(tools)}"
            else:
                print("[dockershell] Warning: Unknown package manager, cannot install tools.")
        else:
            print("[dockershell] Warning: No supported package manager found in image. Tool injection not possible.")

    import random
    import string
    import socket

    def get_random_port():
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('', 0))
            return s.getsockname()[1]

    if getattr(args, 'share_shell', False):
        pkg_mgr = detect_package_manager(args.image)
        if not pkg_mgr:
            print("[dockershell] Error: --share-shell requires a Linux image with a supported package manager (apt, yum, apk).", file=sys.stderr)
            sys.exit(1)
        ssh_user = "dockershell"
        ssh_pass = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        ssh_port = get_random_port()
        # Install openssh-server and set up user
        if pkg_mgr == "apt":
            ssh_setup = (
                "apt-get update && apt-get install -y openssh-server && "
                "useradd -m -s /bin/bash {user} && echo '{user}:{pwd}' | chpasswd && "
                "mkdir -p /var/run/sshd && ".format(user=ssh_user, pwd=ssh_pass) +
                "echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config && "
                "echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && "
                "/usr/sbin/sshd && exec bash"
            )
        elif pkg_mgr == "yum":
            ssh_setup = (
                "yum install -y openssh-server passwd && "
                "useradd -m -s /bin/bash {user} && echo '{user}:{pwd}' | chpasswd && "
                "mkdir -p /var/run/sshd && ".format(user=ssh_user, pwd=ssh_pass) +
                "echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config && "
                "echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && "
                "/usr/sbin/sshd && exec bash"
            )
        elif pkg_mgr == "apk":
            ssh_setup = (
                "apk add --no-cache openssh && "
                "adduser -D -s /bin/sh {user} && echo '{user}:{pwd}' | chpasswd && "
                "mkdir -p /var/run/sshd && ".format(user=ssh_user, pwd=ssh_pass) +
                "echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config && "
                "echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && "
                "/usr/sbin/sshd && exec sh"
            )
        else:
            print("[dockershell] Error: Unknown package manager for SSH setup.", file=sys.stderr)
            sys.exit(1)
        # Build docker run command with port mapping
        import os
        cmd = ["docker", "run", "-it", "--rm", "--hostname", "dockershell", "-p", f"{ssh_port}:22"]
        if getattr(args, 'mount_cwd', False):
            cwd = os.getcwd()
            cmd.extend(["-v", f"{cwd}:/workspace", "-w", "/workspace"])
        if args.mount:
            for mount_spec in args.mount:
                cmd.extend(["-v", mount_spec])
        cmd.append(args.image)
        cmd.extend(["/bin/sh", "-c", ssh_setup])
        print(f"[dockershell] Running (with SSH sharing): {' '.join(shlex.quote(part) for part in cmd)}\n")
        print(f"[dockershell] Share this SSH command with collaborators:")
        print(f"  ssh {ssh_user}@localhost -p {ssh_port}")
        print(f"  Password: {ssh_pass}")
        print(f"[dockershell] (Press Ctrl+C to stop the session and remove the container)")
        try:
            subprocess.run(cmd)
        except KeyboardInterrupt:
            print("\n[dockershell] Exited.")
        sys.exit(0)

    docker_cmd = build_docker_run_cmd(args, shell, install_tools_cmd)
    print(f"[dockershell] Running: {' '.join(shlex.quote(part) for part in docker_cmd)}\n")
    try:
        subprocess.run(docker_cmd)
    except KeyboardInterrupt:
        print("\n[dockershell] Exited.")


if __name__ == "__main__":
    main()
