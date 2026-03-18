@echo off
TITLE Hostel Mess Management - All in One
echo Starting ALL Servers...

start "Hostel Backend" /d "%~dp0backend" cmd /k "python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
start "Hostel Frontend" /d "%~dp0frontend" cmd /k "npm.cmd run dev -- --host"

echo.
echo Servers are launching in separate windows.
echo Backend: Docs at http://127.0.0.1:8000/docs
echo Frontend: App at http://localhost:5173
echo.
pause
