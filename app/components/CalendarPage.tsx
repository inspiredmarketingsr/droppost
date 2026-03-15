"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Image as ImageIcon, Film, PlayCircle, Calendar, LayoutGrid, List, Columns3, X } from "lucide-react";
import { BRAND, Theme } from "./ui";

type Props = {
  wsPosts: any[];
  calDate: Date;
  setCalDate: (d: Date) => void;
  darkMode: boolean;
  theme: Theme;
  t: (en: string, nl: string) => string;
  onNewPost: (date: string) => void;
};

const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAYS_FULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const STATUS_COLORS: Record<string, string> = {
  published: "#10B981",
  scheduled: "#0EA5E9",
  draft: "#94A3B8",
  publishing: "#F59E0B",
};

const PlatformDot = ({ id }: { id: string }) => {
  const colors: Record<string, string> = { facebook: "#1877F2", instagram: "#E1306C", tiktok: "#000", linkedin: "#0A66C2", youtube: "#FF0000" };
  return <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors[id] || "#999", flexShrink: 0 }} />;
};

const PlatformIcon = ({ id, size = 13 }: { id: string; size?: number }) => {
  if (id === "facebook") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  if (id === "instagram") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><defs><linearGradient id={`igc${size}`} x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#feda75"/><stop offset="25%" stopColor="#fa7e1e"/><stop offset="50%" stopColor="#d62976"/><stop offset="75%" stopColor="#962fbf"/><stop offset="100%" stopColor="#4f5bd5"/></linearGradient></defs><rect width="22" height="22" x="1" y="1" rx="6" stroke={`url(#igc${size})`} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4.5" stroke={`url(#igc${size})`} strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.2" fill={`url(#igc${size})`}/></svg>;
  if (id === "tiktok") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z"/></svg>;
  if (id === "linkedin") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  if (id === "youtube") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
  return null;
};

/* ═══ Post Card (used in day/week/month) ═══ */
function PostCard({ post, compact, darkMode, theme, onClick }: { post: any; compact?: boolean; darkMode: boolean; theme: Theme; onClick: () => void }) {
  const sc = STATUS_COLORS[post.status] || "#999";
  if (compact) {
    return (
      <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 6px", borderRadius: 6, background: sc + "15", borderLeft: `3px solid ${sc}`, cursor: "pointer", marginBottom: 2, transition: "transform 0.1s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        {post.image_url && <img src={post.image_url} style={{ width: 18, height: 18, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} alt="" />}
        {!post.image_url && post.video_url && <Film size={10} color={sc} style={{ flexShrink: 0 }} />}
        <span style={{ fontSize: 10, color: theme.text, fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", flex: 1 }}>{post.content.slice(0, 18)}</span>
        <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>{post.platforms?.slice(0, 2).map((p: string) => <PlatformDot key={p} id={p} />)}</div>
        {/* CSS for hover effects */}
      <style>{`
        .cal-cell:hover .cal-plus { opacity: 1 !important; }
        .cal-cell:hover .cal-plus:hover { transform: scale(1.15); }
        .cal-plus-wrap:hover .cal-tooltip { opacity: 1 !important; }
        .week-plus-wrap:hover .week-tooltip { opacity: 1 !important; }
      `}</style>
    </div>
    );
  }
  return (
    <div onClick={onClick} style={{ display: "flex", gap: 10, padding: "10px 12px", borderRadius: 12, background: theme.card, border: `1px solid ${theme.border}`, marginBottom: 8, cursor: "pointer", transition: "all 0.15s", borderLeft: `4px solid ${sc}` }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateX(2px)"; e.currentTarget.style.boxShadow = `0 4px 16px ${sc}20`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      {/* Thumbnail */}
      {(post.image_url || post.video_url) && (
        <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#000", position: "relative" }}>
          {post.image_url ? <img src={post.image_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
          : <video src={post.video_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          {post.video_url && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}><PlayCircle size={16} color="#fff" /></div>}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: theme.text, fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginBottom: 4 }}>{post.content}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", gap: 4 }}>{post.platforms?.map((p: string) => <PlatformIcon key={p} id={p} size={12} />)}</div>
          <span style={{ fontSize: 10, color: theme.textT }}>{post.scheduled_time}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: sc, background: sc + "15", padding: "1px 6px", borderRadius: 4 }}>{post.status}</span>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage({ wsPosts, calDate, setCalDate, darkMode, theme, t, onNewPost }: Props) {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const today = new Date();

  const postsForDate = (dateStr: string) => wsPosts.filter(p => p.scheduled_date === dateStr);
  const fmtDate = (d: Date) => d.toISOString().split("T")[0];

  /* ── Navigation ── */
  function goBack() {
    const d = new Date(calDate);
    if (view === "month") d.setMonth(d.getMonth() - 1);
    else if (view === "week") d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCalDate(d);
  }
  function goForward() {
    const d = new Date(calDate);
    if (view === "month") d.setMonth(d.getMonth() + 1);
    else if (view === "week") d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCalDate(d);
  }
  function goToday() { setCalDate(new Date()); }

  /* ── Date helpers ── */
  const yr = calDate.getFullYear();
  const mo = calDate.getMonth();

  // Week start (Sunday)
  const weekStart = new Date(calDate);
  weekStart.setDate(calDate.getDate() - calDate.getDay());

  const headerLabel = view === "month"
    ? `${calDate.toLocaleString("en", { month: "long" })} ${yr}`
    : view === "week"
    ? `${weekStart.toLocaleDateString("en", { month: "short", day: "numeric" })} – ${new Date(weekStart.getTime() + 6 * 86400000).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}`
    : calDate.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      {/* ═══ HEADER — Inline toolbar ═══ */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, margin: 0, marginRight: "auto" }}>{headerLabel}</h1>

        {/* Pill bar: Today | Day | Week | Month | < > */}
        <div style={{ display: "flex", alignItems: "center", background: darkMode ? "rgba(255,255,255,0.06)" : "#f3f4f6", borderRadius: 12, padding: 3, gap: 2 }}>
          <button onClick={goToday} style={{
            padding: "7px 14px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
            background: "transparent", color: theme.textS, transition: "all 0.15s",
          }} onMouseEnter={e => (e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            {t("Today", "Vandaag")}
          </button>
          <div style={{ width: 1, height: 20, background: darkMode ? "rgba(255,255,255,0.1)" : "#d1d5db" }} />
          {([
            { id: "day" as const, label: t("Day", "Dag") },
            { id: "week" as const, label: t("Week", "Week") },
            { id: "month" as const, label: t("Month", "Maand") },
          ]).map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              padding: "7px 16px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
              background: view === v.id ? `linear-gradient(135deg, ${BRAND.primary}, #06B6D4)` : "transparent",
              color: view === v.id ? "#fff" : theme.textS,
              boxShadow: view === v.id ? `0 2px 8px ${BRAND.primary}40` : "none",
              transition: "all 0.2s",
            }}>
              {v.label}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: darkMode ? "rgba(255,255,255,0.1)" : "#d1d5db" }} />
          <button onClick={goBack} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={e => (e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <ChevronLeft size={16} color={theme.textS} />
          </button>
          <button onClick={goForward} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={e => (e.currentTarget.style.background = darkMode ? "rgba(255,255,255,0.08)" : "#e5e7eb")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <ChevronRight size={16} color={theme.textS} />
          </button>
        </div>
      </div>

      {/* ═══ MONTH VIEW ═══ */}
      {view === "month" && (() => {
        const fd = new Date(yr, mo, 1).getDay();
        const dim = new Date(yr, mo + 1, 0).getDate();
        const prevDim = new Date(yr, mo, 0).getDate();
        const cells = Array.from({ length: 42 }, (_, i) => {
          const d = i - fd + 1;
          if (d < 1) return { day: prevDim + d, current: false };
          if (d > dim) return { day: d - dim, current: false };
          return { day: d, current: true };
        });
        return (
          <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${theme.border}` }}>
              {DAYS_SHORT.map(d => (
                <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 11, fontWeight: 700, color: theme.textT, letterSpacing: 0.5 }}>{d.toUpperCase()}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
              {cells.map(({ day, current }, i) => {
                const date = current ? new Date(yr, mo, day) : null;
                const dateStr = date ? fmtDate(date) : "";
                const isToday = date ? date.toDateString() === today.toDateString() : false;
                const dp = dateStr ? postsForDate(dateStr) : [];
                return (
                  <div key={i} style={{
                    minHeight: 100, padding: "6px", borderRight: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`,
                    background: isToday ? (darkMode ? `${BRAND.primary}08` : `${BRAND.primary}05`) : "transparent",
                    opacity: current ? 1 : 0.35, position: "relative",
                  }}
                  className="cal-cell">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, paddingRight: 2 }}>
                      <div />
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        {current && (
                          <div style={{ position: "relative" }} className="cal-plus-wrap">
                            <button onClick={() => onNewPost(dateStr)} className="cal-plus" style={{ width: 18, height: 18, borderRadius: "50%", border: "none", background: BRAND.primary, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "all 0.15s", flexShrink: 0 }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                            <div className="cal-tooltip" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#1a1a2e", color: "#fff", fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", transition: "opacity 0.15s" }}>
                              {t("New Content", "Nieuwe Content")}
                              <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #1a1a2e" }} />
                            </div>
                          </div>
                        )}
                        <span style={{
                          fontSize: 13, fontWeight: isToday ? 800 : 500,
                          color: isToday ? "#fff" : current ? theme.textS : theme.textT,
                        }}>
                          {isToday ? (
                            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: "50%", background: BRAND.primary }}>{day}</span>
                          ) : day}
                        </span>
                      </div>
                    </div>
                    {dp.slice(0, 3).map(post => <PostCard key={post.id} post={post} compact darkMode={darkMode} theme={theme} onClick={() => setSelectedPost(post)} />)}
                    {dp.length > 3 && <div style={{ fontSize: 9, color: BRAND.primary, fontWeight: 700, padding: "2px 6px", cursor: "pointer" }}>+{dp.length - 3} more</div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* ═══ WEEK VIEW ═══ */}
      {view === "week" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(weekStart);
            d.setDate(weekStart.getDate() + i);
            const dateStr = fmtDate(d);
            const isToday = d.toDateString() === today.toDateString();
            const dp = postsForDate(dateStr);
            return (
              <div key={i} style={{
                background: theme.card, borderRadius: 14, border: `1px solid ${isToday ? BRAND.primary + "50" : theme.border}`,
                padding: "12px", minHeight: 300, display: "flex", flexDirection: "column",
                boxShadow: isToday ? `0 0 0 1px ${BRAND.primary}30` : "none",
              }}>
                {/* Day header */}
                <div style={{ textAlign: "center", marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${theme.border}` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: isToday ? BRAND.primary : theme.textT, letterSpacing: 0.5 }}>{DAYS_SHORT[d.getDay()].toUpperCase()}</div>
                  <div style={{
                    fontSize: 22, fontWeight: 800,
                    color: isToday ? "#fff" : theme.text,
                    width: isToday ? 36 : "auto", height: isToday ? 36 : "auto",
                    borderRadius: "50%", background: isToday ? BRAND.primary : "transparent",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: 4,
                  }}>{d.getDate()}</div>
                </div>
                {/* Posts */}
                <div style={{ flex: 1 }}>
                  {dp.length === 0 && <div style={{ textAlign: "center", padding: "20px 0", opacity: 0.3 }}><Calendar size={18} color={theme.textT} /></div>}
                  {dp.map(post => <PostCard key={post.id} post={post} compact darkMode={darkMode} theme={theme} onClick={() => setSelectedPost(post)} />)}
                </div>
                {/* Bottom: count + add */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${theme.border}`, marginTop: 8 }}>
                  <span style={{ fontSize: 10, color: theme.textT, fontWeight: 600 }}>{dp.length} {dp.length === 1 ? "post" : "posts"}</span>
                  <button onClick={() => onNewPost(dateStr)} style={{ position: "relative", width: 22, height: 22, borderRadius: "50%", border: `1.5px dashed ${BRAND.primary}40`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }} className="week-plus-wrap"
                    onMouseEnter={e => { e.currentTarget.style.background = `${BRAND.primary}15`; e.currentTarget.style.borderColor = BRAND.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = `${BRAND.primary}40`; }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={BRAND.primary} strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <div className="week-tooltip" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#1a1a2e", color: "#fff", fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", transition: "opacity 0.15s" }}>
                      {t("New Content", "Nieuwe Content")}
                      <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #1a1a2e" }} />
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══ DAY VIEW ═══ */}
      {view === "day" && (() => {
        const dateStr = fmtDate(calDate);
        const isToday = calDate.toDateString() === today.toDateString();
        const dp = postsForDate(dateStr);
        const hours = Array.from({ length: 24 }, (_, i) => i);
        return (
          <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
            {/* Day header */}
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${theme.border}`, background: isToday ? (darkMode ? `${BRAND.primary}10` : `${BRAND.primary}06`) : "transparent" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: isToday ? BRAND.primary : darkMode ? "rgba(255,255,255,0.05)" : "#f3f4f6",
                display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: isToday ? "#ffffffaa" : theme.textT }}>{DAYS_SHORT[calDate.getDay()]}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: isToday ? "#fff" : theme.text }}>{calDate.getDate()}</span>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>{DAYS_FULL[calDate.getDay()]}</div>
                <div style={{ fontSize: 12, color: theme.textT }}>{dp.length} {dp.length === 1 ? "post" : "posts"} {t("scheduled", "gepland")}</div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ maxHeight: 500, overflowY: "auto" }}>
              {dp.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <Calendar size={32} color={theme.textT} style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 14, color: theme.textT, marginBottom: 12 }}>{t("No posts for this day", "Geen posts voor deze dag")}</div>
                  <button onClick={() => onNewPost(dateStr)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${BRAND.primary}, #06B6D4)`, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    {t("Create Post", "Maak Post")}
                  </button>
                </div>
              ) : (
                <div style={{ padding: "12px 16px" }}>
                  {dp.sort((a: any, b: any) => (a.scheduled_time || "").localeCompare(b.scheduled_time || "")).map(post => (
                    <div key={post.id} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
                      {/* Time label */}
                      <div style={{ width: 50, flexShrink: 0, paddingTop: 12, textAlign: "right" }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.primary }}>{post.scheduled_time || "—"}</span>
                      </div>
                      {/* Connector line */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: STATUS_COLORS[post.status] || "#999", border: `2px solid ${theme.card}`, flexShrink: 0, zIndex: 1 }} />
                        <div style={{ width: 2, flex: 1, background: theme.border, marginTop: -1 }} />
                      </div>
                      {/* Card */}
                      <div style={{ flex: 1, paddingBottom: 8 }}>
                        <PostCard post={post} darkMode={darkMode} theme={theme} onClick={() => setSelectedPost(post)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ═══ POST DETAIL MODAL ═══ */}
      {selectedPost && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }} onClick={() => setSelectedPost(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.modalBg, borderRadius: 20, width: "min(480px,100%)", maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column", border: `1px solid ${theme.border}` }}>
            {/* Header */}
            <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: STATUS_COLORS[selectedPost.status] || "#999", padding: "3px 8px", borderRadius: 6 }}>{selectedPost.status}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {selectedPost.platforms?.map((pid: string) => (
                    <div key={pid} style={{ width: 24, height: 24, borderRadius: 6, background: darkMode ? "rgba(255,255,255,0.08)" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlatformIcon id={pid} size={14} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelectedPost(null)} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={14} color={theme.textT} />
              </button>
            </div>
            {/* Media */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              {(selectedPost.image_url || selectedPost.video_url) && (
                <div style={{ background: "#000" }}>
                  {selectedPost.video_url
                    ? <video src={selectedPost.video_url} controls style={{ width: "100%", maxHeight: 360, objectFit: "contain", display: "block" }} />
                    : <img src={selectedPost.image_url} style={{ width: "100%", maxHeight: 360, objectFit: "contain", display: "block" }} alt="" />
                  }
                </div>
              )}
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontSize: 14, color: theme.text, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{selectedPost.content}</p>
                <div style={{ display: "flex", gap: 10, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: theme.textT }}>
                    <Calendar size={13} /> {selectedPost.scheduled_date || "—"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: theme.textT }}>
                    <Clock size={13} /> {selectedPost.scheduled_time || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}