@echo off
TITLE Hostel Mess Management - Frontend
echo Starting Frontend Server...
cd /d "%~dp0frontend"
cmd /k "npm.cmd run dev -- --host"
pause
