"use client";
import { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  target: "all" | "drivers" | "users";
  type: "update" | "alert" | "offer";
  date: string;
}

const mockAnnouncements: Announcement[] = [
  { id: "1", title: "New Feature Launch", message: "Check out the new earnings dashboard for drivers.", target: "drivers", type: "update", date: "2024-03-25" },
  { id: "2", title: "Weekend Promo", message: "Get 20% off on your next 5 rides!", target: "users", type: "offer", date: "2024-03-26" },
  { id: "3", title: "Service Maintenance", message: "Brief downtime expected tomorrow from 2 AM to 4 AM.", target: "all", type: "alert", date: "2024-03-27" },
];

export default function Notifications() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: "", message: "", target: "all", type: "update" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...formData as any,
      date: new Date().toISOString().split("T")[0]
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setIsCreating(false);
    setFormData({ title: "", message: "", target: "all", type: "update" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Notifications & Announcements</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Broadcasting updates, alerts, and offers to your platform members.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-accent/20"
          style={{ background: "var(--accent)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create New
        </button>
      </div>

      {isCreating && (
        <div className="p-8 rounded-2xl border bg-white/50 dark:bg-black/20 backdrop-blur-md animate-in slide-in-from-top-4 duration-300" style={{ borderColor: "var(--border)" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: "var(--text-muted)" }}>Announcement Title</label>
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. System Update"
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: "var(--text-muted)" }}>Target Audience</label>
                  <select 
                    value={formData.target}
                    onChange={e => setFormData({...formData, target: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all appearance-none"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="all">Everyone</option>
                    <option value="drivers">Drivers Only</option>
                    <option value="users">Users Only</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: "var(--text-muted)" }}>Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all appearance-none"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
                  >
                    <option value="update">Update</option>
                    <option value="alert">Alert</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest px-1" style={{ color: "var(--text-muted)" }}>Message Content</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="Write your announcement details here..."
                className="w-full px-4 py-3 rounded-xl outline-none transition-all resize-none"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
              />
            </div>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)}
                className="px-6 py-3 rounded-xl font-bold transition-all hover:bg-black/5"
                style={{ color: "var(--text-muted)" }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                Send Announcement
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest px-1" style={{ color: "var(--text-muted)" }}>Recent History</h3>
        {announcements.map((item) => (
          <div key={item.id} className="p-5 rounded-2xl border flex gap-5 transition-all hover:border-accent/30" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${
              item.type === "alert" ? "bg-red-500/10 text-red-500" : 
              item.type === "offer" ? "bg-emerald-500/10 text-emerald-500" : "bg-accent/10 text-accent"
            }`} style={{ color: item.type === "update" ? "var(--accent)" : undefined }}>
              {item.type === "alert" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              ) : item.type === "offer" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold" style={{ color: "var(--text)" }}>{item.title}</h4>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.date}</span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.message}</p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
                  Target: {item.target}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}>
                  Type: {item.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
