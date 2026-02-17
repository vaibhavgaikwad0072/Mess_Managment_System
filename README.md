# 🍱 Hostel Mess Management System  
> **A High-Fidelity, SaaS-Inspired Solution for Modern Campus Dining.**

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind_CSS-38B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 The Vision  
**Managing a hostel mess shouldn't be a mess.**  
In large-scale student residences, the gap between students and mess management often leads to daily chaos, wasted resources, and unheard grievances. This project bridges that gap with a high-performance, transparent, and data-driven platform.

### ✨ Why This Project Impact Matters
- **Zero Friction**: From menu viewing to complaint raising, every interaction is designed for speed.
- **Data-Driven Decisions**: Admins gain real-time insights into student satisfaction and complaint trends.
- **Transparency First**: No more lost complaints or stale menus. Real-time status updates keep everyone informed.

---

## 📸 UI Showcase  

<div align="center">
  <img src="https://via.placeholder.com/800x450/3b82f6/ffffff?text=Admin+Analytics+Dashboard" width="85%" alt="Admin Dashboard" />
  <p><i><b>Admin Powerhouse:</b> Monitor meal ratings and complaint resolution velocity at a glance.</i></p>
  
  <br/>
  
  <img src="https://via.placeholder.com/800x450/10b981/ffffff?text=Student+Interface+Overview" width="85%" alt="Student Dashboard" />
  <p><i><b>Student-Centric Interface:</b> A clean, intuitive experience for daily mess activities.</i></p>
</div>

---

## 💎 Core Pillars of the System

### 🧠 Intelligent Admin Suite
- **Predictive Analytics**: Visual charts for identifying recurring mess issues.
- **Grievance Resolution Engine**: Multi-status tracking (Pending, Resolved, Action Needed).
- **Feedback Loop**: Aggregated meal ratings to optimize menu planning.

### ⚡ Seamless Student Experience
- **Interactive Daily Menu**: Real-time access to what's cooking.
- **One-Click Feedback**: Modern, animated star-rating system for every meal.
- **Transparent Complaint Portal**: Tag, track, and resolve issues without leaving the desk.

### 🔐 Engineering Excellence
- **Security-First**: JWT-based authentication with role-specific route protection.
- **Performance Optimized**: Async backend processing with FastAPI for sub-millisecond responses.
- **Modern Aesthetics**: Glassmorphism and smooth micro-animations powered by Framer Motion.

---

## 🛠️ The Professional Tech Stack

| Layer | Technology | Key Advantage |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Lightning-fast HMR and component performance. |
| **Styling** | Tailwind CSS | Utility-first design for a highly polished, responsive UI. |
| **Animations** | Framer Motion | Fluid state transitions and engaging micro-interactions. |
| **Backend** | FastAPI (Python) | High-concurrency async capabilities with auto-doc generation. |
| **Database** | SQLAlchemy + SQLite | Robust ORM for data integrity and flexible scaling. |
| **Auth** | PyJWT | Stateless, secure authentication flow. |

---

## 📂 Project Architecture

```text
Hostel_mess_Managment/
├── 🚀 backend/             # FastAPI Engine
│   ├── app/                # Core Business Logic
│   │   ├── api/            # REST Endpoints
│   │   ├── models/         # Database Schemas
│   │   └── core/           # Auth & Security
├── 🎨 frontend/            # React Client
│   ├── src/                # Component Library
│   │   ├── pages/          # Dashboard Hubs
│   │   └── context/        # Global State (Auth)
├── 📦 screenshots/         # Visual Assets
└── 🛠️ run_project.bat      # One-click startup script
```

---

## 🚦 Getting Started Locally

### 1. Prerequisites
- Python 3.9+ 🐍
- Node.js & npm 📦

### 2. Rapid Installation
```bash
# Clone and enter the vault
git clone https://github.com/vaibhavgaikwad0072/Mess_Managment_System.git
cd Mess_Managment_System

# Start the engines
.\run_project.bat
```

### 3. Demo Credentials
| Identity | Access Key (Email) | Secret (Password) |
| :--- | :--- | :--- |
| **Administrator** | `admin@example.com` | `admin123` |
| **Student** | `student@example.com` | `student123` |

---

<div align="center">
  <p>Built with ❤️ to solve real-world campus dining challenges.</p>
  <p><b>Developed by Vaibhav Gaikwad</b></p>
</div>
