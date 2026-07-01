@echo off
setlocal EnableExtensions
title Venuvyy Events - First-time Setup

cd /d "%~dp0"

echo.
echo  ============================================
echo    Venuvyy Events - Setup
echo  ============================================
echo.

if not exist ".env" (
    echo ERROR: .env file is missing.
    echo Create .env with DATABASE_URL, Supabase, and Clerk keys first.
    pause
    exit /b 1
)

call "%~dp0install.bat"
if errorlevel 1 exit /b 1

call "%~dp0scripts\find-npm.bat"
if errorlevel 1 exit /b 1

echo.
echo Pushing database schema to Supabase...
"%NPM_CMD%" run db:push
if errorlevel 1 (
    echo ERROR: db:push failed. Check DATABASE_URL in .env
    pause
    exit /b 1
)

echo.
echo ============================================
echo  Setup complete!
echo.
echo  Next steps:
echo  1. Create admin user in Clerk dashboard
echo     Email: adminvenuvyy@gmail.com
echo  2. Double-click start.bat to run the site
echo ============================================
echo.
pause
