"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Calendar, Clock, CheckSquare, BarChart2, Users, Zap, Shield, Globe, ChevronRight, Play, Star, Menu, X, ArrowRight, Sparkles, PenLine } from "lucide-react";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok, FaSnapchat, FaXTwitter } from "react-icons/fa6";

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
  { name: "Sarah J.", role: "Marketing Manager", badge: "Agency", badgeColor: "#7C3AED", text: "DropPost transformed how we manage social media for our clients. The approval workflow alone saves us hours every week.", textNl: "DropPost heeft veranderd hoe we social media beheren voor klanten. Alleen al de goedkeuringsflow bespaart ons uren per week." },
  { name: "Mark D.", role: "Agency Owner", badge: "Agency", badgeColor: "#7C3AED", text: "Finally a tool that understands agencies. Multi-workspace is a game changer for managing multiple clients.", textNl: "Eindelijk een tool die agencies begrijpt. Multi-workspace is een game changer voor meerdere klanten." },
  { name: "Lisa R.", role: "Content Creator", badge: "Creator", badgeColor: "#E1306C", text: "The drag-and-drop queue and calendar make planning content so intuitive. I can't imagine going back.", textNl: "De sleep-en-herorden wachtrij en kalender maken contentplanning zo intuïtief. Ik kan niet meer terug." },
  { name: "James K.", role: "Brand Manager", badge: "Brand", badgeColor: "#06B6D4", text: "We manage 5 brands from one dashboard. The scheduling and approval flow keeps our content on-brand and on-time.", textNl: "We beheren 5 merken vanuit één dashboard. De planning en goedkeuringsflow houdt onze content on-brand en op tijd." },
  { name: "Priya S.", role: "Lifestyle Influencer", badge: "Influencer", badgeColor: "#F59E0B", text: "As an influencer managing multiple platforms, DropPost keeps everything organized. The AI captions feature is incredible.", textNl: "Als influencer die meerdere platformen beheert, houdt DropPost alles georganiseerd. De AI bijschriften zijn geweldig." },
  { name: "Tom W.", role: "Social Media Lead", badge: "Team", badgeColor: "#10B981", text: "Our team of 8 collaborates seamlessly. The approval system ensures nothing goes live without proper review.", textNl: "Ons team van 8 werkt naadloos samen. Het goedkeuringssysteem zorgt dat niets live gaat zonder review." },
  { name: "Ana M.", role: "YouTube Creator", badge: "Creator", badgeColor: "#E1306C", text: "Publishing to YouTube directly from DropPost with the channel picker is so smooth. Huge time saver for my workflow.", textNl: "Direct naar YouTube publiceren vanuit DropPost met de kanaalkiezer is zo soepel. Enorme tijdsbesparing." },
  { name: "David L.", role: "CMO", badge: "Brand", badgeColor: "#06B6D4", text: "The analytics give us clear insights into what content performs best. We increased engagement by 40% in just 3 months.", textNl: "De analytics geven ons helder inzicht in welke content het beste presteert. We verhoogden engagement met 40% in 3 maanden." },
  { name: "Nina F.", role: "Freelance Designer", badge: "Creator", badgeColor: "#E1306C", text: "I schedule all my portfolio posts across platforms in minutes. Dark mode is a nice touch for late-night planning sessions.", textNl: "Ik plan al mijn portfolio posts op alle platformen in minuten. Dark mode is fijn voor late avond sessies." },
  { name: "Carlos R.", role: "Digital Agency CEO", badge: "Agency", badgeColor: "#7C3AED", text: "We switched from Buffer to DropPost. The client approval workflow and multi-workspace setup is exactly what we needed.", textNl: "We zijn van Buffer naar DropPost overgestapt. De klant goedkeuringsflow en multi-workspace is precies wat we nodig hadden." },
  { name: "Emma T.", role: "Travel Influencer", badge: "Influencer", badgeColor: "#F59E0B", text: "I post across 5 platforms daily. DropPost lets me batch everything in one session and forget about it. Absolute lifesaver.", textNl: "Ik post dagelijks op 5 platformen. DropPost laat me alles in één sessie batchen. Absolute levensredder." },
  { name: "Ryan P.", role: "Marketing Team Lead", badge: "Team", badgeColor: "#10B981", text: "The queue system with drag-and-drop reordering makes it so easy for our team to prioritize content on the fly.", textNl: "Het wachtrijsysteem met drag-and-drop maakt het zo makkelijk voor ons team om content te prioriteren." },
];

const PLANS = [
  { name: "Starter", price: "Free", pricePer: "", features: ["1 workspace", "3 social accounts", "30 scheduled posts", "Basic calendar", "Community support"], featuresNl: ["1 workspace", "3 social accounts", "30 geplande posts", "Basis kalender", "Community support"], cta: "Get Started", ctaNl: "Aan de slag", popular: false },
  { name: "Pro", price: "$19", pricePer: "/mo", features: ["5 workspaces", "15 social accounts", "Unlimited posts", "Approval workflows", "AI captions", "Priority support"], featuresNl: ["5 werkruimtes", "15 social accounts", "Onbeperkte posts", "Goedkeuringsflows", "AI bijschriften", "Prioriteit support"], cta: "Start Free Trial", ctaNl: "Start Gratis Proef", popular: true },
  { name: "Agency", price: "$49", pricePer: "/mo", features: ["Unlimited workspaces", "Unlimited accounts", "Unlimited posts", "Advanced analytics", "Team management", "White label", "Dedicated support"], featuresNl: ["Onbeperkte werkruimtes", "Onbeperkte accounts", "Onbeperkte posts", "Geavanceerde analytics", "Teambeheer", "White label", "Dedicated support"], cta: "Start Free Trial", ctaNl: "Start Gratis Proef", popular: false },
];

export default function LandingPage() {
  const [lang, setLang] = useState<"en" | "nl">("en");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const t = (en: string, nl: string) => lang === "nl" ? nl : en;

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const roles = [
    t("creators", "creators"),
    t("influencers", "influencers"),
    t("agencies", "agencies"),
    t("teams", "teams"),
    t("brands", "merken"),
  ];

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { label: t("Features", "Functies"), id: "features" },
    { label: t("Platforms", "Platformen"), id: "platforms" },
    { label: t("Pricing", "Prijzen"), id: "pricing" },
    { label: t("Testimonials", "Reviews"), id: "testimonials" },
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
            {navLinks.map(l => <button key={l.id} onClick={() => scrollTo(l.id)} style={{ fontSize: 14, color: C.textS, textDecoration: "none", fontWeight: 500, transition: "color 0.2s", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>{l.label}</button>)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setLang(l => l === "en" ? "nl" : "en")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: C.textS, fontWeight: 600 }}>{lang === "en" ? "🇳🇱 NL" : "🇬🇧 EN"}</button>
            <button onClick={() => signIn("google")} style={btn(false, "sm")}>{t("Log in", "Inloggen")}</button>
            <button onClick={() => signIn("google")} style={btn(true, "sm")}>{t("Get Started Free", "Gratis Starten")}</button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", alignItems: "center" }}>
        {/* Animated gradient background */}
        <div style={{ position: "absolute", inset: 0, background: C.gradSoft, opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {/* Floating gradient orbs */}
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", animation: "orbFloat1 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)", animation: "orbFloat2 10s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "40%", left: "60%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", animation: "orbFloat3 12s ease-in-out infinite" }} />

          {/* Floating platform icons */}
          {[
            { icon: <FaYoutube size={20} />, color: "#FF0000", x: "6%", y: "25%", delay: "0s", dur: "6s" },
            { icon: <FaFacebookF size={18} />, color: "#1877F2", x: "88%", y: "22%", delay: "1s", dur: "7s" },
            { icon: <FaInstagram size={20} />, color: "#E1306C", x: "12%", y: "50%", delay: "0.5s", dur: "8s" },
            { icon: <FaTiktok size={18} />, color: "#010101", x: "82%", y: "52%", delay: "1.5s", dur: "6.5s" },
            { icon: <FaSnapchat size={18} />, color: "#FFCE00", x: "18%", y: "12%", delay: "2s", dur: "7.5s" },
            { icon: <FaXTwitter size={16} />, color: "#000", x: "76%", y: "10%", delay: "0.8s", dur: "9s" },
          ].map((p, i) => (
            <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 48, height: 48, borderRadius: "50%", background: `${C.bg}ee`, border: `2px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, boxShadow: `0 4px 20px ${p.color}15`, animation: `heroFloat ${p.dur} ease-in-out ${p.delay} infinite`, opacity: 0.85 }}>
              {p.icon}
            </div>
          ))}

          {/* Animated particles */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={`p${i}`} style={{ position: "absolute", left: `${5 + (i * 4.7) % 90}%`, top: `${10 + (i * 7.3) % 80}%`, width: i % 3 === 0 ? 6 : 4, height: i % 3 === 0 ? 6 : 4, borderRadius: "50%", background: i % 2 === 0 ? C.primary : C.accent, opacity: 0.15, animation: `particle ${5 + (i % 4) * 2}s ease-in-out ${i * 0.3}s infinite` }} />
          ))}

          {/* Grid pattern overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${C.primary}08 1px, transparent 1px)`, backgroundSize: "32px 32px", opacity: 0.5 }} />
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px 60px", position: "relative", textAlign: "center", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.bg}dd`, border: `1px solid ${C.border}`, borderRadius: 100, padding: "6px 16px 6px 8px", marginBottom: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", backdropFilter: "blur(8px)", animation: "fadeInDown 0.8s ease-out" }}>
            <Sparkles size={16} color={C.primary} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.textS }}>{t("Now with AI-powered captions", "Nu met AI-aangedreven bijschriften")}</span>
          </div>

          <h1 style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, color: C.dark, letterSpacing: "-0.03em", animation: "fadeInUp 0.8s ease-out 0.2s both" }}>
            {t("Schedule, approve &", "Plan, keur goed &")}<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 4s ease-in-out infinite" }}>{t("publish with ease", "publiceer met gemak")}</span>
              {/* Animated underline */}
              <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 12, overflow: "visible" }} viewBox="0 0 400 12">
                <path d="M 0 8 Q 100 0, 200 8 Q 300 16, 400 8" fill="none" stroke="url(#heroUnderline)" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 500, strokeDashoffset: 500, animation: "drawLine 1.5s ease-out 1s forwards" }} />
                <defs><linearGradient id="heroUnderline" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs>
              </svg>
            </span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: C.textS, maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.7, animation: "fadeInUp 0.8s ease-out 0.4s both" }}>
            {t("The all-in-one social media management tool for ", "De alles-in-één social media tool voor ")}
            <span style={{ position: "relative", display: "inline-block", width: lang === "nl" ? 130 : 120, textAlign: "left" }}>
              <span key={roleIndex} style={{ position: "absolute", left: 0, top: 0, background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800, animation: "roleIn 0.5s ease-out forwards", whiteSpace: "nowrap" }}>{roles[roleIndex]}</span>
              {/* Invisible placeholder for width */}
              <span style={{ visibility: "hidden", fontWeight: 800 }}>{roles[roleIndex]}</span>
            </span>
            {t(". Plan content, get approvals, and publish across all platforms — from one dashboard.", ". Plan content, krijg goedkeuringen en publiceer op alle platformen — vanuit één dashboard.")}
          </p>

          <div style={{ display: "inline-flex", gap: 14, justifyContent: "center", marginBottom: 52, animation: "fadeInUp 0.8s ease-out 0.6s both" }}>
            <button onClick={() => signIn("google")} style={{ ...btn(true, "lg"), transition: "all 0.3s", boxShadow: "0 4px 20px rgba(124,58,237,0.25)", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.35)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.25)"; }}>
              {t("Start Free — No Credit Card", "Gratis Starten — Geen Creditcard")} <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
            <button style={{ ...btn(false, "lg"), transition: "all 0.3s", backdropFilter: "blur(8px)", background: `${C.bg}cc`, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = C.primary; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; }}>
              <Play size={16} style={{ marginRight: 8 }} fill={C.primary} color={C.primary} />{t("Watch Demo", "Bekijk Demo")}
            </button>
          </div>

          {/* APP PREVIEW - Real screenshot */}
          <div style={{ maxWidth: 900, margin: "0 auto", borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(124,58,237,0.05)", background: C.bg, animation: "fadeInUp 1s ease-out 0.8s both", position: "relative" }}>
            {/* Glow effect on top */}
            <div style={{ position: "absolute", top: -1, left: "10%", right: "10%", height: 2, background: C.grad, borderRadius: 2 }} />
            <div style={{ background: C.dark, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} /><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} /><div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} /></div>
              <div style={{ flex: 1, textAlign: "center" }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>droppost.app</span></div>
            </div>
            <img src="/images/dashboard-preview.png" alt="DropPost Dashboard" style={{ width: "100%", display: "block" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 32, flexWrap: "wrap", animation: "fadeInUp 0.8s ease-out 1.8s both" }}>
            {[t("No credit card required", "Geen creditcard nodig"), t("Free plan available", "Gratis plan beschikbaar"), t("Cancel anytime", "Opzegbaar wanneer je wilt")].map(s => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.textS }}>
                <Shield size={14} color={C.green} />{s}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes orbFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,20px) scale(1.05); } }
          @keyframes orbFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(25px,-30px) scale(1.08); } }
          @keyframes orbFloat3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,15px); } }
          @keyframes heroFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-12px) rotate(3deg); } 75% { transform: translateY(8px) rotate(-2deg); } }
          @keyframes particle { 0%,100% { transform: translateY(0) scale(1); opacity: 0.15; } 50% { transform: translateY(-20px) scale(1.5); opacity: 0.3; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes drawLine { to { stroke-dashoffset: 0; } }
          @keyframes gradientShift { 0%,100% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(15deg); } }
          @keyframes roleIn { 0% { opacity: 0; transform: scale(0.6); filter: blur(4px); } 50% { transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); filter: blur(0); } }
        `}</style>
      </section>

      {/* ═══ INTEGRATIONS ═══ */}
      <section id="platforms" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #F8FAFC 0%, #EDE9FE22 40%, #CFFAFE18 70%, #F8FAFC 100%)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", justifyContent: "center" }}>

          {/* LEFT: Visual hub */}
          <div style={{ position: "relative", width: 440, height: 440, flexShrink: 0 }}>
            {/* Connection lines via SVG */}
            <svg width="440" height="440" viewBox="0 0 440 440" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" /><stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" /></linearGradient>
                <linearGradient id="lineGrad2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" /><stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" /></linearGradient>
              </defs>
              {/* Orbital rings */}
              <circle cx="220" cy="220" r="140" fill="none" stroke="url(#lineGrad1)" strokeWidth="1" strokeDasharray="8 6" />
              <circle cx="220" cy="220" r="195" fill="none" stroke="url(#lineGrad2)" strokeWidth="1" strokeDasharray="4 8" />
              {/* Lines from center to icons */}
              {[
                { x: 103, y: 53 },   // YouTube (75+28, 25+28)
                { x: 341, y: 81 },   // Facebook (315+26, 55+26)
                { x: 57, y: 222 },   // Instagram (30+27, 195+27)
                { x: 370, y: 260 },  // TikTok (345+25, 235+25)
                { x: 140, y: 390 },  // Snapchat (115+25, 365+25)
                { x: 329, y: 389 },  // X (305+24, 365+24)
              ].map((p, i) => (
                <line key={i} x1="220" y1="220" x2={p.x} y2={p.y} stroke="url(#lineGrad1)" strokeWidth="1.5" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                </line>
              ))}
              {/* Glow behind center */}
              <circle cx="220" cy="220" r="60" fill="url(#lineGrad1)" opacity="0.08" />
            </svg>

            {/* CENTER: DropPost logo */}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: 22, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(124,58,237,0.3)", zIndex: 2 }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 32 }}>D</span>
            </div>

            {/* Platform icons positioned around */}
            {[
              { name: "YouTube", color: "#FF0000", icon: <FaYoutube size={24} />, x: 75, y: 25, size: 56 },
              { name: "Facebook", color: "#1877F2", icon: <FaFacebookF size={22} />, x: 315, y: 55, size: 52 },
              { name: "Instagram", color: "#E1306C", icon: <FaInstagram size={24} />, x: 30, y: 195, size: 54 },
              { name: "TikTok", color: "#010101", icon: <FaTiktok size={22} />, x: 345, y: 235, size: 50 },
              { name: "Snapchat", color: "#FFCE00", icon: <FaSnapchat size={24} />, x: 115, y: 365, size: 50 },
              { name: "X", color: "#000000", icon: <FaXTwitter size={20} />, x: 305, y: 365, size: 48 },
            ].map((p, i) => (
              <div key={p.name} style={{ position: "absolute", left: p.x, top: p.y, width: p.size, height: p.size, borderRadius: "50%", background: C.bg, border: `2.5px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, boxShadow: `0 4px 16px ${p.color}15`, zIndex: 2, transition: "transform 0.3s, box-shadow 0.3s", cursor: "default", animation: `floatIcon${i} ${4 + i * 0.7}s ease-in-out infinite` }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.boxShadow = `0 6px 24px ${p.color}30`; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 4px 16px ${p.color}15`; }}>
                {p.icon}
              </div>
            ))}

            <style>{`
              @keyframes floatIcon0 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
              @keyframes floatIcon1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
              @keyframes floatIcon2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
              @keyframes floatIcon3 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
              @keyframes floatIcon4 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
              @keyframes floatIcon5 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
            `}</style>
          </div>

          {/* RIGHT: Text */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 480 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("INTEGRATIONS", "INTEGRATIES")}</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 20, color: C.dark }}>
              {t("Integrations that work with ", "Integraties die werken met ")}
              <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("your social media", "jouw social media")}</span>
            </h2>
            <p style={{ fontSize: 16, color: C.textS, lineHeight: 1.8, marginBottom: 32 }}>
              {t("Our integrations allow you to automate your social media posts and schedule your content across all platforms from one centralized dashboard. Streamline your workflow and save valuable time.", "Onze integraties stellen je in staat om je social media posts te automatiseren en je content in te plannen op alle platformen vanuit één centraal dashboard. Stroomlijn je workflow en bespaar waardevolle tijd.")}
            </p>
            <button onClick={() => signIn("google")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5, transition: "transform 0.2s, box-shadow 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.3)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              {t("START YOUR FREE TRIAL NOW!", "START JE GRATIS PROEF NU!")}
            </button>
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
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("HOW IT WORKS", "HOE HET WERKT")}</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: C.dark }}>{t("From idea to published in 3 steps", "Van idee tot gepubliceerd in 3 stappen")}</h2>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
            {/* Connecting line behind the cards */}
            <div style={{ position: "absolute", top: 34, left: "16.66%", right: "16.66%", height: 3, background: C.gradSoft, zIndex: 0, borderRadius: 2 }} />

            {/* Arrows on the line */}
            <div style={{ position: "absolute", top: 22, left: "calc(33.33% - 14px)", zIndex: 3 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.bg, border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={14} color={C.primary} /></div>
            </div>
            <div style={{ position: "absolute", top: 22, left: "calc(66.66% - 14px)", zIndex: 3 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.bg, border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}><ArrowRight size={14} color={C.primary} /></div>
            </div>

            {[
              { step: "1", icon: <PenLine size={22} />, title: t("Create & Schedule", "Maak & Plan"), desc: t("Write your post, pick platforms, upload media, set date & time — all from one beautiful editor.", "Schrijf je post, kies platformen, upload media, stel datum & tijd in — vanuit één mooie editor."), color: C.primary },
              { step: "2", icon: <CheckSquare size={22} />, title: t("Review & Approve", "Review & Keur goed"), desc: t("Send posts for approval with one click. Clients and team members review, comment, and approve instantly.", "Stuur posts ter goedkeuring met één klik. Klanten en teamleden reviewen, reageren en keuren direct goed."), color: C.accent },
              { step: "3", icon: <Zap size={22} />, title: t("Publish & Grow", "Publiceer & Groei"), desc: t("Approved posts publish automatically across all platforms. Track performance and optimize your strategy.", "Goedgekeurde posts worden automatisch gepubliceerd. Volg prestaties en optimaliseer je strategie."), color: C.green },
            ].map((s) => (
              <div key={s.step} style={{ flex: "1 1 0%", textAlign: "center", position: "relative", zIndex: 1, padding: "0 12px" }}>
                {/* Step number + icon circle */}
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.bg, border: `3px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", position: "relative" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
                  <div style={{ position: "absolute", top: -6, right: -6, width: 26, height: 26, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", boxShadow: `0 2px 8px ${s.color}40` }}>{s.step}</div>
                </div>

                {/* Card */}
                <div style={{ background: C.bgS, borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.border}`, minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "flex-start", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 30px ${s.color}12`; e.currentTarget.style.borderColor = `${s.color}30`; e.currentTarget.style.transform = "translateY(-4px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: C.dark }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: C.textS, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" style={{ padding: "80px 0", background: C.bgS, overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 12 }}>{t("TESTIMONIALS", "REVIEWS")}</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: C.dark, marginBottom: 12 }}>{t("Loved by creators, brands & agencies", "Geliefd bij creators, merken & agencies")}</h2>
            <p style={{ fontSize: 16, color: C.textS }}>{t("See what our users have to say", "Bekijk wat onze gebruikers zeggen")}</p>
          </div>
        </div>

        {/* Row 1 - scrolls left */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 20, animation: "marqueeLeft 78s linear infinite", width: "max-content" }}>
            {[...TESTIMONIALS.slice(0, 6), ...TESTIMONIALS.slice(0, 6)].map((tm, i) => (
              <div key={i} style={{ width: 380, flexShrink: 0, background: C.bg, borderRadius: 16, padding: "24px 22px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "box-shadow 0.3s, transform 0.3s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,58,237,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 3 }}>{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />)}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: tm.badgeColor, background: tm.badgeColor + "12", padding: "3px 10px", borderRadius: 100, border: `1px solid ${tm.badgeColor}20` }}>{tm.badge}</span>
                </div>
                <p style={{ fontSize: 13, color: C.textS, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic", flex: 1 }}>"{lang === "nl" ? tm.textNl : tm.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${tm.badgeColor}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: tm.badgeColor }}>{tm.name[0]}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{tm.name}</div><div style={{ fontSize: 11, color: C.textT }}>{tm.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls right */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", gap: 20, animation: "marqueeRight 85s linear infinite", width: "max-content" }}>
            {[...TESTIMONIALS.slice(6, 12), ...TESTIMONIALS.slice(6, 12)].map((tm, i) => (
              <div key={i} style={{ width: 380, flexShrink: 0, background: C.bg, borderRadius: 16, padding: "24px 22px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "box-shadow 0.3s, transform 0.3s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,58,237,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 3 }}>{[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />)}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: tm.badgeColor, background: tm.badgeColor + "12", padding: "3px 10px", borderRadius: 100, border: `1px solid ${tm.badgeColor}20` }}>{tm.badge}</span>
                </div>
                <p style={{ fontSize: 13, color: C.textS, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic", flex: 1 }}>"{lang === "nl" ? tm.textNl : tm.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${tm.badgeColor}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: tm.badgeColor }}>{tm.name[0]}</div>
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{tm.name}</div><div style={{ fontSize: 11, color: C.textT }}>{tm.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <style>{`
          @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        `}</style>
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
          <button onClick={() => signIn("google")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 17, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", transition: "all 0.3s", boxShadow: "0 4px 20px rgba(124,58,237,0.3)" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.3)"; }}>
            {t("Get Started Free", "Gratis Starten")} <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, background: C.bgS }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 40px", display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: 48 }}>
          {/* BRAND COL */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 17 }}>D</span></div>
              <span style={{ fontWeight: 800, fontSize: 18, color: C.dark }}>Drop<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {[
                { label: "LinkedIn", href: "#", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { label: "Instagram", href: "https://instagram.com/inspiredmarketingsr", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                { label: "Facebook", href: "https://facebook.com/inspiredmarketingsr", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: 10, background: C.bgT, display: "flex", alignItems: "center", justifyContent: "center", color: C.textS, textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = C.bgT; e.currentTarget.style.color = C.textS; }} title={s.label}>{s.svg}</a>
              ))}
            </div>
          </div>

          {/* QUICK MENU */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 16 }}>{t("Quick Menu", "Snelmenu")}</h4>
            {[
              { label: t("Home", "Home"), action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
              { label: t("Features", "Functies"), action: () => scrollTo("features") },
              { label: t("Pricing", "Prijzen"), action: () => scrollTo("pricing") },
              { label: t("Testimonials", "Reviews"), action: () => scrollTo("testimonials") },
              { label: "Blog", action: () => {} },
              { label: "Affiliates", action: () => {} },
              { label: "FAQs", action: () => {} },
            ].map(l => <button key={l.label} onClick={l.action} style={{ display: "block", fontSize: 14, color: C.textS, textDecoration: "none", marginBottom: 10, transition: "color 0.2s", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0, textAlign: "left" }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>{l.label}</button>)}
          </div>

          {/* FREE TOOLS */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 16 }}>{t("Free Tools", "Gratis Tools")}</h4>
            {[
              { label: t("AI Caption Generator", "AI Bijschrift Generator"), href: "#" },
              { label: t("Image Resizer", "Afbeelding Resizer"), href: "#" },
              { label: t("Post Generator", "Post Generator"), href: "#" },
              { label: t("Hashtag Generator", "Hashtag Generator"), href: "#" },
              { label: t("Bio Generator", "Bio Generator"), href: "#" },
            ].map(l => <a key={l.label} href={l.href} style={{ display: "block", fontSize: 14, color: C.textS, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>{l.label}</a>)}
          </div>

          {/* INFORMATION */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 16 }}>{t("Information", "Informatie")}</h4>
            <p style={{ fontSize: 14, color: C.textS, marginBottom: 4, lineHeight: 1.6 }}>Inspired Marketing Agency</p>
            <p style={{ fontSize: 14, color: C.textS, marginBottom: 12, lineHeight: 1.6 }}>Paramaribo, Suriname</p>
            <a href="mailto:inspiredmarketingsr@gmail.com" style={{ display: "block", fontSize: 14, color: C.textS, textDecoration: "none", marginBottom: 6, transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>inspiredmarketingsr@gmail.com</a>
            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 16 }}>
              <a href="/terms" style={{ display: "block", fontSize: 14, color: C.textS, textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>{t("Terms & Conditions", "Algemene Voorwaarden")}</a>
              <a href="/privacy" style={{ display: "block", fontSize: 14, color: C.textS, textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>{t("Privacy Policy", "Privacybeleid")}</a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: C.textT }}>Copyright© 2026 <a href="https://droppost.app" style={{ color: C.primary, textDecoration: "none", fontWeight: 600 }}>Inspired Marketing Agency</a></span>
            <span style={{ fontSize: 13, color: C.textT }}>{t("Need help?", "Hulp nodig?")} <a href="mailto:inspiredmarketingsr@gmail.com" style={{ color: C.primary, textDecoration: "none", fontWeight: 600 }}>{t("Contact Us", "Neem Contact Op")}</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}