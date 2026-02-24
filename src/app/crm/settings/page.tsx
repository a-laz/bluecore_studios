"use client";

import { useState, useEffect, useCallback } from "react";
import { Settings, Tag, Download, Plus, X, Trash2 } from "lucide-react";

interface TagItem {
  id: number;
  name: string;
  color: string;
}

const PRESET_COLORS = ["#2176FF", "#00E5A0", "#a855f7", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899", "#f97316"];

export default function SettingsPage() {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newTag, setNewTag] = useState({ name: "", color: "#2176FF" });
  const [exporting, setExporting] = useState(false);

  const fetchTags = useCallback(async () => {
    const res = await fetch("/api/crm/tags");
    const json = await res.json();
    setTags(json.tags);
  }, []);

  useEffect(() => { fetchTags(); }, [fetchTags]);

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/crm/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTag),
    });
    if (res.ok) {
      setNewTag({ name: "", color: "#2176FF" });
      setShowCreate(false);
      fetchTags();
    }
  };

  const handleDeleteTag = async (id: number) => {
    if (!confirm("Delete this tag?")) return;
    await fetch("/api/crm/tags", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTags();
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/crm/leads?limit=10000");
      const json = await res.json();
      const leadsData = json.data;

      if (leadsData.length === 0) {
        alert("No leads to export");
        setExporting(false);
        return;
      }

      const headers = ["ID", "Company", "Website", "Contact", "Email", "Stage", "Priority", "Deal Value", "Source", "Created"];
      const rows = leadsData.map((l: Record<string, unknown>) => [
        l.id, l.companyName || l.company_name, l.companyWebsite || l.company_website || "",
        l.contactName || l.contact_name || "", l.contactEmail || l.contact_email || "",
        l.stage, l.priority, l.dealValue || l.deal_value || "", l.source || "", l.createdAt || l.created_at,
      ]);

      const csv = [headers, ...rows].map((row) =>
        row.map((cell: unknown) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")
      ).join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `crm-leads-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed");
    }
    setExporting(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Settings size={24} className="text-accent" />
        <h1 className="font-display font-bold text-2xl text-heading">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tags Management */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-accent" />
              <h2 className="font-display font-semibold text-heading">Tags</h2>
            </div>
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-accent hover:bg-accent/10 rounded transition-colors"
            >
              <Plus size={14} /> Add Tag
            </button>
          </div>

          {showCreate && (
            <form onSubmit={handleCreateTag} className="mb-4 p-4 bg-surface rounded-lg border border-edge space-y-3">
              <input
                required
                placeholder="Tag name"
                value={newTag.name}
                onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                className="w-full px-3 py-2 bg-card border border-edge rounded-lg text-heading text-sm placeholder:text-dim focus:outline-none focus:border-accent/50"
              />
              <div>
                <label className="text-xs text-muted mb-2 block">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewTag({ ...newTag, color: c })}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${newTag.color === c ? "border-heading scale-110" : "border-transparent"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-3 py-1.5 bg-accent text-white text-xs rounded-lg hover:bg-accent/90 transition-colors">Create</button>
                <button type="button" onClick={() => setShowCreate(false)} className="px-3 py-1.5 bg-card border border-edge text-xs text-muted rounded-lg hover:text-heading transition-colors">Cancel</button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {tags.length === 0 ? (
              <p className="text-muted text-sm text-center py-4">No tags created yet</p>
            ) : (
              tags.map((tag) => (
                <div key={tag.id} className="flex items-center justify-between py-2 px-3 bg-surface rounded-lg border border-edge">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
                    <span className="text-sm text-heading">{tag.name}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="text-dim hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Export */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Download size={18} className="text-accent" />
            <h2 className="font-display font-semibold text-heading">Export Data</h2>
          </div>
          <p className="text-muted text-sm mb-4">Export all leads as a CSV file.</p>
          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <Download size={16} />
            {exporting ? "Exporting..." : "Export Leads CSV"}
          </button>
        </div>
      </div>
    </div>
  );
}
