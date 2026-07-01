@echo off
setlocal EnableExtensions
title Venuvyy Events - Stop

cd /d "%~dp0"

echo.
echo  Stopping Venuvyy Events dev server...
echo.

for /f "usebackq delims=" %%P in (`powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000,3001 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique"`) do (
  echo Killing process PID %%P on port 3000/3001...
  taskkill /PID %%P /F >nul 2>&1
)

if exist ".next\dev\lock" del /f /q ".next\dev\lock" >nul 2>&1

echo.
echo  Done. You can run start.bat again.
echo.
pause
