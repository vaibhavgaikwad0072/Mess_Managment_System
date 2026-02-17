import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Mail, Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(credentials.email, credentials.password);
            toast.success("Welcome back!");
            // Navigation is handled by AppRoutes useEffect usually, 
            // but we can force it here for immediate feedback
            // (user.role will be available after login)
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[440px] z-10"
            >
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-4 scale-110">
                        <Utensils className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Hostel Mess</h1>
                    <p className="text-muted-foreground mt-2 font-medium">Modern Management for Mess Services</p>
                </div>

                {/* Card */}
                <div className="bg-white p-8 rounded-3xl border border-border shadow-xl shadow-slate-200/50">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            Welcome Back <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>👋</motion.span>
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    required
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm font-medium"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-bold text-foreground">Password</label>
                                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm font-medium"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 ml-1">
                            <input type="checkbox" className="rounded-md border-border text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                            <span className="text-sm text-muted-foreground font-medium">Remember for 30 days</span>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg shadow-primary/20 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign in</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            SECURE AUTHENTICATION ACTIVE
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Create account</Link>
                        </p>
                    </div>
                </div>

                {/* Footer links */}
                <div className="mt-8 flex justify-center gap-6 text-xs font-medium text-muted-foreground">
                    <a href="#" className="hover:text-foreground">Terms of Service</a>
                    <span>•</span>
                    <a href="#" className="hover:text-foreground">Privacy Policy</a>
                    <span>•</span>
                    <a href="#" className="hover:text-foreground">Support</a>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
