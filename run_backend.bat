@echo off
TITLE Hostel Mess Management - Backend
echo Starting Backend Server...
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause
