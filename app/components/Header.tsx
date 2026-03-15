"use client";
import { signOut } from "next-auth/react";
import { Settings, User, CreditCard, HelpCircle, Gift, LogOut, Headphones, Newspaper, Moon, Sun, Globe } from "lucide-react";
import { BRAND, Avatar, Theme } from "./ui";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  ws: any;
  session: any;
  userName: string;
  userEmail: string;
  userInitials: string;
  darkMode: boolean;
  setDarkMode: (fn: (v: boolean) => boolean) => void;
  language: "en" | "nl";
  setLanguage: (v: "en" | "nl") => void;
  showSupport: boolean;
  setShowSupport: (fn: (v: boolean) => boolean) => void;
  showNews: boolean;
  setShowNews: (fn: (v: boolean) => boolean) => void;
  showLangMenu: boolean;
  setShowLangMenu: (fn: (v: boolean) => boolean) => void;
  showUserMenu: boolean;
  setShowUserMenu: (fn: (v: boolean) => boolean) => void;
  setShowNewPost: (v: boolean) => void;
  theme: Theme;
  t: (en: string, nl: string) => string;
};

export default function Header({ sidebarOpen, setSidebarOpen, ws, session, userName, userEmail, userInitials, darkMode, setDarkMode, language, setLanguage, showSupport, setShowSupport, showNews, setShowNews, showLangMenu, setShowLangMenu, showUserMenu, setShowUserMenu, setShowNewPost, theme, t }: Props) {
  return (
    <div style={{ background: theme.headerBg, borderBottom: `1px solid ${theme.border}`, padding: "0 24px", display: "flex", alignItems: "center", height: 58, gap: 12, flexShrink: 0 }}>
      {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 4 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.textS} strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg></button>}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{ws && <Avatar initials={ws.avatar} color={ws.color} size={32} />}<div><div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{ws?.name}</div></div></div>
      <div style={{ flex: 1 }} />
      <button onClick={() => setShowNewPost(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginRight: 8 }}>+ {t("Create Post", "Maak Post")}</button>
      <button onClick={() => { setShowSupport(o => !o); setShowNews(() => false); }} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showSupport ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Headphones size={18} color={showSupport ? BRAND.primary : theme.textS} /></button>
      <button onClick={() => { setShowNews(o => !o); setShowSupport(() => false); }} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showNews ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Newspaper size={18} color={showNews ? BRAND.primary : theme.textS} /></button>
      <button onClick={() => setDarkMode(o => !o)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: darkMode ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{darkMode ? <Sun size={18} color={BRAND.amber} /> : <Moon size={18} color={theme.textS} />}</button>

      {/* LANGUAGE MENU */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setShowLangMenu(o => !o)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showLangMenu ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={18} color={showLangMenu ? BRAND.primary : theme.textS} /></button>
        {showLangMenu && <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.18)", overflow: "hidden", zIndex: 200, minWidth: 150 }}>{[{ code: "en" as const, label: "🇬🇧 English" }, { code: "nl" as const, label: "🇳🇱 Nederlands" }].map(l => <button key={l.code} onClick={() => { setLanguage(l.code); setShowLangMenu(() => false); }} style={{ width: "100%", padding: "10px 16px", background: language === l.code ? theme.tagBg : "none", border: "none", cursor: "pointer", fontSize: 13, color: language === l.code ? BRAND.primary : theme.text, textAlign: "left", fontWeight: language === l.code ? 700 : 400 }}>{l.label}</button>)}</div>}
      </div>

      {/* USER MENU */}
      <div style={{ position: "relative", marginLeft: 4 }}>
        <button onClick={() => setShowUserMenu(o => !o)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "5px 10px", cursor: "pointer" }}>
          {session.user?.image ? <img src={session.user.image} style={{ width: 30, height: 30, borderRadius: "50%" }} alt="" /> : <div style={{ width: 30, height: 30, borderRadius: "50%", background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{userInitials}</div>}
          <div style={{ textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>{userName}</div><div style={{ fontSize: 10, color: theme.textT }}>{userEmail}</div></div>
          <span style={{ fontSize: 12, color: theme.textT }}>▾</span>
        </button>
        {showUserMenu && <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, boxShadow: "0 8px 30px rgba(0,0,0,0.18)", width: 220, zIndex: 200, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            {session.user?.image ? <img src={session.user.image} style={{ width: 38, height: 38, borderRadius: "50%" }} alt="" /> : <div style={{ width: 38, height: 38, borderRadius: "50%", background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>{userInitials}</div>}
            <div><div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{userName}</div><div style={{ fontSize: 11, color: theme.textT }}>{userEmail}</div></div>
          </div>
          {[{ icon: <Settings size={15} />, label: t("Company Settings", "Bedrijfsinstellingen") }, { icon: <User size={15} />, label: t("User Settings", "Gebruikersinstellingen") }, { icon: <CreditCard size={15} />, label: t("Billing", "Facturering") }, { icon: <HelpCircle size={15} />, label: t("Help", "Hulp") }, { icon: <Gift size={15} />, label: t("Affiliates", "Affiliates") }].map(item => (
            <button key={item.label} onClick={() => setShowUserMenu(() => false)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: theme.text, textAlign: "left" }} onMouseEnter={e => (e.currentTarget.style.background = theme.hoverBg)} onMouseLeave={e => (e.currentTarget.style.background = "none")}>{item.icon}{item.label}</button>
          ))}
          <div style={{ borderTop: `1px solid ${theme.border}` }}><button onClick={() => signOut({ callbackUrl: "/" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: BRAND.red, textAlign: "left" }} onMouseEnter={e => (e.currentTarget.style.background = darkMode ? "rgba(239,68,68,0.1)" : BRAND.redL)} onMouseLeave={e => (e.currentTarget.style.background = "none")}><LogOut size={15} color={BRAND.red} />{t("Logout", "Uitloggen")}</button></div>
        </div>}
      </div>
    </div>
  );
}