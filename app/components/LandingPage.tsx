"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

const BRAND = {
  grad: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
  gradBtn: "linear-gradient(135deg, #7C3AED, #4F46E5)",
  primary: "#7C3AED",
};

export default function LandingPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    { icon: "📅", title: "Smart Scheduling", desc: "Plan and schedule posts across all platforms with our visual calendar. Set queue times and let DropPost handle the rest." },
    { icon: "📱", title: "Multi-Platform", desc: "Publish to YouTube, Facebook, Instagram, TikTok, and Snapchat — all from one dashboard." },
    { icon: "✅", title: "Approval Workflow", desc: "Team members submit posts for review. Admins approve or reject before anything goes live." },
    { icon: "🎬", title: "Video & Shorts", desc: "Upload videos directly. DropPost auto-detects vertical (Shorts/Reels) and horizontal formats." },
    { icon: "📊", title: "Analytics", desc: "Track your reach, engagement, and growth across all connected platforms in one place." },
    { icon: "👥", title: "Team & Workspaces", desc: "Manage multiple brands with separate workspaces. Invite team members with role-based access." },
    { icon: "🌙", title: "Dark Mode", desc: "Easy on the eyes. Switch between light and dark mode with one click." },
    { icon: "🌍", title: "Multi-Language", desc: "Available in English and Nederlands, with more languages coming soon." },
    { icon: "🔄", title: "Drag & Drop Queue", desc: "Reorder your scheduled posts by simply dragging them. Times are swapped automatically." },
  ];

  const testimonials = [
    { name: "Priya R.", role: "Social Media Manager", company: "Beauty Brand SR", text: "DropPost saved me hours every week. Scheduling across 5 platforms used to take forever — now it's done in minutes.", avatar: "PR" },
    { name: "Kevin M.", role: "Content Creator", company: "YouTube · 50K subs", text: "The YouTube upload feature is a game changer. I schedule my Shorts and videos directly from DropPost.", avatar: "KM" },
    { name: "Anisa B.", role: "Marketing Director", company: "Retail Chain", text: "The approval workflow is exactly what we needed. Nothing goes live without my OK.", avatar: "AB" },
  ];

  const faqs = [
    { q: "What platforms does DropPost support?", a: "DropPost currently supports YouTube (including Shorts), with Facebook, Instagram, TikTok, and Snapchat coming soon." },
    { q: "Is there a free trial?", a: "Yes! 14-day free trial with full access. No credit card required." },
    { q: "Can I manage multiple brands?", a: "Absolutely. DropPost supports multiple workspaces, each with their own accounts and team." },
    { q: "How does approval work?", a: "Team members create posts marked as 'Pending'. Admins approve or reject before publishing." },
    { q: "Is my data secure?", a: "Yes. Enterprise-grade security with Supabase, SSL encryption, and Row Level Security. We never sell your data." },
    { q: "Can I cancel anytime?", a: "Yes. Cancel anytime. Data retained for 30 days, then permanently deleted." },
  ];

  const plans = [
    { name: "Starter", price: "Free", period: "14 days", features: ["1 workspace", "All platforms", "5 scheduled posts", "Basic analytics"], cta: "Start Free Trial", hl: false },
    { name: "Professional", price: "SRD 45", period: "/month", features: ["3 workspaces", "All platforms", "Unlimited posts", "Full analytics", "Approval workflow", "Team members"], cta: "Get Started", hl: true },
    { name: "Agency", price: "SRD 120", period: "/month", features: ["Unlimited workspaces", "All platforms", "Unlimited posts", "Advanced analytics", "Priority support", "White-label reports"], cta: "Contact Us", hl: false },
  ];

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#0F0F1A", color: "#fff" }}>
      <nav style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>D</span></div>
          <span style={{ fontWeight: 800, fontSize: 20 }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Features</a>
          <a href="#pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Pricing</a>
          <a href="#faq" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>FAQ</a>
          <button onClick={() => setShowLogin(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Sign In</button>
        </div>
      </nav>

      {/* LOGIN MODAL */}
      {showLogin && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }} onClick={() => setShowLogin(false)}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#1A1A2E", borderRadius: 24, padding: "40px 32px", width: "min(420px,100%)", boxSizing: "border-box", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>D</span></div>
            <span style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Welcome to DropPost</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>Sign in to start scheduling your social media content.</p>
          <button onClick={() => signIn("google", { callbackUrl: "/" })} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            <img src="/google-logo.png" alt="Google" style={{ height: 20 }} />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>Continue with Google</span>
          </button>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 20, lineHeight: 1.6 }}>
            By signing in, you agree to our <a href="/terms" style={{ color: "#A78BFA", textDecoration: "none" }}>Terms of Service</a> and <a href="/privacy" style={{ color: "#A78BFA", textDecoration: "none" }}>Privacy Policy</a>
          </div>
          <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 10, padding: "10px 14px", marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>🎁 14 days free — no credit card required</div>
        </div>
      </div>}

      <section style={{ padding: "80px 24px 60px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
          <span style={{ fontSize: 13, color: "#A78BFA", fontWeight: 600 }}>🚀 Now with YouTube Shorts & Video uploads</span>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
          Schedule smarter.{" "}<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Publish everywhere.</span>
        </h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 36px" }}>Plan, approve, and publish content across YouTube, Facebook, Instagram, TikTok & Snapchat — all from one beautiful dashboard.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setShowLogin(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Start Free — 14 Days</button>
          <a href="#features" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>See Features ↓</a>
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48 }}>
          {[{ label: "Active Users", value: "500+" }, { label: "Posts Scheduled", value: "25K+" }, { label: "Platforms", value: "5" }].map(s => (
            <div key={s.label}><div style={{ fontSize: 28, fontWeight: 900, background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</div></div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 20, letterSpacing: 2, fontWeight: 600 }}>PUBLISH TO ALL MAJOR PLATFORMS</p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {[{ name: "YouTube", color: "#FF0000" }, { name: "Facebook", color: "#1877F2" }, { name: "Instagram", color: "#E1306C" }, { name: "TikTok", color: "#fff" }, { name: "Snapchat", color: "#FFCE00" }].map(p => (
            <div key={p.name} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 24px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} /><span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))", borderRadius: 20, border: "1px solid rgba(124,58,237,0.2)", padding: 3 }}>
          <div style={{ background: "#1A1A2E", borderRadius: 18, padding: "20px", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 16 }}>📊</div><div style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>DropPost Dashboard Preview</div><div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>Sign in to explore the full experience</div></div>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 13, color: "#A78BFA", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>FEATURES</p>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Everything you need to manage social media</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 500, margin: "0 auto" }}>Powerful tools for creators, agencies, and businesses.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "28px 24px" }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}><p style={{ fontSize: 13, color: "#A78BFA", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>TESTIMONIALS</p><h2 style={{ fontSize: 36, fontWeight: 800 }}>Loved by creators & agencies</h2></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {testimonials.map((tm, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic" }}>"{tm.text}"</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{tm.avatar}</div>
                  <div><div style={{ fontSize: 14, fontWeight: 700 }}>{tm.name}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{tm.role} · {tm.company}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}><p style={{ fontSize: 13, color: "#A78BFA", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PRICING</p><h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Simple, transparent pricing</h2><p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)" }}>Start free. Scale as you grow.</p></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {plans.map((p, i) => (
            <div key={i} style={{ background: p.hl ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))" : "rgba(255,255,255,0.03)", border: p.hl ? "2px solid #7C3AED" : "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 28px", position: "relative" }}>
              {p.hl && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: BRAND.gradBtn, borderRadius: 20, padding: "4px 16px", fontSize: 12, fontWeight: 700 }}>Most Popular</div>}
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.name}</div>
              <div style={{ marginBottom: 24 }}><span style={{ fontSize: 40, fontWeight: 900 }}>{p.price}</span><span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{p.period}</span></div>
              {p.features.map((f, fi) => <div key={fi} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><span style={{ color: "#10B981", fontSize: 16 }}>✓</span><span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{f}</span></div>)}
              <button onClick={() => setShowLogin(true)} style={{ width: "100%", marginTop: 20, padding: "12px", borderRadius: 10, border: p.hl ? "none" : "1px solid rgba(255,255,255,0.1)", background: p.hl ? BRAND.gradBtn : "transparent", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" style={{ padding: "80px 24px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}><p style={{ fontSize: 13, color: "#A78BFA", fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>FAQ</p><h2 style={{ fontSize: 36, fontWeight: 800 }}>Frequently asked questions</h2></div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 4 }}>
            <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{faq.q}</span>
              <span style={{ fontSize: 20, color: "rgba(255,255,255,0.3)", flexShrink: 0, marginLeft: 16, transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
            </button>
            {faqOpen === i && <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, paddingBottom: 18 }}>{faq.a}</div>}
          </div>
        ))}
      </section>

      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.15))", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 24, padding: "48px 32px" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Ready to schedule smarter?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>Join 500+ creators and businesses using DropPost.</p>
          <button onClick={() => setShowLogin(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 12, padding: "14px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Start Your Free Trial</button>
        </div>
      </section>

      <footer style={{ padding: "40px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 13 }}>D</span></div>
            <span style={{ fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.6)" }}>DropPost</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="/privacy" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 13 }}>Privacy Policy</a>
            <a href="/terms" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 13 }}>Terms of Service</a>
            <a href="mailto:inspiredmarketingsr@gmail.com" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 13 }}>Contact</a>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 Inspired Marketing Agency · Paramaribo, Suriname</div>
        </div>
      </footer>
    </div>
  );
}