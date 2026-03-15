"use client";
import { useState } from "react";
import { Plus, Trash2, PlayCircle, ExternalLink, X, Clock, Eye, Heart, MessageCircle, Share2, Image as ImageIcon, Film, ChevronLeft, ChevronRight, Grid3X3, List, Calendar } from "lucide-react";
import { BRAND, PBadge, StatusTag, Theme } from "./ui";

type Props = {
  wsPosts: any[];
  darkMode: boolean;
  theme: Theme;
  publishing: string | null;
  onNewPost: () => void;
  onDelete: (id: string) => void;
  onPublishYT: (post: any) => void;
  t: (en: string, nl: string) => string;
};

/* Platform icon inline */
const PlatformIcon = ({ id, size = 16 }: { id: string; size?: number }) => {
  if (id === "facebook") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  if (id === "instagram") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><defs><linearGradient id={`igp-${size}`} x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#feda75"/><stop offset="25%" stopColor="#fa7e1e"/><stop offset="50%" stopColor="#d62976"/><stop offset="75%" stopColor="#962fbf"/><stop offset="100%" stopColor="#4f5bd5"/></linearGradient></defs><rect width="22" height="22" x="1" y="1" rx="6" stroke={`url(#igp-${size})`} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4.5" stroke={`url(#igp-${size})`} strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.2" fill={`url(#igp-${size})`}/></svg>;
  if (id === "tiktok") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z"/></svg>;
  if (id === "linkedin") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  if (id === "youtube") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
  return null;
};

export default function PostsPage({ wsPosts, darkMode, theme, publishing, onNewPost, onDelete, onPublishYT, t }: Props) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<any | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "scheduled" | "draft">("all");

  const filtered = filter === "all" ? wsPosts : wsPosts.filter(p => p.status === filter);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>{t("My Posts", "Mijn Posts")}</h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Filters */}
          <div style={{ display: "flex", gap: 4, background: theme.codeBg, borderRadius: 8, padding: 3 }}>
            {(["all", "published", "scheduled", "draft"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "5px 12px", borderRadius: 6, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer",
                background: filter === f ? (f === "published" ? BRAND.green : f === "scheduled" ? "#0EA5E9" : f === "draft" ? theme.textT : BRAND.primary) : "transparent",
                color: filter === f ? "#fff" : theme.textS, transition: "all 0.15s",
              }}>
                {f === "all" ? t("All", "Alles") : f === "published" ? t("Published", "Gepubliceerd") : f === "scheduled" ? t("Scheduled", "Gepland") : t("Draft", "Concept")}
                <span style={{ marginLeft: 4, opacity: 0.8 }}>
                  {f === "all" ? wsPosts.length : wsPosts.filter(p => p.status === f).length}
                </span>
              </button>
            ))}
          </div>
          {/* View toggle */}
          <div style={{ display: "flex", gap: 2, background: theme.codeBg, borderRadius: 8, padding: 3 }}>
            <button onClick={() => setView("grid")} style={{ width: 30, height: 30, borderRadius: 6, border: "none", background: view === "grid" ? BRAND.primary : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Grid3X3 size={14} color={view === "grid" ? "#fff" : theme.textT} />
            </button>
            <button onClick={() => setView("list")} style={{ width: 30, height: 30, borderRadius: 6, border: "none", background: view === "list" ? BRAND.primary : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <List size={14} color={view === "list" ? "#fff" : theme.textT} />
            </button>
          </div>
          <button onClick={onNewPost} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <Plus size={15} /> {t("New", "Nieuw")}
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ImageIcon size={36} color={theme.textT} style={{ marginBottom: 10 }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, marginBottom: 4 }}>{t("No posts yet", "Nog geen posts")}</div>
          <div style={{ fontSize: 13, color: theme.textT }}>{t("Create your first post to see it here", "Maak je eerste post om hem hier te zien")}</div>
        </div>
      )}

      {/* ═══ GRID VIEW ═══ */}
      {view === "grid" && filtered.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {filtered.map((post: any) => (
            <div key={post.id} onClick={() => setSelected(post)} style={{
              borderRadius: 14, overflow: "hidden", cursor: "pointer",
              border: `1px solid ${theme.border}`, background: theme.card,
              transition: "transform 0.15s, box-shadow 0.15s",
              position: "relative",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Media / Thumbnail */}
              <div style={{ width: "100%", aspectRatio: "1", background: darkMode ? "#1a1a2e" : "#f8f9fa", position: "relative", overflow: "hidden" }}>
                {post.image_url ? (
                  <img src={post.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : post.video_url ? (
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <video src={post.video_url} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <PlayCircle size={22} color="#fff" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, padding: 16 }}>
                    <div style={{ fontSize: 12, color: theme.textS, textAlign: "center", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.content}
                    </div>
                  </div>
                )}

                {/* Status badge overlay */}
                <div style={{ position: "absolute", top: 8, left: 8 }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                    background: post.status === "published" ? BRAND.green : post.status === "scheduled" ? "#0EA5E9" : theme.textT,
                    color: "#fff", backdropFilter: "blur(4px)",
                  }}>
                    {post.status === "published" ? t("Published", "Gepubliceerd") : post.status === "scheduled" ? t("Scheduled", "Gepland") : t("Draft", "Concept")}
                  </div>
                </div>

                {/* Platform icons overlay */}
                <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 3 }}>
                  {post.platforms?.map((pid: string) => (
                    <div key={pid} style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlatformIcon id={pid} size={13} />
                    </div>
                  ))}
                </div>

                {/* Hover overlay */}
                <div className="post-hover" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <div style={{ textAlign: "center", color: "#fff" }}><Eye size={20} /><div style={{ fontSize: 10, marginTop: 2 }}>{t("View", "Bekijk")}</div></div>
                </div>
              </div>

              {/* Bottom info */}
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 12, color: theme.text, fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginBottom: 4 }}>
                  {post.content.slice(0, 50)}{post.content.length > 50 ? "..." : ""}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={11} color={theme.textT} />
                    <span style={{ fontSize: 10, color: theme.textT }}>{post.scheduled_date || "—"}</span>
                  </div>
                  {post.youtube_id && (
                    <a href={`https://www.youtube.com/watch?v=${post.youtube_id}`} target="_blank" rel="noopener" onClick={e => e.stopPropagation()} style={{ fontSize: 10, color: "#FF0000", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
                      <ExternalLink size={9} /> YT
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ LIST VIEW ═══ */}
      {view === "list" && filtered.length > 0 && filtered.map((post: any) => (
        <div key={post.id} onClick={() => setSelected(post)} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", display: "flex", gap: 12, transition: "background 0.12s" }}
          onMouseEnter={e => (e.currentTarget.style.background = theme.hoverBg)}
          onMouseLeave={e => (e.currentTarget.style.background = theme.card)}
        >
          {/* Thumbnail */}
          <div style={{ width: 64, height: 64, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: darkMode ? "#1a1a2e" : "#f8f9fa" }}>
            {post.image_url ? <img src={post.image_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            : post.video_url ? <video src={post.video_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><ImageIcon size={20} color={theme.textT} /></div>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: "0 0 6px", fontSize: 14, color: theme.text, lineHeight: 1.5, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.content}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              {post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}
              <span style={{ fontSize: 11, color: theme.textT }}>{post.scheduled_date} {post.scheduled_time}</span>
              <StatusTag status={post.status} approval={post.approval} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
            {post.platforms?.includes("youtube") && post.video_url && post.status !== "published" && (
              <button onClick={e => { e.stopPropagation(); onPublishYT(post); }} disabled={publishing === post.id} style={{ fontSize: 12, background: "#FF000015", color: "#FF0000", border: "1px solid #FF000030", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                {publishing === post.id ? "..." : <><PlayCircle size={13} /> YT</>}
              </button>
            )}
            <button onClick={e => { e.stopPropagation(); onDelete(post.id); }} style={{ fontSize: 12, background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ))}

      {/* ═══ POST DETAIL MODAL ═══ */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.modalBg, borderRadius: 20, width: "min(520px,100%)", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", border: `1px solid ${theme.border}` }}>

            {/* Modal header */}
            <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${theme.border}`, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusTag status={selected.status} approval={selected.approval} />
                <div style={{ display: "flex", gap: 4 }}>
                  {selected.platforms?.map((pid: string) => (
                    <div key={pid} style={{ width: 26, height: 26, borderRadius: 7, background: darkMode ? "rgba(255,255,255,0.08)" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PlatformIcon id={pid} size={15} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={15} color={theme.textT} />
              </button>
            </div>

            {/* Media */}
            <div style={{ overflowY: "auto", flex: 1 }}>
              {(selected.image_url || selected.video_url) && (
                <div style={{ background: "#000" }}>
                  {selected.video_url
                    ? <video src={selected.video_url} controls style={{ width: "100%", maxHeight: 400, objectFit: "contain", display: "block" }} />
                    : <img src={selected.image_url} style={{ width: "100%", maxHeight: 400, objectFit: "contain", display: "block" }} alt="" />
                  }
                </div>
              )}

              {/* Content */}
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontSize: 14, color: theme.text, lineHeight: 1.7, margin: "0 0 14px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{selected.content}</p>

                {/* Meta info */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
                  {selected.scheduled_date && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: theme.textT }}>
                      <Calendar size={13} /> {selected.scheduled_date} {selected.scheduled_time}
                    </div>
                  )}
                  {selected.youtube_id && (
                    <a href={`https://www.youtube.com/watch?v=${selected.youtube_id}`} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#FF0000", fontWeight: 600, textDecoration: "none" }}>
                      <ExternalLink size={12} /> {t("View on YouTube", "Bekijk op YouTube")}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: "12px 18px", borderTop: `1px solid ${theme.border}`, display: "flex", gap: 8, flexShrink: 0 }}>
              {selected.platforms?.includes("youtube") && selected.video_url && selected.status !== "published" && (
                <button onClick={() => { onPublishYT(selected); setSelected(null); }} disabled={publishing === selected.id} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "#FF000015", color: "#FF0000", cursor: "pointer", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <PlayCircle size={15} /> {t("Publish to YouTube", "Publiceer op YouTube")}
                </button>
              )}
              <button onClick={() => { onDelete(selected.id); setSelected(null); }} style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <Trash2 size={14} /> {t("Delete", "Verwijder")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for hover overlay */}
      <style>{`
        .post-hover { pointer-events: none; }
        div:hover > .post-hover { opacity: 1 !important; }
      `}</style>
    </div>
  );
}