"use client";
import { useState } from "react";
import { Trash2, Shield, CheckCircle, ArrowLeft, Mail, AlertTriangle } from "lucide-react";
import Link from "next/link";

const C = {
  primary: "#7C3AED", accent: "#06B6D4", dark: "#0F172A",
  text: "#0F172A", textS: "#475569", textT: "#94A3B8",
  border: "#E2E8F0", bg: "#FFFFFF", bgS: "#F8FAFC",
  green: "#10B981", red: "#EF4444",
  grad: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
};

export default function DataDeletionPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [confirm, setConfirm] = useState(false);

  function handleSubmit() {
    if (!email || !confirm) return;
    // In production: send to your API endpoint
    setSubmitted(true);
  }

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: C.text, background: C.bg, minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 60 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 15 }}>D</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: C.dark }}>Drop<span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
          </Link>
          <div style={{ flex: 1 }} />
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: C.textS, textDecoration: "none", fontWeight: 600 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.red}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Trash2 size={28} color={C.red} />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.dark, marginBottom: 8 }}>Data Deletion Request</h1>
          <p style={{ fontSize: 15, color: C.textS, lineHeight: 1.7 }}>
            We respect your right to control your personal data. You can request the deletion of all data associated with your DropPost account.
          </p>
        </div>

        {submitted ? (
          /* Success state */
          <div style={{ background: `${C.green}08`, border: `1px solid ${C.green}30`, borderRadius: 16, padding: "32px", textAlign: "center" }}>
            <CheckCircle size={40} color={C.green} style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Request Submitted</h2>
            <p style={{ fontSize: 14, color: C.textS, lineHeight: 1.7, marginBottom: 20 }}>
              We have received your data deletion request for <strong>{email}</strong>. Your data will be permanently deleted within 30 days. You will receive a confirmation email once the process is complete.
            </p>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: C.primary, fontWeight: 600, textDecoration: "none" }}>
              <ArrowLeft size={14} /> Return to Home
            </Link>
          </div>
        ) : (
          <>
            {/* What gets deleted */}
            <div style={{ background: C.bgS, borderRadius: 14, padding: "20px 24px", marginBottom: 24, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 12 }}>What data will be deleted?</h3>
              {[
                "Your account profile and login credentials",
                "All workspaces and their settings",
                "All posts, drafts, and scheduled content",
                "Uploaded images and videos",
                "Connected social media account tokens",
                "Analytics and engagement data",
                "Team member associations",
              ].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.red, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: C.textS }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div style={{ background: "#FEF3C7", borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, border: "1px solid #F59E0B30" }}>
              <AlertTriangle size={20} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>This action is irreversible</div>
                <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.6 }}>Once your data is deleted, it cannot be recovered. Please make sure to download any content you wish to keep before submitting this request.</div>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px" }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.textS, marginBottom: 6, letterSpacing: 0.5 }}>EMAIL ADDRESS *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bgS }}>
                  <Mail size={16} color={C.textT} />
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" style={{ border: "none", background: "transparent", fontSize: 14, color: C.text, flex: 1, outline: "none", fontFamily: "inherit" }} />
                </div>
                <p style={{ fontSize: 11, color: C.textT, marginTop: 4 }}>Enter the email address associated with your DropPost account.</p>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.textS, marginBottom: 6, letterSpacing: 0.5 }}>REASON (OPTIONAL)</label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Let us know why you're requesting deletion..." style={{ width: "100%", minHeight: 80, padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bgS, fontSize: 14, color: C.text, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" checked={confirm} onChange={e => setConfirm(e.target.checked)} style={{ marginTop: 3, accentColor: C.primary }} />
                  <span style={{ fontSize: 13, color: C.textS, lineHeight: 1.6 }}>
                    I understand that this action is permanent and all my data, including posts, media, workspaces, and connected accounts will be irreversibly deleted within 30 days.
                  </span>
                </label>
              </div>

              <button onClick={handleSubmit} disabled={!email || !confirm} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: !email || !confirm ? C.textT : C.red, color: "#fff", fontSize: 14, fontWeight: 700, cursor: !email || !confirm ? "not-allowed" : "pointer", opacity: !email || !confirm ? 0.5 : 1, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Trash2 size={15} /> Submit Deletion Request
              </button>
            </div>

            {/* Alternative */}
            <div style={{ textAlign: "center", marginTop: 24, padding: "20px", background: C.bgS, borderRadius: 14, border: `1px solid ${C.border}` }}>
              <Shield size={20} color={C.primary} style={{ marginBottom: 8 }} />
              <p style={{ fontSize: 13, color: C.textS, lineHeight: 1.7, margin: 0 }}>
                You can also request data deletion by emailing us directly at{" "}
                <a href="mailto:inspiredmarketingsr@gmail.com?subject=Data Deletion Request" style={{ color: C.primary, fontWeight: 600, textDecoration: "none" }}>inspiredmarketingsr@gmail.com</a>
                {" "}with the subject line "Data Deletion Request".
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}