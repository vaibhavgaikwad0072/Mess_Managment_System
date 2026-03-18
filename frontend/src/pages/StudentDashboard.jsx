import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Clock,
    CheckCircle,
    AlertCircle,
    MessageSquarePlus,
    Calendar,
    Info
} from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { DashboardCard, StatusBadge, StatCard } from '../components/DashboardComponents';
import { Modal, RatingStars, Skeleton } from '../components/UIComponents';
import { getMenus, getComplaints, createComplaint, createFeedback } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [menus, setMenus] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

    // Form states
    const [complaintForm, setComplaintForm] = useState({ title: '', description: '', category: 'food' });
    const [feedbackForm, setFeedbackForm] = useState({ meal_type: 'breakfast', rating: 5, comment: '' });

    useEffect(() => {
        fetchData(true);
        const interval = setInterval(() => {
            fetchData(false);
        }, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchData = async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            const [menuRes, complaintRes] = await Promise.all([
                getMenus(),
                getComplaints()
            ]);

            // Aggregate menus by day safely
            const menuData = Array.isArray(menuRes.data) ? menuRes.data : [];
            const aggregated = menuData.reduce((acc, current) => {
                const day = current.day_of_week;
                if (day) {
                    if (!acc[day]) {
                        acc[day] = {
                            day: day,
                            items: { breakfast: 'N/A', lunch: 'N/A', dinner: 'N/A' },
                            id: current.id
                        };
                    }
                    const mealType = current?.meal_type?.toLowerCase();
                    if (mealType && acc[day].items.hasOwnProperty(mealType)) {
                        acc[day].items[mealType] = current.items;
                    }
                }
                return acc;
            }, {});

            setMenus(Object.values(aggregated));
            setComplaints(Array.isArray(complaintRes.data) ? complaintRes.data : []);
        } catch (error) {
            console.error("Dashboard error:", error);
            if (showLoading) toast.error("Failed to load dashboard data");
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const handleCreateComplaint = async (e) => {
        e.preventDefault();
        try {
            await createComplaint(complaintForm);
            toast.success("Complaint raised successfully!");
            setIsComplaintModalOpen(false);
            setComplaintForm({ title: '', description: '', category: 'food' });
            fetchData();
        } catch (error) {
            toast.error(error.message || "Failed to submit complaint");
        }
    };

    const handleCreateFeedback = async (e) => {
        e.preventDefault();
        try {
            await createFeedback(feedbackForm);
            toast.success("Feedback submitted! Thank you.");
            setIsFeedbackModalOpen(false);
            setFeedbackForm({ meal_type: 'breakfast', rating: 5, comment: '' });
        } catch (error) {
            toast.error(error.message || "Failed to submit feedback");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar role="student" />

            <div className="flex-1 lg:ml-64 transition-all duration-300">
                <Header title="Student Dashboard" />

                <main className="p-8 max-w-7xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StatCard
                                title="Open Complaints"
                                value={Array.isArray(complaints) ? complaints.filter(c => c?.status === 'open').length : 0}
                                icon={AlertCircle}
                                color="warning"
                            />
                            <StatCard
                                title="Resolved"
                                value={Array.isArray(complaints) ? complaints.filter(c => c?.status === 'resolved').length : 0}
                                icon={CheckCircle}
                                color="success"
                            />
                            <StatCard
                                title="Feedback Sent"
                                value="12"
                                icon={MessageSquarePlus}
                                color="primary"
                            />
                        </div>

                        {/* Weekly Menu Section */}
                        <motion.section variants={itemVariants}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-primary w-5 h-5" />
                                    <h2 className="text-xl font-bold">This Week's Menu</h2>
                                </div>
                                <button
                                    onClick={() => setIsFeedbackModalOpen(true)}
                                    className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-1"
                                >
                                    <Plus size={16} /> Rate Today's Meal
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {loading ? (
                                    [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)
                                ) : menus.length > 0 ? (
                                    menus.map((menu) => (
                                        <DashboardCard
                                            key={menu.id}
                                            title={menu.day}
                                            className="hover:shadow-lg transition-all border-l-4 border-l-primary"
                                        >
                                            <ul className="space-y-3 text-sm">
                                                <li className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                                    <span className="text-muted-foreground font-bold text-[10px] uppercase">Breakfast</span>
                                                    <span className="font-semibold text-foreground text-right ml-4">{menu.items.breakfast}</span>
                                                </li>
                                                <li className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                                    <span className="text-muted-foreground font-bold text-[10px] uppercase">Lunch</span>
                                                    <span className="font-semibold text-foreground text-right ml-4">{menu.items.lunch}</span>
                                                </li>
                                                <li className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                                    <span className="text-muted-foreground font-bold text-[10px] uppercase">Dinner</span>
                                                    <span className="font-semibold text-foreground text-right ml-4">{menu.items.dinner}</span>
                                                </li>
                                            </ul>
                                        </DashboardCard>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-300 text-muted-foreground">
                                        <Info size={40} className="mb-3 opacity-20" />
                                        <p>No menu data available for this week.</p>
                                    </div>
                                )}
                            </div>
                        </motion.section>

                        {/* Complaints Section */}
                        <motion.section variants={itemVariants}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="text-destructive w-5 h-5" />
                                    <h2 className="text-xl font-bold">Recent Complaints</h2>
                                </div>
                                <button
                                    onClick={() => setIsComplaintModalOpen(true)}
                                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                                >
                                    <Plus size={18} /> Raise Complaint
                                </button>
                            </div>

                            <DashboardCard className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-secondary/50 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                                            <tr>
                                                <th className="px-6 py-4">Title</th>
                                                <th className="px-6 py-4">Category</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {loading ? (
                                                [1, 2, 3].map(i => (
                                                    <tr key={i}>
                                                        <td colSpan="4" className="px-6 py-4"><Skeleton className="h-6 w-full" /></td>
                                                    </tr>
                                                ))
                                            ) : complaints.length > 0 ? (
                                                complaints.map((complaint) => (
                                                    <tr key={complaint.id} className="hover:bg-secondary/30 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <p className="font-semibold text-sm">{complaint.title}</p>
                                                            <p className="text-xs text-muted-foreground line-clamp-1">{complaint.description}</p>
                                                        </td>
                                                        <td className="px-6 py-4 capitalize text-sm">{complaint.category}</td>
                                                        <td className="px-6 py-4">
                                                            <StatusBadge status={complaint.status} />
                                                        </td>
                                                        <td className="px-6 py-4 text-xs text-muted-foreground">
                                                            {new Date(complaint.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-12 text-center text-muted-foreground">
                                                        You haven't raised any complaints yet.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </DashboardCard>
                        </motion.section>
                    </motion.div>
                </main>
            </div>

            {/* Raise Complaint Modal */}
            <Modal
                isOpen={isComplaintModalOpen}
                onClose={() => setIsComplaintModalOpen(false)}
                title="Raise a Complaint"
            >
                <form onSubmit={handleCreateComplaint} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1.5 ml-1">Title</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g., Food quality issue"
                            className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            value={complaintForm.title}
                            onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1.5 ml-1">Category</label>
                        <select
                            className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white"
                            value={complaintForm.category}
                            onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                        >
                            <option value="food">Food Quality</option>
                            <option value="hygiene">Hygiene & Cleanliness</option>
                            <option value="service">Service Delay</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1.5 ml-1">Description</label>
                        <textarea
                            required
                            rows="4"
                            placeholder="Provide more details..."
                            className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                            value={complaintForm.description}
                            onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all mt-2"
                    >
                        Submit Complaint
                    </button>
                </form>
            </Modal>

            {/* Meal Feedback Modal */}
            <Modal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                title="Meal Feedback"
            >
                <form onSubmit={handleCreateFeedback} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold mb-3 text-center">How was your meal?</label>
                        <div className="flex justify-center">
                            <RatingStars
                                rating={feedbackForm.rating}
                                setRating={(r) => setFeedbackForm({ ...feedbackForm, rating: r })}
                                interactive
                                size={32}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {['breakfast', 'lunch', 'dinner'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setFeedbackForm({ ...feedbackForm, meal_type: type })}
                                className={cn(
                                    "py-2 rounded-lg text-sm font-bold border transition-all capitalize",
                                    feedbackForm.meal_type === type
                                        ? "bg-primary/10 border-primary text-primary"
                                        : "border-border hover:bg-secondary"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1.5 ml-1">Comments (optional)</label>
                        <textarea
                            rows="3"
                            placeholder="What could be improved?"
                            className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                            value={feedbackForm.comment}
                            onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
                    >
                        Send Feedback
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default StudentDashboard;
