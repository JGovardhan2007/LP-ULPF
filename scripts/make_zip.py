import os
import zipfile

out_dir = r"c:\Users\Govardhan\lp-ulpf\LP-ULPF\public\assets\downloads"
os.makedirs(out_dir, exist_ok=True)
zip_path = os.path.join(out_dir, "ulpf-container-release.zip")

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("docker-compose.yml", """version: "3.8"
services:
  ulpf-core:
    image: ntro/ulpf-core:latest
    container_name: ulpf-engine
    ports:
      - "5140:5140/udp"
      - "8080:8080"
    environment:
      - RUST_LOG=info
      - OCSF_VERSION=1.1.0
      - STORAGE_MODE=dual_snappy
    restart: always
""")
    z.writestr("deploy.sh", """#!/bin/bash
echo "[+] Starting Universal Log Preprocessing Framework (ULPF)..."
docker-compose up -d
echo "[+] Web Console online at http://localhost:8080"
""")
    z.writestr("deploy.ps1", """Write-Host "[+] Starting Universal Log Preprocessing Framework (ULPF)..." -ForegroundColor Cyan
docker-compose up -d
Write-Host "[+] Web Console online at http://localhost:8080" -ForegroundColor Green
""")
    z.writestr("README.md", """# Universal Log Preprocessing Framework (ULPF / WEED)
NTRO 26156 - Production Air-Gapped Release

Quickstart:
  docker-compose up -d
Access Console:
  http://localhost:8080
""")

print("ZIP ready at:", zip_path)
