"use client";
import { useState } from "react";

const USERS = [
  { id: 1, name: "Nathan Lee", email: "testing@agenix.com", phone: "+917896504256", status: "active", role: "User", avatar: "NL", joined: "Jan 12, 2024" },
  { id: 2, name: "Prerna", email: "prerna@gmail.com", phone: "+919898998898", status: "active", role: "User", avatar: "PR", joined: "Feb 3, 2024" },
  { id: 3, name: "Zenith", email: "zenith@q.myapplication.com", phone: "+917003036868", status: "inactive", role: "Moderator", avatar: "ZN", joined: "Mar 21, 2024" },
  { id: 4, name: "Dheeraj Malviya", email: "dheerajq.myapplication.com", phone: "+914321222331", status: "active", role: "User", avatar: "DM", joined: "Apr 5, 2024" },
  { id: 5, name: "Cox James", email: "ventralink6z@gmail.com", phone: "+917014045621", status: "banned", role: "User", avatar: "CJ", joined: "Apr 18, 2024" },
  { id: 6, name: "Amelia Chen", email: "amelia.chen@techcorp.io", phone: "+918765432109", status: "active", role: "Admin", avatar: "AC", joined: "May 2, 2024" },
  { id: 7, name: "Ravi Sharma", email: "ravi.sharma@startup.in", phone: "+917654321098", status: "active", role: "User", avatar: "RS", joined: "May 15, 2024" },
  { id: 8, name: "Luna Park", email: "luna.park@design.co", phone: "+916543210987", status: "inactive", role: "Moderator", avatar: "LP", joined: "Jun 1, 2024" },
  { id: 9, name: "Marcus Webb", email: "marcus.webb@email.com", phone: "+915432109876", status: "active", role: "User", avatar: "MW", joined: "Jun 14, 2024" },
  { id: 10, name: "Isha Patel", email: "isha.patel@company.in", phone: "+914321098765", status: "active", role: "User", avatar: "IP", joined: "Jul 3, 2024" },
  { id: 11, name: "Tom Fischer", email: "tom.fischer@mail.de", phone: "+913210987654", status: "banned", role: "User", avatar: "TF", joined: "Jul 22, 2024" },
  { id: 12, name: "Sara Kim", email: "sara.kim@web.kr", phone: "+912109876543", status: "active", role: "Moderator", avatar: "SK", joined: "Aug 8, 2024" },
];

const PAGE_SIZE = 5;
const avatarColors = ["#7c5cfc","#22d3a5","#f59e0b","#f87171","#60a5fa","#a78bfa"];

const statusStyle = (status: string) => {
  if (status === "active") return { bg: "rgba(34,211,165,0.12)", color: "#22d3a5", label: "Active" };
  if (status === "inactive") return { bg: "rgba(251,191,36,0.12)", color: "#fbbf24", label: "Inactive" };
  return { bg: "rgba(248,113,113,0.12)", color: "#f87171", label: "Banned" };
};

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = USERS.filter(u =>
    (filterStatus === "all" || u.status === filterStatus) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>User Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{filtered.length} total users</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "var(--accent)", color: "white" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
          className="px-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {/* Table Header */}
        <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)", background: "var(--surface-2)" }}>
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Role</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div className="py-16 text-center" style={{ color: "var(--text-muted)" }}>No users found</div>
        ) : (
          paginated.map((user, i) => {
            const s = statusStyle(user.status);
            return (
              <div
                key={user.id}
                className="grid grid-cols-12 px-5 py-4 items-center transition-all"
                style={{
                  borderBottom: i < paginated.length - 1 ? "1px solid var(--border)" : "none",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {/* Name */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: avatarColors[user.id % avatarColors.length] }}>
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{user.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{user.joined}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="col-span-3 text-sm truncate" style={{ color: "var(--text-muted)" }}>{user.email}</div>

                {/* Phone */}
                <div className="col-span-2 text-sm mono" style={{ color: "var(--text-muted)", fontSize: "12px" }}>{user.phone}</div>

                {/* Status */}
                <div className="col-span-1">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                </div>

                {/* Role */}
                <div className="col-span-1">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{user.role}</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => { (e.currentTarget.style.background = "var(--surface-2)"); (e.currentTarget.style.color = "var(--accent)"); }}
                    onMouseLeave={e => { (e.currentTarget.style.background = "transparent"); (e.currentTarget.style.color = "var(--text-muted)"); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => { (e.currentTarget.style.background = "rgba(248,113,113,0.1)"); (e.currentTarget.style.color = "var(--danger)"); }}
                    onMouseLeave={e => { (e.currentTarget.style.background = "transparent"); (e.currentTarget.style.color = "var(--text-muted)"); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: page === 1 ? "var(--text-muted)" : "var(--text)", opacity: page === 1 ? 0.4 : 1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-8 h-8 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: p === page ? "var(--accent)" : "var(--surface)",
                  border: `1px solid ${p === page ? "var(--accent)" : "var(--border)"}`,
                  color: p === page ? "white" : "var(--text-muted)",
                }}
              >{p}</button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: page === totalPages ? "var(--text-muted)" : "var(--text)", opacity: page === totalPages ? 0.4 : 1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
