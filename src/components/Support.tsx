"use client";
import { useState } from "react";

interface Ticket {
  id: string;
  user: string;
  role: "user" | "driver";
  subject: string;
  status: "open" | "in-progress" | "resolved";
  priority: "high" | "medium" | "low";
  date: string;
}

const mockTickets: Ticket[] = [
  { id: "T-1001", user: "John Doe", role: "user", subject: "Payment double charged", status: "open", priority: "high", date: "2024-03-28" },
  { id: "T-1002", user: "Rahul Sharma", role: "driver", subject: "Inaccurate location tracking", status: "in-progress", priority: "medium", date: "2024-03-27" },
  { id: "T-1003", user: "Jane Smith", role: "user", subject: "App crashing on checkout", status: "open", priority: "high", date: "2024-03-28" },
  { id: "T-1004", user: "Suresh Singh", role: "driver", subject: "Update bank details", status: "resolved", priority: "low", date: "2024-03-25" },
];

export default function Support() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Support & Issue Handling</h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage customer and driver complaints, resolve disputes and operational issues.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Active Tickets</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent" style={{ color: "var(--accent)" }}>
              {tickets.filter(t => t.status !== "resolved").length} New
            </span>
          </div>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div 
                key={ticket.id} 
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedTicket?.id === ticket.id ? "border-accent shadow-md ring-1 ring-accent/20" : "hover:border-accent/30"
                }`}
                style={{ background: "var(--surface)", borderColor: selectedTicket?.id === ticket.id ? "var(--accent)" : "var(--border)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{ticket.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    ticket.priority === "high" ? "bg-red-500 text-white" : 
                    ticket.priority === "medium" ? "bg-amber-500 text-white" : "bg-blue-500 text-white"
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <h4 className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{ticket.subject}</h4>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-slate-400">
                      {ticket.user.charAt(0)}
                    </div>
                    <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{ticket.user}</span>
                  </div>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{ticket.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Detail */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="h-full flex flex-col rounded-2xl border overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>{selectedTicket.subject}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Opened on {selectedTicket.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-400" />
                    <span className="text-xs font-bold uppercase" style={{ color: "var(--accent)" }}>{selectedTicket.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select 
                    value={selectedTicket.status}
                    onChange={(e) => setSelectedTicket({...selectedTicket, status: e.target.value as any})}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold outline-none border transition-all"
                    style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white bg-slate-400">
                    {selectedTicket.user.charAt(0)}
                  </div>
                  <div className="space-y-2 max-w-[80%]">
                    <div className="p-4 rounded-2xl rounded-tl-none bg-black/5 dark:bg-white/5">
                      <p className="text-sm" style={{ color: "var(--text)" }}>
                        Hello Support, I noticed that I was charged twice for my last ride (ORD-003). 
                        Can you please look into this and process a refund for the duplicate transaction?
                      </p>
                    </div>
                    <span className="text-[10px] px-1" style={{ color: "var(--text-muted)" }}>10:30 AM</span>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white" style={{ background: "var(--accent)" }}>
                    AD
                  </div>
                  <div className="space-y-2 max-w-[80%] flex flex-col items-end">
                    <div className="p-4 rounded-2xl rounded-tr-none text-white" style={{ background: "var(--accent)" }}>
                      <p className="text-sm">
                        Hello {selectedTicket.user}, I'm looking into this right now. Please hold on while I verify the transaction records.
                      </p>
                    </div>
                    <span className="text-[10px] px-1" style={{ color: "var(--text-muted)" }}>10:45 AM</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="relative">
                  <input 
                    placeholder="Type your response..." 
                    className="w-full pl-4 pr-12 py-3 rounded-xl outline-none transition-all"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white" style={{ background: "var(--accent)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center rounded-2xl border border-dashed text-center p-12" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>Select a ticket to view</h3>
              <p className="text-sm max-w-xs mt-2" style={{ color: "var(--text-muted)" }}>Choose a conversation from the left panel to start resolving issues.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
