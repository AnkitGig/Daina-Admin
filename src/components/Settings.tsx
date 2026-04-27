"use client";
import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState({ email: true, push: false, reports: true });
  const [siteName, setSiteName] = useState("AdminPro");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Settings</h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage your platform preferences</p>
      </div>

      {/* General */}
      <div className="rounded-2xl border p-6 space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold" style={{ color: "var(--text)" }}>General</h3>
        {[
          { label: "Site Name", value: siteName, set: setSiteName },
          { label: "Support Email", value: "support@adminpro.in", set: () => {} },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>{f.label}</label>
            <input defaultValue={f.value} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }} />
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border p-6 space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold" style={{ color: "var(--text)" }}>Notifications</h3>
        {[
          { key: "email" as const, label: "Email Alerts", desc: "Receive alerts via email" },
          { key: "push" as const, label: "Push Notifications", desc: "Browser push notifications" },
          { key: "reports" as const, label: "Weekly Reports", desc: "Automated weekly summary" },
        ].map(n => (
          <div key={n.key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{n.label}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{n.desc}</p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
              className="relative w-11 h-6 rounded-full transition-all"
              style={{ background: notifications[n.key] ? "var(--accent)" : "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                style={{ transform: notifications[n.key] ? "translateX(20px)" : "translateX(0)" }} />
            </button>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="rounded-2xl border p-6 space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <h3 className="font-semibold" style={{ color: "var(--text)" }}>Security</h3>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>Current Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }} />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>New Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }} />
        </div>
      </div>

      <button onClick={save} className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
        style={{ background: saved ? "var(--success)" : "var(--accent)", color: "white" }}>
        {saved ? "✓ Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
