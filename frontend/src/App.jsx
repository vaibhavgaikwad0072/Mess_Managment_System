import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            />
        </div>
    );

    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

    return children;
};

const PageTransition = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

const AnimatedRoutes = () => {
    const location = useLocation();
    const { user } = useAuth();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/login" element={
                    !user ? (
                        <PageTransition><Login /></PageTransition>
                    ) : (
                        <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
                    )
                } />

                <Route
                    path="/student"
                    element={
                        <ProtectedRoute allowedRoles={['student']}>
                            <PageTransition><StudentDashboard /></PageTransition>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <PageTransition><AdminDashboard /></PageTransition>
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all and Home routing */}
                <Route path="/" element={
                    user ? (
                        <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="font-sans antialiased text-slate-900 bg-[#F8FAFC]">
                    <AnimatedRoutes />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
