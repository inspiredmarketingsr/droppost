"use client";
import { useState } from "react";
import { HelpCircle, Mail, MessageCircle, Book, ChevronDown, ChevronRight, ArrowLeft, Search, ExternalLink, Zap, Calendar, Users, CheckSquare, BarChart2, Shield, Clock } from "lucide-react";
import Link from "next/link";

const C = {
  primary: "#7C3AED", accent: "#06B6D4", dark: "#0F172A",
  text: "#0F172A", textS: "#475569", textT: "#94A3B8",
  border: "#E2E8F0", bg: "#FFFFFF", bgS: "#F8FAFC",
  green: "#10B981",
  grad: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
};

const FAQ_CATEGORIES = [
  {
    title: "Getting Started",
    icon: <Zap size={18} />,
    items: [
      { q: "How do I create an account?", a: "Click 'Get Started Free' on our homepage and sign in with your Google account. Your DropPost workspace will be created automatically." },
      { q: "Is DropPost free to use?", a: "Yes! Our Starter plan is completely free and includes 1 workspace, 3 social accounts, and 30 scheduled posts per month. Upgrade anytime for more features." },
      { q: "How do I connect my social media accounts?", a: "Go to Settings > Connected Accounts in your dashboard. Click 'Connect' next to the platform you want to add and follow the authorization steps." },
    ],
  },
  {
    title: "Scheduling & Publishing",
    icon: <Calendar size={18} />,
    items: [
      { q: "How do I schedule a post?", a: "Click 'Create Post', select your platforms, write your content, add media, choose a date and time, then click 'Schedule'. Your post will be published automatically at the scheduled time." },
      { q: "Can I post to multiple platforms at once?", a: "Yes! When creating a post, you can select multiple platforms (Facebook, Instagram, TikTok, LinkedIn, YouTube) and your content will be published to all selected platforms." },
      { q: "How does the drag-and-drop queue work?", a: "Go to the Queue page to see all your scheduled posts in order. Simply drag and drop posts to reorder them — the scheduled times will automatically adjust." },
      { q: "What media formats are supported?", a: "Images: JPG, PNG, GIF, WebP. Videos: MP4, MOV (max 256MB). Each platform has its own recommended dimensions which are shown when creating a post." },
    ],
  },
  {
    title: "Workspaces & Teams",
    icon: <Users size={18} />,
    items: [
      { q: "What is a workspace?", a: "A workspace is a separate environment for managing a brand or client. Each workspace has its own posts, connected accounts, calendar, and team members." },
      { q: "How many workspaces can I have?", a: "The Starter plan includes 1 workspace. Pro gives you 5 workspaces, and Agency offers unlimited workspaces." },
      { q: "Can I invite team members?", a: "Yes! Team members can be invited to your workspace with specific roles and permissions. This feature is available on Pro and Agency plans." },
    ],
  },
  {
    title: "Approval Workflow",
    icon: <CheckSquare size={18} />,
    items: [
      { q: "How does the approval workflow work?", a: "When a post is scheduled, it goes into 'Pending' status. Designated approvers receive a notification and can approve or reject the post. Only approved posts are published." },
      { q: "Can clients approve posts?", a: "Yes! You can give clients access to the approval workflow so they can review and approve content before it goes live." },
    ],
  },
  {
    title: "Privacy & Data",
    icon: <Shield size={18} />,
    items: [
      { q: "How is my data stored?", a: "Your data is securely stored using Supabase (PostgreSQL) with row-level security. Media files are stored in encrypted cloud storage. We never sell your data to third parties." },
      { q: "Can I delete my data?", a: "Yes. You can request complete data deletion at any time through our Data Deletion page or by emailing inspiredmarketingsr@gmail.com." },
      { q: "What permissions does DropPost need?", a: "We only request the minimum permissions needed to publish content on your behalf. For example, YouTube requires 'upload' permission to publish videos. You can revoke access at any time from your platform's settings." },
    ],
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [openCat, setOpenCat] = useState<number | null>(0);
  const [openQ, setOpenQ] = useState<string | null>(null);

  const filteredCategories = search
    ? FAQ_CATEGORIES.map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter(cat => cat.items.length > 0)
    : FAQ_CATEGORIES;

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: C.text, background: C.bg, minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 60 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 15 }}>D</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: C.dark }}>Drop<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: C.textS, textDecoration: "none", fontWeight: 600 }}>
            <ArrowLeft size={14} /> Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `linear-gradient(180deg, ${C.bgS} 0%, ${C.bg} 100%)`, padding: "48px 24px 32px", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.primary}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <HelpCircle size={28} color={C.primary} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Help Center</h1>
        <p style={{ fontSize: 15, color: C.textS, marginBottom: 24 }}>Find answers to common questions about DropPost</p>

        {/* Search */}
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <Search size={18} color={C.textT} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for help..." style={{ border: "none", background: "transparent", fontSize: 14, color: C.text, flex: 1, outline: "none", fontFamily: "inherit" }} />
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 24px 80px" }}>
        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 40 }}>
          {[
            { icon: <Mail size={18} />, title: "Email Support", desc: "inspiredmarketingsr@gmail.com", href: "mailto:inspiredmarketingsr@gmail.com" },
            { icon: <Shield size={18} />, title: "Privacy Policy", desc: "How we handle your data", href: "/privacy" },
            { icon: <Book size={18} />, title: "Data Deletion", desc: "Request your data removal", href: "/data-deletion" },
          ].map(link => (
            <a key={link.title} href={link.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg, textDecoration: "none", transition: "all 0.15s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary + "50"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.primary}10`, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary, flexShrink: 0 }}>{link.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{link.title}</div>
                <div style={{ fontSize: 11, color: C.textT }}>{link.desc}</div>
              </div>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: 18, fontWeight: 800, color: C.dark, marginBottom: 20 }}>Frequently Asked Questions</h2>

        {filteredCategories.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Search size={32} color={C.textT} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 14, color: C.textT }}>No results found for "{search}"</div>
          </div>
        )}

        {filteredCategories.map((cat, ci) => (
          <div key={cat.title} style={{ marginBottom: 12 }}>
            <button onClick={() => setOpenCat(openCat === ci ? null : ci)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 12, border: `1px solid ${openCat === ci ? C.primary + "30" : C.border}`, background: openCat === ci ? `${C.primary}06` : C.bg, cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.primary}12`, display: "flex", alignItems: "center", justifyContent: "center", color: C.primary }}>{cat.icon}</div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, flex: 1, textAlign: "left" }}>{cat.title}</span>
              <span style={{ fontSize: 11, color: C.textT, marginRight: 8 }}>{cat.items.length} questions</span>
              {openCat === ci ? <ChevronDown size={16} color={C.primary} /> : <ChevronRight size={16} color={C.textT} />}
            </button>

            {openCat === ci && (
              <div style={{ padding: "4px 0 4px 16px", borderLeft: `2px solid ${C.primary}20`, marginLeft: 32, marginTop: 4 }}>
                {cat.items.map(item => (
                  <div key={item.q} style={{ marginBottom: 4 }}>
                    <button onClick={() => setOpenQ(openQ === item.q ? null : item.q)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, border: "none", background: openQ === item.q ? `${C.primary}08` : "transparent", cursor: "pointer", textAlign: "left", transition: "background 0.12s" }}>
                      <HelpCircle size={14} color={openQ === item.q ? C.primary : C.textT} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: openQ === item.q ? C.primary : C.text, flex: 1 }}>{item.q}</span>
                      {openQ === item.q ? <ChevronDown size={14} color={C.primary} /> : <ChevronRight size={14} color={C.textT} />}
                    </button>
                    {openQ === item.q && (
                      <div style={{ padding: "8px 12px 12px 34px", fontSize: 13, color: C.textS, lineHeight: 1.7 }}>
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Contact CTA */}
        <div style={{ marginTop: 40, background: C.dark, borderRadius: 16, padding: "32px", textAlign: "center" }}>
          <MessageCircle size={28} color="#fff" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Still need help?</h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Our team is ready to assist you. Get in touch and we'll respond within 24 hours.</p>
          <a href="mailto:inspiredmarketingsr@gmail.com?subject=DropPost Support Request" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.grad, color: "#fff", padding: "12px 28px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            <Mail size={16} /> Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}