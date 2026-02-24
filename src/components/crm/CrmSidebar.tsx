"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Database,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/funding", label: "Funding Data", icon: Database },
  { href: "/crm/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/crm/settings", label: "Settings", icon: Settings },
];

export default function CrmSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    document.cookie = "crm_session=; path=/; max-age=0";
    window.location.href = "/crm/login";
  };

  const isActive = (href: string) => {
    if (href === "/crm") return pathname === "/crm";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-edge"
      >
        <Menu size={20} className="text-heading" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-raised border-r border-edge flex flex-col transition-all duration-300
          ${collapsed ? "w-16" : "w-56"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className={`flex items-center h-14 border-b border-edge px-4 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <Link href="/crm" className="font-display font-bold text-heading text-sm tracking-wide">
              Bluecore CRM
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block p-1 rounded hover:bg-card text-muted hover:text-heading transition-colors"
          >
            <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive(href)
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-muted hover:text-heading hover:bg-card"
                }
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-edge">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors w-full ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
