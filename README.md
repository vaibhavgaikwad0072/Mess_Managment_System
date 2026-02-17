# Hostel Mess Management System

A full-stack web application to manage hostel mess activities, including menu management, complaint tracking, and feedback.

## Features

- **Student Role**:
  - View Weekly Menu
  - Submit Complaints & Track Status
  - Give Feedback & Ratings
- **Admin Role**:
  - Manage Weekly Menu
  - View & Resolve Complaints
  - View Feedback Analytics
- **Security**:
  - JWT Authentication
  - Role-based Access Control

## Tech Stack

- **Backend**: FastAPI (Python), SQLAlchemy, SQLite (Dev) / PostgreSQL (Prod)
- **Frontend**: React (Vite), TailwindCSS, Axios
- **Database**: SQLite (default for easy setup)

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js & npm (for Frontend)

### 1. Backend Setup

1.  Navigate to the project root.
2.  Install dependencies:
    ```bash
    pip install -r backend/requirements.txt
    ```
3.  Initialize the database:
    ```bash
    # Run from the project root
    python -m backend.app.initial_data
    ```
    *Note: If you encounter module errors, ensure your PYTHONPATH includes the backend directory or run as above.*
4.  Start the server:
    ```bash
    # Run from the backend directory to avoid import errors
    cd backend
    uvicorn app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.
    Swagger UI: `http://localhost:8000/docs`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    # If PowerShell restricts scripts, use CMD:
    cmd /c "npm run dev"
    # Otherwise:
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## Default Login Credentials

(You need to sign up first using the API or Frontend)

1.  **Student Service**: Go to `/signup` or use the frontend Sign Up (if implemented) or use Swagger UI to create a user.
2.  **Admin Service**: To create an admin, you may need to manually update the database or use a superuser creation script (not included in this resume demo, but you can modify the database directly).

## Project Structure

- `backend/app`: FastAPI application source code.
- `frontend/src`: React application source code.


