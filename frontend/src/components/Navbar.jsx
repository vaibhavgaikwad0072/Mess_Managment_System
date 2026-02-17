import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Hostel Mess</Link>
                <div className="flex gap-4">
                    <span>Welcome, {user.role}</span>
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                </div>
            </div>
        </nav>
    );
}
