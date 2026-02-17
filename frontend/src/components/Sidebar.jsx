import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Utensils,
    MessageSquare,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const Sidebar = ({ role }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout } = useAuth();

    const adminLinks = [
        { title: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { title: 'Menu Management', icon: Utensils, path: '/admin/menu' },
        { title: 'Complaints', icon: MessageSquare, path: '/admin/complaints' },
        { title: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    ];

    const studentLinks = [
        { title: 'Dashboard', icon: LayoutDashboard, path: '/student' },
        { title: 'Mess Menu', icon: Utensils, path: '/student/menu' },
        { title: 'My Complaints', icon: MessageSquare, path: '/student/complaints' },
    ];

    const links = role === 'admin' ? adminLinks : studentLinks;

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-border transition-all duration-300 z-50 flex flex-col",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-border">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <Utensils className="text-white w-5 h-5" />
                    </div>
                    {!isCollapsed && (
                        <span className="font-bold text-lg whitespace-nowrap">Hostel Mess</span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group",
                            isActive
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        <link.icon className={cn("w-5 h-5 shrink-0")} />
                        {!isCollapsed && (
                            <span className="font-medium whitespace-nowrap">{link.title}</span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-16 bg-foreground text-background px-2 py-1 rounded text-xs invisible group-hover:visible whitespace-nowrap z-50">
                                {link.title}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-border space-y-1">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary transition-all hover:text-foreground group"
                >
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    {!isCollapsed && <span className="font-medium">Collapse</span>}
                </button>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all font-medium group"
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span>Logout</span>}
                    {isCollapsed && (
                        <div className="absolute left-16 bg-destructive text-white px-2 py-1 rounded text-xs invisible group-hover:visible whitespace-nowrap z-50">
                            Logout
                        </div>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
