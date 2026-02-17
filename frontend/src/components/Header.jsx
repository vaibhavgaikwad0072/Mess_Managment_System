import React from 'react';
import { Bell, Search, User, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const Header = ({ title }) => {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40 flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-foreground">{title || 'Dashboard'}</h1>
            </div>

            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center bg-secondary px-3 py-1.5 rounded-lg border border-transparent focus-within:border-primary/20 transition-all">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none focus:ring-0 text-sm w-48 ml-2"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-border mx-1"></div>

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold leading-none">{user?.sub || 'Guest User'}</p>
                            <div className="flex items-center justify-end mt-1">
                                <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1",
                                    user?.role === 'admin'
                                        ? "bg-purple-100 text-purple-700"
                                        : "bg-blue-100 text-blue-700"
                                )}>
                                    {user?.role === 'admin' && <BadgeCheck className="w-2.5 h-2.5" />}
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border overflow-hidden">
                            <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
