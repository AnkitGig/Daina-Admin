"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import UserManagement from "./UserManagement";
import DriverManagement from "./DriverManagement";
import OrderManagement from "./OrderManagement";
import Notifications from "./Notifications";
import Payments from "./Payments";
import Analytics from "./Analytics";
import Support from "./Support";
import Settings from "./Settings";

interface DashboardProps {
  onLogout: () => void;
}

const tabTitles: Record<string, string> = {
  dashboard: "Dashboard Overview",
  drivers: "Driver Management",
  orders: "Order Management",
  users: "User Management",
  notifications: "Broadcast & Alerts",
  payments: "Payments & Earnings",
  analytics: "Reports & Analytics",
  support: "Support & Tickets",
  settings: "Settings",
};

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardHome />;
      case "drivers": return <DriverManagement />;
      case "orders": return <OrderManagement />;
      case "users": return <UserManagement />;
      case "notifications": return <Notifications />;
      case "payments": return <Payments />;
      case "analytics": return <Analytics />;
      case "support": return <Support />;
      case "settings": return <Settings />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} collapsed={collapsed} />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 h-[72px] flex-shrink-0" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setCollapsed(!collapsed)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ color: "var(--text-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div>
              <h1 className="font-semibold text-base" style={{ color: "var(--text)" }}>{tabTitles[activeTab]}</h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input placeholder="Quick search..." className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-52"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }} />
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white cursor-pointer" style={{ background: "var(--accent)" }}>
              AD
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
