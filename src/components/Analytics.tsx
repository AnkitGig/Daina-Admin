"use client";

const topCountries = [
  { name: "India", users: 842, pct: 66 },
  { name: "USA", users: 201, pct: 16 },
  { name: "UK", users: 89, pct: 7 },
  { name: "Germany", users: 76, pct: 6 },
  { name: "Others", users: 76, pct: 5 },
];

const devices = [
  { name: "Mobile", pct: 62, color: "var(--accent)" },
  { name: "Desktop", pct: 31, color: "var(--success)" },
  { name: "Tablet", pct: 7, color: "var(--warning)" },
];

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Analytics</h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Platform insights and metrics</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Avg. Session", value: "4m 32s", change: "+12s", up: true },
          { label: "Bounce Rate", value: "24.8%", change: "-3.2%", up: true },
          { label: "Page Views", value: "48.2K", change: "+18%", up: true },
          { label: "Conversions", value: "3.6%", change: "-0.4%", up: false },
        ].map(k => (
          <div key={k.label} className="rounded-2xl border p-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>{k.label}</p>
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{k.value}</p>
            <p className="text-xs mt-1 font-semibold" style={{ color: k.up ? "var(--success)" : "var(--danger)" }}>{k.change} vs last mo.</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Countries */}
        <div className="rounded-2xl border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h3 className="font-semibold mb-5" style={{ color: "var(--text)" }}>Top Countries</h3>
          <div className="space-y-4">
            {topCountries.map((c, i) => (
              <div key={c.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm" style={{ color: "var(--text)" }}>
                    <span className="mr-2 text-xs" style={{ color: "var(--text-muted)" }}>#{i+1}</span>{c.name}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>{c.users}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--surface-2)" }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${c.pct}%`, background: `hsl(${260 - i * 30}, 80%, 60%)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device breakdown */}
        <div className="rounded-2xl border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <h3 className="font-semibold mb-5" style={{ color: "var(--text)" }}>Device Breakdown</h3>
          {/* Simple donut-like visual */}
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--surface-2)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent)" strokeWidth="3"
                  strokeDasharray="62 38" strokeDashoffset="0" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--success)" strokeWidth="3"
                  strokeDasharray="31 69" strokeDashoffset="-62" strokeLinecap="round"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--warning)" strokeWidth="3"
                  strokeDasharray="7 93" strokeDashoffset="-93" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold" style={{ color: "var(--text)" }}>1,284</span>
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {devices.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-sm" style={{ color: "var(--text)" }}>{d.name}</span>
                  </div>
                  <span className="font-bold text-sm" style={{ color: "var(--text-muted)" }}>{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini bar chart */}
          <div className="mt-6 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Weekly signups</p>
            <div className="flex items-end gap-1 h-12">
              {[40,55,48,70,63,82,75].map((v,i) => (
                <div key={i} className="flex-1 rounded-t-md" style={{ height: `${v}%`, background: i === 6 ? "var(--accent)" : "var(--surface-2)", border: "1px solid var(--border)" }} />
              ))}
            </div>
            <div className="flex mt-1.5 gap-1">
              {["M","T","W","T","F","S","S"].map((d,i) => (
                <div key={i} className="flex-1 text-center text-xs" style={{ color: i === 6 ? "var(--accent)" : "var(--text-muted)", fontFamily: "Space Mono", fontSize: "10px" }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
