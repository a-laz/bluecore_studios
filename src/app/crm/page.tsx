"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, DollarSign, TrendingUp, Trophy,
  Activity, Clock, MessageSquare, Send, Phone, Video,
  ChevronDown, ChevronRight, Check,
} from "lucide-react";

interface DashboardData {
  kpis: {
    totalLeads: number;
    totalPipelineValue: number;
    wonDeals: number;
    wonValue: number;
    activeLeads: number;
    conversionRate: string;
  };
  funnel: { stage: string; count: number; value: number }[];
  recentActivities: {
    id: number;
    leadId: number;
    type: string;
    title: string;
    description: string | null;
    createdAt: string;
    companyName: string;
  }[];
  upcomingFollowUps: {
    id: number;
    leadId: number;
    dueDate: string;
    title: string;
    completed: number;
    companyName: string;
  }[];
}

const stageLabels: Record<string, string> = { new: "New", contacted: "Contacted", meeting: "Meeting", proposal: "Proposal", closed_won: "Won", closed_lost: "Lost" };
const activityIcons: Record<string, typeof MessageSquare> = { note: MessageSquare, email: Send, call: Phone, meeting: Video, stage_change: ChevronDown, other: Activity };

function formatUsd(amount: number) {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

export default function CrmDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/crm/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleCompleteFollowUp = async (id: number) => {
    await fetch(`/api/crm/follow-ups/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    // Refresh
    const res = await fetch("/api/crm/analytics");
    setData(await res.json());
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={24} className="text-accent" />
          <h1 className="font-display font-bold text-2xl text-heading">Dashboard</h1>
        </div>
        <div className="text-muted text-center py-12">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={24} className="text-accent" />
          <h1 className="font-display font-bold text-2xl text-heading">Dashboard</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-muted mb-4">No data yet. Start by importing leads from funding data.</p>
          <Link href="/crm/funding" className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent/90 transition-colors">
            Browse Funding Data
          </Link>
        </div>
      </div>
    );
  }

  const kpiCards = [
    { label: "Total Leads", value: data.kpis.totalLeads.toString(), icon: Users, color: "text-accent" },
    { label: "Pipeline Value", value: formatUsd(data.kpis.totalPipelineValue), icon: DollarSign, color: "text-accent-alt" },
    { label: "Won Deals", value: data.kpis.wonDeals.toString(), icon: Trophy, color: "text-yellow-400" },
    { label: "Win Rate", value: `${data.kpis.conversionRate}%`, icon: TrendingUp, color: "text-purple-400" },
  ];

  const stageOrder = ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"];
  const maxCount = Math.max(...data.funnel.map((f) => f.count), 1);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard size={24} className="text-accent" />
        <h1 className="font-display font-bold text-2xl text-heading">Dashboard</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon size={16} className={kpi.color} />
              <span className="text-xs text-muted uppercase tracking-wide">{kpi.label}</span>
            </div>
            <p className={`text-2xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Funnel */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-heading text-sm">Pipeline Funnel</h3>
            <Link href="/crm/pipeline" className="text-xs text-accent hover:underline flex items-center gap-1">
              View <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {stageOrder.map((stage) => {
              const item = data.funnel.find((f) => f.stage === stage);
              const count = item?.count || 0;
              const width = (count / maxCount) * 100;
              return (
                <div key={stage} className="flex items-center gap-3">
                  <span className="text-xs text-muted w-20 shrink-0">{stageLabels[stage]}</span>
                  <div className="flex-1 h-5 bg-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full stage-${stage} transition-all duration-500`}
                      style={{ width: `${Math.max(width, count > 0 ? 8 : 0)}%` }}
                    />
                  </div>
                  <span className="text-xs text-heading font-mono w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-display font-semibold text-heading text-sm mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {data.recentActivities.length === 0 ? (
              <p className="text-muted text-xs text-center py-4">No recent activity</p>
            ) : (
              data.recentActivities.slice(0, 6).map((a) => {
                const Icon = activityIcons[a.type] || Activity;
                return (
                  <div key={a.id} className="flex gap-2.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      a.type === "stage_change" ? "bg-purple-500/10 text-purple-400" : "bg-accent/10 text-accent"
                    }`}>
                      <Icon size={12} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link href={`/crm/leads/${a.leadId}`} className="text-xs text-heading hover:text-accent transition-colors block truncate">
                        {a.title}
                      </Link>
                      <p className="text-[10px] text-dim">{a.companyName} &middot; {new Date(a.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Follow-ups */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-display font-semibold text-heading text-sm mb-4">Upcoming Follow-ups</h3>
          <div className="space-y-2">
            {data.upcomingFollowUps.length === 0 ? (
              <p className="text-muted text-xs text-center py-4">No upcoming follow-ups</p>
            ) : (
              data.upcomingFollowUps.slice(0, 6).map((fu) => {
                const isOverdue = new Date(fu.dueDate) < new Date();
                return (
                  <div key={fu.id} className="flex items-start gap-2 py-1">
                    <button
                      onClick={() => handleCompleteFollowUp(fu.id)}
                      className="w-4 h-4 rounded border border-edge hover:border-accent shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                    >
                      {fu.completed ? <Check size={10} className="text-accent-alt" /> : null}
                    </button>
                    <div className="min-w-0 flex-1">
                      <Link href={`/crm/leads/${fu.leadId}`} className="text-xs text-heading hover:text-accent transition-colors block truncate">
                        {fu.title}
                      </Link>
                      <p className={`text-[10px] flex items-center gap-1 ${isOverdue ? "text-red-400" : "text-dim"}`}>
                        <Clock size={10} /> {fu.dueDate} &middot; {fu.companyName}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
