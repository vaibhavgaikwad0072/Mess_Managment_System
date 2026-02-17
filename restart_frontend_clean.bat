@echo off
TITLE Force Restart Frontend
echo ============================================
echo Forcing Frontend Restart with Cache Clear
echo ============================================
echo.

echo [1/4] Killing all Node processes...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node processes killed
) else (
    echo [INFO] No Node processes were running
)
timeout /t 2 /nobreak >nul

echo.
echo [2/4] Clearing Vite cache...
cd /d "%~dp0frontend"
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo [OK] Vite cache cleared
) else (
    echo [INFO] No Vite cache found
)

echo.
echo [3/4] Clearing dist folder...
if exist "dist" (
    rmdir /s /q "dist"
    echo [OK] Dist folder cleared
) else (
    echo [INFO] No dist folder found
)

echo.
echo [4/4] Starting frontend with fresh cache...
echo.
echo ============================================
echo Frontend is starting...
echo Open your browser to: http://localhost:5173
echo.
echo IMPORTANT: After the server starts:
echo 1. Open browser in INCOGNITO/PRIVATE mode
echo 2. Navigate to http://localhost:5173
echo 3. Try logging in
echo ============================================
echo.

npm run dev
