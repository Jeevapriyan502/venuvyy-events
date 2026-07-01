@echo off
setlocal EnableExtensions
title Venuvyy Events - Deploy to Vercel

cd /d "%~dp0"

call "%~dp0scripts\find-npm.bat"
if errorlevel 1 exit /b 1

echo.
echo  Step 1: Sync env vars from .env to Vercel (fixes 500 errors)
echo  Step 2: Deploy to production
echo.

"%NPM_CMD%" exec node scripts/push-vercel-env.mjs
if errorlevel 1 (
    echo.
    echo Env sync had issues. You can also add vars manually in Vercel dashboard.
    pause
)

echo.
echo  Deploying to Vercel (production)...
echo.

"%NPM_CMD%" exec vercel --prod --yes
if errorlevel 1 (
    echo.
    echo Deploy failed. Run: npx vercel login
    pause
    exit /b 1
)

echo.
echo Live site: https://venuvyy-events.vercel.app
pause
