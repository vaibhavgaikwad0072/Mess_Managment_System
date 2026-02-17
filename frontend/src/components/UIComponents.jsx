import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { cn } from '../lib/utils';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={cn(
                            "relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden z-10",
                            maxWidth
                        )}
                    >
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                            <h3 className="font-semibold text-xl">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-secondary transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const RatingStars = ({ rating, setRating, interactive = false, size = 20 }) => {
    const [hover, setHover] = React.useState(0);

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                    key={star}
                    type="button"
                    whileHover={interactive ? { scale: 1.2 } : {}}
                    whileTap={interactive ? { scale: 0.9 } : {}}
                    onMouseEnter={() => interactive && setHover(star)}
                    onMouseLeave={() => interactive && setHover(0)}
                    onClick={() => interactive && setRating(star)}
                    className={cn(
                        "focus:outline-none transition-colors",
                        interactive ? "cursor-pointer" : "cursor-default"
                    )}
                >
                    <Star
                        size={size}
                        className={cn(
                            "transition-colors",
                            (hover || rating) >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                        )}
                    />
                </motion.button>
            ))}
        </div>
    );
};

export const Skeleton = ({ className }) => (
    <div className={cn("animate-pulse bg-slate-200 rounded-md", className)} />
);

export const DashboardSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 w-full" />
        ))}
        <Skeleton className="h-80 w-full lg:col-span-3" />
        <Skeleton className="h-80 w-full" />
    </div>
);
