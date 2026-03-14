"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Settings, User, CreditCard, HelpCircle, Gift, LogOut, Headphones, Newspaper, Moon, Sun, Globe } from "lucide-react";

const BRAND = {
  primary: "#7C3AED", primaryD: "#5B21B6", primaryL: "#EDE9FE",
  accent: "#06B6D4", accentL: "#CFFAFE",
  grad: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
  gradBtn: "linear-gradient(135deg, #7C3AED, #4F46E5)",
  dark: "#0F0F1A", darkCard: "#1A1A2E", sidebar: "#13131F",
  text: "#111827", textS: "#6B7280", textT: "#9CA3AF",
  border: "#E5E7EB", bg: "#F9FAFB", white: "#FFFFFF",
  green: "#10B981", greenL: "#D1FAE5", red: "#EF4444", redL: "#FEE2E2",
  amber: "#F59E0B", amberL: "#FEF3C7",
};

const PLATFORMS = [
  { id: "facebook", label: "Facebook", short: "FB", color: "#1877F2", bg: "#EBF5FF" },
  { id: "instagram", label: "Instagram", short: "IG", color: "#E1306C", bg: "#FDE8F0" },
  { id: "tiktok", label: "TikTok", short: "TT", color: "#010101", bg: "#F3F3F3" },
  { id: "snapchat", label: "Snapchat", short: "SC", color: "#FFCE00", bg: "#FFFBEB" },
  { id: "youtube", label: "YouTube", short: "YT", color: "#FF0000", bg: "#FFF0F0" },
];

const WORKSPACE_COLORS = [BRAND.primary,"#10B981","#F59E0B","#E1306C","#1877F2","#06B6D4"];
const QUEUE_TIMES = ["09:00","12:00","15:00","18:00","21:00"];
const pl = (id: string) => PLATFORMS.find(p => p.id === id);

function Avatar({ initials, color, size = 36 }: any) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color + "22", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.3, fontWeight: 800, color, flexShrink: 0, letterSpacing: -0.5 }}>
      {initials}
    </div>
  );
}

function PBadge({ pid }: any) {
  const p = pl(pid);
  if (!p) return null;
  return <span style={{ fontSize: 11, background: p.bg, color: p.color, borderRadius: 5, padding: "2px 6px", fontWeight: 700, border: `1px solid ${p.color}20` }}>{p.short}</span>;
}

function Tag({ label, color, bg }: any) {
  return <span style={{ fontSize: 11, background: bg, color, borderRadius: 20, padding: "2px 9px", fontWeight: 600 }}>{label}</span>;
}

function StatusTag({ status, approval }: any) {
  if (status === "published") return <Tag label="Published" color={BRAND.green} bg={BRAND.greenL} />;
  if (status === "draft") return <Tag label="Draft" color={BRAND.textS} bg={BRAND.border} />;
  if (approval === "pending") return <Tag label="Pending approval" color={BRAND.amber} bg={BRAND.amberL} />;
  if (approval === "rejected") return <Tag label="Rejected" color={BRAND.red} bg={BRAND.redL} />;
  return <Tag label="Scheduled" color={BRAND.primary} bg={BRAND.primaryL} />;
}

function LoginPage({ onGoRegister }: any) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>D</span>
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
            </div>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Welcome back</h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Sign in to manage your social media</p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" type="email" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Password</label>
            <input value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" type="password" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
          </div>
          <button onClick={() => signIn("credentials", { email, password: pass, callbackUrl: "/" })} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>Sign in</button>
          <button onClick={() => signIn("google", { callbackUrl: "/" })} style={{ width: "100%", padding: "11px", borderRadius: 10, border: "1px solid #dadce0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#3c4043" }}>Sign in with</span>
            <img src="/google-logo.png" alt="Google" style={{ height: 20, objectFit: "contain" }} />
          </button>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", marginTop: 24 }}>
            Don't have an account?{" "}
            <button onClick={onGoRegister} style={{ background: "none", border: "none", color: BRAND.accent, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Sign up free</button>
          </p>
        </div>
      </div>
      <div style={{ flex: 1, background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🚀</div>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Schedule smarter.</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7 }}>Plan, approve and publish across Facebook, Instagram, TikTok, Snapchat & YouTube — all in one place.</p>
          <div style={{ display: "flex", gap: 16, marginTop: 32, justifyContent: "center" }}>
            {["500+ users","5 platforms","Suriname #1"].map(s => (
              <div key={s} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 14px" }}>
                <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ onGoLogin }: any) {
  const [form, setForm] = useState({ name: "", email: "", pass: "", company: "" });
  const f = (k: string) => (e: any) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>D</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>
        </div>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Create your account</h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 28 }}>Start your 14-day free trial. No credit card required.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          {[["name","Full name","John Doe"],["company","Company","Bakkerij Ramsaran"]].map(([k,l,ph]) => (
            <div key={k}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 5 }}>{l}</label>
              <input value={(form as any)[k]} onChange={f(k)} placeholder={ph} style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        {[["email","Email address","you@company.com","email"],["pass","Password","Min. 8 characters","password"]].map(([k,l,ph,t]) => (
          <div key={k} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 5 }}>{l}</label>
            <input value={(form as any)[k]} onChange={f(k)} placeholder={ph} type={t} style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, boxSizing: "border-box" }} />
          </div>
        ))}
        <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
          🎁 14 days free — then from <strong style={{ color: "#fff" }}>SRD 45/month</strong>
        </div>
        <button onClick={() => signIn("google", { callbackUrl: "/" })} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>Create free account</button>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center" }}>
          Already have an account?{" "}
          <button onClick={onGoLogin} style={{ background: "none", border: "none", color: BRAND.accent, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Sign in</button>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const { data: session, status } = useSession();
  const [screen, setScreen] = useState<"login"|"register">("login");
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [posts, setPosts] = useState<Record<string, any[]>>({});
  const [activeWS, setActiveWS] = useState<string | null>(null);
  const [page, setPage] = useState("dashboard");
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewWS, setShowNewWS] = useState(false);
  const [showFB, setShowFB] = useState<string|null>(null);
  const [draft, setDraft] = useState({ content: "", platforms: [] as string[], date: "", time: "12:00", type: "post", image_url: "" });
  const [uploading, setUploading] = useState(false);
  const [newWS, setNewWS] = useState({ name: "", industry: "", color: WORKSPACE_COLORS[0] });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [calView, setCalView] = useState<"day"|"week"|"month">("month");
  const [calDate, setCalDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en"|"nl">("en");
  const [showSupport, setShowSupport] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email || "";
  const userName = session?.user?.name || "User";
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  // Load workspaces from Supabase
  useEffect(() => {
    if (!session) return;
    if (workspaces.length > 0) return;
    loadWorkspaces();
  }, [session]);

  async function loadWorkspaces() {
    setLoading(true);
    const { data, error } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", userEmail)
      .order("created_at", { ascending: true });

    if (data && data.length > 0) {
      setWorkspaces(data);
      setActiveWS(data[0].id);
      await loadPosts(data[0].id);
    } else {
      // Create default workspace if none exists
      const initials = userEmail.slice(0, 2).toUpperCase();
      const { data: ws } = await supabase.from("workspaces").insert({
        user_id: userEmail,
        name: "My Workspace",
        industry: "General",
        color: BRAND.primary,
        avatar: initials,
      }).select().single();
      if (ws) {
        setWorkspaces([ws]);
        setActiveWS(ws.id);
      }
    }
    setLoading(false);
  }

  async function loadPosts(wsId: string) {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("workspace_id", wsId)
      .order("created_at", { ascending: false });
    if (data) setPosts(prev => ({ ...prev, [wsId]: data }));
  }

  async function switchWorkspace(wsId: string) {
    setActiveWS(wsId);
    setPage("dashboard");
    if (!posts[wsId]) await loadPosts(wsId);
  }

  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true);
    const fileName = `${userEmail}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("post-images").upload(fileName, file, { upsert: true });
    setUploading(false);
    if (error) { console.error(error); return null; }
    const { data: urlData } = supabase.storage.from("post-images").getPublicUrl(fileName);
    return urlData.publicUrl;
  }

  async function addPost() {
    if (!draft.content || !draft.date || draft.platforms.length === 0 || !activeWS) return;
    const { data } = await supabase.from("posts").insert({
      workspace_id: activeWS,
      content: draft.content,
      platforms: draft.platforms,
      scheduled_date: draft.date,
      scheduled_time: draft.time,
      status: "scheduled",
      approval: "pending",
      image_url: draft.image_url || null,
    }).select().single();
    if (data) setPosts(prev => ({ ...prev, [activeWS]: [data, ...(prev[activeWS] || [])] }));
    setDraft({ content: "", platforms: [], date: "", time: "12:00", type: "post", image_url: "" });
    setShowNewPost(false);
  }

  async function addWorkspace() {
    if (!newWS.name) return;
    const initials = newWS.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
    const { data } = await supabase.from("workspaces").insert({
      user_id: userEmail,
      ...newWS,
      avatar: initials,
    }).select().single();
    if (data) {
      setWorkspaces(prev => [...prev, data]);
      setPosts(prev => ({ ...prev, [data.id]: [] }));
      setActiveWS(data.id);
    }
    setNewWS({ name: "", industry: "", color: WORKSPACE_COLORS[0] });
    setShowNewWS(false);
  }

  async function approvePost(id: string, decision: string) {
    await supabase.from("posts").update({ approval: decision }).eq("id", id);
    if (activeWS) setPosts(prev => ({
      ...prev,
      [activeWS]: prev[activeWS].map(p => p.id === id ? { ...p, approval: decision } : p)
    }));
  }

  async function deletePost(id: string) {
    await supabase.from("posts").delete().eq("id", id);
    if (activeWS) setPosts(prev => ({
      ...prev,
      [activeWS]: prev[activeWS].filter(p => p.id !== id)
    }));
  }

  if (status === "loading") return null;
  if (session && loading && workspaces.length === 0) return (
    <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Loading...</div>
    </div>
  );

  if (!session) {
    if (screen === "register") return <RegisterPage onGoLogin={() => setScreen("login")} />;
    return <LoginPage onGoRegister={() => setScreen("register")} />;
  }

  const ws = workspaces.find(w => w.id === activeWS);
  const wsPosts = activeWS ? (posts[activeWS] || []) : [];
  const scheduled = wsPosts.filter(p => p.status === "scheduled");
  const published = wsPosts.filter(p => p.status === "published");
  const drafts = wsPosts.filter(p => p.status === "draft");
  const pending = wsPosts.filter(p => p.approval === "pending" && p.status !== "draft");
  const totalPending = workspaces.reduce((s, w) => s + ((posts[w.id] || []).filter((p: any) => p.approval === "pending" && p.status !== "draft").length), 0);
  const t = (en: string, nl: string) => language === "nl" ? nl : en;

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const HOURS = Array.from({ length: 16 }, (_, i) => `${String(i + 6).padStart(2, "0")}:00`);

  const NAV = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "calendar", icon: "📅", label: "Calendar" },
    { id: "posts", icon: "✏️", label: "Posts" },
    { id: "queue", icon: "⏱", label: "Queue" },
    { id: "drafts", icon: "📝", label: "Drafts" },
    { id: "approval", icon: "✓", label: "Approval", badge: pending.length },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "media", icon: "🖼", label: "Media Library" },
    { id: "team", icon: "👥", label: "Team" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: BRAND.bg }}>
      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 240 : 64, flexShrink: 0, background: BRAND.sidebar, display: "flex", flexDirection: "column", transition: "width 0.2s", overflow: "hidden", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ padding: "16px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 60 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 17 }}>D</span>
          </div>
          {sidebarOpen && <span style={{ color: "#fff", fontWeight: 800, fontSize: 17, whiteSpace: "nowrap" }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>}
          {/* Only show hamburger in sidebar when minimized */}
          {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 18, flexShrink: 0, padding: 4 }}>☰</button>}
        </div>

        <div style={{ padding: "10px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {sidebarOpen && <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, marginBottom: 6, paddingLeft: 4 }}>WORKSPACES</div>}
          {workspaces.map(w => {
            const wP = (posts[w.id] || []).filter((p: any) => p.approval === "pending" && p.status !== "draft").length;
            const active = w.id === activeWS;
            return (
              <button key={w.id} onClick={() => switchWorkspace(w.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 6px", borderRadius: 9, marginBottom: 2, background: active ? "rgba(124,58,237,0.25)" : "transparent", border: active ? "1px solid rgba(124,58,237,0.35)" : "1px solid transparent", cursor: "pointer" }}>
                <Avatar initials={w.avatar} color={w.color} size={28} />
                {sidebarOpen && <>
                  <div style={{ flex: 1, textAlign: "left", overflow: "hidden" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: active ? "#fff" : "rgba(255,255,255,0.65)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{w.industry}</div>
                  </div>
                  {wP > 0 && <span style={{ background: BRAND.primary, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px", flexShrink: 0 }}>{wP}</span>}
                </>}
              </button>
            );
          })}
          <button onClick={() => setShowNewWS(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "6px 6px", borderRadius: 9, marginTop: 2, background: "transparent", border: "1px dashed rgba(255,255,255,0.1)", cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px dashed rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>+</span>
            </div>
            {sidebarOpen && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>New workspace</span>}
          </button>
        </div>

        <div style={{ padding: "8px 8px", flex: 1, overflowY: "auto" }}>
          {sidebarOpen && <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, marginBottom: 6, paddingLeft: 4, marginTop: 4 }}>MENU</div>}
          {NAV.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 8px", borderRadius: 9, marginBottom: 1, background: active ? "rgba(124,58,237,0.2)" : "transparent", border: "none", cursor: "pointer", position: "relative" }}>
                <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: "center" }}>{n.icon}</span>
                {sidebarOpen && <span style={{ fontSize: 13, color: active ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: active ? 600 : 400 }}>{n.label}</span>}
                {n.badge && n.badge > 0 && <span style={{ marginLeft: "auto", background: BRAND.primary, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>{n.badge}</span>}
                {active && <div style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 3, background: BRAND.primary, borderRadius: "0 3px 3px 0" }} />}
              </button>
            );
          })}
        </div>

        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {sidebarOpen && totalPending > 0 && <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 9, padding: "8px 10px", marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: BRAND.primaryL, fontWeight: 600 }}>{totalPending} pending approval{totalPending > 1 ? "s" : ""}</div>
          </div>}
          <button onClick={() => signOut({ callbackUrl: "/" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "7px 6px", borderRadius: 9, background: "transparent", border: "none", cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "#fff", fontWeight: 700 }}>{userInitials}</div>
            {sidebarOpen && <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{userName}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Sign out</div>
            </div>}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: BRAND.white, borderBottom: `1px solid ${BRAND.border}`, padding: "0 24px", display: "flex", alignItems: "center", height: 58, gap: 12, flexShrink: 0, position: "relative" }}>
          {/* Hamburger — only show here when sidebar is OPEN */}
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} style={{ marginRight: 8, background: "none", border: "none", color: BRAND.textS, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {ws && <Avatar initials={ws.avatar} color={ws.color} size={32} />}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text }}>{ws?.name}</div>
              <div style={{ fontSize: 11, color: BRAND.textT }}>{ws?.industry}</div>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button onClick={() => setShowNewPost(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginRight: 8 }}>+ {t("Create Post","Maak Post")}</button>

            {/* Support */}
            <button onClick={() => { setShowSupport(o => !o); setShowNews(false); }} title="Support" style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showSupport ? BRAND.primaryL : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Headphones size={18} color={showSupport ? BRAND.primary : BRAND.textS} />
            </button>

            {/* News */}
            <button onClick={() => { setShowNews(o => !o); setShowSupport(false); }} title="What's new" style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showNews ? BRAND.primaryL : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Newspaper size={18} color={showNews ? BRAND.primary : BRAND.textS} />
            </button>

            {/* Dark mode */}
            <button onClick={() => setDarkMode(o => !o)} title="Dark mode" style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: darkMode ? BRAND.primaryL : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {darkMode ? <Sun size={18} color={BRAND.primary} /> : <Moon size={18} color={BRAND.textS} />}
            </button>

            {/* Language */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowLangMenu(o => !o)} title="Language" style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showLangMenu ? BRAND.primaryL : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Globe size={18} color={showLangMenu ? BRAND.primary : BRAND.textS} />
              </button>
              {showLangMenu && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", overflow: "hidden", zIndex: 200, minWidth: 150 }}>
                  {[{ code: "en", label: "🇬🇧 English" }, { code: "nl", label: "🇳🇱 Nederlands" }].map(l => (
                    <button key={l.code} onClick={() => { setLanguage(l.code as any); setShowLangMenu(false); }} style={{ width: "100%", padding: "10px 16px", background: language === l.code ? BRAND.primaryL : "none", border: "none", cursor: "pointer", fontSize: 13, color: language === l.code ? BRAND.primary : BRAND.text, textAlign: "left", fontWeight: language === l.code ? 700 : 400 }}>{l.label}</button>
                  ))}
                </div>
              )}
            </div>

            {/* User menu */}
            <div style={{ position: "relative", marginLeft: 4 }}>
              <button onClick={() => setShowUserMenu(o => !o)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: `1px solid ${BRAND.border}`, borderRadius: 10, padding: "5px 10px", cursor: "pointer" }}>
                {session.user?.image
                  ? <img src={session.user.image} style={{ width: 30, height: 30, borderRadius: "50%" }} alt="avatar" />
                  : <div style={{ width: 30, height: 30, borderRadius: "50%", background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{userInitials}</div>
                }
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: BRAND.text }}>{userName}</div>
                  <div style={{ fontSize: 10, color: BRAND.textT }}>{userEmail}</div>
                </div>
                <span style={{ fontSize: 12, color: BRAND.textT }}>▾</span>
              </button>
              {showUserMenu && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", width: 220, zIndex: 200, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: `1px solid ${BRAND.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                    {session.user?.image
                      ? <img src={session.user.image} style={{ width: 38, height: 38, borderRadius: "50%" }} alt="avatar" />
                      : <div style={{ width: 38, height: 38, borderRadius: "50%", background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>{userInitials}</div>
                    }
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.text }}>{userName}</div>
                      <div style={{ fontSize: 11, color: BRAND.textT }}>{userEmail}</div>
                    </div>
                  </div>
                  {[
                    { icon: <Settings size={15} />, label: t("Company Settings","Bedrijfsinstellingen") },
                    { icon: <User size={15} />, label: t("User Settings","Gebruikersinstellingen") },
                    { icon: <CreditCard size={15} />, label: t("Billing","Facturering") },
                    { icon: <HelpCircle size={15} />, label: t("Help","Hulp") },
                    { icon: <Gift size={15} />, label: t("Affiliates","Affiliates") },
                  ].map(item => (
                    <button key={item.label} onClick={() => setShowUserMenu(false)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: BRAND.text, textAlign: "left" }}
                      onMouseEnter={e => (e.currentTarget.style.background = BRAND.bg)}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                      {item.icon}{item.label}
                    </button>
                  ))}
                  <div style={{ borderTop: `1px solid ${BRAND.border}` }}>
                    <button onClick={() => signOut({ callbackUrl: "/" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: BRAND.red, textAlign: "left" }}
                      onMouseEnter={e => (e.currentTarget.style.background = BRAND.redL)}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                      <LogOut size={15} color={BRAND.red} />{t("Logout","Uitloggen")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SUPPORT PANEL */}
          {showSupport && (
            <div style={{ position: "fixed", right: 0, top: 58, width: 360, height: "calc(100vh - 58px)", background: BRAND.white, borderLeft: `1px solid ${BRAND.border}`, boxShadow: "-4px 0 20px rgba(0,0,0,0.08)", zIndex: 200, overflowY: "auto" }}>
              <div style={{ padding: "20px", borderBottom: `1px solid ${BRAND.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: BRAND.text }}>🎧 {t("Support","Ondersteuning")}</div>
                <button onClick={() => setShowSupport(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: BRAND.textT }}>✕</button>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ background: BRAND.primaryL, borderRadius: 12, padding: "14px", marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.primary, marginBottom: 4 }}>📧 {t("Contact us","Neem contact op")}</div>
                  <div style={{ fontSize: 12, color: BRAND.textS }}>inspiredmarketingsr@gmail.com</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.text, marginBottom: 12 }}>FAQ</div>
                {[
                  { q: t("How do I create a post?","Hoe maak ik een post?"), a: t("Click '+ Create Post' in the top right corner.","Klik op '+ Maak Post' rechtsboven.") },
                  { q: t("How do I connect YouTube?","Hoe koppel ik YouTube?"), a: t("Go to Settings → Connected accounts → Click 'Connect' next to YouTube.","Ga naar Instellingen → Gekoppelde accounts → Klik op 'Verbinden' naast YouTube.") },
                  { q: t("How do I add a workspace?","Hoe voeg ik een workspace toe?"), a: t("Click '+ New workspace' in the sidebar.","Klik op '+ Nieuwe workspace' in de zijbalk.") },
                  { q: t("How does approval work?","Hoe werkt goedkeuring?"), a: t("Go to 'Approval' in the menu to approve or reject posts.","Ga naar 'Goedkeuring' in het menu om posts goed te keuren of af te wijzen.") },
                  { q: t("Can I upload images?","Kan ik afbeeldingen uploaden?"), a: t("Yes! When creating a post, click the image upload area.","Ja! Klik op het upload gebied bij het aanmaken van een post.") },
                ].map((faq, i) => (
                  <div key={i} style={{ background: "#F9FAFB", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.text, marginBottom: 6 }}>❓ {faq.q}</div>
                    <div style={{ fontSize: 12, color: BRAND.textS, lineHeight: 1.6 }}>{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEWS PANEL */}
          {showNews && (
            <div style={{ position: "fixed", right: 0, top: 58, width: 360, height: "calc(100vh - 58px)", background: BRAND.white, borderLeft: `1px solid ${BRAND.border}`, boxShadow: "-4px 0 20px rgba(0,0,0,0.08)", zIndex: 200, overflowY: "auto" }}>
              <div style={{ padding: "20px", borderBottom: `1px solid ${BRAND.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: BRAND.text }}>📰 {t("What's New","Wat is er nieuw")}</div>
                <button onClick={() => setShowNews(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: BRAND.textT }}>✕</button>
              </div>
              <div style={{ padding: "16px" }}>
                {[
                  { date: t("March 14, 2026","14 maart 2026"), title: t("Image uploads in posts","Afbeeldingen uploaden in posts"), desc: t("Upload images directly when creating a post.","Upload afbeeldingen direct bij het aanmaken van een post."), tag: "🆕 New" },
                  { date: t("March 13, 2026","13 maart 2026"), title: t("New calendar design","Nieuw kalender ontwerp"), desc: t("Month, week and day views with post thumbnails.","Maand, week en dag weergaven met post thumbnails."), tag: "✨ Improved" },
                  { date: t("March 13, 2026","13 maart 2026"), title: t("Supabase database","Supabase database"), desc: t("Posts and workspaces are now saved in a real database.","Posts en workspaces worden nu opgeslagen in een echte database."), tag: "🔧 Update" },
                  { date: t("March 12, 2026","12 maart 2026"), title: t("DropPost launched!","DropPost gelanceerd!"), desc: t("The first version of DropPost is live!","De eerste versie van DropPost is live!"), tag: "🚀 Launch" },
                ].map((item, i) => (
                  <div key={i} style={{ borderLeft: `3px solid ${BRAND.primary}`, paddingLeft: 14, marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, background: BRAND.primaryL, color: BRAND.primary, borderRadius: 5, padding: "2px 8px", fontWeight: 700 }}>{item.tag}</span>
                      <span style={{ fontSize: 11, color: BRAND.textT }}>{item.date}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: BRAND.textS, lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {page === "dashboard" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: BRAND.text, marginBottom: 4 }}>Dashboard</h1>
                <p style={{ fontSize: 13, color: BRAND.textT }}>Welcome back, {userName} — here's an overview of {ws?.name}</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
                {[
                  { label: "Total Posts", value: wsPosts.length, color: BRAND.primary, bg: BRAND.primaryL, icon: "✏️" },
                  { label: "Scheduled", value: scheduled.length, color: "#0EA5E9", bg: "#E0F2FE", icon: "📅" },
                  { label: "Published", value: published.length, color: BRAND.green, bg: BRAND.greenL, icon: "✓" },
                  { label: "Pending", value: pending.length, color: BRAND.amber, bg: BRAND.amberL, icon: "⏳" },
                ].map(s => (
                  <div key={s.label} style={{ background: BRAND.white, borderRadius: 14, padding: "18px 20px", border: `1px solid ${BRAND.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.textT, letterSpacing: 0.5 }}>{s.label.toUpperCase()}</div>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{s.icon}</div>
                    </div>
                    <div style={{ fontSize: 34, fontWeight: 900, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
                <div style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "20px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, marginBottom: 16 }}>Recent Posts</div>
                  {wsPosts.slice(0, 4).map((post: any) => (
                    <div key={post.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${BRAND.border}` }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: BRAND.primaryL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
                        {post.status === "published" ? "✅" : post.status === "draft" ? "📝" : "📅"}
                      </div>
                      <div style={{ flex: 1, overflow: "hidden" }}>
                        <div style={{ fontSize: 13, color: BRAND.text, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", marginBottom: 5 }}>{post.content}</div>
                        <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
                          {post.platforms?.slice(0, 3).map((pid: string) => <PBadge key={pid} pid={pid} />)}
                          <span style={{ fontSize: 11, color: BRAND.textT }}>{post.scheduled_date}</span>
                        </div>
                      </div>
                      <StatusTag status={post.status} approval={post.approval} />
                    </div>
                  ))}
                  {wsPosts.length === 0 && <p style={{ fontSize: 13, color: BRAND.textT }}>No posts yet. Create your first post!</p>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "18px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, marginBottom: 14 }}>Platform breakdown</div>
                    {PLATFORMS.map(p => {
                      const count = wsPosts.filter((post: any) => post.platforms?.includes(p.id)).length;
                      const pct = wsPosts.length ? Math.round((count / wsPosts.length) * 100) : 0;
                      return (
                        <div key={p.id} style={{ marginBottom: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 12, color: BRAND.text, fontWeight: 500 }}>{p.label}</span>
                            <span style={{ fontSize: 12, color: BRAND.textT }}>{count}</span>
                          </div>
                          <div style={{ height: 5, background: "#F3F4F6", borderRadius: 4 }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: p.color, borderRadius: 4, transition: "width 0.3s" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ background: BRAND.gradBtn, borderRadius: 14, padding: "18px", color: "#fff" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Queue times today</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {QUEUE_TIMES.map(t => (
                        <span key={t} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 7, padding: "4px 10px", fontSize: 12, fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === "posts" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text }}>All Posts</h1>
                <button onClick={() => setShowNewPost(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Create Post</button>
              </div>
              {wsPosts.length === 0 && <div style={{ textAlign: "center", padding: "4rem 0", color: BRAND.textT }}><div style={{ fontSize: 48, marginBottom: 12 }}>📭</div><div style={{ fontSize: 16, fontWeight: 600, color: BRAND.textS }}>No posts yet</div></div>}
              {wsPosts.map((post: any) => (
                <div key={post.id} style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: "0 0 10px", fontSize: 14, color: BRAND.text, lineHeight: 1.6 }}>{post.content}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                        {post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} />)}
                        <span style={{ fontSize: 11, color: BRAND.textT }}>• {post.scheduled_date} at {post.scheduled_time}</span>
                        <StatusTag status={post.status} approval={post.approval} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      {post.approval === "pending" && post.status !== "draft" && <button onClick={() => approvePost(post.id, "approved")} style={{ fontSize: 12, background: BRAND.greenL, color: BRAND.green, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600 }}>✓</button>}
                      <button onClick={() => deletePost(post.id)} style={{ fontSize: 12, background: BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600 }}>✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {page === "calendar" && (() => {
            const today = new Date();
            const yr = calDate.getFullYear();
            const mo = calDate.getMonth();
            const monthName = calDate.toLocaleString("en", { month: "long" });
            const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

            function navigate(dir: number) {
              const d = new Date(calDate);
              if (calView === "month") d.setMonth(mo + dir);
              else if (calView === "week") d.setDate(d.getDate() + dir * 7);
              else d.setDate(d.getDate() + dir);
              setCalDate(d);
            }

            function headerLabel() {
              if (calView === "month") return `${monthName} ${yr}`;
              if (calView === "week") {
                const start = new Date(calDate);
                start.setDate(calDate.getDate() - calDate.getDay());
                const end = new Date(start); end.setDate(start.getDate() + 6);
                return `${start.toLocaleString("en",{month:"short"})} ${start.getDate()} – ${end.getDate()}, ${yr}`;
              }
              return calDate.toLocaleString("en", { month: "long", day: "numeric", year: "numeric" });
            }

            const btnStyle = (active: boolean) => ({
              padding: "7px 16px", borderRadius: 8, border: "none",
              background: active ? "#0D9488" : "#E0F2F1",
              color: active ? "#fff" : "#0D9488",
              fontSize: 13, fontWeight: 600, cursor: "pointer"
            });

            const arrowStyle = {
              width: 32, height: 32, borderRadius: 8, border: "none",
              background: "#E0F2F1", color: "#0D9488", fontSize: 16,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            } as any;

            // MONTH VIEW
            const firstDay = new Date(yr, mo, 1).getDay();
            const daysInMonth = new Date(yr, mo + 1, 0).getDate();
            const cells = Array.from({ length: 42 }, (_, i) => {
              const day = i - firstDay + 1;
              return day >= 1 && day <= daysInMonth ? day : null;
            });

            // WEEK VIEW
            const weekStart = new Date(calDate);
            weekStart.setDate(calDate.getDate() - calDate.getDay());
            const weekDays = Array.from({ length: 7 }, (_, i) => {
              const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d;
            });

            const HOURS = Array.from({ length: 18 }, (_, i) => `${String(i + 6).padStart(2, "0")}:00`);

            function postsForDate(date: Date) {
              const str = date.toISOString().split("T")[0];
              return wsPosts.filter((p: any) => p.scheduled_date === str);
            }

            function PostThumb({ post }: any) {
              const isToday = post.scheduled_date === today.toISOString().split("T")[0];
              return (
                <div style={{ borderRadius: 10, overflow: "hidden", border: `2px solid ${post.approval === "approved" ? "#10B981" : BRAND.primary}`, background: "#fff", marginBottom: 4, cursor: "pointer", position: "relative" }}>
                  {post.image_url
                    ? <img src={post.image_url} style={{ width: "100%", height: 70, objectFit: "cover", display: "block" }} />
                    : <div style={{ width: "100%", height: 70, background: BRAND.primaryL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📝</div>
                  }
                  {/* Time + avatar */}
                  <div style={{ position: "absolute", top: 4, left: 4, background: "rgba(0,0,0,0.6)", borderRadius: 5, padding: "2px 6px", fontSize: 10, color: "#fff", fontWeight: 700 }}>{post.scheduled_time?.slice(0,5)}</div>
                  {post.approval === "approved" && <div style={{ position: "absolute", top: 4, right: 4, background: BRAND.green, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>}
                  {/* Platforms */}
                  <div style={{ display: "flex", gap: 3, padding: "3px 4px", background: "#fff" }}>
                    {post.platforms?.slice(0,3).map((pid: string) => <PBadge key={pid} pid={pid} />)}
                  </div>
                </div>
              );
            }

            return (
              <div>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: BRAND.text, minWidth: 160 }}>{headerLabel()}</span>
                  <button style={btnStyle(false)} onClick={() => setCalDate(new Date())}>Today</button>
                  <button style={btnStyle(calView === "day")} onClick={() => setCalView("day")}>Day</button>
                  <button style={btnStyle(calView === "week")} onClick={() => setCalView("week")}>Week</button>
                  <button style={btnStyle(calView === "month")} onClick={() => setCalView("month")}>Month</button>
                  <button style={arrowStyle} onClick={() => navigate(-1)}>‹</button>
                  <button style={arrowStyle} onClick={() => navigate(1)}>›</button>
                  <div style={{ flex: 1 }} />
                  <button onClick={() => setShowNewPost(true)} style={{ background: "#0D9488", color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Create Post</button>
                </div>

                {/* MONTH VIEW */}
                {calView === "month" && (
                  <div style={{ background: BRAND.white, borderRadius: 16, border: `1px solid ${BRAND.border}`, overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${BRAND.border}` }}>
                      {DAYS_SHORT.map(d => <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 700, color: BRAND.textT }}>{d}</div>)}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
                      {cells.map((day, i) => {
                        const date = day ? new Date(yr, mo, day) : null;
                        const isToday = date ? date.toDateString() === today.toDateString() : false;
                        const isWeekend = i % 7 === 0 || i % 7 === 6;
                        const dayPosts = date ? postsForDate(date) : [];
                        return (
                          <div key={i} style={{ minHeight: 110, padding: "6px 4px", borderRight: `1px solid ${BRAND.border}`, borderBottom: `1px solid ${BRAND.border}`, background: isWeekend ? "#F0FDFA" : (date?.getMonth() !== mo ? "#F9FAFB" : "#fff") }}>
                            {day && <div style={{ fontSize: 13, fontWeight: isToday ? 800 : 500, color: isToday ? "#0D9488" : BRAND.textS, marginBottom: 4, textAlign: "right", paddingRight: 4 }}>{day}</div>}
                            {dayPosts.map((post: any) => <PostThumb key={post.id} post={post} />)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* WEEK VIEW */}
                {calView === "week" && (
                  <div style={{ background: BRAND.white, borderRadius: 16, border: `1px solid ${BRAND.border}`, overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7,1fr)", borderBottom: `1px solid ${BRAND.border}` }}>
                      <div style={{ background: "#F9FAFB" }} />
                      {weekDays.map((d, i) => {
                        const isToday = d.toDateString() === today.toDateString();
                        return (
                          <div key={i} style={{ padding: "10px 8px", textAlign: "center", borderLeft: `1px solid ${BRAND.border}`, background: isToday ? "#E0F2F1" : "#F9FAFB" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.textT }}>{DAYS_SHORT[d.getDay()]}</div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: isToday ? "#0D9488" : BRAND.text }}>{d.getDate()}</div>
                          </div>
                        );
                      })}
                    </div>
                    {HOURS.map(hour => (
                      <div key={hour} style={{ display: "grid", gridTemplateColumns: "60px repeat(7,1fr)", borderBottom: `1px solid #F3F4F6`, minHeight: 60 }}>
                        <div style={{ padding: "4px 8px", fontSize: 11, color: BRAND.textT, borderRight: `1px solid ${BRAND.border}`, background: "#FAFAFA", paddingTop: 6 }}>{hour}</div>
                        {weekDays.map((d, di) => {
                          const dayPosts = postsForDate(d).filter((p: any) => p.scheduled_time?.startsWith(hour.slice(0,2)));
                          return (
                            <div key={di} style={{ borderLeft: `1px solid #F3F4F6`, padding: "3px 4px" }}>
                              {dayPosts.map((post: any) => <PostThumb key={post.id} post={post} />)}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {/* DAY VIEW */}
                {calView === "day" && (
                  <div style={{ background: BRAND.white, borderRadius: 16, border: `1px solid ${BRAND.border}`, overflow: "hidden" }}>
                    <div style={{ padding: "14px 20px", borderBottom: `1px solid ${BRAND.border}`, background: "#E0F2F1", textAlign: "center" }}>
                      <span style={{ fontSize: 24, fontWeight: 800, color: "#0D9488" }}>{calDate.getDate()}</span>
                      <span style={{ fontSize: 14, color: BRAND.textT, marginLeft: 8 }}>/ {DAYS_SHORT[calDate.getDay()]}</span>
                    </div>
                    {HOURS.map(hour => {
                      const dayPosts = postsForDate(calDate).filter((p: any) => p.scheduled_time?.startsWith(hour.slice(0,2)));
                      return (
                        <div key={hour} style={{ display: "grid", gridTemplateColumns: "60px 1fr", borderBottom: `1px solid #F3F4F6`, minHeight: 60 }}>
                          <div style={{ padding: "6px 8px", fontSize: 11, color: BRAND.textT, borderRight: `1px solid ${BRAND.border}`, background: "#FAFAFA" }}>{hour}</div>
                          <div style={{ padding: "4px 8px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {dayPosts.map((post: any) => <PostThumb key={post.id} post={post} />)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {page === "queue" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text, marginBottom: 6 }}>Queue</h1>
              <p style={{ fontSize: 13, color: BRAND.textT, marginBottom: 20 }}>Posts will be automatically published at these times.</p>
              <div style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "20px", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, marginBottom: 14 }}>Today's queue slots</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {QUEUE_TIMES.map(t => (
                    <div key={t} style={{ background: BRAND.primaryL, border: `1px solid ${BRAND.primary}30`, borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: BRAND.primary }}>{t}</div>
                      <div style={{ fontSize: 11, color: BRAND.textT, marginTop: 2 }}>
                        {scheduled.find((p: any) => p.scheduled_time?.startsWith(t.slice(0, 2))) ? "1 post" : "Empty"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {scheduled.map((post: any) => (
                <div key={post.id} style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: BRAND.primaryL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📅</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: BRAND.text, marginBottom: 4 }}>{post.content.slice(0, 80)}…</div>
                    <div style={{ display: "flex", gap: 5 }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} />)}<span style={{ fontSize: 11, color: BRAND.textT }}>{post.scheduled_date} · {post.scheduled_time}</span></div>
                  </div>
                  <StatusTag status={post.status} approval={post.approval} />
                </div>
              ))}
            </div>
          )}

          {page === "drafts" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text, marginBottom: 20 }}>Drafts</h1>
              {drafts.length === 0 ? <div style={{ textAlign: "center", padding: "3rem 0", color: BRAND.textT }}><div style={{ fontSize: 40, marginBottom: 8 }}>📝</div><div>No drafts yet</div></div>
                : drafts.map((post: any) => (
                  <div key={post.id} style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: BRAND.text, marginBottom: 5 }}>{post.content}</div>
                      <div style={{ display: "flex", gap: 5 }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} />)}</div>
                    </div>
                    <button onClick={() => deletePost(post.id)} style={{ fontSize: 12, background: BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer" }}>Delete</button>
                  </div>
                ))}
            </div>
          )}

          {page === "approval" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text, marginBottom: 6 }}>Approval</h1>
              <p style={{ fontSize: 13, color: BRAND.textT, marginBottom: 20 }}>Review and approve posts before they go live.</p>
              {pending.length === 0 ? <div style={{ textAlign: "center", padding: "4rem 0" }}><div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div><div style={{ fontSize: 16, fontWeight: 700, color: BRAND.text }}>All caught up!</div></div>
                : pending.map((post: any) => (
                  <div key={post.id} style={{ background: BRAND.white, border: `1.5px solid ${BRAND.amber}50`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
                    <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6, color: BRAND.text }}>{post.content}</p>
                    <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                      {post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} />)}
                      <span style={{ fontSize: 12, color: BRAND.textT }}>{post.scheduled_date} · {post.scheduled_time}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => approvePost(post.id, "approved")} style={{ flex: 1, padding: "10px", background: BRAND.greenL, color: BRAND.green, border: `1px solid ${BRAND.green}40`, borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>✓ Approve</button>
                      <button onClick={() => approvePost(post.id, "rejected")} style={{ flex: 1, padding: "10px", background: BRAND.redL, color: BRAND.red, border: `1px solid ${BRAND.red}40`, borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>✕ Reject</button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {page === "analytics" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text, marginBottom: 20 }}>Analytics</h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
                {[
                  { label: "Total Reach", value: "12,450", change: "+18%", color: BRAND.primary },
                  { label: "Engagement Rate", value: "4.8%", change: "+2.1%", color: BRAND.green },
                  { label: "Posts This Month", value: wsPosts.length.toString(), change: "+3", color: "#0EA5E9" },
                ].map(s => (
                  <div key={s.label} style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "18px 20px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.textT, marginBottom: 10 }}>{s.label.toUpperCase()}</div>
                    <div style={{ fontSize: 30, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: BRAND.green, fontWeight: 600 }}>{s.change} this month</div>
                  </div>
                ))}
              </div>
              <div style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, marginBottom: 16 }}>Performance by platform</div>
                {PLATFORMS.map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.text, width: 90 }}>{p.label}</span>
                    <div style={{ flex: 1, height: 8, background: "#F3F4F6", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${Math.random() * 80 + 10}%`, background: p.color, borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 12, color: BRAND.textT, width: 60, textAlign: "right" }}>{Math.floor(Math.random() * 5000 + 500).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {page === "media" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text, marginBottom: 6 }}>Media Library</h1>
              <p style={{ fontSize: 13, color: BRAND.textT, marginBottom: 20 }}>Manage your images, videos and files.</p>
              <div style={{ background: BRAND.white, border: `2px dashed ${BRAND.border}`, borderRadius: 14, padding: "40px", textAlign: "center", marginBottom: 20, cursor: "pointer" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📁</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.text, marginBottom: 4 }}>Drop files here or click to upload</div>
                <div style={{ fontSize: 13, color: BRAND.textT }}>PNG, JPG, GIF, MP4 up to 100MB</div>
              </div>
            </div>
          )}

          {page === "team" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text, marginBottom: 20 }}>Team</h1>
              <div style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
                {session.user?.image
                  ? <img src={session.user.image} style={{ width: 40, height: 40, borderRadius: "50%" }} alt="avatar" />
                  : <Avatar initials={userInitials} color={BRAND.primary} size={40} />
                }
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text }}>{userName}</div>
                  <div style={{ fontSize: 12, color: BRAND.textT }}>{userEmail}</div>
                </div>
                <Tag label="Admin" color={BRAND.primary} bg={BRAND.primaryL} />
              </div>
              <button style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>+ Invite team member</button>
            </div>
          )}

          {page === "settings" && (
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: BRAND.text, marginBottom: 20 }}>Settings</h1>

              {/* Connected accounts */}
              <div style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "18px", marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, marginBottom: 12 }}>Connected accounts</div>
                {[
                  { id: "youtube", label: "YouTube", color: "#FF0000", icon: "▶", description: "Post videos & Shorts" },
                  { id: "facebook", label: "Facebook Pages", color: "#1877F2", icon: "f", description: "Post to Facebook Pages" },
                  { id: "instagram", label: "Instagram", color: "#E1306C", icon: "ig", description: "Post photos & Reels" },
                  { id: "tiktok", label: "TikTok", color: "#010101", icon: "tt", description: "Post videos" },
                  { id: "snapchat", label: "Snapchat", color: "#FFCE00", icon: "sc", description: "Post Stories" },
                ].map(platform => (
                  <div key={platform.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid #F3F4F6` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: platform.color + "15", border: `1px solid ${platform.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: platform.color, fontWeight: 700 }}>{platform.icon}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.text }}>{platform.label}</div>
                        <div style={{ fontSize: 11, color: BRAND.textT }}>{platform.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (platform.id === "youtube") {
                          signIn("google", {
                            callbackUrl: "/",
                            scope: "openid email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload"
                          } as any);
                        }
                      }}
                      style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${platform.id === "youtube" ? platform.color : BRAND.border}`, background: platform.id === "youtube" ? platform.color + "10" : "transparent", color: platform.id === "youtube" ? platform.color : BRAND.textT, cursor: platform.id === "youtube" ? "pointer" : "default", fontWeight: 600 }}>
                      {platform.id === "youtube" ? "Connect →" : "Coming soon"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Other settings */}
              {[
                { title: "Account", items: ["Profile", "Email & Password", "Two-factor authentication"] },
                { title: "Workspace", items: ["Workspace name", "Logo & branding", "Delete workspace"] },
                { title: "Billing", items: ["Current plan", "Payment method", "Invoices"] },
                { title: "Notifications", items: ["Email notifications", "Push notifications", "Approval alerts"] },
              ].map(section => (
                <div key={section.title} style={{ background: BRAND.white, border: `1px solid ${BRAND.border}`, borderRadius: 14, padding: "18px", marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text, marginBottom: 12 }}>{section.title}</div>
                  {section.items.map(item => (
                    <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid #F3F4F6` }}>
                      <span style={{ fontSize: 13, color: BRAND.text }}>{item}</span>
                      <span style={{ fontSize: 13, color: BRAND.primary, cursor: "pointer", fontWeight: 600 }}>Edit →</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {showNewPost && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
          <div style={{ background: BRAND.white, borderRadius: 20, padding: "24px", width: "min(560px,100%)", boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 18, color: BRAND.text }}>Create new post</div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: BRAND.textS, display: "block", marginBottom: 6 }}>POST TYPE</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["post", "story", "reel", "video"].map(t => (
                  <button key={t} onClick={() => setDraft(d => ({ ...d, type: t }))} style={{ padding: "6px 14px", borderRadius: 8, border: draft.type === t ? `2px solid ${BRAND.primary}` : `1px solid ${BRAND.border}`, background: draft.type === t ? BRAND.primaryL : "transparent", color: draft.type === t ? BRAND.primary : BRAND.textS, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: BRAND.textS, display: "block", marginBottom: 6 }}>PLATFORMS</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PLATFORMS.map(p => (
                  <button key={p.id} onClick={() => setDraft(d => ({ ...d, platforms: d.platforms.includes(p.id) ? d.platforms.filter(x => x !== p.id) : [...d.platforms, p.id] }))} style={{ border: draft.platforms.includes(p.id) ? `2px solid ${p.color}` : `1px solid ${BRAND.border}`, background: draft.platforms.includes(p.id) ? p.bg : "transparent", color: draft.platforms.includes(p.id) ? p.color : BRAND.textS, borderRadius: 9, padding: "7px 14px", fontSize: 13, cursor: "pointer", fontWeight: draft.platforms.includes(p.id) ? 700 : 400 }}>{p.label}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: BRAND.textS, display: "block", marginBottom: 6 }}>IMAGE</label>
              {draft.image_url
                ? <div style={{ position: "relative", marginBottom: 8 }}>
                    <img src={draft.image_url} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10, border: `1px solid ${BRAND.border}` }} />
                    <button onClick={() => setDraft(d => ({ ...d, image_url: "" }))} style={{ position: "absolute", top: 8, right: 8, background: BRAND.red, color: "#fff", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontSize: 12 }}>✕ Remove</button>
                  </div>
                : <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "20px", borderRadius: 10, border: `2px dashed ${BRAND.border}`, cursor: "pointer", background: "#FAFAFA" }}>
                    <span style={{ fontSize: 20 }}>📁</span>
                    <span style={{ fontSize: 13, color: BRAND.textS }}>{uploading ? "Uploading..." : "Click to upload image"}</span>
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => {
                      const file = e.target.files?.[0];
                      if (file) { const url = await uploadImage(file); if (url) setDraft(d => ({ ...d, image_url: url })); }
                    }} />
                  </label>
              }
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: BRAND.textS, display: "block", marginBottom: 6 }}>CONTENT</label>
              <textarea value={draft.content} onChange={e => setDraft(d => ({ ...d, content: e.target.value }))} placeholder="Write your post content here..." style={{ width: "100%", minHeight: 120, boxSizing: "border-box", borderRadius: 10, border: `1px solid ${BRAND.border}`, padding: "10px 12px", fontSize: 14, resize: "vertical", fontFamily: "inherit" }} />
              <div style={{ fontSize: 12, color: draft.content.length > 280 ? BRAND.red : BRAND.textT, textAlign: "right", marginTop: 4 }}>{draft.content.length}/280</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: BRAND.textS, display: "block", marginBottom: 6 }}>DATE</label>
                <input type="date" value={draft.date} onChange={e => setDraft(d => ({ ...d, date: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${BRAND.border}`, fontSize: 14, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: BRAND.textS, display: "block", marginBottom: 6 }}>TIME</label>
                <input type="time" value={draft.time} onChange={e => setDraft(d => ({ ...d, time: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${BRAND.border}`, fontSize: 14, boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowNewPost(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${BRAND.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: BRAND.textS }}>Cancel</button>
              <button onClick={() => { setDraft(d => ({ ...d, status: "draft" })); addPost(); }} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${BRAND.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: BRAND.textS, fontWeight: 600 }}>Save draft</button>
              <button onClick={addPost} disabled={!draft.content || !draft.date || draft.platforms.length === 0} style={{ flex: 2, padding: "11px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: (!draft.content || !draft.date || draft.platforms.length === 0) ? 0.45 : 1 }}>Schedule Post</button>
            </div>
          </div>
        </div>
      )}

      {/* NEW WORKSPACE MODAL */}
      {showNewWS && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
          <div style={{ background: BRAND.white, borderRadius: 20, padding: "24px", width: "min(440px,100%)", boxSizing: "border-box" }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 18, color: BRAND.text }}>New workspace</div>
            <input value={newWS.name} onChange={e => setNewWS(w => ({ ...w, name: e.target.value }))} placeholder="Company name" style={{ width: "100%", marginBottom: 12, padding: "11px 13px", borderRadius: 9, border: `1px solid ${BRAND.border}`, fontSize: 14, boxSizing: "border-box" }} />
            <input value={newWS.industry} onChange={e => setNewWS(w => ({ ...w, industry: e.target.value }))} placeholder="Industry" style={{ width: "100%", marginBottom: 16, padding: "11px 13px", borderRadius: 9, border: `1px solid ${BRAND.border}`, fontSize: 14, boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {WORKSPACE_COLORS.map(col => (
                <button key={col} onClick={() => setNewWS(w => ({ ...w, color: col }))} style={{ width: 32, height: 32, borderRadius: "50%", background: col, border: newWS.color === col ? "3px solid #111" : "3px solid transparent", cursor: "pointer", padding: 0 }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowNewWS(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${BRAND.border}`, background: "transparent", cursor: "pointer", fontSize: 14 }}>Cancel</button>
              <button onClick={addWorkspace} disabled={!newWS.name} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: !newWS.name ? 0.45 : 1 }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}