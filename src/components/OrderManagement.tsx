"use client";
import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  driver: string | null;
  status: "new" | "ongoing" | "completed" | "cancelled";
  amount: string;
  date: string;
  pickup: string;
  destination: string;
}

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "John Doe", driver: "Rahul Sharma", status: "ongoing", amount: "₹450", date: "2024-03-28 14:30", pickup: "Connaught Place", destination: "Indira Gandhi Airport" },
  { id: "ORD-002", customer: "Jane Smith", driver: null, status: "new", amount: "₹320", date: "2024-03-28 15:00", pickup: "Saket", destination: "Hauz Khas" },
  { id: "ORD-003", customer: "Alice Johnson", driver: "Amit Kumar", status: "completed", amount: "₹280", date: "2024-03-28 12:15", pickup: "Dwarka Sector 10", destination: "Janakpuri East" },
  { id: "ORD-004", customer: "Bob Brown", driver: null, status: "cancelled", amount: "₹150", date: "2024-03-28 10:00", pickup: "Rohini", destination: "Pitampura" },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState("all");

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const updateStatus = (id: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Order Management</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Track and manage all customer orders in real-time.</p>
        </div>
        <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-xl">
          {["all", "new", "ongoing", "completed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f ? "bg-white dark:bg-gray-800 shadow-sm" : "hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
              style={{ color: filter === f ? "var(--accent)" : "var(--text-muted)" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "New", count: orders.filter(o => o.status === "new").length, color: "var(--accent)" },
          { label: "Ongoing", count: orders.filter(o => o.status === "ongoing").length, color: "#3b82f6" },
          { label: "Completed", count: orders.filter(o => o.status === "completed").length, color: "#10b981" },
          { label: "Cancelled", count: orders.filter(o => o.status === "cancelled").length, color: "#ef4444" },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-2xl border flex items-center justify-between" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{stat.label}</span>
            <span className="text-xl font-bold" style={{ color: stat.color }}>{stat.count}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="p-6 rounded-2xl border group transition-all hover:shadow-lg hover:-translate-y-0.5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg" style={{ color: "var(--text)" }}>{order.id}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === "new" ? "bg-accent/10 text-accent" : 
                      order.status === "ongoing" ? "bg-blue-500/10 text-blue-500" : 
                      order.status === "completed" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                    }`} style={{ color: order.status === "new" ? "var(--accent)" : undefined }}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{order.date}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Pickup</p>
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{order.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full flex-shrink-0 bg-emerald-500" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Destination</p>
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{order.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Customer</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Driver</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{order.driver || "Not Assigned"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>Amount</p>
                    <p className="text-sm font-bold text-accent" style={{ color: "var(--accent)" }}>{order.amount}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-end gap-2 min-w-[140px]">
                {order.status === "new" && (
                  <button 
                    onClick={() => updateStatus(order.id, "ongoing")}
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "var(--accent)" }}
                  >
                    Assign Driver
                  </button>
                )}
                {order.status === "ongoing" && (
                  <button 
                    onClick={() => updateStatus(order.id, "completed")}
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                    style={{ background: "#10b981" }}
                  >
                    Complete
                  </button>
                )}
                {(order.status === "new" || order.status === "ongoing") && (
                  <button 
                    onClick={() => updateStatus(order.id, "cancelled")}
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border hover:bg-red-50"
                    style={{ borderColor: "var(--border)", color: "var(--danger)" }}
                  >
                    Cancel
                  </button>
                )}
                <button className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border hover:bg-black/5" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
