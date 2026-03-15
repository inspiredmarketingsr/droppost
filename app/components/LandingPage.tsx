"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Calendar, Clock, CheckSquare, BarChart2, Users, Zap, Shield, Globe, ChevronRight, Play, Star, Menu, X, ArrowRight, Sparkles } from "lucide-react";

const C = {
  primary: "#7C3AED", primaryD: "#5B21B6", primaryL: "#EDE9FE",
  accent: "#06B6D4", accentD: "#0891B2", accentL: "#CFFAFE",
  dark: "#0F172A", darkS: "#1E293B", darkT: "#334155",
  text: "#0F172A", textS: "#475569", textT: "#94A3B8",
  border: "#E2E8F0", bg: "#FFFFFF", bgS: "#F8FAFC", bgT: "#F1F5F9",
  green: "#10B981", greenL: "#D1FAE5",
  grad: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
  gradSoft: "linear-gradient(135deg, #EDE9FE 0%, #CFFAFE 100%)",
};

const FEATURES = [
  { icon: <Calendar size={24} />, title: "Content Calendar", titleNl: "Content Kalender", desc: "Plan and visualize your content across all platforms in one beautiful calendar.", descNl: "Plan en visualiseer je content voor alle platformen in één overzichtelijke kalender." },
  { icon: <Clock size={24} />, title: "Smart Scheduling", titleNl: "Slim Inplannen", desc: "Schedule posts at the perfect time. Drag and drop to reorder your queue effortlessly.", descNl: "Plan posts op het perfecte moment. Sleep en herorden je wachtrij moeiteloos." },
  { icon: <CheckSquare size={24} />, title: "Approval Workflows", titleNl: "Goedkeuringsflow", desc: "Get client approval before anything goes live. Keep everyone in the loop, automatically.", descNl: "Krijg goedkeuring van klanten voordat iets live gaat. Houd iedereen automatisch op de hoogte." },
  { icon: <Users size={24} />, title: "Multi-Workspace", titleNl: "Multi-Workspace", desc: "Dedicated workspaces for each client with separate calendars, channels, and team access.", descNl: "Aparte werkruimtes per klant met eigen kalenders, kanalen en teamtoegang." },
  { icon: <BarChart2 size={24} />, title: "Analytics", titleNl: "Statistieken", desc: "Track post performance across platforms. See what works and optimize your strategy.", descNl: "Volg postprestaties per platform. Ontdek wat werkt en optimaliseer je strategie." },
  { icon: <Zap size={24} />, title: "AI Captions", titleNl: "AI Bijschriften", desc: "Generate engaging captions with AI. Save time while keeping your brand voice consistent.", descNl: "Genereer pakkende bijschriften met AI. Bespaar tijd en houd je merkstijl consistent." },
];

const PLATFORMS_DISPLAY = [
  { name: "YouTube", color: "#FF0000", icon: "▶" },
  { name: "Facebook", color: "#1877F2", icon: "f" },
  { name: "Instagram", color: "#E1306C", icon: "ig" },
  { name: "TikTok", color: "#010101", icon: "tt" },
  { name: "Snapchat", color: "#FFCE00", icon: "sc" },
];

const TESTIMONIALS = [
  { name: "Sarah J.", role: "Marketing Manager", text: "DropPost transformed how we manage social media for our clients. The approval workflow alone saves us hours every week.", textNl: "DropPost heeft veranderd hoe we social media beheren voor klanten. Alleen al de goedkeuringsflow bespaart ons uren per week." },
  { name: "Mark D.", role: "Agency Owner", text: "Finally a tool that understands agencies. Multi-workspace is a game changer for managing multiple clients.", textNl: "Eindelijk een tool die agencies begrijpt. Multi-workspace is een game changer voor meerdere klanten." },
  { name: "Lisa R.", role: "Content Creator", text: "The drag-and-drop queue and calendar make planning content so intuitive. I can't imagine going back.", textNl: "De sleep-en-herorden wachtrij en kalender maken contentplanning zo intuïtief. Ik kan niet meer terug." },
];

const PLANS = [
  { name: "Starter", price: "Free", pricePer: "", features: ["1 workspace", "3 social accounts", "30 scheduled posts", "Basic calendar", "Community support"], featuresNl: ["1 workspace", "3 social accounts", "30 geplande posts", "Basis kalender", "Community support"], cta: "Get Started", ctaNl: "Aan de slag", popular: false },
  { name: "Pro", price: "$19", pricePer: "/mo", features: ["5 workspaces", "15 social accounts", "Unlimited posts", "Approval workflows", "AI captions", "Priority support"], featuresNl: ["5 werkruimtes", "15 social accounts", "Onbeperkte posts", "Goedkeuringsflows", "AI bijschriften", "Prioriteit support"], cta: "Start Free Trial", ctaNl: "Start Gratis Proef", popular: true },
  { name: "Agency", price: "$49", pricePer: "/mo", features: ["Unlimited workspaces", "Unlimited accounts", "Unlimited posts", "Advanced analytics", "Team management", "White label", "Dedicated support"], featuresNl: ["Onbeperkte werkruimtes", "Onbeperkte accounts", "Onbeperkte posts", "Geavanceerde analytics", "Teambeheer", "White label", "Dedicated support"], cta: "Start Free Trial", ctaNl: "Start Gratis Proef", popular: false },
];

export default function LandingPage() {
  const [lang, setLang] = useState<"en" | "nl">("en");
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = (en: string, nl: string) => lang === "nl" ? nl : en;

  const navLinks = [
    { label: t("Features", "Functies"), href: "#features" },
    { label: t("Platforms", "Platformen"), href: "#platforms" },
    { label: t("Pricing", "Prijzen"), href: "#pricing" },
    { label: t("Testimonials", "Reviews"), href: "#testimonials" },
  ];

  const btn = (primary: boolean, size: "sm" | "md" | "lg" = "md") => ({
    background: primary ? C.grad : "transparent",
    color: primary ? "#fff" : C.text,
    border: primary ? "none" : `1.5px solid ${C.border}`,
    borderRadius: size === "lg" ? 14 : 10,
    padding: size === "lg" ? "16px 36px" : size === "md" ? "11px 24px" : "8px 18px",
    fontSize: size === "lg" ? 16 : size === "md" ? 14 : 13,
    fontWeight: 700 as const,
    cursor: "pointer" as const,
    fontFamily: "inherit",
    transition: "all 0.2s",
  });

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: C.text, background: C.bg, minHeight: "100vh" }}>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 48 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 17 }}>D</span></div>
            <span style={{ fontWeight: 800, fontSize: 18, color: C.dark }}>Drop<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
          </div>
          <div style={{ display: "flex", gap: 32, flex: 1 }} className="nav-links-desktop">
            {navLinks.map(l => <a key={l.href} href={l.href} style={{ fontSize: 14, color: C.textS, textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>{l.label}</a>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setLang(l => l === "en" ? "nl" : "en")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: C.textS, fontWeight: 600 }}>{lang === "en" ? "🇳🇱 NL" : "🇬🇧 EN"}</button>
            <button onClick={() => signIn("google")} style={btn(false, "sm")}>{t("Log in", "Inloggen")}</button>
            <button onClick={() => signIn("google")} style={btn(true, "sm")}>{t("Get Started Free", "Gratis Starten")}</button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: C.gradSoft, opacity: 0.5 }} />
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 60px", position: "relative", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 100, padding: "6px 16px 6px 8px", marginBottom: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <Sparkles size={16} color={C.primary} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.textS }}>{t("Now with AI-powered captions", "Nu met AI-aangedreven bijschriften")}</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: C.dark, letterSpacing: "-0.02em" }}>
            {t("Schedule, approve &", "Plan, keur goed &")}<br />
            <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("publish with ease", "publiceer met gemak")}</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: C.textS, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
            {t("The all-in-one social media management tool for agencies and teams. Plan content, get approvals, and publish across all platforms — from one dashboard.", "De alles-in-één social media tool voor agencies en teams. Plan content, krijg goedkeuringen en publiceer op alle platformen — vanuit één dashboard.")}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={() => signIn("google")} style={btn(true, "lg")}>
              {t("Start Free — No Credit Card", "Gratis Starten — Geen Creditcard")} <ArrowRight size={18} style={{ marginLeft: 8, verticalAlign: "middle" }} />
            </button>
            <button style={btn(false, "lg")}>
              <Play size={16} style={{ marginRight: 8, verticalAlign: "middle" }} fill={C.primary} color={C.primary} />{t("Watch Demo", "Bekijk Demo")}
            </button>
          </div>

          {/* MOCK APP PREVIEW */}
          <div style={{ maxWidth: 900, margin: "0 auto", borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.08)", background: C.bg }}>
            <div style={{ background: C.dark, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} /><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} /><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} /></div>
              <div style={{ flex: 1, textAlign: "center" }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>droppost.app</span></div>
            </div>
            <div style={{ display: "flex", minHeight: 340 }}>
              {/* Mini sidebar */}
              <div style={{ width: 56, background: "#13131F", padding: "16px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>D</span></div>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.5)" }} />
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.05)" }} />
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.05)" }} />
              </div>
              {/* Mini content */}
              <div style={{ flex: 1, background: C.bgS, padding: 20 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  {[{ label: "12", sub: "Scheduled", color: C.primary }, { label: "8", sub: "Published", color: C.green }, { label: "3", sub: "Pending", color: "#F59E0B" }].map(s => (
                    <div key={s.sub} style={{ flex: 1, background: C.bg, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: C.textT, fontWeight: 600 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
                {/* Mini calendar grid */}
                <div style={{ background: C.bg, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${C.border}` }}>
                    {["M","T","W","T","F","S","S"].map((d, i) => <div key={i} style={{ padding: "8px 0", textAlign: "center", fontSize: 10, fontWeight: 700, color: C.textT }}>{d}</div>)}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
                    {Array.from({ length: 14 }, (_, i) => (
                      <div key={i} style={{ padding: "6px 4px", minHeight: 36, borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 10, color: C.textT, textAlign: "right" }}>{i + 1}</div>
                        {[3,5,8,11].includes(i) && <div style={{ width: "80%", height: 4, borderRadius: 2, background: C.primary, opacity: 0.3, marginTop: 2 }} />}
                        {[1,7,12].includes(i) && <div style={{ width: "60%", height: 4, borderRadius: 2, background: C.green, opacity: 0.3, marginTop: 2 }} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 32, flexWrap: "wrap" }}>
            {[t("No credit card required", "Geen creditcard nodig"), t("Free plan available", "Gratis plan beschikbaar"), t("Cancel anytime", "Opzegbaar wanneer je wilt")].map(s => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textS }}>
                <Shield size={14} color={C.green} />{s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLATFORMS ═══ */}
      <section id="platforms" style={{ padding: "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("PLATFORMS", "PLATFORMEN")}</p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, marginBottom: 16, color: C.dark }}>{t("All your channels, one dashboard", "Al je kanalen, één dashboard")}</h2>
          <p style={{ fontSize: 16, color: C.textS, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>{t("Connect and manage all major social platforms from a single place.", "Verbind en beheer alle grote social platformen vanuit één plek.")}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {PLATFORMS_DISPLAY.map(p => (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 72, height: 72, borderRadius: 20, background: p.color + "12", border: `2px solid ${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: p.color, fontWeight: 800, transition: "transform 0.2s" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>{p.icon}</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: "80px 24px", background: C.bgS }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("FEATURES", "FUNCTIES")}</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, marginBottom: 16, color: C.dark }}>{t("Everything you need to scale", "Alles wat je nodig hebt om te groeien")}</h2>
            <p style={{ fontSize: 16, color: C.textS, maxWidth: 540, margin: "0 auto" }}>{t("From scheduling to analytics — DropPost has every tool your agency needs.", "Van inplannen tot analytics — DropPost heeft elke tool die je agency nodig heeft.")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: C.bg, borderRadius: 16, padding: "28px 24px", border: `1px solid ${C.border}`, transition: "box-shadow 0.2s, transform 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,58,237,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: C.gradSoft, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: C.dark }}>{lang === "nl" ? f.titleNl : f.title}</h3>
                <p style={{ fontSize: 14, color: C.textS, lineHeight: 1.7, margin: 0 }}>{lang === "nl" ? f.descNl : f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("HOW IT WORKS", "HOE HET WERKT")}</p>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, marginBottom: 56, color: C.dark }}>{t("Three steps to social media success", "Drie stappen naar social media succes")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { step: "1", title: t("Create & Schedule", "Maak & Plan"), desc: t("Write your post, pick your platforms, upload media, and schedule it — all in one place.", "Schrijf je post, kies je platformen, upload media en plan het in — allemaal op één plek.") },
              { step: "2", title: t("Review & Approve", "Review & Keur goed"), desc: t("Send posts for approval. Clients and team members review and approve with one click.", "Stuur posts ter goedkeuring. Klanten en teamleden reviewen en keuren goed met één klik.") },
              { step: "3", title: t("Publish & Analyze", "Publiceer & Analyseer"), desc: t("Approved posts publish automatically. Track performance and optimize your strategy.", "Goedgekeurde posts worden automatisch gepubliceerd. Volg prestaties en optimaliseer je strategie.") },
            ].map(s => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22, fontWeight: 900, color: "#fff" }}>{s.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: C.dark }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: C.textS, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" style={{ padding: "80px 24px", background: C.bgS }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("TESTIMONIALS", "REVIEWS")}</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: C.dark }}>{t("Loved by agencies worldwide", "Geliefd bij agencies wereldwijd")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((tm, i) => (
              <div key={i} style={{ background: C.bg, borderRadius: 16, padding: "28px 24px", border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#F59E0B" color="#F59E0B" />)}</div>
                <p style={{ fontSize: 14, color: C.textS, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{lang === "nl" ? tm.textNl : tm.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.gradSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: C.primary }}>{tm.name[0]}</div>
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{tm.name}</div><div style={{ fontSize: 12, color: C.textT }}>{tm.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("PRICING", "PRIJZEN")}</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, marginBottom: 12, color: C.dark }}>{t("Simple, transparent pricing", "Eenvoudige, transparante prijzen")}</h2>
            <p style={{ fontSize: 16, color: C.textS }}>{t("Start free. Upgrade when you're ready.", "Start gratis. Upgrade wanneer je klaar bent.")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 960, margin: "0 auto" }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{ background: C.bg, borderRadius: 20, padding: "32px 28px", border: plan.popular ? `2px solid ${C.primary}` : `1px solid ${C.border}`, position: "relative", boxShadow: plan.popular ? "0 8px 30px rgba(124,58,237,0.12)" : "none" }}>
                {plan.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.grad, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 16px", borderRadius: 100 }}>{t("Most Popular", "Populairst")}</div>}
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: C.dark }}>{plan.name}</h3>
                <div style={{ marginBottom: 20 }}><span style={{ fontSize: 40, fontWeight: 900, color: C.dark }}>{plan.price}</span>{plan.pricePer && <span style={{ fontSize: 16, color: C.textT }}>{plan.pricePer}</span>}</div>
                <div style={{ marginBottom: 24 }}>
                  {(lang === "nl" ? plan.featuresNl : plan.features).map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.greenL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: C.green, fontSize: 12, fontWeight: 800 }}>✓</span></div>
                      <span style={{ fontSize: 14, color: C.textS }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => signIn("google")} style={{ ...btn(plan.popular, "md"), width: "100%", textAlign: "center" as const }}>{lang === "nl" ? plan.ctaNl : plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "80px 24px", background: C.dark }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>{t("Ready to streamline your social media?", "Klaar om je social media te stroomlijnen?")}</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", marginBottom: 32, lineHeight: 1.7 }}>{t("Join thousands of agencies and teams using DropPost to save time and grow their presence.", "Sluit je aan bij duizenden agencies en teams die DropPost gebruiken om tijd te besparen.")}</p>
          <button onClick={() => signIn("google")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 17, fontWeight: 700, cursor: "pointer" }}>
            {t("Get Started Free", "Gratis Starten")} <ArrowRight size={18} style={{ marginLeft: 8, verticalAlign: "middle" }} />
          </button>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 24px", background: C.bgS }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>D</span></div>
            <span style={{ fontWeight: 800, fontSize: 15, color: C.dark }}>Drop<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <a href="/privacy" style={{ fontSize: 13, color: C.textT, textDecoration: "none" }}>{t("Privacy", "Privacy")}</a>
            <a href="/terms" style={{ fontSize: 13, color: C.textT, textDecoration: "none" }}>{t("Terms", "Voorwaarden")}</a>
            <a href="mailto:inspiredmarketingsr@gmail.com" style={{ fontSize: 13, color: C.textT, textDecoration: "none" }}>{t("Contact", "Contact")}</a>
          </div>
          <span style={{ fontSize: 12, color: C.textT }}>© 2026 Inspired Marketing Agency · Paramaribo, Suriname</span>
        </div>
      </footer>
    </div>
  );
}