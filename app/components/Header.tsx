"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Settings, User, CreditCard, HelpCircle, Gift, LogOut, Headphones, Newspaper, Moon, Sun, Globe, ChevronDown, Plus, Check, Menu } from "lucide-react";
import { BRAND, Avatar, Theme } from "./ui";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  ws: any;
  workspaces: any[];
  activeWS: string | null;
  switchWorkspace: (id: string) => void;
  setShowNewWS: (v: boolean) => void;
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
  isMobile: boolean;
  theme: Theme;
  t: (en: string, nl: string) => string;
};

export default function Header({
  sidebarOpen, setSidebarOpen, ws, workspaces, activeWS, switchWorkspace, setShowNewWS,
  session, userName, userEmail, userInitials, darkMode, setDarkMode, language, setLanguage,
  showSupport, setShowSupport, showNews, setShowNews, showLangMenu, setShowLangMenu,
  showUserMenu, setShowUserMenu, setShowNewPost, isMobile, theme, t,
}: Props) {
  const [showWSMenu, setShowWSMenu] = useState(false);

  return (
    <div style={{ background: theme.headerBg, borderBottom: `1px solid ${theme.border}`, padding: isMobile ? "0 12px" : "0 16px", display: "flex", alignItems: "center", height: isMobile ? 50 : 54, gap: isMobile ? 6 : 8, flexShrink: 0 }}>

      {/* Hamburger */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Menu size={18} color={theme.textS} />
      </button>

      {/* Workspace selector */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setShowWSMenu(v => !v)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px 4px 5px", borderRadius: 10, border: `1px solid ${showWSMenu ? BRAND.primary + "50" : theme.border}`, background: showWSMenu ? (darkMode ? "rgba(124,58,237,0.1)" : BRAND.primaryL) : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
          {ws && <Avatar initials={ws.avatar} color={ws.color} size={isMobile ? 22 : 26} />}
          <span style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: theme.text, maxWidth: isMobile ? 100 : 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ws?.name || "Workspace"}</span>
          <ChevronDown size={13} color={theme.textT} style={{ transition: "transform 0.2s", transform: showWSMenu ? "rotate(180deg)" : "rotate(0)" }} />
        </button>

        {showWSMenu && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setShowWSMenu(false)} />
            <div style={{ position: "absolute", left: 0, top: "calc(100% + 6px)", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", zIndex: 60, minWidth: 220, overflow: "hidden" }}>
              <div style={{ padding: "8px 12px 4px" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: theme.textT, letterSpacing: 1.2 }}>WORKSPACES</div>
              </div>
              <div style={{ padding: "4px 6px" }}>
                {workspaces.map(w => {
                  const isActive = w.id === activeWS;
                  return (
                    <button key={w.id} onClick={() => { switchWorkspace(w.id); setShowWSMenu(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, border: "none", background: isActive ? (darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL) : "transparent", cursor: "pointer", transition: "background 0.12s" }} onMouseEnter={ev => { if (!isActive) ev.currentTarget.style.background = theme.hoverBg; }} onMouseLeave={ev => { if (!isActive) ev.currentTarget.style.background = "transparent"; }}>
                      <Avatar initials={w.avatar} color={w.color} size={28} />
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? BRAND.primary : theme.text }}>{w.name}</div>
                        {w.industry && <div style={{ fontSize: 10, color: theme.textT }}>{w.industry}</div>}
                      </div>
                      {isActive && <Check size={15} color={BRAND.primary} />}
                    </button>
                  );
                })}
              </div>
              <div style={{ borderTop: `1px solid ${theme.border}`, padding: "6px" }}>
                <button onClick={() => { setShowNewWS(true); setShowWSMenu(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 13, color: BRAND.primary, fontWeight: 600 }} onMouseEnter={ev => (ev.currentTarget.style.background = theme.hoverBg)} onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}>
                  <Plus size={15} /> {t("New workspace", "Nieuwe workspace")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Create Post */}
      <button onClick={() => setShowNewPost(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: isMobile ? "6px 12px" : "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Plus size={14} />{!isMobile && ` ${t("Create Post", "Maak Post")}`}
        </span>
      </button>

      {/* Tool buttons — hidden on mobile */}
      {!isMobile && (
        <>
          <button onClick={() => { setShowSupport(o => !o); setShowNews(() => false); }} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showSupport ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Headphones size={17} color={showSupport ? BRAND.primary : theme.textS} />
          </button>
          <button onClick={() => { setShowNews(o => !o); setShowSupport(() => false); }} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showNews ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Newspaper size={17} color={showNews ? BRAND.primary : theme.textS} />
          </button>
        </>
      )}

      {/* Dark mode toggle */}
      <button onClick={() => setDarkMode(o => !o)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: darkMode ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {darkMode ? <Sun size={17} color={BRAND.amber} /> : <Moon size={17} color={theme.textS} />}
      </button>

      {/* Language — hidden on mobile */}
      {!isMobile && (
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowLangMenu(o => !o)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showLangMenu ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Globe size={17} color={showLangMenu ? BRAND.primary : theme.textS} />
          </button>
          {showLangMenu && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setShowLangMenu(() => false)} />
              <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.18)", overflow: "hidden", zIndex: 60, minWidth: 150 }}>
                {[{ code: "en" as const, flag: "EN", label: "English" }, { code: "nl" as const, flag: "NL", label: "Nederlands" }].map(l => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setShowLangMenu(() => false); }} style={{ width: "100%", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, background: language === l.code ? theme.tagBg : "none", border: "none", cursor: "pointer", fontSize: 13, color: language === l.code ? BRAND.primary : theme.text, fontWeight: language === l.code ? 700 : 400 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, width: 24, textAlign: "center", color: language === l.code ? BRAND.primary : theme.textT }}>{l.flag}</span>
                    {l.label}
                    {language === l.code && <Check size={14} color={BRAND.primary} style={{ marginLeft: "auto" }} />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* User menu */}
      <div style={{ position: "relative", marginLeft: 2 }}>
        <button onClick={() => setShowUserMenu(o => !o)} style={{ width: 34, height: 34, borderRadius: "50%", border: `2px solid ${showUserMenu ? BRAND.primary : theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 0, transition: "border-color 0.15s" }}>
          {session.user?.image
            ? <img src={session.user.image} style={{ width: 30, height: 30, borderRadius: "50%" }} alt="" />
            : <div style={{ width: 30, height: 30, borderRadius: "50%", background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>{userInitials}</div>
          }
        </button>
        {showUserMenu && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={() => setShowUserMenu(() => false)} />
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, boxShadow: "0 8px 30px rgba(0,0,0,0.18)", width: 220, zIndex: 60, overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                {session.user?.image
                  ? <img src={session.user.image} style={{ width: 36, height: 36, borderRadius: "50%" }} alt="" />
                  : <div style={{ width: 36, height: 36, borderRadius: "50%", background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{userInitials}</div>
                }
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{userName}</div>
                  <div style={{ fontSize: 11, color: theme.textT }}>{userEmail}</div>
                </div>
              </div>
              {[
                { icon: <Settings size={15} />, label: t("Company Settings", "Bedrijfsinstellingen") },
                { icon: <User size={15} />, label: t("User Settings", "Gebruikersinstellingen") },
                { icon: <CreditCard size={15} />, label: t("Billing", "Facturering") },
                { icon: <HelpCircle size={15} />, label: t("Help", "Hulp") },
                { icon: <Gift size={15} />, label: t("Affiliates", "Affiliates") },
              ].map(item => (
                <button key={item.label} onClick={() => setShowUserMenu(() => false)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: theme.text, textAlign: "left" }} onMouseEnter={e => (e.currentTarget.style.background = theme.hoverBg)} onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                  {item.icon}{item.label}
                </button>
              ))}
              <div style={{ borderTop: `1px solid ${theme.border}` }}>
                <button onClick={() => signOut({ callbackUrl: "/" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: BRAND.red }} onMouseEnter={e => (e.currentTarget.style.background = darkMode ? "rgba(239,68,68,0.1)" : BRAND.redL)} onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                  <LogOut size={15} color={BRAND.red} />{t("Logout", "Uitloggen")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}