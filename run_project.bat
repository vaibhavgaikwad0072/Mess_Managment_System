@echo off
TITLE Hostel Mess Management - All in One
echo Starting ALL Servers...

start "Hostel Backend" cmd /k "run_backend.bat"
start "Hostel Frontend" cmd /k "run_frontend.bat"

echo.
echo Servers are launching in separate windows.
echo Backend: Docs at http://127.0.0.1:8000/docs
echo Frontend: App at http://localhost:5173
echo.
pause
