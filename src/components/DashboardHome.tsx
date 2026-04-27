"use client";
import StatCard from "./StatCard";

const recentActivity = [
  { user: "Nathan Lee", action: "Registered", time: "2 min ago", icon: "👤" },
  { user: "Prerna", action: "Used coupon SAVE20", time: "15 min ago", icon: "🎟️" },
  { user: "Dheeraj M.", action: "Profile updated", time: "1 hr ago", icon: "✏️" },
  { user: "Amelia Chen", action: "Role changed to Admin", time: "3 hr ago", icon: "🔑" },
  { user: "Cox James", action: "Account banned", time: "5 hr ago", icon: "🚫" },
];

const monthlyData = [60, 85, 72, 90, 110, 95, 130, 115, 145, 160, 138, 175];
const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
const maxVal = Math.max(...monthlyData);

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Welcome back, Admin 👋</h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Users" value="1,284" change="12.5%" positive={true} delay="0s"
          color="var(--accent)"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <StatCard title="Active Coupons" value="6" change="3 new" positive={true} delay="0.08s"
          color="var(--success)"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>}
        />
        <StatCard title="Revenue (INR)" value="₹2.4L" change="8.3%" positive={true} delay="0.16s"
          color="var(--warning)"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
        <StatCard title="Banned Users" value="3" change="1.2%" positive={false} delay="0.24s"
          color="var(--danger)"
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>}
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="col-span-2 rounded-2xl border p-6 animate-fade-in-delay" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold" style={{ color: "var(--text)" }}>Monthly Users</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>2024 growth overview</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(34,211,165,0.1)", color: "var(--success)" }}>+24.3% YoY</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {monthlyData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${(val / maxVal) * 100}%`,
                    background: i === 11 ? "var(--accent)" : "var(--surface-2)",
                    border: i === 11 ? "none" : "1px solid var(--border)",
                    minHeight: "6px",
                  }}
                />
                <span className="text-xs" style={{ color: i === 11 ? "var(--accent)" : "var(--text-muted)", fontFamily: "Space Mono, monospace", fontSize: "10px" }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border p-5 animate-fade-in-delay-2" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: "var(--surface-2)" }}>
                  {a.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{a.user}</p>
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{a.action}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--accent-2)", fontFamily: "Space Mono", fontSize: "10px" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User status breakdown */}
      <div className="rounded-2xl border p-6 animate-fade-in-delay-3" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold mb-5" style={{ color: "var(--text)" }}>User Status Overview</h3>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "Active Users", count: 1098, pct: 85, color: "var(--success)" },
            { label: "Inactive Users", count: 183, pct: 15, color: "var(--warning)" },
            { label: "Banned Users", count: 3, pct: 1, color: "var(--danger)" },
          ].map(s => (
            <div key={s.label}>
              <div className="flex justify-between mb-2">
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</span>
                <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{s.count}</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: "var(--surface-2)" }}>
                <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
              <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>{s.pct}% of total</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
