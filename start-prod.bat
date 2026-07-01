@echo off
setlocal EnableExtensions
title Venuvyy Events - Production

cd /d "%~dp0"

call "%~dp0scripts\find-npm.bat"
if errorlevel 1 exit /b 1

if not exist ".next\" (
    echo No build found. Running build first...
    call "%~dp0build.bat"
    if errorlevel 1 exit /b 1
)

echo.
echo  ============================================
echo    Venuvyy Events (production mode)
echo    Site: http://localhost:3000
echo  ============================================
echo.

"%NPM_CMD%" run start
pause
