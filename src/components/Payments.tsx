"use client";
import { useState } from "react";

interface Payout {
  id: string;
  driver: string;
  amount: string;
  status: "pending" | "processed" | "failed";
  date: string;
  bankInfo: string;
}

const mockPayouts: Payout[] = [
  { id: "PAY-101", driver: "Rahul Sharma", amount: "₹4,500", status: "processed", date: "2024-03-25", bankInfo: "SBI ****1234" },
  { id: "PAY-102", driver: "Amit Kumar", amount: "₹2,800", status: "pending", date: "2024-03-27", bankInfo: "HDFC ****5678" },
  { id: "PAY-103", driver: "Suresh Singh", amount: "₹3,200", status: "processed", date: "2024-03-20", bankInfo: "ICICI ****9012" },
  { id: "PAY-104", driver: "Vikram Singh", amount: "₹1,500", status: "failed", date: "2024-03-26", bankInfo: "PNB ****3456" },
];

export default function Payments() {
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Payments & Earnings</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Monitor total revenue, platform fees, and manage driver payouts.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg shadow-accent/20" style={{ background: "var(--accent)" }}>
          Initiate Batch Payout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Earnings", value: "₹2,45,000", change: "+12.5%", positive: true },
          { label: "Platform Fees", value: "₹48,500", change: "+8.2%", positive: true },
          { label: "Pending Payouts", value: "₹12,400", change: "-5.0%", positive: false },
          { label: "Driver Earnings", value: "₹1,84,100", change: "+14.1%", positive: true },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{stat.value}</h3>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-bold" style={{ color: "var(--text)" }}>Payout Requests</h3>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-black/5" style={{ color: "var(--text-muted)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            </button>
            <button className="p-2 rounded-lg hover:bg-black/5" style={{ color: "var(--text-muted)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Transaction ID</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Driver</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Amount</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Bank Account</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {payouts.map((pay) => (
              <tr key={pay.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--text)" }}>{pay.id}</td>
                <td className="px-6 py-4 text-sm" style={{ color: "var(--text)" }}>{pay.driver}</td>
                <td className="px-6 py-4 text-sm font-bold" style={{ color: "var(--text)" }}>{pay.amount}</td>
                <td className="px-6 py-4 text-xs" style={{ color: "var(--text-muted)" }}>{pay.bankInfo}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    pay.status === "processed" ? "bg-emerald-500/10 text-emerald-500" : 
                    pay.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {pay.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {pay.status === "pending" && (
                    <button className="text-xs font-bold transition-all hover:underline" style={{ color: "var(--accent)" }}>
                      Process Now
                    </button>
                  )}
                  {pay.status === "failed" && (
                    <button className="text-xs font-bold transition-all hover:underline" style={{ color: "var(--danger)" }}>
                      Retry
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
