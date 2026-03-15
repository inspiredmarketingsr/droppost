"use client";
import { signIn } from "next-auth/react";
import { useState, useRef } from "react";
import { BRAND, PLATFORMS, WORKSPACE_COLORS, Theme } from "./ui";
import { Eye, SmilePlus, Hash, X, Monitor, Smartphone } from "lucide-react";

const PLATFORM_LIMITS: Record<string, number> = {
  facebook: 63206, instagram: 2200, tiktok: 4000, linkedin: 3000, youtube: 5000,
};

const PLATFORM_MEDIA: Record<string, { image: string; video: string }> = {
  facebook: { image: "1200×630px", video: "1280×720px" },
  instagram: { image: "1080×1080px", video: "1080×1920px (Reels)" },
  tiktok: { image: "—", video: "1080×1920px" },
  linkedin: { image: "1200×627px", video: "1920×1080px" },
  youtube: { image: "1280×720px", video: "1920×1080px" },
};

const EMOJI_LIST = ["😀","😂","🥰","😎","🔥","🚀","💯","✨","🎉","👏","💪","🙌","❤️","💜","💙","🧡","💚","👀","📸","🎬","📱","💼","📊","🎯","✅","⭐","🌟","💡","🏆","🤝","👋","🙏","💰","📈","🗓️","⏰","🎵","🎨","✍️","📢"];

const HASHTAG_SUGGESTIONS = [
  "#socialmedia", "#marketing", "#contentcreator", "#digitalmarketing", "#branding",
  "#growthhacking", "#startup", "#entrepreneur", "#business", "#strategy",
  "#reels", "#trending", "#viral", "#fyp", "#instagood",
  "#motivation", "#success", "#lifestyle", "#creative", "#design",
];

/* ═══ PLATFORM PREVIEW ═══ */
function PlatformPreview({ platformId, content, imageUrl, videoUrl, dark }: { platformId: string; content: string; imageUrl: string; videoUrl?: string; dark: boolean }) {
  const p = PLATFORMS.find(pl => pl.id === platformId);
  if (!p) return null;
  const maxLen = PLATFORM_LIMITS[platformId] || 5000;
  const truncated = content.length > maxLen ? content.slice(0, maxLen) + "..." : content;
  const mediaUrl = videoUrl || imageUrl;
  const bg = dark ? "#1a1a2e" : "#fff";
  const border = dark ? "#2a2a40" : "#e5e7eb";
  const textColor = dark ? "#e5e7eb" : "#111827";
  const subColor = dark ? "#6b7280" : "#9ca3af";

  // Facebook style
  if (platformId === "facebook") return (
    <div style={{ background: bg, borderRadius: 10, border: `1px solid ${border}`, overflow: "hidden" }}>
      <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 }}>D</div>
        <div><div style={{ fontSize: 12, fontWeight: 700, color: textColor }}>Your Brand</div><div style={{ fontSize: 10, color: subColor }}>Just now · 🌎</div></div>
      </div>
      <div style={{ padding: "0 12px 10px" }}><p style={{ fontSize: 12, color: textColor, lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{truncated || <span style={{ color: subColor, fontStyle: "italic" }}>Your post text...</span>}</p></div>
      {mediaUrl && <div style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>{videoUrl ? <video src={videoUrl} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} /> : <img src={imageUrl} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} alt="" />}</div>}
      <div style={{ padding: "8px 12px", display: "flex", gap: 20 }}>
        {["👍 Like", "💬 Comment", "↗️ Share"].map(a => <span key={a} style={{ fontSize: 10, color: subColor, fontWeight: 600 }}>{a}</span>)}
      </div>
      <div style={{ padding: "4px 12px 8px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: subColor }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#1877F2", fontWeight: 700 }}>Facebook</span></div>
    </div>
  );

  // Instagram style
  if (platformId === "instagram") return (
    <div style={{ background: bg, borderRadius: 10, border: `1px solid ${border}`, overflow: "hidden" }}>
      <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", padding: 2 }}><div style={{ width: "100%", height: "100%", borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: textColor }}>D</div></div>
        <span style={{ fontSize: 11, fontWeight: 700, color: textColor }}>yourbrand</span>
        <span style={{ marginLeft: "auto", fontSize: 14, color: subColor }}>•••</span>
      </div>
      {mediaUrl ? <div>{videoUrl ? <video src={videoUrl} style={{ width: "100%", height: 260, objectFit: "cover", display: "block", background: "#000" }} /> : <img src={imageUrl} style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} alt="" />}</div> : <div style={{ width: "100%", height: 260, background: dark ? "#0f0f1a" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 32 }}>📷</span></div>}
      <div style={{ padding: "8px 12px", display: "flex", gap: 14 }}>
        {["♡", "💬", "↗️"].map(a => <span key={a} style={{ fontSize: 16 }}>{a}</span>)}
        <span style={{ marginLeft: "auto", fontSize: 16 }}>🔖</span>
      </div>
      <div style={{ padding: "0 12px 8px" }}><span style={{ fontSize: 11, fontWeight: 700, color: textColor }}>yourbrand </span><span style={{ fontSize: 11, color: textColor, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{truncated || <span style={{ color: subColor, fontStyle: "italic" }}>Caption...</span>}</span></div>
      <div style={{ padding: "2px 12px 8px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: subColor }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#E1306C", fontWeight: 700 }}>Instagram</span></div>
    </div>
  );

  // TikTok style
  if (platformId === "tiktok") return (
    <div style={{ background: "#000", borderRadius: 10, border: `1px solid ${border}`, overflow: "hidden", color: "#fff" }}>
      <div style={{ position: "relative", height: 320, display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
        {videoUrl ? <video src={videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}><span style={{ fontSize: 40 }}>🎵</span><span style={{ fontSize: 11, color: "#ffffff80" }}>Video preview</span></div>}
        {/* Right sidebar icons */}
        <div style={{ position: "absolute", right: 8, bottom: 40, display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>D</div>
          {["♥", "💬", "↗️", "🔖"].map(i => <div key={i} style={{ textAlign: "center" }}><span style={{ fontSize: 18 }}>{i}</span><div style={{ fontSize: 8, color: "#fff" }}>0</div></div>)}
        </div>
        {/* Bottom overlay */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 40, padding: "12px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>@yourbrand</div>
          <div style={{ fontSize: 10, lineHeight: 1.4, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 40, overflow: "hidden" }}>{truncated || "Your caption..."}</div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 10 }}>🎵</span><span style={{ fontSize: 9, color: "#ffffffbb" }}>Original sound - yourbrand</span></div>
        </div>
      </div>
      <div style={{ padding: "4px 12px 6px", display: "flex", justifyContent: "space-between", background: "#111" }}><span style={{ fontSize: 9, color: "#ffffff60" }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>TikTok</span></div>
    </div>
  );

  // LinkedIn style
  if (platformId === "linkedin") return (
    <div style={{ background: bg, borderRadius: 10, border: `1px solid ${border}`, overflow: "hidden" }}>
      <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800 }}>D</div>
        <div><div style={{ fontSize: 12, fontWeight: 700, color: textColor }}>Your Brand</div><div style={{ fontSize: 10, color: subColor }}>1,234 followers</div><div style={{ fontSize: 9, color: subColor }}>Just now · 🌎</div></div>
      </div>
      <div style={{ padding: "0 12px 10px" }}><p style={{ fontSize: 12, color: textColor, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{truncated || <span style={{ color: subColor, fontStyle: "italic" }}>Share an update...</span>}</p></div>
      {mediaUrl && <div style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>{videoUrl ? <video src={videoUrl} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} /> : <img src={imageUrl} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} alt="" />}</div>}
      <div style={{ padding: "6px 12px", borderBottom: `1px solid ${border}` }}><span style={{ fontSize: 9, color: subColor }}>👍 0 · 0 comments</span></div>
      <div style={{ padding: "6px 12px", display: "flex", gap: 16 }}>
        {["👍 Like", "💬 Comment", "🔄 Repost", "↗️ Send"].map(a => <span key={a} style={{ fontSize: 10, color: subColor, fontWeight: 600 }}>{a}</span>)}
      </div>
      <div style={{ padding: "2px 12px 6px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: subColor }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#0A66C2", fontWeight: 700 }}>LinkedIn</span></div>
    </div>
  );

  // YouTube style
  if (platformId === "youtube") return (
    <div style={{ background: bg, borderRadius: 10, border: `1px solid ${border}`, overflow: "hidden" }}>
      <div style={{ position: "relative", background: "#000" }}>
        {videoUrl ? <video src={videoUrl} style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: 170, display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "#0f0f1a" : "#111" }}><div style={{ width: 48, height: 34, borderRadius: 8, background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 16 }}>▶</span></div></div>}
        <div style={{ position: "absolute", bottom: 6, right: 6, background: "rgba(0,0,0,0.8)", borderRadius: 4, padding: "1px 5px", fontSize: 10, color: "#fff" }}>0:00</div>
      </div>
      <div style={{ padding: "10px 12px", display: "flex", gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>D</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: textColor, marginBottom: 2, lineHeight: 1.3 }}>{truncated.slice(0, 80) || <span style={{ color: subColor, fontStyle: "italic" }}>Video title...</span>}</div>
          <div style={{ fontSize: 10, color: subColor }}>Your Brand · 0 views · Just now</div>
        </div>
      </div>
      <div style={{ padding: "2px 12px 8px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: subColor }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#FF0000", fontWeight: 700 }}>YouTube</span></div>
    </div>
  );

  return null;
}

/* ═══ CREATE POST MODAL ═══ */
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
  const [showEmoji, setShowEmoji] = useState(false);
  const [showHashtags, setShowHashtags] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charLimit = draft.platforms.length > 0
    ? Math.min(...draft.platforms.map((pid: string) => PLATFORM_LIMITS[pid] || 5000))
    : 5000;
  const charPlatform = draft.platforms.length > 0
    ? PLATFORMS.find(p => p.id === draft.platforms.reduce((a: string, b: string) => (PLATFORM_LIMITS[a] || 5000) < (PLATFORM_LIMITS[b] || 5000) ? a : b))
    : null;
  const isOverLimit = draft.content.length > charLimit;

  function insertAtCursor(text: string) {
    const ta = textareaRef.current;
    if (ta) {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newContent = draft.content.slice(0, start) + text + draft.content.slice(end);
      setDraft((d: any) => ({ ...d, content: newContent }));
      setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = start + text.length; }, 0);
    } else {
      setDraft((d: any) => ({ ...d, content: d.content + text }));
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
      <div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: showPreview ? "min(920px,100%)" : "min(560px,100%)", boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto", border: `1px solid ${theme.border}`, transition: "width 0.3s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: theme.text }}>{t("Create new post", "Nieuwe post")}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setShowPreview(v => !v)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, border: `1px solid ${showPreview ? BRAND.primary : theme.border}`, background: showPreview ? (darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL) : "transparent", color: showPreview ? BRAND.primary : theme.textS, fontSize: 12, fontWeight: 600, cursor: "pointer" }}><Eye size={14} />{t("Preview", "Voorbeeld")}</button>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} color={theme.textT} /></button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {/* LEFT: Editor */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* TYPE */}
            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>TYPE</label><div style={{ display: "flex", gap: 8 }}>{["post", "story", "reel", "video"].map(tp => <button key={tp} onClick={() => setDraft((d: any) => ({ ...d, type: tp }))} style={{ padding: "6px 14px", borderRadius: 8, border: draft.type === tp ? `2px solid ${BRAND.primary}` : `1px solid ${theme.border}`, background: draft.type === tp ? (darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL) : "transparent", color: draft.type === tp ? BRAND.primary : theme.textS, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{tp.charAt(0).toUpperCase() + tp.slice(1)}</button>)}</div></div>

            {/* PLATFORMS */}
            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>PLATFORMS</label><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{PLATFORMS.map(p => <button key={p.id} onClick={() => setDraft((d: any) => ({ ...d, platforms: d.platforms.includes(p.id) ? d.platforms.filter((x: string) => x !== p.id) : [...d.platforms, p.id] }))} style={{ border: draft.platforms.includes(p.id) ? `2px solid ${p.color}` : `1px solid ${theme.border}`, background: draft.platforms.includes(p.id) ? (darkMode ? p.color + "20" : p.bg) : "transparent", color: draft.platforms.includes(p.id) ? p.color : theme.textS, borderRadius: 9, padding: "7px 14px", fontSize: 13, cursor: "pointer", fontWeight: draft.platforms.includes(p.id) ? 700 : 400 }}>{p.label}</button>)}</div></div>

            {/* IMAGE */}
            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>IMAGE</label>{draft.image_url ? <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${theme.border}` }}><div style={{ position: "relative" }}><img src={draft.image_url} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} /><button onClick={() => setDraft((d: any) => ({ ...d, image_url: "" }))} style={{ position: "absolute", top: 6, right: 6, background: BRAND.red, color: "#fff", border: "none", borderRadius: 7, padding: "4px 8px", cursor: "pointer", fontSize: 11 }}>✕</button></div><div style={{ padding: "6px 10px", background: theme.codeBg, display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: BRAND.green }} /><span style={{ fontSize: 11, color: BRAND.green, fontWeight: 600 }}>Ready</span>{draft.platforms.length > 0 && <span style={{ fontSize: 10, color: theme.textT, marginLeft: "auto" }}>{t("Recommended: ", "Aanbevolen: ")}{PLATFORM_MEDIA[draft.platforms[0]]?.image}</span>}</div></div> : uploadingImage ? <div style={{ borderRadius: 12, background: darkMode ? "rgba(124,58,237,0.1)" : BRAND.primaryL, padding: "16px", textAlign: "center" }}><div style={{ width: 32, height: 32, margin: "0 auto 8px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} /><div style={{ fontSize: 12, color: BRAND.primary, fontWeight: 600 }}>Uploading...</div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div> : <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px", borderRadius: 12, border: `2px dashed ${theme.border}`, cursor: "pointer", background: theme.codeBg }}><span style={{ fontSize: 22 }}>📷</span><span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>{t("Upload image", "Upload afbeelding")}</span>{draft.platforms.length > 0 && <span style={{ fontSize: 10, color: theme.textT }}>{PLATFORM_MEDIA[draft.platforms[0]]?.image}</span>}<input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadImage(f); if (u) setDraft((d: any) => ({ ...d, image_url: u })); } }} /></label>}</div>

            {/* VIDEO */}
            <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>VIDEO</label>{draft.video_url ? <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${theme.border}`, background: "#000" }}><div style={{ position: "relative", width: videoAspect === "vertical" ? 160 : "100%", margin: videoAspect === "vertical" ? "0 auto" : undefined }}><video src={draft.video_url} controls onLoadedMetadata={(e: any) => { const v = e.currentTarget; setVideoAspect(v.videoHeight > v.videoWidth ? "vertical" : "horizontal"); }} style={{ width: "100%", height: videoAspect === "vertical" ? 260 : 160, objectFit: "contain", display: "block", background: "#000" }} /><button onClick={() => { setDraft((d: any) => ({ ...d, video_url: "" })); setVideoAspect(null); }} style={{ position: "absolute", top: 6, right: 6, background: BRAND.red, color: "#fff", border: "none", borderRadius: 7, padding: "4px 8px", cursor: "pointer", fontSize: 11 }}>✕</button></div><div style={{ padding: "6px 10px", background: theme.codeBg, display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: BRAND.green }} /><span style={{ fontSize: 11, color: BRAND.green, fontWeight: 600 }}>Ready</span><span style={{ fontSize: 10, marginLeft: "auto", background: videoAspect === "vertical" ? "#FF000015" : BRAND.primary + "15", padding: "2px 7px", borderRadius: 5, fontWeight: 700, color: videoAspect === "vertical" ? "#FF0000" : BRAND.primary }}>{videoAspect === "vertical" ? "Short/Reel" : "Video"}</span></div></div> : uploadingVideo ? <div style={{ borderRadius: 12, background: darkMode ? "rgba(124,58,237,0.1)" : BRAND.primaryL, padding: "16px", textAlign: "center" }}><div style={{ width: 32, height: 32, margin: "0 auto 8px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} /><div style={{ fontSize: 12, color: BRAND.primary, fontWeight: 600 }}>Uploading video...</div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div> : <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px", borderRadius: 12, border: `2px dashed ${theme.border}`, cursor: "pointer", background: theme.codeBg }}><span style={{ fontSize: 22 }}>🎬</span><span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>{t("Upload video", "Upload video")}</span><span style={{ fontSize: 10, color: theme.textT }}>MP4, MOV · max 256MB</span><input type="file" accept="video/mp4,video/*" style={{ display: "none" }} onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadVideo(f); if (u) setDraft((d: any) => ({ ...d, video_url: u })); } }} /></label>}</div>

            {/* CONTENT EDITOR */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: theme.textS }}>CONTENT</label>
                <div style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => { setShowEmoji(v => !v); setShowHashtags(false); }} style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${showEmoji ? BRAND.primary : theme.border}`, background: showEmoji ? (darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL) : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><SmilePlus size={14} color={showEmoji ? BRAND.primary : theme.textT} /></button>
                  <button onClick={() => { setShowHashtags(v => !v); setShowEmoji(false); }} style={{ width: 30, height: 30, borderRadius: 7, border: `1px solid ${showHashtags ? BRAND.primary : theme.border}`, background: showHashtags ? (darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL) : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Hash size={14} color={showHashtags ? BRAND.primary : theme.textT} /></button>
                </div>
              </div>

              {/* Emoji picker */}
              {showEmoji && <div style={{ background: theme.codeBg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px", marginBottom: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                {EMOJI_LIST.map(e => <button key={e} onClick={() => insertAtCursor(e)} style={{ width: 32, height: 32, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }} onMouseEnter={ev => (ev.currentTarget.style.background = theme.hoverBg)} onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>{e}</button>)}
              </div>}

              {/* Hashtag suggestions */}
              {showHashtags && <div style={{ background: theme.codeBg, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px", marginBottom: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {HASHTAG_SUGGESTIONS.map(h => <button key={h} onClick={() => insertAtCursor(" " + h)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 11, color: BRAND.primary, fontWeight: 600, transition: "all 0.15s" }} onMouseEnter={ev => { ev.currentTarget.style.background = darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL; }} onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; }}>{h}</button>)}
              </div>}

              <textarea ref={textareaRef} value={draft.content} onChange={e => setDraft((d: any) => ({ ...d, content: e.target.value }))} placeholder={t("Write your post...", "Schrijf je post...")} style={{ width: "100%", minHeight: 120, boxSizing: "border-box", borderRadius: 10, border: `1px solid ${isOverLimit ? BRAND.red : theme.inputBorder}`, padding: "10px 12px", fontSize: 14, resize: "vertical", fontFamily: "inherit", background: theme.inputBg, color: theme.text }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 11, color: theme.textT }}>{charPlatform ? `${charPlatform.label} limit` : ""}</span>
                <span style={{ fontSize: 12, color: isOverLimit ? BRAND.red : draft.content.length > charLimit * 0.9 ? BRAND.amber : theme.textT, fontWeight: isOverLimit ? 700 : 400 }}>{draft.content.length}/{charLimit}</span>
              </div>
            </div>

            {/* DATE + TIME */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}><div><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>DATE</label><input type="date" value={draft.date} onChange={e => setDraft((d: any) => ({ ...d, date: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} /></div><div><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>TIME</label><input type="time" value={draft.time} onChange={e => setDraft((d: any) => ({ ...d, time: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} /></div></div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS }}>Cancel</button>
              <button onClick={onSaveDraft} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS, fontWeight: 600 }}>Draft</button>
              <button onClick={onSchedule} disabled={!draft.content || !draft.date || draft.platforms.length === 0 || isOverLimit} style={{ flex: 1.5, padding: "11px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: (!draft.content || !draft.date || draft.platforms.length === 0 || isOverLimit) ? 0.45 : 1 }}>Schedule</button>
              <button onClick={onPublishNow} disabled={!draft.content || draft.platforms.length === 0 || isOverLimit} style={{ flex: 1.5, padding: "11px", borderRadius: 10, border: "none", background: BRAND.green, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: (!draft.content || draft.platforms.length === 0 || isOverLimit) ? 0.45 : 1 }}>Publish now</button>
            </div>
          </div>

          {/* RIGHT: Platform previews */}
          {showPreview && draft.platforms.length > 0 && (
            <div style={{ width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", maxHeight: "75vh" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "flex", alignItems: "center", gap: 6 }}><Monitor size={14} /> {t("Live Preview", "Live Voorbeeld")}</div>
              {draft.platforms.map((pid: string) => (
                <PlatformPreview key={pid} platformId={pid} content={draft.content} imageUrl={draft.image_url} videoUrl={draft.video_url} dark={darkMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
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
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}><div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: "min(440px,100%)", boxSizing: "border-box", border: `1px solid ${theme.border}` }}><div style={{ fontSize: 18, fontWeight: 800, marginBottom: 18, color: theme.text }}>{t("New workspace", "Nieuwe workspace")}</div><input value={newWS.name} onChange={e => setNewWS((w: any) => ({ ...w, name: e.target.value }))} placeholder="Name" style={{ width: "100%", marginBottom: 12, padding: "11px 13px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} /><input value={newWS.industry} onChange={e => setNewWS((w: any) => ({ ...w, industry: e.target.value }))} placeholder="Industry" style={{ width: "100%", marginBottom: 16, padding: "11px 13px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} /><div style={{ display: "flex", gap: 10, marginBottom: 20 }}>{WORKSPACE_COLORS.map(col => <button key={col} onClick={() => setNewWS((w: any) => ({ ...w, color: col }))} style={{ width: 32, height: 32, borderRadius: "50%", background: col, border: newWS.color === col ? `3px solid ${theme.text}` : "3px solid transparent", cursor: "pointer", padding: 0 }} />)}</div><div style={{ display: "flex", gap: 10 }}><button onClick={onClose} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS }}>Cancel</button><button onClick={onCreate} disabled={!newWS.name} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: !newWS.name ? 0.45 : 1 }}>Create</button></div></div></div>
  );
}

/* ═══ CHANNEL PICKER MODAL ═══ */
type ChannelPickerProps = {
  ws: any; ytChannels: any[]; loadingChannels: boolean; darkMode: boolean;
  theme: Theme; t: (en: string, nl: string) => string;
  onSelect: (ch: any) => void; onClose: () => void;
  onRetry: () => void;
};

export function ChannelPickerModal({ ws, ytChannels, loadingChannels, darkMode, theme, t, onSelect, onClose, onRetry }: ChannelPickerProps) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}><div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: "min(440px,100%)", boxSizing: "border-box", border: `1px solid ${theme.border}` }}><div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, color: theme.text }}>Select YouTube Channel</div><p style={{ fontSize: 13, color: theme.textT, marginBottom: 18 }}>Choose which channel to connect.</p>
      {loadingChannels ? <div style={{ textAlign: "center", padding: "30px 0" }}><div style={{ width: 40, height: 40, margin: "0 auto 12px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
      : ytChannels.length === 0 ? <div style={{ textAlign: "center", padding: "20px 0" }}>📺 <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginTop: 8 }}>No channels found</div><div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}><button onClick={() => signIn("google", { callbackUrl: "/?pickChannel=true" })} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Re-login</button><button onClick={onRetry} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.text, cursor: "pointer", fontSize: 13 }}>Retry</button></div><div style={{ marginTop: 16, borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}><div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 8 }}>Or add manually</div><div style={{ display: "flex", gap: 8 }}><input id="manual-ch" placeholder="Channel ID (UCxxxx...)" style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${theme.inputBorder}`, fontSize: 13, background: theme.inputBg, color: theme.text }} /><button onClick={() => { const el = document.getElementById("manual-ch") as HTMLInputElement; const v = el?.value?.trim(); if (v) onSelect({ id: v, title: v, thumbnail: "" }); }} style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: BRAND.green, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Add</button></div></div></div>
      : <div>{ytChannels.map((ch: any) => <button key={ch.id} onClick={() => onSelect(ch)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 12, border: ws?.youtube_channel_id === ch.id ? `2px solid ${BRAND.green}` : `1px solid ${theme.border}`, background: ws?.youtube_channel_id === ch.id ? (darkMode ? "rgba(16,185,129,0.1)" : BRAND.greenL) : theme.card, cursor: "pointer", marginBottom: 8, textAlign: "left" }}>{ch.thumbnail ? <img src={ch.thumbnail} style={{ width: 44, height: 44, borderRadius: "50%" }} alt="" /> : <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FF000015", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>▶</div>}<div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{ch.title}</div><div style={{ fontSize: 11, color: theme.textT }}>{ch.id}</div></div>{ws?.youtube_channel_id === ch.id && <div style={{ width: 24, height: 24, borderRadius: "50%", background: BRAND.green, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>✓</div>}</button>)}</div>}
      <button onClick={onClose} style={{ width: "100%", padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS, marginTop: 8 }}>Cancel</button>
    </div></div>
  );
}