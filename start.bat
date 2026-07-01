@echo off
setlocal EnableExtensions
title Venuvyy Events - Start

cd /d "%~dp0"

echo.
echo  ============================================
echo    Venuvyy Events
echo    Site:  http://localhost:3000
echo    Admin: http://localhost:3000/admin
echo    Sign in: http://localhost:3000/sign-in
echo  ============================================
echo.

call "%~dp0scripts\find-npm.bat"
if errorlevel 1 exit /b 1

if not exist "node_modules\" (
    echo Installing dependencies first...
    call "%~dp0install.bat"
    if errorlevel 1 exit /b 1
)

if not exist ".env" (
    echo WARNING: .env file not found. Copy .env.example or create .env with your keys.
    echo.
)

REM Clear stale Next.js dev lock if a previous server crashed
if exist ".next\dev\lock" (
    echo Clearing stale dev server lock...
    del /f /q ".next\dev\lock" >nul 2>&1
)

REM Stop anything still listening on 3000/3001 from an old run
for /f "usebackq delims=" %%P in (`powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000,3001 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique"`) do (
    echo Port in use — stopping old process PID %%P...
    taskkill /PID %%P /F >nul 2>&1
)

echo Starting development server...
echo Press Ctrl+C to stop.
echo.

"%NPM_CMD%" run dev

pause
