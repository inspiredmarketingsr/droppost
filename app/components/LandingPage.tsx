"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Calendar, Clock, CheckSquare, BarChart2, Users, Zap, Shield, Globe, ChevronRight, Play, Star, Menu, X, ArrowRight, Sparkles, PenLine } from "lucide-react";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

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

/* ═══ Hook: detect mobile ═══ */
function useIsMobile(bp = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return m;
}

export default function LandingPage() {
  const [lang, setLang] = useState<"en" | "nl">("en");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const t = (en: string, nl: string) => lang === "nl" ? nl : en;

  const roles = [t("creators", "creators"), t("influencers", "influencers"), t("agencies", "agencies"), t("teams", "teams"), t("brands", "merken")];

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollTo = (id: string) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); setMobileMenu(false); };

  const navLinks = [
    { label: t("Features", "Functies"), id: "features" },
    { label: t("Platforms", "Platformen"), id: "platforms" },
    { label: t("Pricing", "Prijzen"), id: "pricing" },
    { label: t("Testimonials", "Reviews"), id: "testimonials" },
  ];

  const btn = (primary: boolean, size: "sm" | "md" | "lg" = "md") => ({
    background: primary ? C.grad : "transparent", color: primary ? "#fff" : C.text,
    border: primary ? "none" : `1.5px solid ${C.border}`, borderRadius: size === "lg" ? 14 : 10,
    padding: size === "lg" ? (isMobile ? "14px 28px" : "16px 36px") : size === "md" ? "11px 24px" : "8px 18px",
    fontSize: size === "lg" ? (isMobile ? 14 : 16) : size === "md" ? 14 : 13, fontWeight: 700 as const,
    cursor: "pointer" as const, fontFamily: "inherit", transition: "all 0.2s",
  });

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: C.text, background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 15 }}>D</span></div>
            <span style={{ fontWeight: 800, fontSize: 17, color: C.dark }}>Drop<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 28, flex: 1, marginLeft: 40 }}>
              {navLinks.map(l => <button key={l.id} onClick={() => scrollTo(l.id)} style={{ fontSize: 14, color: C.textS, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }} onMouseEnter={e => (e.currentTarget.style.color = C.primary)} onMouseLeave={e => (e.currentTarget.style.color = C.textS)}>{l.label}</button>)}
            </div>
          )}

          <div style={{ flex: isMobile ? 1 : undefined }} />

          {/* Desktop buttons */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setLang(l => l === "en" ? "nl" : "en")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 12, color: C.textS, fontWeight: 600 }}>{lang === "en" ? "NL" : "EN"}</button>
              <button onClick={() => signIn("google")} style={btn(false, "sm")}>{t("Log in", "Inloggen")}</button>
              <button onClick={() => signIn("google")} style={btn(true, "sm")}>{t("Get Started", "Starten")}</button>
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => setLang(l => l === "en" ? "nl" : "en")} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 8px", cursor: "pointer", fontSize: 11, color: C.textS, fontWeight: 600 }}>{lang === "en" ? "NL" : "EN"}</button>
              <button onClick={() => setMobileMenu(!mobileMenu)} style={{ width: 36, height: 36, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {mobileMenu ? <X size={22} color={C.text} /> : <Menu size={22} color={C.text} />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile drawer */}
        {isMobile && mobileMenu && (
          <div style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: "12px 16px 16px", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
            {navLinks.map(l => <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", fontSize: 15, color: C.text, background: "none", border: "none", borderBottom: `1px solid ${C.border}`, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>{l.label}</button>)}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => signIn("google")} style={{ ...btn(false, "md"), flex: 1, textAlign: "center" as const }}>{t("Log in", "Inloggen")}</button>
              <button onClick={() => signIn("google")} style={{ ...btn(true, "md"), flex: 1, textAlign: "center" as const }}>{t("Get Started", "Starten")}</button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: isMobile ? "auto" : "90vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: C.gradSoft, opacity: 0.5 }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: isMobile ? 250 : 500, height: isMobile ? 250 : 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-15%", left: "-10%", width: isMobile ? 300 : 600, height: isMobile ? 300 : 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)" }} />
          {!isMobile && [
            { icon: <FaYoutube size={20} />, color: "#FF0000", x: "6%", y: "25%", dur: "6s" },
            { icon: <FaFacebookF size={18} />, color: "#1877F2", x: "88%", y: "22%", dur: "7s" },
            { icon: <FaInstagram size={20} />, color: "#E1306C", x: "12%", y: "50%", dur: "8s" },
            { icon: <FaTiktok size={18} />, color: "#010101", x: "82%", y: "52%", dur: "6.5s" },
            { icon: <FaLinkedinIn size={18} />, color: "#0A66C2", x: "18%", y: "12%", dur: "7.5s" },
            { icon: <FaXTwitter size={16} />, color: "#000", x: "76%", y: "10%", dur: "9s" },
          ].map((p, i) => (
            <div key={i} style={{ position: "absolute", left: p.x, top: p.y, width: 44, height: 44, borderRadius: "50%", background: `${C.bg}ee`, border: `2px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, boxShadow: `0 4px 20px ${p.color}15`, animation: `heroFloat ${p.dur} ease-in-out infinite`, opacity: 0.85 }}>{p.icon}</div>
          ))}
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "48px 20px 40px" : "80px 24px 60px", position: "relative", textAlign: "center", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.bg}dd`, border: `1px solid ${C.border}`, borderRadius: 100, padding: "6px 14px 6px 8px", marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", animation: "fadeInDown 0.8s ease-out" }}>
            <Sparkles size={14} color={C.primary} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.textS }}>{t("Now with AI-powered captions", "Nu met AI-aangedreven bijschriften")}</span>
          </div>

          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 72px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 20, color: C.dark, letterSpacing: "-0.03em", animation: "fadeInUp 0.8s ease-out 0.2s both" }}>
            {t("Schedule, approve &", "Plan, keur goed &")}<br />
            <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("publish with ease", "publiceer met gemak")}</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 20px)", color: C.textS, maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7, padding: "0 8px", animation: "fadeInUp 0.8s ease-out 0.4s both" }}>
            {t("The all-in-one social media management tool for ", "De alles-in-één social media tool voor ")}
            <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800 }}>{roles[roleIndex]}</span>
            {t(". Plan content, get approvals, and publish — from one dashboard.", ". Plan, keur goed en publiceer — vanuit één dashboard.")}
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: isMobile ? 32 : 48, animation: "fadeInUp 0.8s ease-out 0.6s both" }}>
            <button onClick={() => signIn("google")} style={{ ...btn(true, "lg"), boxShadow: "0 4px 20px rgba(124,58,237,0.25)", display: "inline-flex", alignItems: "center" }}>
              {t("Start Free", "Gratis Starten")} <ArrowRight size={16} style={{ marginLeft: 6 }} />
            </button>
            <button style={{ ...btn(false, "lg"), display: "inline-flex", alignItems: "center", backdropFilter: "blur(8px)", background: `${C.bg}cc` }}>
              <Play size={14} style={{ marginRight: 6 }} fill={C.primary} color={C.primary} />{t("Watch Demo", "Bekijk Demo")}
            </button>
          </div>

          {/* App preview — hidden on small mobile */}
          {!isMobile && (
            <div style={{ maxWidth: 860, margin: "0 auto", borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", background: C.bg, animation: "fadeInUp 1s ease-out 0.8s both" }}>
              <div style={{ background: C.dark, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} /><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} /><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} /></div>
                <div style={{ flex: 1, textAlign: "center" }}><span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>droppost.app</span></div>
              </div>
              <div style={{ padding: 16, background: "#F9FAFB" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {[{ l: "TOTAL", v: "24", c: "#7C3AED" }, { l: "SCHEDULED", v: "12", c: "#0EA5E9" }, { l: "PUBLISHED", v: "9", c: "#10B981" }, { l: "PENDING", v: "3", c: "#F59E0B" }].map(s => (
                    <div key={s.l} style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                      <div style={{ fontSize: 7, fontWeight: 700, color: C.textT, marginBottom: 3 }}>{s.l}</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: s.c }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.border}`, padding: "10px" }}>
                  {["New product launch this Friday!", "Behind the scenes photoshoot", "5 tips to boost engagement", "Customer spotlight: 300% growth"].map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: 10, color: C.text, flex: 1 }}>{t}</span>
                      <span style={{ fontSize: 7, background: i % 2 === 0 ? "#EDE9FE" : "#D1FAE5", color: i % 2 === 0 ? "#7C3AED" : "#10B981", borderRadius: 8, padding: "2px 6px", fontWeight: 600 }}>{i % 2 === 0 ? "Scheduled" : "Published"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 12 : 20, marginTop: 24, flexWrap: "wrap", animation: "fadeInUp 0.8s ease-out 1.5s both" }}>
            {[t("No credit card required", "Geen creditcard nodig"), t("Free plan available", "Gratis plan"), t("Cancel anytime", "Altijd opzegbaar")].map(s => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: isMobile ? 11 : 13, color: C.textS }}><Shield size={12} color={C.green} />{s}</span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>

      {/* ═══ INTEGRATIONS ═══ */}
      <section id="platforms" style={{ padding: isMobile ? "60px 20px" : "100px 24px", background: "linear-gradient(180deg, #F8FAFC 0%, #EDE9FE22 40%, #CFFAFE18 70%, #F8FAFC 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: isMobile ? 32 : 60, flexDirection: isMobile ? "column" : "row" }}>
          {/* Platform orbit — scaled on mobile */}
          <div style={{ position: "relative", width: isMobile ? 280 : 400, height: isMobile ? 280 : 400, flexShrink: 0 }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: isMobile ? 56 : 72, height: isMobile ? 56 : 72, borderRadius: 18, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(124,58,237,0.3)", zIndex: 2 }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: isMobile ? 22 : 28 }}>D</span>
            </div>
            {[
              { icon: <FaYoutube size={isMobile ? 18 : 22} />, color: "#FF0000", angle: -60 },
              { icon: <FaFacebookF size={isMobile ? 16 : 20} />, color: "#1877F2", angle: 0 },
              { icon: <FaInstagram size={isMobile ? 18 : 22} />, color: "#E1306C", angle: 60 },
              { icon: <FaTiktok size={isMobile ? 16 : 20} />, color: "#010101", angle: 120 },
              { icon: <FaLinkedinIn size={isMobile ? 16 : 20} />, color: "#0A66C2", angle: 180 },
              { icon: <FaXTwitter size={isMobile ? 14 : 18} />, color: "#000", angle: 240 },
            ].map((p, i) => {
              const r = isMobile ? 110 : 155;
              const rad = (p.angle * Math.PI) / 180;
              const x = 50 + (r / (isMobile ? 280 : 400)) * 100 * Math.cos(rad);
              const y = 50 + (r / (isMobile ? 280 : 400)) * 100 * Math.sin(rad);
              const sz = isMobile ? 40 : 48;
              return (
                <div key={i} style={{ position: "absolute", left: `calc(${x}% - ${sz/2}px)`, top: `calc(${y}% - ${sz/2}px)`, width: sz, height: sz, borderRadius: "50%", background: C.bg, border: `2px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color, boxShadow: `0 4px 16px ${p.color}15`, zIndex: 2, animation: `heroFloat ${4 + i * 0.5}s ease-in-out infinite` }}>
                  {p.icon}
                </div>
              );
            })}
            {/* Orbit rings */}
            <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ position: "absolute", inset: 0 }}>
              <circle cx="200" cy="200" r="155" fill="none" stroke={`${C.primary}15`} strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="200" cy="200" r="80" fill={`${C.primary}06`} />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0, textAlign: isMobile ? "center" : "left" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 10 }}>{t("INTEGRATIONS", "INTEGRATIES")}</p>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, color: C.dark }}>
              {t("Integrations that work with ", "Integraties die werken met ")}
              <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("your social media", "jouw social media")}</span>
            </h2>
            <p style={{ fontSize: isMobile ? 14 : 16, color: C.textS, lineHeight: 1.8, marginBottom: 28 }}>{t("Automate your social media posts and schedule content across all platforms from one dashboard.", "Automatiseer je social media posts en plan content op alle platformen vanuit één dashboard.")}</p>
            <button onClick={() => signIn("google")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 12, padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{t("START YOUR FREE TRIAL!", "START JE GRATIS PROEF!")}</button>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: isMobile ? "60px 20px" : "80px 24px", background: C.bgS }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 10 }}>{t("FEATURES", "FUNCTIES")}</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, marginBottom: 14, color: C.dark }}>{t("Everything you need to scale", "Alles wat je nodig hebt om te groeien")}</h2>
            <p style={{ fontSize: 15, color: C.textS, maxWidth: 500, margin: "0 auto" }}>{t("From scheduling to analytics — DropPost has every tool your agency needs.", "Van inplannen tot analytics — DropPost heeft elke tool die je agency nodig heeft.")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ background: C.bg, borderRadius: 16, padding: "24px 20px", border: `1px solid ${C.border}`, transition: "box-shadow 0.2s, transform 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,58,237,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: C.gradSoft, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: C.dark }}>{lang === "nl" ? f.titleNl : f.title}</h3>
                <p style={{ fontSize: 14, color: C.textS, lineHeight: 1.7, margin: 0 }}>{lang === "nl" ? f.descNl : f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ padding: isMobile ? "60px 20px" : "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 10 }}>{t("HOW IT WORKS", "HOE HET WERKT")}</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: C.dark }}>{t("From idea to published in 3 steps", "Van idee tot gepubliceerd in 3 stappen")}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 24 : 16, alignItems: isMobile ? "center" : "flex-start" }}>
            {[
              { step: "1", icon: <PenLine size={22} />, title: t("Create & Schedule", "Maak & Plan"), desc: t("Write your post, pick platforms, upload media, set date & time.", "Schrijf je post, kies platformen, upload media, stel datum & tijd in."), color: C.primary },
              { step: "2", icon: <CheckSquare size={22} />, title: t("Review & Approve", "Review & Keur goed"), desc: t("Send posts for approval. Clients review and approve instantly.", "Stuur posts ter goedkeuring. Klanten reviewen en keuren direct goed."), color: C.accent },
              { step: "3", icon: <Zap size={22} />, title: t("Publish & Grow", "Publiceer & Groei"), desc: t("Approved posts publish automatically. Track performance.", "Goedgekeurde posts worden automatisch gepubliceerd. Volg prestaties."), color: C.green },
            ].map(s => (
              <div key={s.step} style={{ flex: 1, textAlign: "center", maxWidth: isMobile ? 360 : "none" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, margin: "0 auto 16px", position: "relative" }}>
                  {s.icon}
                  <div style={{ position: "absolute", top: -4, right: -4, width: 24, height: 24, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>{s.step}</div>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: C.dark }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: C.textS, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" style={{ padding: isMobile ? "60px 0" : "80px 0", background: C.bgS, overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 10 }}>{t("TESTIMONIALS", "REVIEWS")}</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, color: C.dark, marginBottom: 10 }}>{t("Loved by creators & agencies", "Geliefd bij creators & agencies")}</h2>
          </div>
        </div>
        {[TESTIMONIALS.slice(0, 6), TESTIMONIALS.slice(6, 12)].map((row, ri) => (
          <div key={ri} style={{ position: "relative", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 16, animation: `${ri === 0 ? "marqueeLeft" : "marqueeRight"} ${70 + ri * 10}s linear infinite`, width: "max-content" }}>
              {[...row, ...row].map((tm, i) => (
                <div key={i} style={{ width: isMobile ? 280 : 360, flexShrink: 0, background: C.bg, borderRadius: 14, padding: "20px 18px", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#F59E0B" color="#F59E0B" />)}</div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: tm.badgeColor, background: tm.badgeColor + "12", padding: "2px 8px", borderRadius: 100 }}>{tm.badge}</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.textS, lineHeight: 1.6, marginBottom: 14, fontStyle: "italic", flex: 1 }}>"{lang === "nl" ? tm.textNl : tm.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${tm.badgeColor}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: tm.badgeColor }}>{tm.name[0]}</div>
                    <div><div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{tm.name}</div><div style={{ fontSize: 10, color: C.textT }}>{tm.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <style>{`
          @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        `}</style>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: isMobile ? "60px 20px" : "80px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.primary, letterSpacing: 1.5, marginBottom: 10 }}>{t("PRICING", "PRIJZEN")}</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, marginBottom: 10, color: C.dark }}>{t("Simple, transparent pricing", "Eenvoudige, transparante prijzen")}</h2>
            <p style={{ fontSize: 15, color: C.textS }}>{t("Start free. Upgrade when you're ready.", "Start gratis. Upgrade wanneer je klaar bent.")}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }}>
            {PLANS.map(plan => (
              <div key={plan.name} style={{ background: C.bg, borderRadius: 20, padding: "28px 24px", border: plan.popular ? `2px solid ${C.primary}` : `1px solid ${C.border}`, position: "relative", boxShadow: plan.popular ? "0 8px 30px rgba(124,58,237,0.12)" : "none" }}>
                {plan.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.grad, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 100 }}>{t("Most Popular", "Populairst")}</div>}
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: C.dark }}>{plan.name}</h3>
                <div style={{ marginBottom: 18 }}><span style={{ fontSize: 36, fontWeight: 900, color: C.dark }}>{plan.price}</span>{plan.pricePer && <span style={{ fontSize: 15, color: C.textT }}>{plan.pricePer}</span>}</div>
                <div style={{ marginBottom: 20 }}>
                  {(lang === "nl" ? plan.featuresNl : plan.features).map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.greenL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: C.green, fontSize: 11, fontWeight: 800 }}>✓</span></div>
                      <span style={{ fontSize: 13, color: C.textS }}>{f}</span>
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
      <section style={{ padding: isMobile ? "60px 20px" : "80px 24px", background: C.dark }}>
        <div style={{ maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 900, color: "#fff", marginBottom: 14, lineHeight: 1.2 }}>{t("Ready to streamline your social media?", "Klaar om je social media te stroomlijnen?")}</h2>
          <p style={{ fontSize: isMobile ? 14 : 16, color: "rgba(255,255,255,0.6)", marginBottom: 28, lineHeight: 1.7 }}>{t("Join thousands of teams using DropPost to save time and grow.", "Sluit je aan bij duizenden teams die DropPost gebruiken.")}</p>
          <button onClick={() => signIn("google")} style={{ background: C.grad, color: "#fff", border: "none", borderRadius: 14, padding: isMobile ? "14px 32px" : "16px 40px", fontSize: isMobile ? 15 : 17, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", boxShadow: "0 4px 20px rgba(124,58,237,0.3)" }}>
            {t("Get Started Free", "Gratis Starten")} <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </button>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${C.border}`, background: C.bgS }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "40px 20px 24px" : "60px 24px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "1.2fr 1fr 1fr 1fr", gap: isMobile ? 32 : 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>D</span></div>
              <span style={{ fontWeight: 800, fontSize: 16, color: C.dark }}>Drop<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
            </div>
            <p style={{ fontSize: 13, color: C.textS, marginBottom: 12 }}>Inspired Marketing Agency<br />Paramaribo, Suriname</p>
            <a href="mailto:inspiredmarketingsr@gmail.com" style={{ fontSize: 13, color: C.primary, textDecoration: "none" }}>inspiredmarketingsr@gmail.com</a>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 14 }}>{t("Quick Menu", "Snelmenu")}</h4>
            {["Home", t("Features", "Functies"), t("Pricing", "Prijzen"), t("Testimonials", "Reviews"), "Blog"].map(l => <div key={l} style={{ fontSize: 13, color: C.textS, marginBottom: 8, cursor: "pointer" }}>{l}</div>)}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 14 }}>{t("Free Tools", "Gratis Tools")}</h4>
            {[t("AI Caption Generator", "AI Bijschrift Generator"), t("Image Resizer", "Afbeelding Resizer"), t("Hashtag Generator", "Hashtag Generator")].map(l => <div key={l} style={{ fontSize: 13, color: C.textS, marginBottom: 8 }}>{l}</div>)}
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 14 }}>{t("Legal", "Juridisch")}</h4>
            <a href="/terms" style={{ display: "block", fontSize: 13, color: C.textS, textDecoration: "none", marginBottom: 8 }}>{t("Terms & Conditions", "Algemene Voorwaarden")}</a>
            <a href="/privacy" style={{ display: "block", fontSize: 13, color: C.textS, textDecoration: "none", marginBottom: 8 }}>{t("Privacy Policy", "Privacybeleid")}</a>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 12, color: C.textT }}>© 2026 <a href="https://droppost.app" style={{ color: C.primary, textDecoration: "none", fontWeight: 600 }}>Inspired Marketing Agency</a></span>
            <span style={{ fontSize: 12, color: C.textT }}>{t("Need help?", "Hulp nodig?")} <a href="mailto:inspiredmarketingsr@gmail.com" style={{ color: C.primary, textDecoration: "none", fontWeight: 600 }}>{t("Contact Us", "Neem Contact Op")}</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}