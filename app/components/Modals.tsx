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

/* ═══ SVG ICONS FOR PREVIEWS ═══ */
const SvgHeart = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const SvgComment = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const SvgShare = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>;
const SvgBookmark = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
const SvgMore = ({ size = 20, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>;
const SvgThumbUp = ({ size = 18, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>;
const SvgMusic = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;

/* ═══ PLATFORM PREVIEW ═══ */
function PlatformPreview({ platformId, content, imageUrl, videoUrl, postType, dark }: { platformId: string; content: string; imageUrl: string; videoUrl?: string; postType?: string; dark: boolean }) {
  const p = PLATFORMS.find(pl => pl.id === platformId);
  if (!p) return null;
  const maxLen = PLATFORM_LIMITS[platformId] || 5000;
  const truncated = content.length > maxLen ? content.slice(0, maxLen) + "..." : content;
  const mediaUrl = videoUrl || imageUrl;
  const isVertical = postType === "reel" || postType === "story";

  // ── FACEBOOK ──
  if (platformId === "facebook") return (
    <div style={{ background: dark ? "#242526" : "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}>
      <div style={{ padding: "12px 16px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800 }}>D</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: dark ? "#e4e6eb" : "#050505" }}>Your Brand</div>
          <div style={{ fontSize: 11, color: dark ? "#b0b3b8" : "#65676b", display: "flex", alignItems: "center", gap: 4 }}>Just now · <svg width="12" height="12" viewBox="0 0 16 16" fill={dark ? "#b0b3b8" : "#65676b"}><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 2a6 6 0 0 1 4.47 10H3.53A6 6 0 0 1 8 2z"/></svg></div>
        </div>
        <SvgMore size={20} color={dark ? "#b0b3b8" : "#65676b"} />
      </div>
      {truncated && <div style={{ padding: "0 16px 12px" }}><p style={{ fontSize: 14, color: dark ? "#e4e6eb" : "#050505", lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{truncated}</p></div>}
      {mediaUrl && <div>{videoUrl ? <video src={videoUrl} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} /> : <img src={imageUrl} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} alt="" />}</div>}
      <div style={{ padding: "8px 16px", display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${dark ? "#3e4042" : "#ced0d4"}` }}>
        <span style={{ fontSize: 11, color: dark ? "#b0b3b8" : "#65676b" }}>👍 0</span>
        <span style={{ fontSize: 11, color: dark ? "#b0b3b8" : "#65676b" }}>0 comments · 0 shares</span>
      </div>
      <div style={{ padding: "4px 16px", display: "flex" }}>
        {[{ icon: <SvgThumbUp size={18} color={dark ? "#b0b3b8" : "#65676b"} />, label: "Like" }, { icon: <SvgComment size={18} color={dark ? "#b0b3b8" : "#65676b"} />, label: "Comment" }, { icon: <SvgShare size={18} color={dark ? "#b0b3b8" : "#65676b"} />, label: "Share" }].map(a => (
          <div key={a.label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 0", cursor: "default" }}>{a.icon}<span style={{ fontSize: 12, fontWeight: 600, color: dark ? "#b0b3b8" : "#65676b" }}>{a.label}</span></div>
        ))}
      </div>
      <div style={{ padding: "4px 16px 6px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: dark ? "#b0b3b8" : "#65676b" }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#1877F2", fontWeight: 700 }}>Facebook Preview</span></div>
    </div>
  );

  // ── INSTAGRAM ──
  if (platformId === "instagram") {
    if (isVertical) {
      // Instagram Reel/Story style
      return (
        <div style={{ background: "#000", borderRadius: 28, overflow: "hidden", position: "relative", width: "100%", aspectRatio: "9/16", border: "3px solid #333" }}>
          {mediaUrl ? (videoUrl ? <video src={videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} /> : <img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} alt="" />) : <div style={{ width: "100%", height: "100%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", inset: 0 }}><span style={{ fontSize: 40 }}>📷</span></div>}
          {/* Top bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "12px 16px", display: "flex", justifyContent: "space-between", background: "linear-gradient(rgba(0,0,0,0.4), transparent)" }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Reels</span>
            <span style={{ color: "#fff", fontSize: 18 }}>📷</span>
          </div>
          {/* Right icons */}
          <div style={{ position: "absolute", right: 12, bottom: 80, display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
            {[{ icon: <SvgHeart size={24} color="#fff" />, count: "0" }, { icon: <SvgComment size={24} color="#fff" />, count: "0" }, { icon: <SvgShare size={24} color="#fff" />, count: "0" }, { icon: <SvgBookmark size={24} color="#fff" />, count: "" }].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>{item.icon}{item.count && <div style={{ fontSize: 10, color: "#fff", marginTop: 2 }}>{item.count}</div>}</div>
            ))}
            <div style={{ width: 24, height: 24, borderRadius: 6, border: "2px solid #fff", background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }} />
          </div>
          {/* Bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 50, padding: "16px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 800 }}>D</div><span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>yourbrand</span><span style={{ fontSize: 11, color: "#fff", border: "1px solid #fff", borderRadius: 6, padding: "2px 8px", fontWeight: 600 }}>Follow</span></div>
            <div style={{ fontSize: 11, color: "#fff", lineHeight: 1.4, maxHeight: 44, overflow: "hidden" }}>{truncated || "Caption..."}</div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}><SvgMusic size={12} color="#fff" /><span style={{ fontSize: 10, color: "#ffffffcc" }}>Original audio · yourbrand</span></div>
          </div>
          <div style={{ position: "absolute", bottom: 4, left: 16 }}><span style={{ fontSize: 8, color: "#ffffff60" }}>{truncated.length}/{maxLen} · Instagram Reel</span></div>
        </div>
      );
    }
    // Instagram Feed post
    return (
      <div style={{ background: dark ? "#000" : "#fff", borderRadius: 10, overflow: "hidden", border: `1px solid ${dark ? "#262626" : "#dbdbdb"}` }}>
        <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", padding: 2, background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}><div style={{ width: "100%", height: "100%", borderRadius: "50%", background: dark ? "#000" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: dark ? "#fff" : "#000" }}>D</div></div>
          <div style={{ flex: 1 }}><span style={{ fontSize: 12, fontWeight: 700, color: dark ? "#f5f5f5" : "#262626" }}>yourbrand</span></div>
          <SvgMore size={16} color={dark ? "#f5f5f5" : "#262626"} />
        </div>
        {mediaUrl ? <div>{videoUrl ? <video src={videoUrl} style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} /> : <img src={imageUrl} style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} alt="" />}</div> : <div style={{ width: "100%", height: 280, background: dark ? "#1a1a1a" : "#fafafa", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 40 }}>📷</span></div>}
        <div style={{ padding: "10px 12px 4px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}><SvgHeart size={22} color={dark ? "#f5f5f5" : "#262626"} /><SvgComment size={22} color={dark ? "#f5f5f5" : "#262626"} /><SvgShare size={22} color={dark ? "#f5f5f5" : "#262626"} /></div>
          <SvgBookmark size={22} color={dark ? "#f5f5f5" : "#262626"} />
        </div>
        <div style={{ padding: "4px 12px" }}><span style={{ fontSize: 12, fontWeight: 700, color: dark ? "#f5f5f5" : "#262626" }}>0 likes</span></div>
        <div style={{ padding: "2px 12px 10px" }}><span style={{ fontSize: 12, fontWeight: 700, color: dark ? "#f5f5f5" : "#262626" }}>yourbrand </span><span style={{ fontSize: 12, color: dark ? "#f5f5f5" : "#262626" }}>{truncated || <span style={{ color: dark ? "#a8a8a8" : "#8e8e8e", fontStyle: "italic" }}>Caption...</span>}</span></div>
        <div style={{ padding: "2px 12px 8px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: dark ? "#a8a8a8" : "#8e8e8e" }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#E1306C", fontWeight: 700 }}>Instagram Preview</span></div>
      </div>
    );
  }

  // ── TIKTOK ──
  if (platformId === "tiktok") return (
    <div style={{ background: "#000", borderRadius: 28, overflow: "hidden", position: "relative", width: "100%", aspectRatio: "9/16", border: "3px solid #333" }}>
      {mediaUrl ? (videoUrl ? <video src={videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} /> : <img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} alt="" />) : <div style={{ width: "100%", height: "100%", background: "#121212", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, position: "absolute", inset: 0 }}><span style={{ fontSize: 40 }}>🎵</span><span style={{ fontSize: 11, color: "#ffffff50" }}>Video preview</span></div>}
      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "12px 16px", display: "flex", justifyContent: "center", gap: 16, background: "linear-gradient(rgba(0,0,0,0.3), transparent)" }}>
        <span style={{ fontSize: 13, color: "#ffffff80" }}>Following</span>
        <span style={{ fontSize: 13, color: "#fff", fontWeight: 700, borderBottom: "2px solid #fff", paddingBottom: 2 }}>For You</span>
      </div>
      {/* Right side icons */}
      <div style={{ position: "absolute", right: 10, bottom: 70, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800, border: "2px solid #fff" }}>D</div>
          <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 18, height: 18, borderRadius: "50%", background: "#fe2c55", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>+</span></div>
        </div>
        {[{ icon: <SvgHeart size={28} color="#fff" />, count: "0" }, { icon: <SvgComment size={26} color="#fff" />, count: "0" }, { icon: <SvgBookmark size={24} color="#fff" />, count: "0" }, { icon: <SvgShare size={26} color="#fff" />, count: "0" }].map((item, i) => (
          <div key={i} style={{ textAlign: "center" }}>{item.icon}<div style={{ fontSize: 10, color: "#fff", marginTop: 2 }}>{item.count}</div></div>
        ))}
        <div style={{ width: 32, height: 32, borderRadius: "50%", border: "8px solid #333", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", animation: "spin 4s linear infinite" }}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
      </div>
      {/* Bottom overlay */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 56, padding: "16px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>@yourbrand</div>
        <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.4, maxHeight: 54, overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{truncated || "Caption here..."}</div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}><SvgMusic size={12} color="#fff" /><div style={{ overflow: "hidden", flex: 1 }}><span style={{ fontSize: 11, color: "#ffffffcc", whiteSpace: "nowrap" }}>♫ Original sound - yourbrand</span></div></div>
      </div>
      {/* Bottom nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 0 6px", background: "#000", display: "flex", justifyContent: "space-around" }}>
        {["Home", "Friends", "+", "Inbox", "Me"].map((n, i) => (
          <div key={n} style={{ textAlign: "center" }}>
            {i === 2 ? <div style={{ width: 36, height: 24, borderRadius: 6, background: "linear-gradient(90deg, #25f4ee, #fe2c55)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 28, height: 20, borderRadius: 4, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>+</div></div> : <span style={{ fontSize: 9, color: i === 0 ? "#fff" : "#ffffff80" }}>{n}</span>}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 44, left: 16 }}><span style={{ fontSize: 8, color: "#ffffff40" }}>{truncated.length}/{maxLen}</span></div>
    </div>
  );

  // ── LINKEDIN ──
  if (platformId === "linkedin") return (
    <div style={{ background: dark ? "#1b1f23" : "#fff", borderRadius: 10, overflow: "hidden", border: `1px solid ${dark ? "#38434f" : "#e0e0e0"}` }}>
      <div style={{ padding: "12px 16px 8px", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 800, flexShrink: 0 }}>D</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: dark ? "#fff" : "#000" }}>Your Brand</div>
          <div style={{ fontSize: 11, color: dark ? "#ffffff99" : "#00000099" }}>1,234 followers</div>
          <div style={{ fontSize: 11, color: dark ? "#ffffff66" : "#00000066", display: "flex", alignItems: "center", gap: 4 }}>1h · <svg width="12" height="12" viewBox="0 0 16 16" fill={dark ? "#ffffff66" : "#00000066"}><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 2a6 6 0 0 1 4.47 10H3.53A6 6 0 0 1 8 2z"/></svg></div>
        </div>
        <SvgMore size={20} color={dark ? "#ffffff99" : "#00000066"} />
      </div>
      {truncated && <div style={{ padding: "0 16px 12px" }}><p style={{ fontSize: 13, color: dark ? "#ffffffe6" : "#000000e6", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{truncated}</p></div>}
      {mediaUrl && <div>{videoUrl ? <video src={videoUrl} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} /> : <img src={imageUrl} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} alt="" />}</div>}
      <div style={{ padding: "8px 16px 4px", display: "flex", alignItems: "center", gap: 4, borderBottom: `1px solid ${dark ? "#38434f" : "#e0e0e0"}` }}>
        <div style={{ display: "flex" }}>{["#0a66c2", "#e16745", "#44712e"].map((c, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, marginLeft: i > 0 ? -4 : 0, border: `1.5px solid ${dark ? "#1b1f23" : "#fff"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8 }}>{["👍", "❤️", "👏"][i]}</div>)}</div>
        <span style={{ fontSize: 11, color: dark ? "#ffffff99" : "#00000099", marginLeft: 4 }}>0</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: dark ? "#ffffff99" : "#00000099" }}>0 comments · 0 reposts</span>
      </div>
      <div style={{ padding: "4px 8px", display: "flex" }}>
        {[{ icon: <SvgThumbUp size={18} />, label: "Like" }, { icon: <SvgComment size={18} />, label: "Comment" }, { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>, label: "Repost" }, { icon: <SvgShare size={18} />, label: "Send" }].map(a => (
          <div key={a.label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px 0", color: dark ? "#ffffff99" : "#00000099", cursor: "default" }}>{a.icon}<span style={{ fontSize: 11, fontWeight: 600 }}>{a.label}</span></div>
        ))}
      </div>
      <div style={{ padding: "2px 16px 6px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: dark ? "#ffffff66" : "#00000066" }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#0A66C2", fontWeight: 700 }}>LinkedIn Preview</span></div>
    </div>
  );

  // ── YOUTUBE ──
  if (platformId === "youtube") {
    if (isVertical) {
      return (
        <div style={{ background: "#000", borderRadius: 28, overflow: "hidden", position: "relative", width: "100%", aspectRatio: "9/16", border: "3px solid #333" }}>
          {mediaUrl ? (videoUrl ? <video src={videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} /> : <img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} alt="" />) : <div style={{ width: "100%", height: "100%", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", inset: 0 }}><span style={{ fontSize: 48 }}>🎬</span></div>}
          <div style={{ position: "absolute", top: 12, left: 12, zIndex: 5 }}><span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Shorts</span></div>
          <div style={{ position: "absolute", right: 10, bottom: 70, display: "flex", flexDirection: "column", gap: 18, alignItems: "center", zIndex: 5 }}>
            {[{ icon: <SvgThumbUp size={26} color="#fff" />, count: "0" }, { icon: <SvgComment size={24} color="#fff" />, count: "0" }, { icon: <SvgShare size={24} color="#fff" />, count: "" }].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>{item.icon}{item.count && <div style={{ fontSize: 10, color: "#fff", marginTop: 2 }}>{item.count}</div>}</div>
            ))}
            <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #7C3AED, #06B6D4)", border: "1.5px solid #fff" }} />
          </div>
          <div style={{ position: "absolute", bottom: 16, left: 0, right: 56, padding: "16px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", zIndex: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 800 }}>D</div><span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>@yourbrand</span><span style={{ fontSize: 10, color: "#fff", background: "#cc0000", borderRadius: 4, padding: "2px 8px", fontWeight: 600 }}>Subscribe</span></div>
            <div style={{ fontSize: 11, color: "#fff", lineHeight: 1.3, maxHeight: 36, overflow: "hidden" }}>{truncated.slice(0, 80) || "Short title..."}</div>
          </div>
        </div>
      );
    }
    // YouTube regular video — simple clean card
    return (
      <div style={{ background: dark ? "#0f0f0f" : "#fff", borderRadius: 12, overflow: "hidden", border: `1px solid ${dark ? "#272727" : "#e5e5e5"}` }}>
        <div style={{ position: "relative", background: "#000", aspectRatio: "16/9" }}>
          {mediaUrl ? (videoUrl ? <video src={videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <img src={imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="" />) : <div style={{ width: "100%", height: "100%", background: "#0f0f0f", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 60, height: 42, borderRadius: 12, background: "rgba(255,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 22, marginLeft: 3 }}>▶</span></div></div>}
          <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.8)", borderRadius: 4, padding: "2px 6px" }}><span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>0:00</span></div>
        </div>
        <div style={{ padding: "12px 14px", display: "flex", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800, flexShrink: 0 }}>D</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: dark ? "#f1f1f1" : "#0f0f0f", lineHeight: 1.4, marginBottom: 6 }}>{truncated.slice(0, 100) || <span style={{ color: "#606060", fontStyle: "italic" }}>Video title goes here...</span>}</div>
            <div style={{ fontSize: 12, color: dark ? "#aaa" : "#606060" }}>Your Brand · 0 views · Just now</div>
          </div>
          <SvgMore size={20} color={dark ? "#aaa" : "#606060"} />
        </div>
        <div style={{ padding: "0 14px 12px", display: "flex", gap: 8 }}>
          {[{ icon: <SvgThumbUp size={14} />, label: "Like" }, { icon: <SvgShare size={14} />, label: "Share" }, { icon: <SvgBookmark size={14} />, label: "Save" }].map((a, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: dark ? "#272727" : "#f2f2f2", borderRadius: 20, padding: "6px 14px", color: dark ? "#fff" : "#0f0f0f", fontSize: 12, fontWeight: 600 }}>{a.icon}{a.label}</div>))}
        </div>
        <div style={{ padding: "0 14px 8px", display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 9, color: dark ? "#aaa" : "#606060" }}>{truncated.length}/{maxLen}</span><span style={{ fontSize: 9, color: "#FF0000", fontWeight: 700 }}>YouTube Preview</span></div>
      </div>
    );
  }

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
      <div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: showPreview ? "min(1020px,100%)" : "min(560px,100%)", boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto", border: `1px solid ${theme.border}`, transition: "width 0.3s" }}>
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
            <div style={{ width: 380, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto", maxHeight: "75vh", paddingRight: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: theme.textS, display: "flex", alignItems: "center", gap: 6 }}><Monitor size={14} /> {t("Live Preview", "Live Voorbeeld")}</div>
              {draft.platforms.map((pid: string) => (
                <PlatformPreview key={pid} platformId={pid} content={draft.content} imageUrl={draft.image_url} videoUrl={draft.video_url} postType={draft.type} dark={darkMode} />
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