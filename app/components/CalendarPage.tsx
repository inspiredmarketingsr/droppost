"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BRAND, Theme } from "./ui";

type Props = {
  wsPosts: any[];
  calDate: Date;
  setCalDate: (d: Date) => void;
  darkMode: boolean;
  theme: Theme;
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage({ wsPosts, calDate, setCalDate, darkMode, theme }: Props) {
  const today = new Date();
  const yr = calDate.getFullYear();
  const mo = calDate.getMonth();
  const fd = new Date(yr, mo, 1).getDay();
  const dim = new Date(yr, mo + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, i) => { const d = i - fd + 1; return d >= 1 && d <= dim ? d : null; });
  const postsForDate = (date: Date) => wsPosts.filter((p: any) => p.scheduled_date === date.toISOString().split("T")[0]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: theme.text, minWidth: 160 }}>{calDate.toLocaleString("en", { month: "long" })} {yr}</span>
        <button onClick={() => { const d = new Date(calDate); d.setMonth(mo - 1); setCalDate(d); }} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: darkMode ? "rgba(13,148,136,0.15)" : "#E0F2F1", color: "#0D9488", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => { const d = new Date(calDate); d.setMonth(mo + 1); setCalDate(d); }} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: darkMode ? "rgba(13,148,136,0.15)" : "#E0F2F1", color: "#0D9488", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${theme.border}` }}>
          {DAYS.map(d => <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 700, color: theme.textT }}>{d}</div>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
          {cells.map((day, i) => {
            const date = day ? new Date(yr, mo, day) : null;
            const isToday = date ? date.toDateString() === today.toDateString() : false;
            const dp = date ? postsForDate(date) : [];
            return (
              <div key={i} style={{ minHeight: 90, padding: "6px 4px", borderRight: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>
                {day && <div style={{ fontSize: 13, fontWeight: isToday ? 800 : 500, color: isToday ? "#0D9488" : theme.textS, textAlign: "right", paddingRight: 4, marginBottom: 4 }}>{day}</div>}
                {dp.slice(0, 2).map((post: any) => (
                  <div key={post.id} style={{ fontSize: 10, background: darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL, color: BRAND.primary, borderRadius: 4, padding: "2px 4px", marginBottom: 2, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {post.content.slice(0, 20)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}