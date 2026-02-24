"use client";

import { useState, useEffect } from "react";
import { BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid,
} from "recharts";

interface AnalyticsData {
  kpis: {
    totalLeads: number;
    totalPipelineValue: number;
    wonDeals: number;
    wonValue: number;
    activeLeads: number;
    conversionRate: string;
  };
  funnel: { stage: string; count: number; value: number }[];
  bySource: { source: string | null; count: number }[];
  byPriority: { priority: string; count: number }[];
  activityVolume: { date: string; count: number }[];
}

interface FundingStats {
  totalRounds: number;
  totalFunding: number;
  avgRoundSize: number;
  byRoundType: { round_type: string; count: number; total_amount: number }[];
  byMonth: { month: string; count: number; total_amount: number }[];
  topCategories: { name: string; count: number }[];
}

const stageLabels: Record<string, string> = { new: "New", contacted: "Contacted", meeting: "Meeting", proposal: "Proposal", closed_won: "Won", closed_lost: "Lost" };
const COLORS = ["#2176FF", "#00E5A0", "#a855f7", "#f59e0b", "#ef4444", "#64748B", "#06b6d4", "#f97316"];

function formatUsd(amount: number) {
  if (amount >= 1_000_000_000) return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toFixed(0)}`;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-raised border border-edge rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-mono text-heading">{payload[0].value}</p>
    </div>
  );
};

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [fundingStats, setFundingStats] = useState<FundingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/crm/analytics").then((r) => r.json()),
      fetch("/api/crm/funding/stats").then((r) => r.json()),
    ]).then(([a, f]) => {
      setAnalytics(a);
      setFundingStats(f);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={24} className="text-accent" />
          <h1 className="font-display font-bold text-2xl text-heading">Analytics</h1>
        </div>
        <div className="text-muted text-center py-12">Loading analytics...</div>
      </div>
    );
  }

  const stageOrder = ["new", "contacted", "meeting", "proposal", "closed_won", "closed_lost"];
  const funnelData = stageOrder.map((s) => {
    const item = analytics?.funnel.find((f) => f.stage === s);
    return { name: stageLabels[s], count: item?.count || 0, value: item?.value || 0 };
  });

  const sourceData = (analytics?.bySource || []).map((s) => ({
    name: s.source || "Unknown",
    value: s.count,
  }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={24} className="text-accent" />
        <h1 className="font-display font-bold text-2xl text-heading">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pipeline Funnel */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-display font-semibold text-heading text-sm mb-4">Pipeline Funnel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={funnelData} layout="vertical">
              <XAxis type="number" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {funnelData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by Source */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-display font-semibold text-heading text-sm mb-4">Leads by Source</h3>
          {sourceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-muted text-xs text-center py-16">No data yet</div>
          )}
        </div>

        {/* Activity Volume */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-display font-semibold text-heading text-sm mb-4">Activity Volume (30d)</h3>
          {(analytics?.activityVolume?.length || 0) > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={analytics!.activityVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#2176FF" fill="url(#activityGradient)" strokeWidth={2} />
                <defs>
                  <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2176FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2176FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-muted text-xs text-center py-16">No activity data yet</div>
          )}
        </div>

        {/* Funding Trends */}
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-display font-semibold text-heading text-sm mb-4">Funding Trends by Month</h3>
          {(fundingStats?.byMonth?.length || 0) > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fundingStats!.byMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="bg-raised border border-edge rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-xs text-muted">{label}</p>
                      <p className="text-sm font-mono text-heading">{payload[0].value} rounds</p>
                      <p className="text-xs font-mono text-accent-alt">{formatUsd(payload[1]?.value as number || 0)}</p>
                    </div>
                  );
                }} />
                <Bar dataKey="count" fill="#2176FF" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
                <Bar dataKey="total_amount" fill="#00E5A0" fillOpacity={0.5} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-muted text-xs text-center py-16">No funding data</div>
          )}
        </div>
      </div>

      {/* Category Breakdown */}
      {fundingStats && fundingStats.topCategories.length > 0 && (
        <div className="glass-card rounded-xl p-4">
          <h3 className="font-display font-semibold text-heading text-sm mb-4">Top Funding Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {fundingStats.topCategories.map((cat, i) => (
              <div key={cat.name} className="bg-surface rounded-lg p-3 border border-edge">
                <p className="text-xs text-muted mb-1">{cat.name}</p>
                <p className="text-lg font-bold font-display" style={{ color: COLORS[i % COLORS.length] }}>{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
