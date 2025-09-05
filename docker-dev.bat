@echo off
title PJC Dev Mode
color 0B

echo       DEVELOPMENT MODE

docker --version >nul 2>&1
if errorlevel 1 (
    echo Docker not found
    pause
    exit /b 1
)

docker stop pjc-dev 2>nul
docker rm pjc-dev 2>nul

echo Starting dev server...
echo.
echo       http://localhost:5173
echo       Hot reload active

timeout /t 1 /nobreak > nul
start http://localhost:5173

docker run --name pjc-dev -p 5173:5173 -v "%cd%:/app" -v /app/node_modules --rm node:18-alpine sh -c "cd /app && npm install && npm run dev -- --host 0.0.0.0"