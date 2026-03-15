"use client";
import { signIn } from "next-auth/react";
import { useState, useRef, useCallback, useEffect } from "react";
import { BRAND, PLATFORMS, WORKSPACE_COLORS, Theme } from "./ui";
import {
  X, ChevronDown, Clock, CalendarDays, Send, FileText,
  Image as ImageIcon, Film, SmilePlus, Hash, Trash2, Plus,
  AlertTriangle, Check, Sparkles, Type, GripVertical,
} from "lucide-react";

/* ═══ CONSTANTS ═══ */
const PLATFORM_LIMITS: Record<string, number> = {
  facebook: 63206, instagram: 2200, tiktok: 4000, linkedin: 3000, youtube: 5000,
};
const PLATFORM_MEDIA: Record<string, { image: string; video: string }> = {
  facebook: { image: "1200×630px", video: "1280×720px" },
  instagram: { image: "1080×1080px", video: "1080×1920px" },
  tiktok: { image: "—", video: "1080×1920px" },
  linkedin: { image: "1200×627px", video: "1920×1080px" },
  youtube: { image: "1280×720px", video: "1920×1080px" },
};
const EMOJI_LIST = ["😀","😂","🥰","😎","🔥","🚀","💯","✨","🎉","👏","💪","🙌","❤️","💜","💙","🧡","💚","👀","📸","🎬","📱","💼","📊","🎯","✅","⭐","🌟","💡","🏆","🤝","👋","🙏","💰","📈","🗓️","⏰","🎵","🎨","✍️","📢"];
const HASHTAG_SUGGESTIONS = ["#socialmedia","#marketing","#contentcreator","#digitalmarketing","#branding","#growthhacking","#startup","#entrepreneur","#business","#strategy","#reels","#trending","#viral","#fyp","#instagood","#motivation","#success","#lifestyle","#creative","#design"];

/* ═══ PLATFORM ICONS (accurate SVGs) ═══ */
const PlatformIcon = ({ id, size = 18 }: { id: string; size?: number }) => {
  if (id === "facebook") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  if (id === "instagram") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#feda75"/><stop offset="25%" stopColor="#fa7e1e"/><stop offset="50%" stopColor="#d62976"/><stop offset="75%" stopColor="#962fbf"/><stop offset="100%" stopColor="#4f5bd5"/></linearGradient></defs><rect width="22" height="22" x="1" y="1" rx="6" stroke="url(#ig)" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig)"/></svg>;
  if (id === "tiktok") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z"/></svg>;
  if (id === "linkedin") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  if (id === "youtube") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
  return null;
};

/* ═══ AVATAR ═══ */
const Avi = ({ sz = 32, src }: { sz?: number; src?: string }) => src
  ? <img src={src} style={{ width: sz, height: sz, borderRadius: "50%", objectFit: "cover" }} alt="" />
  : <div style={{ width: sz, height: sz, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: sz * 0.4, fontWeight: 800, flexShrink: 0 }}>D</div>;

/* ═══ INLINE PREVIEW RENDERERS ═══ */
function FBPreview({ content, media, dark, t }: { content: string; media: { imageUrl: string; videoUrl: string }; dark: boolean; t: any }) {
  const dc = dark ? "#b0b3b8" : "#65676b";
  return (
    <div style={{ background: dark ? "#242526" : "#fff", borderRadius: 10, border: `1px solid ${dark ? "#3e4042" : "#dadde1"}`, overflow: "hidden" }}>
      <div style={{ padding: "12px 14px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <Avi sz={36} />
        <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: dark ? "#e4e6eb" : "#050505" }}>Your Brand</div><div style={{ fontSize: 11, color: dc }}>Just now · 🌐</div></div>
      </div>
      {content ? <div style={{ padding: "0 14px 10px" }}><p style={{ fontSize: 13, color: dark ? "#e4e6eb" : "#050505", lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{content}</p></div>
      : <div style={{ padding: "0 14px 10px", color: dark ? "#b0b3b8" : "#8a8d91", fontSize: 13, fontStyle: "italic" }}>{t("Click here to add text to this post...","Klik om tekst toe te voegen...")}</div>}
      {(media.videoUrl || media.imageUrl) && <div style={{ background: "#000" }}>{media.videoUrl ? <video src={media.videoUrl} style={{ width: "100%", maxHeight: 320, objectFit: "contain", display: "block" }} controls /> : <img src={media.imageUrl} style={{ width: "100%", maxHeight: 320, objectFit: "cover", display: "block" }} alt="" />}</div>}
      <div style={{ padding: "6px 14px", borderTop: `1px solid ${dark ? "#3e4042" : "#dadde1"}`, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: dc }}>👍❤️ 0</span><span style={{ fontSize: 11, color: dc }}>0 comments</span>
      </div>
      <div style={{ padding: "2px 8px 6px", display: "flex", borderTop: `1px solid ${dark ? "#3e4042" : "#dadde1"}` }}>
        {["👍 Like","💬 Comment","↗ Share"].map(a => <div key={a} style={{ flex: 1, textAlign: "center", padding: "7px 0", fontSize: 12, fontWeight: 600, color: dc, cursor: "default" }}>{a}</div>)}
      </div>
    </div>
  );
}

function IGPreview({ content, media, postType, dark, t }: { content: string; media: { imageUrl: string; videoUrl: string }; postType: string; dark: boolean; t: any }) {
  const c = dark ? "#f5f5f5" : "#262626";
  const isVert = postType === "reel" || postType === "story";
  return (
    <div style={{ background: dark ? "#000" : "#fff", borderRadius: 10, border: `1px solid ${dark ? "#262626" : "#dbdbdb"}`, overflow: "hidden" }}>
      <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", padding: 2, background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}><div style={{ width: "100%", height: "100%", borderRadius: "50%", background: dark ? "#000" : "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Avi sz={24} /></div></div>
        <span style={{ fontSize: 12, fontWeight: 600, color: c, flex: 1 }}>yourbrand</span>
        {isVert && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "#E1306C15", color: "#E1306C", fontWeight: 700 }}>Reel</span>}
      </div>
      {(media.videoUrl || media.imageUrl) ? <div style={{ background: "#000" }}>{media.videoUrl ? <video src={media.videoUrl} style={{ width: "100%", maxHeight: isVert ? 420 : 320, objectFit: isVert ? "contain" : "cover", display: "block" }} controls /> : <img src={media.imageUrl} style={{ width: "100%", maxHeight: isVert ? 420 : 320, objectFit: isVert ? "contain" : "cover", display: "block" }} alt="" />}</div>
      : <div style={{ width: "100%", height: 200, background: dark ? "#1a1a1a" : "#fafafa", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 32, opacity: 0.3 }}>📷</span></div>}
      <div style={{ padding: "10px 12px 4px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 14, fontSize: 20 }}>♡ 💬 ✈</div><span style={{ fontSize: 20 }}>🔖</span>
      </div>
      <div style={{ padding: "2px 12px" }}><span style={{ fontSize: 12, fontWeight: 600, color: c }}>0 likes</span></div>
      {content ? <div style={{ padding: "4px 12px 10px" }}><span style={{ fontSize: 12, fontWeight: 600, color: c }}>yourbrand </span><span style={{ fontSize: 12, color: c }}>{content}</span></div>
      : <div style={{ padding: "4px 12px 10px", color: dark ? "#a8a8a8" : "#8e8e8e", fontSize: 12, fontStyle: "italic" }}>{t("Add a caption...","Voeg een caption toe...")}</div>}
    </div>
  );
}

function TKPreview({ content, media, dark, t }: { content: string; media: { imageUrl: string; videoUrl: string }; dark: boolean; t: any }) {
  return (
    <div style={{ background: "#000", borderRadius: 14, overflow: "hidden", position: "relative", minHeight: 360 }}>
      {(media.videoUrl || media.imageUrl) ? <div>{media.videoUrl ? <video src={media.videoUrl} style={{ width: "100%", maxHeight: 420, objectFit: "contain", display: "block" }} controls /> : <img src={media.imageUrl} style={{ width: "100%", maxHeight: 420, objectFit: "cover", display: "block" }} alt="" />}</div>
      : <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}><span style={{ fontSize: 32, opacity: 0.4 }}>🎵</span><span style={{ fontSize: 11, color: "#ffffff40" }}>{t("Add video for TikTok","Voeg video toe voor TikTok")}</span></div>}
      <div style={{ padding: "12px 14px", background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>@yourbrand</div>
        {content ? <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.4, whiteSpace: "pre-wrap" }}>{content}</div>
        : <div style={{ fontSize: 12, color: "#ffffff50", fontStyle: "italic" }}>{t("Add caption...","Voeg caption toe...")}</div>}
        <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}><span style={{ fontSize: 10, color: "#ffffffaa" }}>♫ Original sound – yourbrand</span></div>
      </div>
    </div>
  );
}

function LIPreview({ content, media, dark, t }: { content: string; media: { imageUrl: string; videoUrl: string }; dark: boolean; t: any }) {
  const c = dark ? "#ffffffdd" : "#000000dd";
  const dc = dark ? "#ffffff80" : "#00000080";
  return (
    <div style={{ background: dark ? "#1b1f23" : "#fff", borderRadius: 10, border: `1px solid ${dark ? "#38434f" : "#e0e0e0"}`, overflow: "hidden" }}>
      <div style={{ padding: "12px 14px 8px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <Avi sz={40} />
        <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: dark ? "#fff" : "#000" }}>Your Brand</div><div style={{ fontSize: 11, color: dc }}>1,234 followers</div><div style={{ fontSize: 11, color: dark ? "#ffffff50" : "#00000050" }}>1h · 🌐</div></div>
      </div>
      {content ? <div style={{ padding: "0 14px 10px" }}><p style={{ fontSize: 13, color: c, lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{content}</p></div>
      : <div style={{ padding: "0 14px 10px", color: dc, fontSize: 13, fontStyle: "italic" }}>{t("Click to add text...","Klik om tekst toe te voegen...")}</div>}
      {(media.videoUrl || media.imageUrl) && <div style={{ background: "#000" }}>{media.videoUrl ? <video src={media.videoUrl} style={{ width: "100%", maxHeight: 320, objectFit: "contain", display: "block" }} controls /> : <img src={media.imageUrl} style={{ width: "100%", maxHeight: 320, objectFit: "cover", display: "block" }} alt="" />}</div>}
      <div style={{ padding: "4px 14px 2px", borderTop: `1px solid ${dark ? "#38434f" : "#e0e0e0"}`, display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: dc }}>👍❤️👏 0</span><span style={{ marginLeft: "auto", fontSize: 11, color: dc }}>0 comments</span>
      </div>
      <div style={{ padding: "2px 6px 6px", display: "flex", borderTop: `1px solid ${dark ? "#38434f" : "#e0e0e0"}` }}>
        {["👍 Like","💬 Comment","🔄 Repost","✈ Send"].map(a => <div key={a} style={{ flex: 1, textAlign: "center", padding: "7px 0", fontSize: 11, fontWeight: 600, color: dc, cursor: "default" }}>{a}</div>)}
      </div>
    </div>
  );
}

function YTPreview({ content, media, postType, dark, t }: { content: string; media: { imageUrl: string; videoUrl: string }; postType: string; dark: boolean; t: any }) {
  const isVert = postType === "reel" || postType === "story";
  return (
    <div style={{ background: dark ? "#0f0f0f" : "#fff", borderRadius: 12, border: `1px solid ${dark ? "#272727" : "#e5e5e5"}`, overflow: "hidden" }}>
      <div style={{ position: "relative", background: "#000" }}>
        {(media.videoUrl || media.imageUrl) ? <div>{media.videoUrl ? <video src={media.videoUrl} style={{ width: "100%", maxHeight: isVert ? 420 : 280, objectFit: isVert ? "contain" : "cover", display: "block" }} controls /> : <img src={media.imageUrl} style={{ width: "100%", maxHeight: isVert ? 420 : 280, objectFit: isVert ? "contain" : "cover", display: "block" }} alt="" />}</div>
        : <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 56, height: 38, borderRadius: 10, background: "rgba(255,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 20, marginLeft: 2 }}>▶</span></div></div>}
        {isVert && <div style={{ position: "absolute", top: 8, left: 10 }}><span style={{ background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>Short</span></div>}
      </div>
      <div style={{ padding: "10px 14px", display: "flex", gap: 10 }}>
        <Avi sz={36} />
        <div style={{ flex: 1 }}>
          {content ? <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "#f1f1f1" : "#0f0f0f", lineHeight: 1.4, marginBottom: 4 }}>{content.slice(0, 100)}</div>
          : <div style={{ fontSize: 13, color: "#606060", fontStyle: "italic", marginBottom: 4 }}>{t("Video title...","Video titel...")}</div>}
          <div style={{ fontSize: 11, color: dark ? "#aaa" : "#606060" }}>Your Brand · 0 views · Just now</div>
        </div>
      </div>
    </div>
  );
}

const PREVIEW_MAP: Record<string, any> = { facebook: FBPreview, instagram: IGPreview, tiktok: TKPreview, linkedin: LIPreview, youtube: YTPreview };

/* ═══════════════════════════════════════════
   CREATE POST MODAL — PUBLER-STYLE
   ═══════════════════════════════════════════ */
type CreatePostProps = {
  draft: any; setDraft: (fn: (d: any) => any) => void;
  darkMode: boolean; theme: Theme;
  uploadingImage: boolean; uploadingVideo: boolean; videoAspect: "horizontal" | "vertical" | null;
  uploadImage: (f: File) => Promise<string | null>;
  uploadVideo: (f: File) => Promise<string | null>;
  setVideoAspect: (v: "horizontal" | "vertical" | null) => void;
  onClose: () => void; onSaveDraft: () => void; onSchedule: () => void; onPublishNow: () => void;
  t: (en: string, nl: string) => string;
};

export function CreatePostModal({ draft, setDraft, darkMode, theme, uploadingImage, uploadingVideo, videoAspect, uploadImage, uploadVideo, setVideoAspect, onClose, onSaveDraft, onSchedule, onPublishNow, t }: CreatePostProps) {
  const [activeTab, setActiveTab] = useState<string>(draft.platforms[0] || "");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showHashtags, setShowHashtags] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const vidInputRef = useRef<HTMLInputElement>(null);

  // Sync active tab when platforms change
  useEffect(() => {
    if (draft.platforms.length > 0 && !draft.platforms.includes(activeTab)) {
      setActiveTab(draft.platforms[0]);
    }
  }, [draft.platforms]);

  const charLimit = PLATFORM_LIMITS[activeTab] || 5000;
  const isOverLimit = draft.content.length > charLimit;
  const activePlatform = PLATFORMS.find(p => p.id === activeTab);
  const PreviewComponent = PREVIEW_MAP[activeTab];

  function insertAtCursor(text: string) {
    const ta = textareaRef.current;
    if (ta) {
      const s = ta.selectionStart, e = ta.selectionEnd;
      const nc = draft.content.slice(0, s) + text + draft.content.slice(e);
      setDraft((d: any) => ({ ...d, content: nc }));
      setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = s + text.length; }, 0);
    } else setDraft((d: any) => ({ ...d, content: d.content + text }));
  }

  function addPlatform(id: string) {
    setDraft((d: any) => ({ ...d, platforms: d.platforms.includes(id) ? d.platforms : [...d.platforms, id] }));
    setActiveTab(id);
  }

  function removePlatform(id: string) {
    setDraft((d: any) => {
      const next = d.platforms.filter((x: string) => x !== id);
      if (activeTab === id && next.length > 0) setActiveTab(next[0]);
      return { ...d, platforms: next };
    });
  }

  // Platform tabs that are NOT yet added
  const unselectedPlatforms = PLATFORMS.filter(p => !draft.platforms.includes(p.id));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
      <div style={{
        background: theme.modalBg, borderRadius: 20, width: "min(560px,100%)",
        boxSizing: "border-box", maxHeight: "92vh", display: "flex", flexDirection: "column",
        border: `1px solid ${theme.border}`, overflow: "hidden",
      }}>

        {/* ── TOP BAR: Platform tabs ── */}
        <div style={{ padding: "16px 20px 0", flexShrink: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: theme.textT, letterSpacing: 0.5 }}>INSERT TAGS</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Type selector */}
              <div style={{ display: "flex", gap: 4, background: theme.codeBg, borderRadius: 8, padding: 3 }}>
                {["post","reel","video"].map(tp => (
                  <button key={tp} onClick={() => setDraft((d: any) => ({ ...d, type: tp }))} style={{
                    padding: "4px 10px", borderRadius: 6, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer",
                    background: draft.type === tp ? BRAND.primary : "transparent",
                    color: draft.type === tp ? "#fff" : theme.textS,
                    transition: "all 0.15s",
                  }}>{tp.charAt(0).toUpperCase()+tp.slice(1)}</button>
                ))}
              </div>
              <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={15} color={theme.textT} /></button>
            </div>
          </div>

          {/* Platform tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 12, overflowX: "auto" }}>
            {draft.platforms.map((pid: string) => {
              const p = PLATFORMS.find(pl => pl.id === pid);
              const isActive = pid === activeTab;
              const charUsed = draft.content.length;
              const limit = PLATFORM_LIMITS[pid] || 5000;
              const pctUsed = charUsed / limit;
              return (
                <button key={pid} onClick={() => setActiveTab(pid)} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10,
                  border: isActive ? `2px solid ${p?.color || BRAND.primary}` : `1px solid ${theme.border}`,
                  background: isActive ? (darkMode ? (p?.color || BRAND.primary) + "18" : (p?.color || BRAND.primary) + "10") : "transparent",
                  cursor: "pointer", position: "relative", flexShrink: 0, transition: "all 0.15s",
                }}>
                  <PlatformIcon id={pid} size={18} />
                  {isActive && <span style={{ fontSize: 11, fontWeight: 700, color: p?.color || theme.text }}>{p?.label}</span>}
                  {/* Status indicator */}
                  {draft.content && (
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: pctUsed > 1 ? BRAND.red : pctUsed > 0.9 ? BRAND.amber : BRAND.green }} />
                  )}
                  {/* Remove button on active */}
                  {isActive && draft.platforms.length > 1 && (
                    <button onClick={e => { e.stopPropagation(); removePlatform(pid); }} style={{ width: 16, height: 16, borderRadius: 4, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 2 }}>
                      <Trash2 size={11} color={theme.textT} />
                    </button>
                  )}
                </button>
              );
            })}

            {/* Add platform button */}
            {unselectedPlatforms.length > 0 && (
              <div style={{ position: "relative" }}>
                <AddPlatformDropdown platforms={unselectedPlatforms} onAdd={addPlatform} theme={theme} darkMode={darkMode} />
              </div>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT: Preview + Editor ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 16px" }}>

          {/* No platforms selected */}
          {draft.platforms.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📱</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 6 }}>{t("Select platforms","Kies platformen")}</div>
              <div style={{ fontSize: 13, color: theme.textT, marginBottom: 20 }}>{t("Choose where you want to publish","Kies waar je wilt publiceren")}</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                {PLATFORMS.map(p => (
                  <button key={p.id} onClick={() => addPlatform(p.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 13, color: theme.text, fontWeight: 600, transition: "all 0.15s" }}>
                    <PlatformIcon id={p.id} size={20} />{p.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Feed type indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, padding: "6px 0" }}>
                <span style={{ fontSize: 14 }}>{draft.type === "reel" ? "🎬" : draft.type === "video" ? "📹" : "📄"}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>{draft.type === "reel" ? "Reel / Short" : draft.type === "video" ? "Video" : "Feed"}</span>
                <span style={{ fontSize: 11, color: theme.textT }}>· {t("Post will appear in your feed","Post verschijnt in je feed")}</span>
              </div>

              {/* Live preview */}
              {PreviewComponent && (
                <PreviewComponent content={draft.content} media={{ imageUrl: draft.image_url, videoUrl: draft.video_url }} postType={draft.type} dark={darkMode} t={t} />
              )}

              {/* ── TEXT EDITOR ── */}
              <div style={{ marginTop: 14, position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => { setShowEmoji(v => !v); setShowHashtags(false); }} style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${showEmoji ? BRAND.primary : theme.border}`, background: showEmoji ? (darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL) : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><SmilePlus size={14} color={showEmoji ? BRAND.primary : theme.textT} /></button>
                    <button onClick={() => { setShowHashtags(v => !v); setShowEmoji(false); }} style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${showHashtags ? BRAND.primary : theme.border}`, background: showHashtags ? (darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL) : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Hash size={14} color={showHashtags ? BRAND.primary : theme.textT} /></button>
                    <button style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="AI Caption"><Sparkles size={14} color={theme.textT} /></button>
                  </div>
                  <span style={{ fontSize: 11, color: isOverLimit ? BRAND.red : draft.content.length > charLimit * 0.9 ? BRAND.amber : theme.textT, fontWeight: isOverLimit ? 700 : 400, fontFamily: "monospace" }}>
                    {draft.content.length}/{charLimit} {activePlatform && <span style={{ color: activePlatform.color }}>({activePlatform.label})</span>}
                  </span>
                </div>

                {showEmoji && <div style={{ background: theme.codeBg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "8px", marginBottom: 6, display: "flex", flexWrap: "wrap", gap: 1 }}>{EMOJI_LIST.map(e => <button key={e} onClick={() => insertAtCursor(e)} style={{ width: 32, height: 32, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={ev => (ev.currentTarget.style.background = theme.hoverBg)} onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>{e}</button>)}</div>}
                {showHashtags && <div style={{ background: theme.codeBg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "8px", marginBottom: 6, display: "flex", flexWrap: "wrap", gap: 5 }}>{HASHTAG_SUGGESTIONS.map(h => <button key={h} onClick={() => insertAtCursor(" "+h)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 11, color: BRAND.primary, fontWeight: 600 }} onMouseEnter={ev => { ev.currentTarget.style.background = darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL; }} onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; }}>{h}</button>)}</div>}

                <textarea ref={textareaRef} value={draft.content} onChange={e => setDraft((d: any) => ({ ...d, content: e.target.value }))} placeholder={t("Write your caption...","Schrijf je caption...")} style={{ width: "100%", minHeight: 80, boxSizing: "border-box", borderRadius: 10, border: `1px solid ${isOverLimit ? BRAND.red : theme.inputBorder}`, padding: "10px 12px", fontSize: 14, resize: "vertical", fontFamily: "inherit", background: theme.inputBg, color: theme.text }} />
              </div>

              {/* ── ADD MEDIA ── */}
              <div style={{ marginTop: 12 }}>
                {(draft.image_url || draft.video_url) ? (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {draft.image_url && (
                      <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${theme.border}`, width: 100, height: 100 }}>
                        <img src={draft.image_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                        <button onClick={() => setDraft((d: any) => ({ ...d, image_url: "" }))} style={{ position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={11} color="#fff" /></button>
                      </div>
                    )}
                    {draft.video_url && (
                      <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${theme.border}`, width: 100, height: 100, background: "#000" }}>
                        <video src={draft.video_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} onLoadedMetadata={(e: any) => { const v = e.currentTarget; setVideoAspect(v.videoHeight > v.videoWidth ? "vertical" : "horizontal"); }} />
                        <button onClick={() => { setDraft((d: any) => ({ ...d, video_url: "" })); setVideoAspect(null); }} style={{ position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={11} color="#fff" /></button>
                        <div style={{ position: "absolute", bottom: 4, left: 4, fontSize: 8, background: videoAspect === "vertical" ? "#FF0000" : BRAND.primary, color: "#fff", padding: "1px 5px", borderRadius: 3, fontWeight: 700 }}>{videoAspect === "vertical" ? "9:16" : "16:9"}</div>
                      </div>
                    )}
                    {/* Add more */}
                    <button onClick={() => setShowMediaPicker(true)} style={{ width: 100, height: 100, borderRadius: 10, border: `2px dashed ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      <Plus size={20} color={theme.textT} />
                      <span style={{ fontSize: 10, color: theme.textT }}>Add</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    {(uploadingImage || uploadingVideo) ? (
                      <div style={{ borderRadius: 12, background: darkMode ? "rgba(124,58,237,0.08)" : BRAND.primaryL, padding: "20px", textAlign: "center" }}>
                        <div style={{ width: 32, height: 32, margin: "0 auto 8px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} />
                        <div style={{ fontSize: 12, color: BRAND.primary, fontWeight: 600 }}>{uploadingVideo ? "Uploading video..." : "Uploading..."}</div>
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                      </div>
                    ) : (
                      <button onClick={() => setShowMediaPicker(v => !v)} style={{ width: "100%", padding: "14px", borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.codeBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, fontWeight: 600, color: theme.textS, transition: "all 0.15s" }}>
                        <ImageIcon size={16} /> {t("Add asset...","Media toevoegen...")}
                      </button>
                    )}
                  </div>
                )}

                {/* Media picker panel */}
                {showMediaPicker && !uploadingImage && !uploadingVideo && (
                  <div style={{ marginTop: 8, background: theme.codeBg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "12px", display: "flex", flexDirection: "column", gap: 6 }}>
                    <button onClick={() => { imgInputRef.current?.click(); setShowMediaPicker(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: theme.text, width: "100%", textAlign: "left" }} onMouseEnter={ev => (ev.currentTarget.style.background = theme.hoverBg)} onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>
                      <ImageIcon size={18} color={BRAND.primary} /> {t("Upload image","Upload afbeelding")}
                      {activeTab && <span style={{ marginLeft: "auto", fontSize: 10, color: theme.textT }}>{PLATFORM_MEDIA[activeTab]?.image}</span>}
                    </button>
                    <button onClick={() => { vidInputRef.current?.click(); setShowMediaPicker(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: theme.text, width: "100%", textAlign: "left" }} onMouseEnter={ev => (ev.currentTarget.style.background = theme.hoverBg)} onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>
                      <Film size={18} color={BRAND.primary} /> {t("Upload video","Upload video")}
                      <span style={{ marginLeft: "auto", fontSize: 10, color: theme.textT }}>MP4, MOV</span>
                    </button>
                    <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 6 }}>
                      <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: theme.textT, width: "100%" }} disabled>
                        <Sparkles size={18} color={theme.textT} /> {t("AI Image (coming soon)","AI Afbeelding (binnenkort)")}
                      </button>
                    </div>
                  </div>
                )}

                {/* Hidden file inputs */}
                <input ref={imgInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadImage(f); if (u) setDraft((d: any) => ({ ...d, image_url: u })); } }} />
                <input ref={vidInputRef} type="file" accept="video/mp4,video/*" style={{ display: "none" }} onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadVideo(f); if (u) setDraft((d: any) => ({ ...d, video_url: u })); } }} />
              </div>

              {/* ── FIRST COMMENT ── */}
              <button style={{ width: "100%", padding: "10px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, color: BRAND.primary, fontWeight: 600, marginTop: 12 }}>
                💬 {t("Add first comment","Eerste reactie toevoegen")}
              </button>
            </>
          )}
        </div>

        {/* ── BOTTOM BAR: Schedule / Publish ── */}
        {draft.platforms.length > 0 && (
          <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${theme.border}`, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Date/Time row */}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, background: theme.inputBg }}>
                <CalendarDays size={14} color={theme.textT} />
                <input type="date" value={draft.date} onChange={e => setDraft((d: any) => ({ ...d, date: e.target.value }))} style={{ border: "none", background: "transparent", fontSize: 13, color: theme.text, flex: 1, outline: "none", fontFamily: "inherit" }} />
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, background: theme.inputBg }}>
                <Clock size={14} color={theme.textT} />
                <input type="time" value={draft.time} onChange={e => setDraft((d: any) => ({ ...d, time: e.target.value }))} style={{ border: "none", background: "transparent", fontSize: 13, color: theme.text, flex: 1, outline: "none", fontFamily: "inherit" }} />
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onSaveDraft} style={{ padding: "10px 16px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 13, color: theme.textS, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <FileText size={14} /> {t("Draft","Concept")}
              </button>
              <button onClick={onSchedule} disabled={!draft.content || !draft.date || draft.platforms.length === 0 || isOverLimit} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700, opacity: (!draft.content || !draft.date || draft.platforms.length === 0 || isOverLimit) ? 0.45 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "opacity 0.2s" }}>
                <Clock size={14} /> {t("Schedule","Inplannen")}
              </button>
              <button onClick={onPublishNow} disabled={!draft.content || draft.platforms.length === 0 || isOverLimit} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: BRAND.green, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700, opacity: (!draft.content || draft.platforms.length === 0 || isOverLimit) ? 0.45 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "opacity 0.2s" }}>
                <Send size={14} /> {t("Publish","Publiceer")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Add Platform Dropdown ── */
function AddPlatformDropdown({ platforms, onAdd, theme, darkMode }: { platforms: typeof PLATFORMS; onAdd: (id: string) => void; theme: Theme; darkMode: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(v => !v)} style={{ width: 36, height: 36, borderRadius: 10, border: `2px dashed ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        <Plus size={16} color={theme.textT} />
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 6, background: theme.modalBg, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "6px", zIndex: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", minWidth: 180 }}>
            {platforms.map(p => (
              <button key={p.id} onClick={() => { onAdd(p.id); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: theme.text, width: "100%", textAlign: "left", fontWeight: 500 }} onMouseEnter={ev => (ev.currentTarget.style.background = theme.hoverBg)} onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>
                <PlatformIcon id={p.id} size={20} />
                {p.label}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

/* ═══ NEW WORKSPACE MODAL ═══ */
type NewWSProps = {
  newWS: { name: string; industry: string; color: string };
  setNewWS: (fn: (w: any) => any) => void;
  onClose: () => void; onCreate: () => void;
  theme: Theme; t: (en: string, nl: string) => string;
};

export function NewWorkspaceModal({ newWS, setNewWS, onClose, onCreate, theme, t }: NewWSProps) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
      <div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: "min(440px,100%)", boxSizing: "border-box", border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 18, color: theme.text }}>{t("New workspace","Nieuwe workspace")}</div>
        <input value={newWS.name} onChange={e => setNewWS((w: any) => ({ ...w, name: e.target.value }))} placeholder="Name" style={{ width: "100%", marginBottom: 12, padding: "11px 13px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} />
        <input value={newWS.industry} onChange={e => setNewWS((w: any) => ({ ...w, industry: e.target.value }))} placeholder="Industry" style={{ width: "100%", marginBottom: 16, padding: "11px 13px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} />
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>{WORKSPACE_COLORS.map(col => <button key={col} onClick={() => setNewWS((w: any) => ({ ...w, color: col }))} style={{ width: 32, height: 32, borderRadius: "50%", background: col, border: newWS.color === col ? `3px solid ${theme.text}` : "3px solid transparent", cursor: "pointer", padding: 0 }} />)}</div>
        <div style={{ display: "flex", gap: 10 }}><button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS }}>Cancel</button><button onClick={onCreate} disabled={!newWS.name} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: !newWS.name ? 0.45 : 1 }}>Create</button></div>
      </div>
    </div>
  );
}

/* ═══ CHANNEL PICKER MODAL ═══ */
type ChannelPickerProps = {
  ws: any; ytChannels: any[]; loadingChannels: boolean; darkMode: boolean;
  theme: Theme; t: (en: string, nl: string) => string;
  onSelect: (ch: any) => void; onClose: () => void; onRetry: () => void;
};

export function ChannelPickerModal({ ws, ytChannels, loadingChannels, darkMode, theme, t, onSelect, onClose, onRetry }: ChannelPickerProps) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
      <div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: "min(440px,100%)", boxSizing: "border-box", border: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, color: theme.text }}>Select YouTube Channel</div>
        <p style={{ fontSize: 13, color: theme.textT, marginBottom: 18 }}>Choose which channel to connect.</p>
        {loadingChannels ? <div style={{ textAlign: "center", padding: "30px 0" }}><div style={{ width: 40, height: 40, margin: "0 auto 12px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
        : ytChannels.length === 0 ? <div style={{ textAlign: "center", padding: "20px 0" }}>📺<div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginTop: 8 }}>No channels found</div><div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}><button onClick={() => signIn("google", { callbackUrl: "/?pickChannel=true" })} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Re-login</button><button onClick={onRetry} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.text, cursor: "pointer", fontSize: 13 }}>Retry</button></div><div style={{ marginTop: 16, borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}><div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 8 }}>Or add manually</div><div style={{ display: "flex", gap: 8 }}><input id="manual-ch" placeholder="Channel ID (UCxxxx...)" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${theme.inputBorder}`, fontSize: 13, background: theme.inputBg, color: theme.text }} /><button onClick={() => { const el = document.getElementById("manual-ch") as HTMLInputElement; const v = el?.value?.trim(); if (v) onSelect({ id: v, title: v, thumbnail: "" }); }} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: BRAND.green, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Add</button></div></div></div>
        : <div>{ytChannels.map((ch: any) => <button key={ch.id} onClick={() => onSelect(ch)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 12, border: ws?.youtube_channel_id === ch.id ? `2px solid ${BRAND.green}` : `1px solid ${theme.border}`, background: ws?.youtube_channel_id === ch.id ? (darkMode ? "rgba(16,185,129,0.08)" : BRAND.greenL) : theme.card, cursor: "pointer", marginBottom: 8, textAlign: "left" }}>{ch.thumbnail ? <img src={ch.thumbnail} style={{ width: 44, height: 44, borderRadius: "50%" }} alt="" /> : <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FF000012", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>▶</div>}<div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{ch.title}</div><div style={{ fontSize: 11, color: theme.textT }}>{ch.id}</div></div>{ws?.youtube_channel_id === ch.id && <div style={{ width: 24, height: 24, borderRadius: "50%", background: BRAND.green, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>✓</div>}</button>)}</div>}
        <button onClick={onClose} style={{ width: "100%", padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS, marginTop: 8 }}>Cancel</button>
      </div>
    </div>
  );
}