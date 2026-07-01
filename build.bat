@echo off
setlocal EnableExtensions
title Venuvyy Events - Build

cd /d "%~dp0"

call "%~dp0scripts\find-npm.bat"
if errorlevel 1 exit /b 1

echo Building production bundle...
"%NPM_CMD%" run build
if errorlevel 1 (
    echo ERROR: Build failed.
    pause
    exit /b 1
)

echo.
echo Build succeeded. Run start-prod.bat to serve locally.
pause
