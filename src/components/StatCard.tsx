"use client";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  color: string;
  delay?: string;
}

export default function StatCard({ title, value, change, positive, icon, color, delay = "0s" }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-6 border animate-fade-in transition-all hover:translate-y-[-2px]"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        animationDelay: delay,
        cursor: "default",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: color + "22" }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: positive ? "rgba(34,211,165,0.1)" : "rgba(248,113,113,0.1)",
            color: positive ? "var(--success)" : "var(--danger)",
          }}
        >
          {positive ? "▲" : "▼"} {change}
        </span>
      </div>
      <p className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>{value}</p>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{title}</p>
    </div>
  );
}
