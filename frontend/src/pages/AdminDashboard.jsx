import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    MessageSquare,
    Star,
    AlertCircle,
    Search,
    Filter,
    MoreVertical,
    Reply,
    CheckCircle,
    Download
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { toast } from 'sonner';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { DashboardCard, StatusBadge, StatCard } from '../components/DashboardComponents';
import { Modal, RatingStars, Skeleton } from '../components/UIComponents';
import { getComplaints, getFeedbacks, updateComplaintStatus } from '../services/api';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Table states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modal states
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [replyText, setReplyText] = useState('');

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
            const [complaintRes, feedbackRes] = await Promise.all([
                getComplaints(),
                getFeedbacks()
            ]);
            setComplaints(Array.isArray(complaintRes.data) ? complaintRes.data : []);
            setFeedbacks(Array.isArray(feedbackRes.data) ? feedbackRes.data : []);
        } catch (error) {
            // Only show toast if it's the initial load to prevent spam
            if (showLoading) toast.error("Failed to load analytics data");
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await updateComplaintStatus(id, newStatus);
            toast.success(`Status updated to ${newStatus}`);
            fetchData();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleReply = (complaint) => {
        setSelectedComplaint(complaint);
        setIsReplyModalOpen(true);
    };

    const submitReply = async (e) => {
        e.preventDefault();
        toast.info("Reply feature integration coming soon...");
        setIsReplyModalOpen(false);
        setReplyText('');
    };

    // Chart Data Configurations
    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Complaints',
            data: [12, 19, 3, 5, 2, 3, 7],
            fill: true,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
        }]
    };

    const barData = {
        labels: ['Excellent', 'Good', 'Average', 'Poor', 'Terrible'],
        datasets: [{
            label: 'Rating Count',
            data: [45, 30, 15, 8, 2],
            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#64748B'],
            borderRadius: 8,
        }]
    };

    const doughnutData = {
        labels: ['Food Quality', 'Hygiene', 'Service', 'Other'],
        datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1'],
            borderWidth: 0,
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } }
        }
    };

    const filteredComplaints = Array.isArray(complaints) ? complaints.filter(c => {
        const matchesSearch = c?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c?.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || c?.status === statusFilter;
        return matchesSearch && matchesStatus;
    }) : [];

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Sidebar role="admin" />

            <div className="flex-1 lg:ml-64 transition-all duration-300">
                <Header title="Admin Overview" />

                <main className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Complaints" value={Array.isArray(complaints) ? complaints.length : 0} icon={MessageSquare} trend="up" trendValue="12%" />
                        <StatCard title="Resolved Issues" value={Array.isArray(complaints) ? complaints.filter(c => c?.status === 'resolved').length : 0} icon={CheckCircle} color="success" />
                        <StatCard title="Avg. Rating" value="4.2" icon={Star} color="purple" trend="up" trendValue="0.3" />
                        <StatCard title="Active Students" value="248" icon={Users} color="warning" />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <DashboardCard title="Complaint Trends" className="lg:col-span-2">
                            <div className="h-64">
                                <Line data={lineData} options={chartOptions} />
                            </div>
                        </DashboardCard>

                        <DashboardCard title="Category Distribution">
                            <div className="h-64 relative">
                                <Doughnut data={doughnutData} options={{ ...chartOptions, cutout: '70%' }} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold">100%</span>
                                    <span className="text-xs text-muted-foreground uppercase">Categories</span>
                                </div>
                            </div>
                        </DashboardCard>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-center">
                        <DashboardCard title="Rating Distribution" className="lg:col-span-1">
                            <div className="h-64">
                                <Bar data={barData} options={chartOptions} />
                            </div>
                        </DashboardCard>

                        {/* Recent Feedbacks Summary */}
                        <DashboardCard title="Latest Feedback" className="lg:col-span-2">
                            <div className="space-y-4 text-left">
                                {Array.isArray(feedbacks) && feedbacks.length > 0 ? feedbacks.slice(0, 3).map((f) => (
                                    <div key={f.id} className="flex gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                                        <div className="shrink-0 pt-1">
                                            <RatingStars rating={f?.rating || 0} size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="font-semibold text-sm capitalize">{f?.meal_type || 'Unknown'} Meal</p>
                                                <span className="text-[10px] text-muted-foreground uppercase font-bold">{new Date().toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground italic mt-1 font-medium italic">"{f?.comment || 'No comment provided'}"</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No recent feedback available.</p>
                                )}
                            </div>
                        </DashboardCard>
                    </div>

                    {/* Management Table */}
                    <DashboardCard
                        title="Complaint Management"
                        action={
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search titles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 pr-4 py-1.5 rounded-lg border border-border text-xs focus:ring-1 focus:ring-primary outline-none w-48"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="pl-3 pr-8 py-1.5 rounded-lg border border-border text-xs focus:ring-1 focus:ring-primary outline-none appearance-none bg-white font-medium"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="open">Open</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                    <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                                </div>
                                <button className="p-1.5 rounded-lg border border-border hover:bg-secondary transition-colors text-muted-foreground">
                                    <Download size={16} />
                                </button>
                            </div>
                        }
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4">Student Info</th>
                                        <th className="px-6 py-4">Complaint Details</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {loading ? (
                                        [1, 2, 3].map(i => <tr key={i}><td colSpan="4" className="p-4"><Skeleton className="h-12 w-full" /></td></tr>)
                                    ) : filteredComplaints.length > 0 ? (
                                        filteredComplaints.map((complaint) => (
                                            <tr key={complaint.id} className="hover:bg-secondary/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                            R
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold">Rahul</p>
                                                            <p className="text-[10px] text-muted-foreground">Student ID: #8821</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-sm">{complaint.title}</p>
                                                    <p className="text-xs text-muted-foreground line-clamp-1 italic">{complaint.description}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="relative group/status">
                                                        <StatusBadge status={complaint.status} className="cursor-pointer" />
                                                        <div className="absolute top-full left-0 mt-1 bg-white border border-border shadow-xl rounded-lg py-1 px-1 hidden group-hover/status:flex flex-col z-10 w-32 translate-y-[-10px] group-hover/status:translate-y-0 opacity-0 group-hover/status:opacity-100 transition-all">
                                                            {['open', 'in-progress', 'resolved'].map(s => (
                                                                <button
                                                                    key={s}
                                                                    onClick={() => handleUpdateStatus(complaint.id, s)}
                                                                    className="text-[10px] p-2 text-left hover:bg-secondary rounded font-bold uppercase tracking-wider"
                                                                >
                                                                    Mark as {s}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleReply(complaint)}
                                                            className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                                        >
                                                            <Reply size={16} />
                                                        </button>
                                                        <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-muted-foreground">
                                                No complaints found matching your filters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </DashboardCard>
                </main>
            </div>

            {/* Reply Modal */}
            <Modal
                isOpen={isReplyModalOpen}
                onClose={() => setIsReplyModalOpen(false)}
                title="Reply to Complaint"
            >
                {selectedComplaint && (
                    <div className="space-y-4">
                        <div className="p-4 bg-secondary/50 rounded-xl border border-border">
                            <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Complaint</p>
                            <p className="text-sm font-semibold mb-1">{selectedComplaint.title}</p>
                            <p className="text-xs text-muted-foreground italic">"{selectedComplaint.description}"</p>
                        </div>

                        <form onSubmit={submitReply} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1.5 ml-1">Your Response</label>
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="Type your official response here..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                            >
                                <Reply size={18} /> Send Official Reply
                            </button>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminDashboard;
