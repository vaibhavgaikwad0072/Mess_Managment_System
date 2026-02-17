import React from 'react';
import { cn } from '../lib/utils';

export const DashboardCard = ({ children, className, title, subtitle, icon: Icon, action }) => {
    return (
        <div className={cn("bg-white rounded-xl border border-border shadow-soft overflow-hidden", className)}>
            {(title || Icon || action) && (
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="p-2 rounded-lg bg-primary/5 text-primary">
                                <Icon size={20} />
                            </div>
                        )}
                        <div>
                            {title && <h3 className="font-semibold text-lg">{title}</h3>}
                            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                        </div>
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export const StatusBadge = ({ status, className }) => {
    const variants = {
        open: "bg-yellow-100 text-yellow-700 border-yellow-200",
        "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
        resolved: "bg-green-100 text-green-700 border-green-200",
        error: "bg-red-100 text-red-700 border-red-200",
        default: "bg-slate-100 text-slate-700 border-slate-200",
    };

    const normalizedStatus = status?.toLowerCase().replace(" ", "-") || "default";
    const variant = variants[normalizedStatus] || variants.default;

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide",
            variant,
            className
        )}>
            {status}
        </span>
    );
};

export const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "primary" }) => {
    const colorVariants = {
        primary: "bg-blue-50 text-blue-600",
        success: "bg-green-50 text-green-600",
        warning: "bg-yellow-50 text-yellow-600",
        danger: "bg-red-50 text-red-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-border shadow-soft flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
                {trend && (
                    <p className={cn(
                        "text-xs mt-2 font-medium flex items-center gap-1",
                        trend === 'up' ? "text-green-600" : "text-red-600"
                    )}>
                        <span>{trend === 'up' ? '↑' : '↓'} {trendValue}</span>
                        <span className="text-muted-foreground">vs last month</span>
                    </p>
                )}
            </div>
            <div className={cn("p-3 rounded-xl", colorVariants[color] || colorVariants.primary)}>
                <Icon size={24} />
            </div>
        </div>
    );
};
