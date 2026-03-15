"use client";
import { LayoutDashboard, Calendar, PenLine, Clock, FileText, CheckSquare, BarChart2, Image, Users, Settings } from "lucide-react";
import { BRAND, Avatar } from "./ui";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  workspaces: any[];
  activeWS: string | null;
  switchWorkspace: (id: string) => void;
  setShowNewWS: (v: boolean) => void;
  page: string;
  setPage: (v: string) => void;
  pendingCount: number;
  t: (en: string, nl: string) => string;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen, workspaces, activeWS, switchWorkspace, setShowNewWS, page, setPage, pendingCount, t }: Props) {
  const NAV = [
    { id: "dashboard", icon: <LayoutDashboard size={16} />, label: t("Dashboard", "Dashboard") },
    { id: "calendar", icon: <Calendar size={16} />, label: t("Calendar", "Kalender") },
    { id: "posts", icon: <PenLine size={16} />, label: "Posts" },
    { id: "queue", icon: <Clock size={16} />, label: t("Queue", "Wachtrij") },
    { id: "drafts", icon: <FileText size={16} />, label: t("Drafts", "Concepten") },
    { id: "approval", icon: <CheckSquare size={16} />, label: t("Approval", "Goedkeuring"), badge: pendingCount },
    { id: "analytics", icon: <BarChart2 size={16} />, label: t("Analytics", "Statistieken") },
    { id: "media", icon: <Image size={16} />, label: "Media" },
    { id: "team", icon: <Users size={16} />, label: "Team" },
    { id: "settings", icon: <Settings size={16} />, label: t("Settings", "Instellingen") },
  ];

  return (
    <div style={{ width: sidebarOpen ? 240 : 64, flexShrink: 0, background: BRAND.sidebar, display: "flex", flexDirection: "column", transition: "width 0.2s", overflow: "hidden", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      {/* LOGO */}
      <div style={{ padding: "16px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 60 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 17 }}>D</span></div>
        {sidebarOpen && <span style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>}
        {sidebarOpen && <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "6px", borderRadius: 7, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg></button>}
      </div>

      {/* WORKSPACES */}
      <div style={{ padding: "10px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {sidebarOpen && <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, marginBottom: 6, paddingLeft: 4 }}>WORKSPACES</div>}
        {workspaces.map(w => { const act = w.id === activeWS; return <button key={w.id} onClick={() => switchWorkspace(w.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 6px", borderRadius: 9, marginBottom: 2, background: act ? "rgba(124,58,237,0.25)" : "transparent", border: act ? "1px solid rgba(124,58,237,0.35)" : "1px solid transparent", cursor: "pointer" }}><Avatar initials={w.avatar} color={w.color} size={28} />{sidebarOpen && <div style={{ flex: 1, textAlign: "left", overflow: "hidden" }}><div style={{ fontSize: 12, fontWeight: 600, color: act ? "#fff" : "rgba(255,255,255,0.65)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.name}</div></div>}</button>; })}
        <button onClick={() => setShowNewWS(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "6px", borderRadius: 9, marginTop: 2, background: "transparent", border: "1px dashed rgba(255,255,255,0.1)", cursor: "pointer" }}><div style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px dashed rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>+</span></div>{sidebarOpen && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{t("New workspace", "Nieuwe workspace")}</span>}</button>
      </div>

      {/* NAV */}
      <div style={{ padding: "8px", flex: 1, overflowY: "auto" }}>
        {NAV.map(n => { const act = page === n.id; return <button key={n.id} onClick={() => setPage(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px", borderRadius: 9, marginBottom: 1, background: act ? "rgba(124,58,237,0.2)" : "transparent", border: "none", cursor: "pointer", position: "relative" }}><span style={{ flexShrink: 0, width: 20, display: "flex", alignItems: "center", justifyContent: "center", color: act ? "#fff" : "rgba(255,255,255,0.55)" }}>{n.icon}</span>{sidebarOpen && <span style={{ fontSize: 13, color: act ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: act ? 600 : 400 }}>{n.label}</span>}{n.badge && n.badge > 0 ? <span style={{ marginLeft: "auto", background: BRAND.primary, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>{n.badge}</span> : null}{act && <div style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 3, background: BRAND.primary, borderRadius: "0 3px 3px 0" }} />}</button>; })}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {sidebarOpen ? (
          <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "6px 0" }}>
            {[
              { label: t("Privacy", "Privacy"), href: "/privacy" },
              { label: t("Terms", "Voorwaarden"), href: "/terms" },
              { label: t("Feedback", "Feedback"), href: "mailto:inspiredmarketingsr@gmail.com?subject=DropPost Feedback" },
            ].map((item, i) => (
              <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>·</span>}
                <a href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textDecoration: "none", cursor: "pointer" }} onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>{item.label}</a>
              </span>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "4px 0" }}>
            <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textDecoration: "none" }} title="Privacy">P</a>
            <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textDecoration: "none" }} title="Terms">T</a>
            <a href="mailto:inspiredmarketingsr@gmail.com?subject=DropPost Feedback" style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", textDecoration: "none" }} title="Feedback">F</a>
          </div>
        )}
      </div>
    </div>
  );
}