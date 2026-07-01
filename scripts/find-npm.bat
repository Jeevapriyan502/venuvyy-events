@echo off
REM Finds npm.cmd on Windows (works when PowerShell blocks "npm")
set "NPM_CMD="

where npm.cmd >nul 2>&1
if not errorlevel 1 (
    set "NPM_CMD=npm.cmd"
    exit /b 0
)

if exist "C:\Program Files\nodejs\npm.cmd" (
    set "NPM_CMD=C:\Program Files\nodejs\npm.cmd"
    exit /b 0
)

echo ERROR: Node.js / npm not found.
echo Install from https://nodejs.org then restart this script.
exit /b 1
