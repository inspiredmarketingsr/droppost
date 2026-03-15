"use client";
import { BRAND, Theme } from "./ui";

type PanelProps = { theme: Theme; darkMode: boolean; t: (en: string, nl: string) => string; onClose: () => void };

export function SupportPanel({ theme, darkMode, t, onClose }: PanelProps) {
  return (
    <div style={{ position: "fixed", right: 0, top: 58, width: 360, height: "calc(100vh - 58px)", background: theme.card, borderLeft: `1px solid ${theme.border}`, boxShadow: "-4px 0 20px rgba(0,0,0,0.12)", zIndex: 200, overflowY: "auto" }}>
      <div style={{ padding: "20px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ fontSize: 16, fontWeight: 800, color: theme.text }}>🎧 {t("Support", "Ondersteuning")}</div><button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: theme.textT }}>✕</button></div>
      <div style={{ padding: "16px" }}>
        <div style={{ background: darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL, borderRadius: 12, padding: "14px", marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 700, color: BRAND.primary, marginBottom: 4 }}>📧 {t("Contact us", "Neem contact op")}</div><div style={{ fontSize: 12, color: theme.textS }}>inspiredmarketingsr@gmail.com</div></div>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 12 }}>FAQ</div>
        {[{ q: t("How do I create a post?", "Hoe maak ik een post?"), a: t("Click '+ Create Post' in the top bar.", "Klik op '+ Maak Post' bovenaan.") }, { q: t("How do I connect YouTube?", "Hoe koppel ik YouTube?"), a: t("Go to Settings → Connected accounts.", "Ga naar Instellingen → Gekoppelde accounts.") }, { q: t("How does approval work?", "Hoe werkt goedkeuring?"), a: t("Go to 'Approval' to review posts.", "Ga naar 'Goedkeuring' om posts te beoordelen.") }].map((faq, i) => (
          <div key={i} style={{ background: theme.codeBg, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}><div style={{ fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 6 }}>❓ {faq.q}</div><div style={{ fontSize: 12, color: theme.textS, lineHeight: 1.6 }}>{faq.a}</div></div>
        ))}
      </div>
    </div>
  );
}

export function NewsPanel({ theme, darkMode, t, onClose }: PanelProps) {
  return (
    <div style={{ position: "fixed", right: 0, top: 58, width: 360, height: "calc(100vh - 58px)", background: theme.card, borderLeft: `1px solid ${theme.border}`, boxShadow: "-4px 0 20px rgba(0,0,0,0.12)", zIndex: 200, overflowY: "auto" }}>
      <div style={{ padding: "20px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ fontSize: 16, fontWeight: 800, color: theme.text }}>📰 {t("What's New", "Wat is er nieuw")}</div><button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: theme.textT }}>✕</button></div>
      <div style={{ padding: "16px" }}>
        {[{ date: "March 15, 2026", title: t("Landing page live", "Landing page live"), desc: t("Professional landing page on droppost.app", "Professionele landing page op droppost.app"), tag: "🆕 New" }, { date: "March 15, 2026", title: t("YouTube channel picker", "YouTube kanaal kiezer"), desc: t("Choose which YouTube channel to publish to", "Kies welk YouTube kanaal je wilt gebruiken"), tag: "🆕 New" }, { date: "March 14, 2026", title: t("Dark mode", "Donkere modus"), desc: t("Toggle dark mode from the top bar", "Schakel donkere modus in"), tag: "🌙 New" }, { date: "March 12, 2026", title: t("DropPost launched!", "DropPost gelanceerd!"), desc: t("The first version is live!", "De eerste versie is live!"), tag: "🚀 Launch" }].map((item, i) => (
          <div key={i} style={{ borderLeft: `3px solid ${BRAND.primary}`, paddingLeft: 14, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontSize: 11, background: theme.tagBg, color: BRAND.primary, borderRadius: 5, padding: "2px 8px", fontWeight: 700 }}>{item.tag}</span><span style={{ fontSize: 11, color: theme.textT }}>{item.date}</span></div>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: theme.textS, lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}