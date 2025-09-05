@echo off
title PJC Desaparecidos - Docker
color 0A

echo       PJC DESAPARECIDOS - DOCKER

echo [1/4] Checking Docker...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker not running. Start Docker Desktop and retry.
    pause
    exit /b 1
)

echo [2/4] Cleaning up...
docker stop pjc-container 2>nul
docker rm pjc-container 2>nul

echo [3/4] Building image...
docker build -t pjc-desaparecidos . --quiet
if errorlevel 1 (
    echo BUILD FAILED - Check errors above
    pause
    exit /b 1
)

echo [4/4] Starting application...
echo.
echo       http://localhost:3000
echo       Ctrl+C to stop

timeout /t 2 /nobreak > nul
start http://localhost:3000

docker run --name pjc-container -p 3000:80 --rm pjc-desaparecidos