@echo off
TITLE Hostel Mess Management System Launcher

echo ===================================================
echo   Hostel Mess Management System - Launcher
echo ===================================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your PATH.
    echo Please install Python 3.9+ from https://python.org
    pause
    exit /b
)

:: Check for Node.js
timeout /t 1 >nul
echo [INFO] Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [CRITICAL ERROR] Node.js is NOT installed!
    echo.
    echo The Frontend requires Node.js and npm.
    echo.
    echo 1. Go to https://nodejs.org/
    echo 2. Download and install the LTS version.
    echo 3. RESTART this script after installation.
    echo.
    pause
    exit /b
)

echo [INFO] Node.js is installed.

:: Start Backend
echo.
echo [INFO] Starting Backend Server...
start "Hostel Mess Backend" cmd /k "cd backend && uvicorn app.main:app --reload"

:: Start Frontend
echo.
echo [INFO] Starting Frontend Server...
cd frontend
if not exist node_modules (
    echo [INFO] Installing frontend dependencies (first run only)...
    npm install
)
echo [INFO] Launching Frontend...
npm run dev

pause
