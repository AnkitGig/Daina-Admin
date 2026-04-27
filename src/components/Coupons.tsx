"use client";
import { useState } from "react";

const COUPONS = [
  { id: 1, code: "SAVE20", discount: "20%", type: "percentage", uses: 142, expiry: "Dec 31, 2024", status: "active" },
  { id: 2, code: "FLAT50", discount: "₹50", type: "flat", uses: 89, expiry: "Nov 30, 2024", status: "active" },
  { id: 3, code: "NEWUSER", discount: "15%", type: "percentage", uses: 300, expiry: "Oct 15, 2024", status: "expired" },
  { id: 4, code: "FESTIVE30", discount: "30%", type: "percentage", uses: 55, expiry: "Jan 14, 2025", status: "active" },
  { id: 5, code: "FLASH100", discount: "₹100", type: "flat", uses: 0, expiry: "Sep 1, 2024", status: "inactive" },
  { id: 6, code: "MEGA25", discount: "25%", type: "percentage", uses: 210, expiry: "Feb 28, 2025", status: "active" },
];

export default function Coupons() {
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");

  const statusStyle = (s: string) => {
    if (s === "active") return { bg: "rgba(34,211,165,0.1)", color: "#22d3a5" };
    if (s === "inactive") return { bg: "rgba(251,191,36,0.1)", color: "#fbbf24" };
    return { bg: "rgba(248,113,113,0.1)", color: "#f87171" };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Coupon Management</h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{COUPONS.length} coupons total</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "var(--accent)", color: "white" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Coupon
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", count: COUPONS.filter(c => c.status === "active").length, color: "var(--success)" },
          { label: "Inactive", count: COUPONS.filter(c => c.status === "inactive").length, color: "var(--warning)" },
          { label: "Expired", count: COUPONS.filter(c => c.status === "expired").length, color: "var(--danger)" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <p className="text-3xl font-bold" style={{ color: s.color }}>{s.count}</p>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{s.label} Coupons</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
          <div className="col-span-2">Code</div>
          <div className="col-span-2">Discount</div>
          <div className="col-span-3">Expiry</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {COUPONS.map((c, i) => {
          const s = statusStyle(c.status);
          const pct = Math.round((c.uses / c.limit) * 100);
          return (
            <div key={c.id} className="grid grid-cols-12 px-5 py-4 items-center transition-all"
              style={{ borderBottom: i < COUPONS.length - 1 ? "1px solid var(--border)" : "none" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div className="col-span-2">
                <span className="mono text-sm font-bold px-2.5 py-1 rounded-lg" style={{ background: "var(--accent)22", color: "var(--accent-2)", fontSize: "12px" }}>
                  {c.code}
                </span>
              </div>
              <div className="col-span-2 font-bold text-sm" style={{ color: "var(--text)" }}>{c.discount}</div>
              <div className="col-span-3 text-sm" style={{ color: "var(--text-muted)" }}>{c.expiry}</div>
              <div className="col-span-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize" style={{ background: s.bg, color: s.color }}>{c.status}</span>
              </div>
              <div className="col-span-1 flex justify-end gap-1.5">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ color: "var(--text-muted)" }}
                  onMouseEnter={e => { (e.currentTarget.style.background = "var(--surface-2)"); (e.currentTarget.style.color = "var(--accent)"); }}
                  onMouseLeave={e => { (e.currentTarget.style.background = "transparent"); (e.currentTarget.style.color = "var(--text-muted)"); }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="rounded-2xl border p-6 w-full max-w-md animate-fade-in" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <h3 className="font-bold text-lg mb-5" style={{ color: "var(--text)" }}>Create New Coupon</h3>
            <div className="space-y-4">
              {[
                { label: "Coupon Code", placeholder: "e.g. SAVE20", value: newCode, set: setNewCode },
                { label: "Discount Value", placeholder: "e.g. 20% or ₹50", value: newDiscount, set: setNewDiscount },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                  <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: "var(--accent)", color: "white" }}>
                Create Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
