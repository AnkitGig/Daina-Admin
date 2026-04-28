"use client";
import { useState } from "react";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  registrationDate: string;
  vehicleDetails: string;
  documentsVerified: boolean;
}

const mockDrivers: Driver[] = [
  { id: "D1", name: "Rahul Sharma", email: "rahul@example.com", phone: "+91 9876543210", status: "active", registrationDate: "2024-03-15", vehicleDetails: "Swift Dzire (DL 1C A 1234)", documentsVerified: true },
  { id: "D2", name: "Amit Kumar", email: "amit@example.com", phone: "+91 9876543211", status: "pending", registrationDate: "2024-03-20", vehicleDetails: "Ertiga (DL 1C B 5678)", documentsVerified: false },
  { id: "D3", name: "Suresh Singh", email: "suresh@example.com", phone: "+91 9876543212", status: "inactive", registrationDate: "2024-03-10", vehicleDetails: "Innova (HR 26 C 9012)", documentsVerified: true },
  { id: "D4", name: "Vikram Singh", email: "vikram@example.com", phone: "+91 9876543213", status: "pending", registrationDate: "2024-03-22", vehicleDetails: "WagonR (DL 1C D 3456)", documentsVerified: false },
];

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [search, setSearch] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setDrivers(drivers.map(d => 
      d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d
    ));
  };

  const approveDriver = (id: string) => {
    setDrivers(drivers.map(d => 
      d.id === id ? { ...d, status: "active", documentsVerified: true } : d
    ));
    setSelectedDriver(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Driver Management</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage registrations, verify documents, and control driver status.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search drivers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-64"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </div>
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90" style={{ background: "var(--accent)" }}>
            Export List
          </button>
        </div>
      </div>

      {/* Driver Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Drivers", value: drivers.length, color: "var(--accent)" },
          { label: "Pending Approval", value: drivers.filter(d => d.status === "pending").length, color: "#f59e0b" },
          { label: "Active Drivers", value: drivers.filter(d => d.status === "active").length, color: "#10b981" },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Driver Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Driver</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Vehicle</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Docs</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "var(--accent)" }}>
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{driver.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{driver.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "var(--text)" }}>
                  {driver.vehicleDetails}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    driver.status === "active" ? "bg-emerald-500/10 text-emerald-500" : 
                    driver.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {driver.documentsVerified ? (
                    <span className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setSelectedDriver(driver)}
                      className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button 
                      onClick={() => toggleStatus(driver.id)}
                      className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                      style={{ color: driver.status === "active" ? "var(--danger)" : "var(--accent)" }}
                    >
                      {driver.status === "active" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verification Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border p-8 space-y-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>Verify Driver Details</h3>
              <button onClick={() => setSelectedDriver(null)} style={{ color: "var(--text-muted)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Driver Name</label>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{selectedDriver.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Vehicle Details</label>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{selectedDriver.vehicleDetails}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Registration Date</label>
                  <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{selectedDriver.registrationDate}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-dashed text-center" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                  <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Driver License</p>
                  <div className="aspect-video bg-black/10 rounded-lg flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-dashed text-center" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                  <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Vehicle Insurance</p>
                  <div className="aspect-video bg-black/10 rounded-lg flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <button 
                onClick={() => setSelectedDriver(null)}
                className="flex-1 px-6 py-3 rounded-xl font-semibold border transition-all hover:bg-black/5" 
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                Reject
              </button>
              <button 
                onClick={() => approveDriver(selectedDriver.id)}
                className="flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90" 
                style={{ background: "var(--accent)" }}
              >
                Approve Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
