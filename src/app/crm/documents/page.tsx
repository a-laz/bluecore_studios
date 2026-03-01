"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Briefcase,
  ClipboardCheck,
  Send,
  Clock,
  User,
  CheckCircle2,
  Pencil,
} from "lucide-react";

interface DailyReport {
  id: number;
  name: string;
  date: string;
  tasks_completed: string;
  tasks_in_progress: string | null;
  blockers: string | null;
  hours_worked: number;
  created_at: string;
}

/* ── Tab selector ─────────────────────────────────────────────── */

type Tab = "sop" | "submit";

/* ── SOP Content (rendered from bluecore_lead_outreach_sop.docx) ── */

function LeadOutreachSOP() {
  return (
    <div className="prose-crm space-y-6 text-sm text-muted leading-relaxed">
      {/* Header */}
      <div className="text-center pb-4 border-b border-edge">
        <p className="font-bold text-heading text-base">BLUECORE STUDIOS</p>
        <p className="text-muted text-xs">Standard Operating Procedure</p>
        <p className="font-bold text-heading mt-1">Lead Outreach &amp; Business Development</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs p-3 bg-surface rounded-lg border border-edge">
        <div><span className="font-semibold text-heading">Effective Date:</span> March 1, 2026</div>
        <div><span className="font-semibold text-heading">Version:</span> 1.0</div>
        <div><span className="font-semibold text-heading">Classification:</span> Internal &ndash; Confidential</div>
        <div><span className="font-semibold text-heading">Owner:</span> Alex Lazarev, Lead</div>
      </div>

      {/* 1. Purpose */}
      <section>
        <h3 className="font-display font-bold text-heading text-sm mb-2">1. Purpose</h3>
        <p>This SOP establishes the standard process for lead generation and outreach at Bluecore Studios. It defines the channels used, daily quotas, and expectations for all team members during both active project periods and periods without billable work. The goal is to maintain a consistent pipeline of qualified prospects across blockchain infrastructure, DeFi protocols, and compliance middleware engagements.</p>
      </section>

      {/* 2. Outreach Channels */}
      <section>
        <h3 className="font-display font-bold text-heading text-sm mb-2">2. Outreach Channels</h3>
        <p>All lead outreach is conducted through the following channels. Each outreach attempt must be logged and tracked.</p>

        <div className="mt-3 p-4 bg-surface rounded-lg border border-edge space-y-3">
          <div>
            <h4 className="font-semibold text-heading text-xs">2.1 LinkedIn + Email (Paired)</h4>
            <p className="mt-1">LinkedIn outreach and email outreach are treated as a paired action. When reaching out to a lead via LinkedIn, a corresponding email must also be sent (or vice versa). This dual-touch approach maximizes visibility and response rates. A single LinkedIn message without a paired email does <strong className="text-heading"><em>not</em></strong> count as a completed outreach.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Send a personalized LinkedIn connection request or InMail.</li>
              <li>Follow up with a tailored email to the same lead within the same business day.</li>
              <li>Both touches together count as one (1) completed outreach.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading text-xs">2.2 Upwork</h4>
            <p className="mt-1">Upwork proposals are an independent outreach channel. Each submitted proposal to a relevant job posting counts as one (1) completed outreach.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Proposals must be customized to the job description &ndash; no generic templates.</li>
              <li>Prioritize postings related to blockchain development, smart contracts, DeFi, tokenization, and compliance tooling.</li>
              <li>Track connects spent and conversion rates monthly.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Daily Quotas */}
      <section>
        <h3 className="font-display font-bold text-heading text-sm mb-2">3. Daily Quotas</h3>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-heading text-xs">3.1 During Periods With No Active Billable Work</h4>
            <p className="mt-1">When there is no active client project, lead generation becomes the primary focus. Each team member is expected to complete the following <strong className="text-heading">minimum daily quota</strong>:</p>
            <div className="mt-2 overflow-hidden rounded-lg border border-edge">
              <table className="w-full text-xs">
                <thead><tr className="bg-surface"><th className="text-left p-2 font-semibold text-heading">Metric</th><th className="text-left p-2 font-semibold text-heading">Daily Minimum (Per Person)</th></tr></thead>
                <tbody><tr className="border-t border-edge"><td className="p-2">LinkedIn + Email paired outreaches OR Upwork proposals</td><td className="p-2 font-bold text-accent">10</td></tr></tbody>
              </table>
            </div>
            <p className="mt-2">This means each person completes at least 10 outreach actions per day, which can be any combination of LinkedIn+Email pairs and Upwork proposals.</p>
          </div>
          <div>
            <h4 className="font-semibold text-heading text-xs">3.2 During Active Project Periods</h4>
            <p className="mt-1">When the team is engaged in billable client work, outreach quotas are reduced but not eliminated. Maintaining pipeline activity prevents feast-or-famine cycles. Reduced quotas will be communicated by Alex on a case-by-case basis depending on project load.</p>
          </div>
        </div>
      </section>

      {/* 4. Bug Bounties */}
      <section>
        <h3 className="font-display font-bold text-heading text-sm mb-2">4. Bug Bounties</h3>
        <p>Team members are encouraged to participate in blockchain and smart contract bug bounty programs as a supplementary revenue stream and skill-building activity. Bug bounty work is tracked separately and does not substitute for outreach quotas.</p>

        <div className="mt-3 p-4 bg-surface rounded-lg border border-edge space-y-3">
          <div>
            <h4 className="font-semibold text-heading text-xs">4.1 Tracking Requirements</h4>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Log the platform and program name (e.g., Immunefi, Code4rena, Sherlock).</li>
              <li>Record hours spent per bounty.</li>
              <li>Document submissions made and outcomes (accepted, rejected, pending).</li>
              <li>Report any payouts received.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading text-xs">4.2 Priority</h4>
            <p className="mt-1">Bug bounties should be worked on <strong className="text-heading"><em>after</em></strong> daily outreach quotas have been met, or during dedicated blocks outside of outreach hours. Active client work always takes priority over bounty hunting.</p>
          </div>
        </div>
      </section>

      {/* 5. Working Hours */}
      <section>
        <h3 className="font-display font-bold text-heading text-sm mb-2">5. Working Hours</h3>
        <p>All team members are expected to maintain consistent, trackable working hours.</p>

        <div className="mt-3 space-y-3">
          <div>
            <h4 className="font-semibold text-heading text-xs">5.1 Time Logging</h4>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>All hours must be logged daily, broken down by activity category: outreach, client work, bug bounties, internal/admin.</li>
              <li>Use the team&apos;s designated time-tracking tool or shared spreadsheet.</li>
              <li>Weekly hour summaries should be submitted to Alex by end of day Friday.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading text-xs">5.2 Expected Breakdown (No Active Project)</h4>
            <div className="mt-2 overflow-hidden rounded-lg border border-edge">
              <table className="w-full text-xs">
                <thead><tr className="bg-surface"><th className="text-left p-2 font-semibold text-heading">Activity</th><th className="text-left p-2 font-semibold text-heading">Suggested Allocation</th></tr></thead>
                <tbody>
                  <tr className="border-t border-edge"><td className="p-2">Lead Outreach (LinkedIn + Email / Upwork)</td><td className="p-2">60&ndash;70% of working hours</td></tr>
                  <tr className="border-t border-edge"><td className="p-2">Bug Bounties</td><td className="p-2">20&ndash;30% of working hours</td></tr>
                  <tr className="border-t border-edge"><td className="p-2">Internal / Admin / Skill Development</td><td className="p-2">10% of working hours</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Accountability */}
      <section>
        <h3 className="font-display font-bold text-heading text-sm mb-2">6. Accountability &amp; Reporting</h3>
        <p>Consistency in outreach is what builds a sustainable pipeline. The following reporting structure keeps the team aligned:</p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li><strong className="text-heading">Daily Log:</strong> Each team member logs outreach count and channels used by end of day.</li>
          <li><strong className="text-heading">Weekly Recap:</strong> Submit a brief summary of total outreaches, responses received, meetings booked, and hours worked.</li>
          <li><strong className="text-heading">Monthly Review:</strong> Alex reviews pipeline health, conversion rates, and adjusts quotas or strategy as needed.</li>
          <li><strong className="text-heading">Bug Bounty Report:</strong> Monthly summary of bounties attempted, submissions, and payouts.</li>
        </ol>
      </section>
    </div>
  );
}

/* ── Daily Work Submission Form ──────────────────────────────── */

function DailyWorkForm() {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    name: "",
    date: today,
    tasks_completed: "",
    tasks_in_progress: "",
    blockers: "",
    hours_worked: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reports, setReports] = useState<DailyReport[]>([]);

  const fetchReports = useCallback(async () => {
    const res = await fetch("/api/crm/daily-reports?limit=10");
    const json = await res.json();
    setReports(json.data);
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    const res = await fetch("/api/crm/daily-reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSuccess(true);
      setForm({
        name: form.name,
        date: today,
        tasks_completed: "",
        tasks_in_progress: "",
        blockers: "",
        hours_worked: "",
      });
      fetchReports();
      setTimeout(() => setSuccess(false), 3000);
    }
    setSubmitting(false);
  };

  const inputClass =
    "w-full px-3 py-2 bg-card border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors";

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Send size={18} className="text-accent" />
          <h2 className="font-display font-semibold text-heading">Submit Daily Report</h2>
        </div>

        {success && (
          <div className="mb-4 flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm">
            <CheckCircle2 size={16} />
            Report submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">Your Name *</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
                <input
                  required
                  placeholder="e.g. Alex"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted mb-1.5 block font-medium">Date *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">Tasks Completed *</label>
            <textarea
              required
              rows={3}
              placeholder="List each task you finished today (one per line)"
              value={form.tasks_completed}
              onChange={(e) => setForm({ ...form, tasks_completed: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">Tasks In Progress</label>
            <textarea
              rows={2}
              placeholder="Anything started but not finished, with next steps"
              value={form.tasks_in_progress}
              onChange={(e) => setForm({ ...form, tasks_in_progress: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-1.5 block font-medium">Blockers / Issues</label>
            <textarea
              rows={2}
              placeholder="Anything slowing you down or preventing progress"
              value={form.blockers}
              onChange={(e) => setForm({ ...form, blockers: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="max-w-[200px]">
            <label className="text-xs text-muted mb-1.5 block font-medium">Hours Worked *</label>
            <div className="relative">
              <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                required
                placeholder="e.g. 8"
                value={form.hours_worked}
                onChange={(e) => setForm({ ...form, hours_worked: e.target.value })}
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <Send size={16} />
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>

      {/* Recent Submissions */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="font-display font-semibold text-heading mb-4">Recent Submissions</h2>
        {reports.length === 0 ? (
          <p className="text-muted text-sm text-center py-6">No reports submitted yet</p>
        ) : (
          <div className="space-y-3">
            {reports.map((r) => (
              <ReportCard key={r.id} report={r} onUpdate={fetchReports} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReportCard({ report, onUpdate }: { report: DailyReport; onUpdate: () => void }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: report.name,
    date: report.date,
    tasks_completed: report.tasks_completed,
    tasks_in_progress: report.tasks_in_progress || "",
    blockers: report.blockers || "",
    hours_worked: String(report.hours_worked),
  });

  const inputClass =
    "w-full px-3 py-2 bg-card border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50 transition-colors";

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(`/api/crm/daily-reports/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditing(false);
      onUpdate();
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: report.name,
      date: report.date,
      tasks_completed: report.tasks_completed,
      tasks_in_progress: report.tasks_in_progress || "",
      blockers: report.blockers || "",
      hours_worked: String(report.hours_worked),
    });
    setEditing(false);
  };

  return (
    <div className="bg-surface rounded-lg border border-edge overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-card/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
            {report.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-sm font-medium text-heading">{report.name}</span>
            <span className="text-xs text-muted ml-2">{report.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">{report.hours_worked}h</span>
          {open ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
        </div>
      </button>
      {open && (
        <div className="px-3 pb-3 pt-0 border-t border-edge space-y-2 text-xs">
          {!editing ? (
            <>
              <div className="pt-2 flex items-center justify-between">
                <span className="font-semibold text-heading">Completed:</span>
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1 text-muted hover:text-accent transition-colors"
                >
                  <Pencil size={12} />
                  <span>Edit</span>
                </button>
              </div>
              <p className="text-muted whitespace-pre-wrap mt-0.5">{report.tasks_completed}</p>
              {report.tasks_in_progress && (
                <div>
                  <span className="font-semibold text-heading">In Progress:</span>
                  <p className="text-muted whitespace-pre-wrap mt-0.5">{report.tasks_in_progress}</p>
                </div>
              )}
              {report.blockers && (
                <div>
                  <span className="font-semibold text-heading">Blockers:</span>
                  <p className="text-muted whitespace-pre-wrap mt-0.5">{report.blockers}</p>
                </div>
              )}
            </>
          ) : (
            <div className="pt-2 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted mb-1 block font-medium">Name</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1 block font-medium">Date</label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block font-medium">Tasks Completed</label>
                <textarea
                  rows={3}
                  value={editForm.tasks_completed}
                  onChange={(e) => setEditForm({ ...editForm, tasks_completed: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block font-medium">Tasks In Progress</label>
                <textarea
                  rows={2}
                  value={editForm.tasks_in_progress}
                  onChange={(e) => setEditForm({ ...editForm, tasks_in_progress: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block font-medium">Blockers</label>
                <textarea
                  rows={2}
                  value={editForm.blockers}
                  onChange={(e) => setEditForm({ ...editForm, blockers: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="max-w-[200px]">
                <label className="text-xs text-muted mb-1 block font-medium">Hours Worked</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={editForm.hours_worked}
                  onChange={(e) => setEditForm({ ...editForm, hours_worked: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-1.5 bg-accent hover:bg-accent/90 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-1.5 text-muted hover:text-heading text-xs font-medium rounded-lg border border-edge hover:bg-card/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */

export default function DocumentsPage() {
  const [tab, setTab] = useState<Tab>("sop");
  const [sopOpen, setSopOpen] = useState(true);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FileText size={24} className="text-accent" />
        <h1 className="font-display font-bold text-2xl text-heading">Documents</h1>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-6 p-1 bg-surface rounded-lg border border-edge w-fit">
        <button
          onClick={() => setTab("sop")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "sop"
              ? "bg-accent/10 text-accent border border-accent/20"
              : "text-muted hover:text-heading"
          }`}
        >
          <Briefcase size={16} />
          Lead Outreach SOP
        </button>
        <button
          onClick={() => setTab("submit")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === "submit"
              ? "bg-accent/10 text-accent border border-accent/20"
              : "text-muted hover:text-heading"
          }`}
        >
          <ClipboardCheck size={16} />
          Daily Work Submission
        </button>
      </div>

      {/* Content */}
      {tab === "sop" && (
        <div className="glass-card rounded-xl overflow-hidden">
          <button
            onClick={() => setSopOpen(!sopOpen)}
            className="w-full flex items-center gap-4 p-5 text-left hover:bg-card/50 transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Briefcase size={20} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-semibold text-heading text-sm">
                SOP: Lead Outreach &amp; Business Development
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Standard operating procedures for prospecting, qualifying, and converting leads.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href="/documents/bluecore_lead_outreach_sop.docx"
                download
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors border border-accent/20"
              >
                <Download size={14} />
                DOCX
              </a>
              {sopOpen ? (
                <ChevronUp size={18} className="text-muted" />
              ) : (
                <ChevronDown size={18} className="text-muted" />
              )}
            </div>
          </button>

          {sopOpen && (
            <div className="px-5 pb-6 pt-0 border-t border-edge">
              <div className="pt-5">
                <LeadOutreachSOP />
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "submit" && <DailyWorkForm />}
    </div>
  );
}
