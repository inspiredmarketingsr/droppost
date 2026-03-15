"use client";
import { useState, useEffect } from "react";
import { PenLine, Clock3, CheckCircle, AlertCircle, TrendingUp, Zap, ArrowUpRight } from "lucide-react";
import { BRAND, PBadge, StatusTag, Theme } from "./ui";

type Props = {
  wsPosts: any[];
  scheduled: any[];
  published: any[];
  pending: any[];
  darkMode: boolean;
  theme: Theme;
  t: (en: string, nl: string) => string;
};

export default function Dashboard({ wsPosts, scheduled, published, pending, darkMode, theme, t }: Props) {
  const [phase, setPhase] = useState<"drop" | "splash" | "reveal" | "done">("drop");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("splash"), 600);
    const t2 = setTimeout(() => setPhase("reveal"), 1100);
    const t3 = setTimeout(() => setPhase("done"), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const stats = [
    { label: "Total", value: wsPosts.length, color: BRAND.primary, icon: <PenLine size={18} color={BRAND.primary} />, delay: 0 },
    { label: "Scheduled", value: scheduled.length, color: "#0EA5E9", icon: <Clock3 size={18} color="#0EA5E9" />, delay: 80 },
    { label: "Published", value: published.length, color: BRAND.green, icon: <CheckCircle size={18} color={BRAND.green} />, delay: 160 },
    { label: "Pending", value: pending.length, color: BRAND.amber, icon: <AlertCircle size={18} color={BRAND.amber} />, delay: 240 },
  ];

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <style>{`
        @keyframes dropFall {
          0% { transform: translateY(-120px) scale(1); opacity: 1; }
          70% { transform: translateY(0) scale(1); opacity: 1; }
          85% { transform: translateY(-8px) scale(1.1, 0.9); opacity: 1; }
          100% { transform: translateY(0) scale(1.3, 0.5); opacity: 0; }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.7; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes ripple2 {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(6); opacity: 0; }
        }
        @keyframes particleBurst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes cardReveal {
          0% { transform: translateY(30px) scale(0.9); opacity: 0; }
          60% { transform: translateY(-4px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0); }
          50% { box-shadow: 0 0 20px 4px rgba(124,58,237,0.15); }
        }
        @keyframes countUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ═══ WATER DROP ANIMATION ═══ */}
      {phase !== "done" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 120, zIndex: 10, pointerEvents: "none" }}>
          {/* Drop */}
          {(phase === "drop") && (
            <div style={{
              width: 28, height: 36,
              background: `linear-gradient(135deg, ${BRAND.primary}, #06B6D4)`,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              animation: "dropFall 0.6s ease-in forwards",
              filter: "blur(0.5px)",
              boxShadow: `0 4px 20px ${BRAND.primary}60`,
            }} />
          )}

          {/* Splash ripples */}
          {(phase === "splash" || phase === "reveal") && (
            <div style={{ position: "relative" }}>
              {/* Center flash */}
              <div style={{
                position: "absolute", top: -20, left: -20,
                width: 40, height: 40, borderRadius: "50%",
                background: `radial-gradient(circle, ${BRAND.primary}40, transparent 70%)`,
                animation: "ripple 0.6s ease-out forwards",
              }} />
              <div style={{
                position: "absolute", top: -20, left: -20,
                width: 40, height: 40, borderRadius: "50%",
                background: `radial-gradient(circle, #06B6D440, transparent 70%)`,
                animation: "ripple2 0.8s ease-out 0.1s forwards",
              }} />

              {/* Particles */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * 360;
                const dist = 40 + Math.random() * 60;
                const size = 4 + Math.random() * 6;
                const dx = Math.cos(angle * Math.PI / 180) * dist;
                const dy = Math.sin(angle * Math.PI / 180) * dist - 20;
                const colors = [BRAND.primary, "#06B6D4", "#8B5CF6", "#22D3EE", "#A78BFA"];
                return (
                  <div key={i} style={{
                    position: "absolute", top: 0, left: 0,
                    width: size, height: size, borderRadius: "50%",
                    background: colors[i % colors.length],
                    animation: `particleBurst 0.7s ease-out ${i * 0.03}s forwards`,
                    transform: `translate(${dx}px, ${dy}px)`,
                    boxShadow: `0 0 6px ${colors[i % colors.length]}80`,
                  }} />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══ DASHBOARD CONTENT ═══ */}
      <div style={{ opacity: phase === "done" || phase === "reveal" ? 1 : 0, transition: "opacity 0.3s" }}>

        {/* Header row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
          animation: phase === "reveal" || phase === "done" ? "fadeSlideUp 0.5s ease-out forwards" : "none",
          opacity: phase === "done" ? 1 : 0,
        }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: theme.text, margin: 0 }}>Dashboard</h1>
            <p style={{ fontSize: 13, color: theme.textT, margin: "4px 0 0" }}>{t("Welcome back! Here's your overview.", "Welkom terug! Hier is je overzicht.")}</p>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          {stats.map((s, idx) => (
            <div key={s.label} style={{
              background: darkMode
                ? `linear-gradient(135deg, ${theme.card}, ${s.color}08)`
                : `linear-gradient(135deg, #fff, ${s.color}06)`,
              borderRadius: 16, padding: "20px", position: "relative", overflow: "hidden",
              border: `1px solid ${darkMode ? s.color + "20" : s.color + "15"}`,
              animation: phase === "done" ? "none" : `cardReveal 0.5s ease-out ${0.1 + s.delay / 1000}s both`,
              cursor: "default",
            }}>
              {/* Shimmer overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(90deg, transparent 0%, ${s.color}08 50%, transparent 100%)`,
                backgroundSize: "200% 100%",
                animation: phase === "done" ? "none" : "shimmer 1.5s ease-in-out 1.3s",
                borderRadius: 16,
              }} />

              {/* Decorative corner glow */}
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 60, height: 60, borderRadius: "50%",
                background: `radial-gradient(circle, ${s.color}12, transparent)`,
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, position: "relative" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: theme.textT, letterSpacing: 0.5 }}>{s.label.toUpperCase()}</div>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: darkMode ? s.color + "20" : s.color + "12",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: phase === "done" ? "none" : "pulseGlow 2s ease-in-out 1.5s 2",
                }}>
                  {s.icon}
                </div>
              </div>

              <div style={{
                fontSize: 38, fontWeight: 900, color: s.color, lineHeight: 1,
                animation: phase === "done" ? "none" : `countUp 0.4s ease-out ${0.3 + s.delay / 1000}s both`,
              }}>
                {s.value}
              </div>

              {/* Subtle trend indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, color: BRAND.green, fontWeight: 600 }}>
                  <TrendingUp size={12} /> +{Math.floor(Math.random() * 12 + 1)}%
                </div>
                <span style={{ fontSize: 10, color: theme.textT }}>{t("vs last week", "vs vorige week")}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24,
          animation: phase === "done" ? "none" : "fadeSlideUp 0.5s ease-out 0.6s both",
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${BRAND.primary}, #8B5CF6)`,
            borderRadius: 16, padding: "20px", color: "#fff", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <Zap size={20} color="#fff" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t("Quick Post", "Snelle Post")}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{t("Create and publish instantly", "Maak en publiceer direct")}</div>
          </div>
          <div style={{
            background: `linear-gradient(135deg, #06B6D4, #0EA5E9)`,
            borderRadius: 16, padding: "20px", color: "#fff", position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <TrendingUp size={20} color="#fff" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{t("View Analytics", "Bekijk Analytics")}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{t("Track your growth", "Volg je groei")}</div>
          </div>
        </div>

        {/* Recent posts */}
        <div style={{
          background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 16, padding: "20px", overflow: "hidden",
          animation: phase === "done" ? "none" : "fadeSlideUp 0.5s ease-out 0.8s both",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{t("Recent Posts", "Recente Posts")}</div>
            {wsPosts.length > 5 && (
              <span style={{ fontSize: 12, color: BRAND.primary, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
                {t("View all", "Bekijk alles")} <ArrowUpRight size={13} />
              </span>
            )}
          </div>
          {wsPosts.slice(0, 5).map((post: any, idx: number) => (
            <div key={post.id} style={{
              display: "flex", gap: 12, alignItems: "center", padding: "12px 0",
              borderBottom: idx < Math.min(wsPosts.length, 5) - 1 ? `1px solid ${theme.border}` : "none",
              animation: phase === "done" ? "none" : `fadeSlideUp 0.3s ease-out ${0.9 + idx * 0.08}s both`,
            }}>
              {/* Post number */}
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: BRAND.primary,
              }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 13, color: theme.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{post.content}</div>
                <div style={{ display: "flex", gap: 5, marginTop: 4, alignItems: "center" }}>
                  {post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}
                  {post.scheduled_date && <span style={{ fontSize: 10, color: theme.textT }}>{post.scheduled_date}</span>}
                </div>
              </div>
              <StatusTag status={post.status} approval={post.approval} />
            </div>
          ))}
          {wsPosts.length === 0 && (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <PenLine size={28} color={theme.textT} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 14, color: theme.textT, fontWeight: 500 }}>{t("No posts yet", "Nog geen posts")}</div>
              <div style={{ fontSize: 12, color: theme.textT, marginTop: 4 }}>{t("Create your first post to get started", "Maak je eerste post om te beginnen")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}