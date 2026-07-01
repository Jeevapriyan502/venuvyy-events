@echo off
setlocal EnableExtensions
title Venuvyy Events - Install

cd /d "%~dp0"

call "%~dp0scripts\find-npm.bat"
if errorlevel 1 exit /b 1

echo Installing npm packages...
"%NPM_CMD%" install
if errorlevel 1 (
    echo ERROR: npm install failed.
    pause
    exit /b 1
)

echo.
echo Done. Run start.bat to launch the website.
pause
