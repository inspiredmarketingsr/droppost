"use client";
import { signIn } from "next-auth/react";
import { BRAND, Theme } from "./ui";

const PlatformIcon = ({ id, size = 20 }: { id: string; size?: number }) => {
  if (id === "facebook") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  if (id === "instagram") return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><defs><linearGradient id={`igs-${size}`} x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#feda75"/><stop offset="25%" stopColor="#fa7e1e"/><stop offset="50%" stopColor="#d62976"/><stop offset="75%" stopColor="#962fbf"/><stop offset="100%" stopColor="#4f5bd5"/></linearGradient></defs><rect width="22" height="22" x="1" y="1" rx="6" stroke={`url(#igs-${size})`} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4.5" stroke={`url(#igs-${size})`} strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.2" fill={`url(#igs-${size})`}/></svg>;
  if (id === "tiktok") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z"/></svg>;
  if (id === "linkedin") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
  if (id === "youtube") return <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
  return null;
};

type Props = {
  ws: any;
  darkMode: boolean;
  theme: Theme;
  onFetchChannels: () => void;
  onShowChannelPicker: (v: boolean) => void;
  onDisconnectYT: () => void;
  t: (en: string, nl: string) => string;
};

const ACCOUNTS = [
  { id: "youtube", label: "YouTube", color: "#FF0000", desc: "Videos & Shorts" },
  { id: "facebook", label: "Facebook", color: "#1877F2", desc: "Pages" },
  { id: "instagram", label: "Instagram", color: "#E1306C", desc: "Reels" },
  { id: "tiktok", label: "TikTok", color: "#010101", desc: "Videos" },
  { id: "linkedin", label: "LinkedIn", color: "#0A66C2", desc: "Posts & Articles" },
];

export default function SettingsPage({ ws, darkMode, theme, onFetchChannels, onShowChannelPicker, onDisconnectYT, t }: Props) {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Settings", "Instellingen")}</h1>
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "18px", marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12 }}>{t("Connected accounts", "Gekoppelde accounts")}</div>
        {ACCOUNTS.map(p => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${darkMode ? "#2A2A40" : "#F3F4F6"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: p.color + "15", border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PlatformIcon id={p.id} size={20} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{p.label}</div>
                <div style={{ fontSize: 11, color: theme.textT }}>{p.desc}</div>
                {p.id === "youtube" && ws?.youtube_channel_name && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    {ws.youtube_channel_thumb && <img src={ws.youtube_channel_thumb} style={{ width: 20, height: 20, borderRadius: "50%" }} alt="" />}
                    <span style={{ fontSize: 12, color: BRAND.green, fontWeight: 600 }}>{ws.youtube_channel_name}</span>
                  </div>
                )}
              </div>
            </div>
            {p.id === "youtube" ? (
              ws?.youtube_channel_id ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => { onFetchChannels(); onShowChannelPicker(true); }} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${p.color}`, background: p.color + "10", color: p.color, cursor: "pointer", fontWeight: 600 }}>{t("Switch", "Wissel")}</button>
                  <button onClick={onDisconnectYT} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${BRAND.red}`, background: BRAND.red + "10", color: BRAND.red, cursor: "pointer", fontWeight: 600 }}>{t("Disconnect", "Ontkoppel")}</button>
                </div>
              ) : (
                <button onClick={() => signIn("google", { callbackUrl: "/?pickChannel=true" })} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${p.color}`, background: p.color + "10", color: p.color, cursor: "pointer", fontWeight: 600 }}>Connect</button>
              )
            ) : (
              <button style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.textT, cursor: "default", fontWeight: 600 }}>{t("Coming soon", "Binnenkort")}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}