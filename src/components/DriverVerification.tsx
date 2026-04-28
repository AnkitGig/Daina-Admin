"use client";
import { useState } from "react";

interface PendingDriver {
  id: string;
  name: string;
  submittedDate: string;
  documents: {
    type: string;
    status: "pending" | "rejected" | "verified";
    file: string;
  }[];
}

const mockPending: PendingDriver[] = [
  {
    id: "D-901",
    name: "Vikram Singh",
    submittedDate: "2024-03-27",
    documents: [
      { type: "Driver's License", status: "pending", file: "license.jpg" },
      { type: "Vehicle Registration", status: "pending", file: "rc.jpg" },
      { type: "Aadhar Card", status: "verified", file: "aadhar.jpg" },
    ]
  },
  {
    id: "D-902",
    name: "Sanjay Dutta",
    submittedDate: "2024-03-26",
    documents: [
      { type: "Driver's License", status: "pending", file: "license.jpg" },
      { type: "Vehicle Registration", status: "rejected", file: "rc.jpg" },
      { type: "Insurance", status: "pending", file: "ins.jpg" },
    ]
  },
  {
    id: "D-901",
    name: "Vikram Singh",
    submittedDate: "2024-03-27",
    documents: [
      { type: "Driver's License", status: "pending", file: "license.jpg" },
      { type: "Vehicle Registration", status: "pending", file: "rc.jpg" },
      { type: "Aadhar Card", status: "verified", file: "aadhar.jpg" },
    ]
  }
];

export default function DriverVerification() {
  const [drivers, setDrivers] = useState(mockPending);
  const [selectedDriver, setSelectedDriver] = useState<PendingDriver | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Document Verification</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Review and verify driver uploaded documents for onboarding.</p>
      </div>

      <div className="space-y-6">
        {/* Verification Table */}
        <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Application ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Driver Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Submitted Date</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Doc Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: "var(--text-muted)" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold" style={{ color: "var(--accent)" }}>{driver.id}</td>
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--text)" }}>{driver.name}</td>
                  <td className="px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>{driver.submittedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {driver.documents.map((doc, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${doc.status === "verified" ? "bg-emerald-500" :
                            doc.status === "rejected" ? "bg-red-500" : "bg-amber-500"
                          }`} title={`${doc.type}: ${doc.status}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedDriver(driver)}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "var(--accent)" }}
                    >
                      Verify Documents
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verification Workspace Modal */}
        {selectedDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border p-8 space-y-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between border-b pb-6" style={{ borderColor: "var(--border)" }}>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{selectedDriver.name}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>Reviewing documents for Application ID: {selectedDriver.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelectedDriver(null)} className="p-2 rounded-full hover:bg-black/5" style={{ color: "var(--text-muted)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedDriver.documents.map((doc, i) => (
                  <div key={i} className="p-5 rounded-2xl border space-y-4" style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{doc.type}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${doc.status === "verified" ? "bg-emerald-500/10 text-emerald-500" :
                          doc.status === "rejected" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                        }`}>
                        {doc.status}
                      </span>
                    </div>

                    <div className="aspect-video rounded-xl bg-black/10 flex items-center justify-center border-2 border-dashed border-black/5 dark:border-white/5 relative group cursor-pointer overflow-hidden">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-xl shadow-2xl">View Document</button>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all hover:bg-red-500/10 border-red-500/20 text-red-500">
                        Reject
                      </button>
                      <button className="flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all hover:bg-emerald-500/10 border-emerald-500/20 text-emerald-500">
                        Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold border transition-all hover:bg-black/5"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}
                >
                  Cancel Review
                </button>
                <button
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90 shadow-lg shadow-emerald-500/20"
                  style={{ background: "#10b981" }}
                >
                  Approve Driver Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
