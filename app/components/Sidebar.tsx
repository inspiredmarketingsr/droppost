"use client";
import { LayoutDashboard, Calendar, PenLine, Clock, FileText, CheckSquare, BarChart2, Image, Users, Settings } from "lucide-react";
import { BRAND } from "./ui";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  page: string;
  setPage: (v: string) => void;
  pendingCount: number;
  t: (en: string, nl: string) => string;
};

export default function Sidebar({ sidebarOpen, page, setPage, pendingCount, t }: Props) {
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
    <div style={{ width: sidebarOpen ? 220 : 58, flexShrink: 0, background: BRAND.sidebar, display: "flex", flexDirection: "column", transition: "width 0.2s", overflow: "hidden", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      {/* LOGO */}
      <div style={{ padding: "14px 10px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 54 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>D</span>
        </div>
        {sidebarOpen && (
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>
            Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span>
          </span>
        )}
      </div>

      {/* NAV */}
      <div style={{ padding: "8px 6px", flex: 1, overflowY: "auto" }}>
        {sidebarOpen && (
          <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: 1.2, padding: "4px 8px 8px" }}>MENU</div>
        )}
        {NAV.map(n => {
          const act = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} title={!sidebarOpen ? n.label : undefined} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: sidebarOpen ? "8px 10px" : "8px",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              borderRadius: 9, marginBottom: 1,
              background: act ? "rgba(124,58,237,0.2)" : "transparent",
              border: "none", cursor: "pointer", position: "relative",
              transition: "background 0.12s",
            }}>
              <span style={{ flexShrink: 0, width: 20, display: "flex", alignItems: "center", justifyContent: "center", color: act ? "#fff" : "rgba(255,255,255,0.5)" }}>
                {n.icon}
              </span>
              {sidebarOpen && (
                <span style={{ fontSize: 13, color: act ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: act ? 600 : 400 }}>{n.label}</span>
              )}
              {n.badge && n.badge > 0 ? (
                <span style={{ marginLeft: sidebarOpen ? "auto" : undefined, position: sidebarOpen ? "relative" : "absolute", top: sidebarOpen ? undefined : 2, right: sidebarOpen ? undefined : 2, background: BRAND.primary, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 10, padding: "1px 5px", minWidth: 16, textAlign: "center" }}>{n.badge}</span>
              ) : null}
              {act && <div style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 3, background: BRAND.primary, borderRadius: "0 3px 3px 0" }} />}
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "8px 6px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {sidebarOpen ? (
          <div style={{ display: "flex", justifyContent: "center", gap: 4, padding: "4px 0" }}>
            {[
              { label: t("Privacy", "Privacy"), href: "/privacy" },
              { label: t("Terms", "Voorwaarden"), href: "/terms" },
              { label: t("Feedback", "Feedback"), href: "mailto:inspiredmarketingsr@gmail.com?subject=DropPost Feedback" },
            ].map((item, i) => (
              <span key={item.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 10 }}>·</span>}
                <a href={item.href} target={item.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
                  {item.label}
                </a>
              </span>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "2px 0" }}>
            {[
              { label: "P", href: "/privacy", title: "Privacy" },
              { label: "T", href: "/terms", title: "Terms" },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" title={item.title} style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}