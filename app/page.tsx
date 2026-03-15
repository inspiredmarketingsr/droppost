"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { Settings, User, CreditCard, HelpCircle, Gift, LogOut, Headphones, Newspaper, Moon, Sun, Globe, LayoutDashboard, Calendar, PenLine, Clock, FileText, CheckSquare, BarChart2, Image, Users, CheckCircle, Clock3, AlertCircle, Upload, GripVertical } from "lucide-react";

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

function useTheme(dm: boolean) {
  if (!dm) return { bg: BRAND.bg, card: BRAND.white, text: BRAND.text, textS: BRAND.textS, textT: BRAND.textT, border: BRAND.border, inputBg: BRAND.white, inputBorder: BRAND.border, headerBg: BRAND.white, modalBg: BRAND.white, hoverBg: "#F3F4F6", codeBg: "#F9FAFB", tagBg: BRAND.primaryL, calWeekend: "#F0FDFA", calHeader: "#F9FAFB", calToday: "#E0F2F1" };
  return { bg: "#0B0B14", card: "#16162A", text: "#E5E7EB", textS: "#9CA3AF", textT: "#6B7280", border: "#2A2A40", inputBg: "#1E1E35", inputBorder: "#3A3A55", headerBg: "#111125", modalBg: "#1A1A30", hoverBg: "#1E1E35", codeBg: "#12121F", tagBg: "rgba(124,58,237,0.2)", calWeekend: "#12122A", calHeader: "#14142A", calToday: "rgba(13,148,136,0.15)" };
}

const PLATFORMS = [
  { id: "facebook", label: "Facebook", short: "FB", color: "#1877F2", bg: "#EBF5FF" },
  { id: "instagram", label: "Instagram", short: "IG", color: "#E1306C", bg: "#FDE8F0" },
  { id: "tiktok", label: "TikTok", short: "TT", color: "#010101", bg: "#F3F3F3" },
  { id: "snapchat", label: "Snapchat", short: "SC", color: "#FFCE00", bg: "#FFFBEB" },
  { id: "youtube", label: "YouTube", short: "YT", color: "#FF0000", bg: "#FFF0F0" },
];
const WORKSPACE_COLORS = [BRAND.primary, "#10B981", "#F59E0B", "#E1306C", "#1877F2", "#06B6D4"];
const QUEUE_TIMES = ["09:00", "12:00", "15:00", "18:00", "21:00"];
const pl = (id: string) => PLATFORMS.find(p => p.id === id);

function Avatar({ initials, color, size = 36 }: any) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: color + "22", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.3, fontWeight: 800, color, flexShrink: 0 }}>{initials}</div>;
}
function PBadge({ pid, dark }: any) { const p = pl(pid); if (!p) return null; return <span style={{ fontSize: 11, background: dark ? p.color + "20" : p.bg, color: p.color, borderRadius: 5, padding: "2px 6px", fontWeight: 700, border: `1px solid ${p.color}20` }}>{p.short}</span>; }
function Tag({ label, color, bg }: any) { return <span style={{ fontSize: 11, background: bg, color, borderRadius: 20, padding: "2px 9px", fontWeight: 600 }}>{label}</span>; }
function StatusTag({ status, approval }: any) {
  if (status === "published") return <Tag label="Published" color={BRAND.green} bg={BRAND.greenL} />;
  if (status === "draft") return <Tag label="Draft" color={BRAND.textS} bg={BRAND.border} />;
  if (approval === "pending") return <Tag label="Pending" color={BRAND.amber} bg={BRAND.amberL} />;
  if (approval === "rejected") return <Tag label="Rejected" color={BRAND.red} bg={BRAND.redL} />;
  return <Tag label="Scheduled" color={BRAND.primary} bg={BRAND.primaryL} />;
}

function DraggableQueueItem({ post, index, onDragStart, onDragOver, onDrop, isDragging, dragOverIndex, theme, dark }: any) {
  const isOver = dragOverIndex === index;
  return (
    <div draggable onDragStart={(e: any) => onDragStart(e, index)} onDragOver={(e: any) => onDragOver(e, index)} onDrop={(e: any) => onDrop(e, index)}
      style={{ background: theme.card, border: `1.5px solid ${isOver ? BRAND.primary : theme.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center", opacity: isDragging === index ? 0.45 : 1, cursor: "grab" }}>
      <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 2, color: theme.textT, flexShrink: 0 }}><GripVertical size={18} /><span style={{ fontSize: 10, fontWeight: 700, color: BRAND.primary }}>#{index + 1}</span></div>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: dark ? "rgba(124,58,237,0.15)" : BRAND.primaryL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Clock3 size={20} color={BRAND.primary} /></div>
      <div style={{ flex: 1, overflow: "hidden" }}><div style={{ fontSize: 13, color: theme.text, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.content}</div><div style={{ display: "flex", gap: 5, flexWrap: "wrap" as const, alignItems: "center" }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={dark} />)}<span style={{ fontSize: 11, color: theme.textT }}>{post.scheduled_date} · {post.scheduled_time}</span></div></div>
      <StatusTag status={post.status} approval={post.approval} />
    </div>
  );
}

function LoginPage({ onGoRegister }: any) {
  const [email, setEmail] = useState(""); const [pass, setPass] = useState("");
  return (
    <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>D</span></div><span style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span></div>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Welcome back</h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Sign in to manage your social media</p>
          </div>
          <div style={{ marginBottom: 16 }}><label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Email</label><input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" type="email" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, boxSizing: "border-box" }} /></div>
          <div style={{ marginBottom: 24 }}><label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Password</label><input value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" type="password" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, boxSizing: "border-box" }} /></div>
          <button onClick={() => signIn("credentials", { email, password: pass, callbackUrl: "/" })} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>Sign in</button>
          <button onClick={() => signIn("google", { callbackUrl: "/" })} style={{ width: "100%", padding: "11px", borderRadius: 10, border: "1px solid #dadce0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span style={{ fontSize: 14, fontWeight: 600, color: "#3c4043" }}>Sign in with</span><img src="/google-logo.png" alt="Google" style={{ height: 20 }} /></button>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", marginTop: 24 }}>No account? <button onClick={onGoRegister} style={{ background: "none", border: "none", color: BRAND.accent, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Sign up free</button></p>
        </div>
      </div>
      <div style={{ flex: 1, background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", textAlign: "center" }}><div style={{ fontSize: 56, marginBottom: 20 }}>🚀</div><h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Schedule smarter.</h2><p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7 }}>Plan, approve and publish across 5 platforms — all in one place.</p></div>
      </div>
    </div>
  );
}

function RegisterPage({ onGoLogin }: any) {
  return (
    <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}><div style={{ width: 40, height: 40, borderRadius: 12, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>D</span></div><span style={{ color: "#fff", fontWeight: 800, fontSize: 22 }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span></div>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Create your account</h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 28 }}>14-day free trial. No credit card required.</p>
        <div style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>🎁 14 days free — then from <strong style={{ color: "#fff" }}>SRD 45/month</strong></div>
        <button onClick={() => signIn("google", { callbackUrl: "/" })} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>Create free account</button>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center" }}>Have an account? <button onClick={onGoLogin} style={{ background: "none", border: "none", color: BRAND.accent, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Sign in</button></p>
      </div>
    </div>
  );
}

export default function App() {
  const { data: session, status } = useSession();
  const [screen, setScreen] = useState<"login" | "register">("login");
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [posts, setPosts] = useState<Record<string, any[]>>({});
  const [activeWS, setActiveWS] = useState<string | null>(null);
  const [page, setPage] = useState("dashboard");
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewWS, setShowNewWS] = useState(false);
  const [draft, setDraft] = useState({ content: "", platforms: [] as string[], date: "", time: "12:00", type: "post", image_url: "", video_url: "" });
  const [publishing, setPublishing] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoAspect, setVideoAspect] = useState<"horizontal" | "vertical" | null>(null);
  const [newWS, setNewWS] = useState({ name: "", industry: "", color: WORKSPACE_COLORS[0] });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [calView, setCalView] = useState<"day" | "week" | "month">("month");
  const [calDate, setCalDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"en" | "nl">("en");
  const [showSupport, setShowSupport] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [ytChannels, setYtChannels] = useState<any[]>([]);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [showChannelPicker, setShowChannelPicker] = useState(false);

  const theme = useTheme(darkMode);
  const userEmail = session?.user?.email || "";
  const userName = session?.user?.name || "User";
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const t = (en: string, nl: string) => language === "nl" ? nl : en;

  useEffect(() => { if (session && workspaces.length === 0) loadWorkspaces(); }, [session]);

  async function loadWorkspaces() {
    setLoading(true);
    const { data } = await supabase.from("workspaces").select("*").eq("user_id", userEmail).order("created_at", { ascending: true });
    if (data && data.length > 0) { setWorkspaces(data); setActiveWS(data[0].id); await loadPosts(data[0].id); }
    else { const ini = userEmail.slice(0, 2).toUpperCase(); const { data: ws } = await supabase.from("workspaces").insert({ user_id: userEmail, name: "My Workspace", industry: "General", color: BRAND.primary, avatar: ini }).select().single(); if (ws) { setWorkspaces([ws]); setActiveWS(ws.id); } }
    setLoading(false);
  }
  async function loadPosts(wsId: string) { const { data } = await supabase.from("posts").select("*").eq("workspace_id", wsId).order("created_at", { ascending: false }); if (data) setPosts(prev => ({ ...prev, [wsId]: data })); }
  async function switchWorkspace(wsId: string) { setActiveWS(wsId); setPage("dashboard"); if (!posts[wsId]) await loadPosts(wsId); }

  async function uploadImage(file: File): Promise<string | null> {
    setUploadingImage(true);
    try { const fn = `${userEmail}/${Date.now()}-${file.name}`; const { error } = await supabase.storage.from("post-images").upload(fn, file, { upsert: true }); if (error) { alert("Image upload failed: " + error.message); setUploadingImage(false); return null; } const { data: u } = supabase.storage.from("post-images").getPublicUrl(fn); setUploadingImage(false); return u.publicUrl; }
    catch { alert("Upload failed"); setUploadingImage(false); return null; }
  }
  async function uploadVideo(file: File): Promise<string | null> {
    if (file.size > 256 * 1024 * 1024) { alert("Video too large (max 256MB)"); return null; }
    setUploadingVideo(true);
    try { const fn = `${userEmail}/videos/${Date.now()}-${file.name}`; const { error } = await supabase.storage.from("post-images").upload(fn, file, { upsert: true }); if (error) { alert("Video upload failed: " + error.message); setUploadingVideo(false); return null; } const { data: u } = supabase.storage.from("post-images").getPublicUrl(fn); setUploadingVideo(false); return u.publicUrl; }
    catch { alert("Upload failed"); setUploadingVideo(false); return null; }
  }

  async function publishToYouTube(post: any) {
    if (!post.video_url) { alert("No video attached"); return; }
    setPublishing(post.id);
    try {
      const wsData = workspaces.find(w => w.id === activeWS);
      const res = await fetch("/api/youtube/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: post.content.slice(0, 100), description: post.content, privacyStatus: "public", videoUrl: post.video_url, channelId: wsData?.youtube_channel_id || undefined }) });
      const data = await res.json();
      if (data.success) { await supabase.from("posts").update({ status: "published", youtube_id: data.videoId }).eq("id", post.id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].map(p => p.id === post.id ? { ...p, status: "published", youtube_id: data.videoId } : p) })); alert(`Published! ${data.url}`); }
      else { alert(`YouTube error: ${data.error}`); }
    } catch (err: any) { alert(`Upload failed: ${err.message}`); }
    setPublishing(null);
  }

  async function fetchYouTubeChannels() {
    setLoadingChannels(true);
    try { const res = await fetch("/api/youtube/channels"); const data = await res.json(); if (data.channels) setYtChannels(data.channels); else alert(data.error || "Failed to load channels"); }
    catch { alert("Failed to load channels"); }
    setLoadingChannels(false);
  }
  async function selectYouTubeChannel(channel: any) {
    if (!activeWS) return;
    await supabase.from("workspaces").update({ youtube_channel_id: channel.id, youtube_channel_name: channel.title, youtube_channel_thumb: channel.thumbnail }).eq("id", activeWS);
    setWorkspaces(prev => prev.map(w => w.id === activeWS ? { ...w, youtube_channel_id: channel.id, youtube_channel_name: channel.title, youtube_channel_thumb: channel.thumbnail } : w));
    setShowChannelPicker(false); setYtChannels([]);
  }
  async function disconnectYouTube() {
    if (!activeWS) return;
    await supabase.from("workspaces").update({ youtube_channel_id: null, youtube_channel_name: null, youtube_channel_thumb: null }).eq("id", activeWS);
    setWorkspaces(prev => prev.map(w => w.id === activeWS ? { ...w, youtube_channel_id: null, youtube_channel_name: null, youtube_channel_thumb: null } : w));
  }

  function resetDraft() { setDraft({ content: "", platforms: [], date: "", time: "12:00", type: "post", image_url: "", video_url: "" }); setVideoAspect(null); setShowNewPost(false); }

  async function saveAsDraft() {
    if (!draft.content || !activeWS) return;
    const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: draft.date || null, scheduled_time: draft.time, status: "draft", approval: "none", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single();
    if (data) setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); resetDraft();
  }
  async function schedulePost() {
    if (!draft.content || !draft.date || draft.platforms.length === 0 || !activeWS) return;
    const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: draft.date, scheduled_time: draft.time, status: "scheduled", approval: "pending", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single();
    if (data) setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); resetDraft();
  }
  async function publishNow() {
    if (!draft.content || draft.platforms.length === 0 || !activeWS) return;
    const today = new Date().toISOString().split("T")[0]; const now = new Date().toTimeString().slice(0, 5);
    const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: today, scheduled_time: now, status: "publishing", approval: "approved", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single();
    if (data) { setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); if (draft.platforms.includes("youtube") && draft.video_url) { const vid = draft.video_url; const cnt = draft.content; resetDraft(); await publishToYouTube({ ...data, video_url: vid, content: cnt }); return; } }
    resetDraft();
  }

  async function addWorkspace() {
    if (!newWS.name) return; const ini = newWS.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
    const { data } = await supabase.from("workspaces").insert({ user_id: userEmail, ...newWS, avatar: ini }).select().single();
    if (data) { setWorkspaces(prev => [...prev, data]); setPosts(prev => ({ ...prev, [data.id]: [] })); setActiveWS(data.id); }
    setNewWS({ name: "", industry: "", color: WORKSPACE_COLORS[0] }); setShowNewWS(false);
  }
  async function approvePost(id: string, decision: string) { await supabase.from("posts").update({ approval: decision }).eq("id", id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].map(p => p.id === id ? { ...p, approval: decision } : p) })); }
  async function deletePost(id: string) { await supabase.from("posts").delete().eq("id", id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].filter(p => p.id !== id) })); }

  function handleDragStart(e: any, idx: number) { setDragIndex(idx); e.dataTransfer.effectAllowed = "move"; }
  function handleDragOver(e: any, idx: number) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverIdx(idx); }
  async function handleDrop(e: any, toIdx: number) {
    e.preventDefault(); if (dragIndex === null || dragIndex === toIdx || !activeWS) { setDragIndex(null); setDragOverIdx(null); return; }
    const sched = (posts[activeWS] || []).filter(p => p.status === "scheduled").sort((a: any, b: any) => `${a.scheduled_date}T${a.scheduled_time}`.localeCompare(`${b.scheduled_date}T${b.scheduled_time}`));
    const reordered = [...sched]; const [moved] = reordered.splice(dragIndex, 1); reordered.splice(toIdx, 0, moved);
    const allTimes = sched.map((p: any) => ({ date: p.scheduled_date, time: p.scheduled_time })).sort((a: any, b: any) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
    const updates: PromiseLike<any>[] = [];
    const updatedPosts = reordered.map((post: any, i: number) => { const slot = allTimes[i]; if (post.scheduled_date !== slot.date || post.scheduled_time !== slot.time) updates.push(supabase.from("posts").update({ scheduled_date: slot.date, scheduled_time: slot.time }).eq("id", post.id)); return { ...post, scheduled_date: slot.date, scheduled_time: slot.time }; });
    const otherPosts = (posts[activeWS] || []).filter(p => p.status !== "scheduled");
    setPosts(prev => ({ ...prev, [activeWS!]: [...updatedPosts, ...otherPosts] })); await Promise.all(updates); setDragIndex(null); setDragOverIdx(null);
  }

  if (status === "loading") return null;
  if (session && loading && workspaces.length === 0) return <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Loading...</div></div>;
  if (!session) { if (screen === "register") return <RegisterPage onGoLogin={() => setScreen("login")} />; return <LoginPage onGoRegister={() => setScreen("register")} />; }

  const ws = workspaces.find(w => w.id === activeWS);
  const wsPosts = activeWS ? (posts[activeWS] || []) : [];
  const scheduled = wsPosts.filter(p => p.status === "scheduled").sort((a: any, b: any) => `${a.scheduled_date}T${a.scheduled_time}`.localeCompare(`${b.scheduled_date}T${b.scheduled_time}`));
  const published = wsPosts.filter(p => p.status === "published");
  const draftPosts = wsPosts.filter(p => p.status === "draft");
  const pending = wsPosts.filter(p => p.approval === "pending" && p.status !== "draft");
  const totalPending = workspaces.reduce((s, w) => s + ((posts[w.id] || []).filter((p: any) => p.approval === "pending" && p.status !== "draft").length), 0);

  const NAV = [
    { id: "dashboard", icon: <LayoutDashboard size={16} />, label: t("Dashboard", "Dashboard") },
    { id: "calendar", icon: <Calendar size={16} />, label: t("Calendar", "Kalender") },
    { id: "posts", icon: <PenLine size={16} />, label: t("Posts", "Posts") },
    { id: "queue", icon: <Clock size={16} />, label: t("Queue", "Wachtrij") },
    { id: "drafts", icon: <FileText size={16} />, label: t("Drafts", "Concepten") },
    { id: "approval", icon: <CheckSquare size={16} />, label: t("Approval", "Goedkeuring"), badge: pending.length },
    { id: "analytics", icon: <BarChart2 size={16} />, label: t("Analytics", "Statistieken") },
    { id: "media", icon: <Image size={16} />, label: t("Media", "Media") },
    { id: "team", icon: <Users size={16} />, label: "Team" },
    { id: "settings", icon: <Settings size={16} />, label: t("Settings", "Instellingen") },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: theme.bg }}>
      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 240 : 64, flexShrink: 0, background: BRAND.sidebar, display: "flex", flexDirection: "column", transition: "width 0.2s", overflow: "hidden", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ padding: "16px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 60 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 17 }}>D</span></div>
          {sidebarOpen && <span style={{ color: "#fff", fontWeight: 800, fontSize: 17 }}>Drop<span style={{ background: BRAND.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Post</span></span>}
          {sidebarOpen && <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "6px", borderRadius: 7, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg></button>}
        </div>
        <div style={{ padding: "10px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {sidebarOpen && <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, marginBottom: 6, paddingLeft: 4 }}>WORKSPACES</div>}
          {workspaces.map(w => { const wP = (posts[w.id] || []).filter((p: any) => p.approval === "pending" && p.status !== "draft").length; const act = w.id === activeWS; return <button key={w.id} onClick={() => switchWorkspace(w.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 6px", borderRadius: 9, marginBottom: 2, background: act ? "rgba(124,58,237,0.25)" : "transparent", border: act ? "1px solid rgba(124,58,237,0.35)" : "1px solid transparent", cursor: "pointer" }}><Avatar initials={w.avatar} color={w.color} size={28} />{sidebarOpen && <><div style={{ flex: 1, textAlign: "left", overflow: "hidden" }}><div style={{ fontSize: 12, fontWeight: 600, color: act ? "#fff" : "rgba(255,255,255,0.65)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{w.name}</div></div>{wP > 0 && <span style={{ background: BRAND.primary, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>{wP}</span>}</>}</button>; })}
          <button onClick={() => setShowNewWS(true)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "6px", borderRadius: 9, marginTop: 2, background: "transparent", border: "1px dashed rgba(255,255,255,0.1)", cursor: "pointer" }}><div style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px dashed rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>+</span></div>{sidebarOpen && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{t("New workspace", "Nieuwe workspace")}</span>}</button>
        </div>
        <div style={{ padding: "8px", flex: 1, overflowY: "auto" }}>
          {sidebarOpen && <div style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: 1.5, marginBottom: 6, paddingLeft: 4, marginTop: 4 }}>MENU</div>}
          {NAV.map(n => { const act = page === n.id; return <button key={n.id} onClick={() => setPage(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px", borderRadius: 9, marginBottom: 1, background: act ? "rgba(124,58,237,0.2)" : "transparent", border: "none", cursor: "pointer", position: "relative" }}><span style={{ flexShrink: 0, width: 20, display: "flex", alignItems: "center", justifyContent: "center", color: act ? "#fff" : "rgba(255,255,255,0.55)" }}>{n.icon}</span>{sidebarOpen && <span style={{ fontSize: 13, color: act ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: act ? 600 : 400 }}>{n.label}</span>}{n.badge && n.badge > 0 ? <span style={{ marginLeft: "auto", background: BRAND.primary, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "1px 6px" }}>{n.badge}</span> : null}{act && <div style={{ position: "absolute", left: 0, top: "20%", height: "60%", width: 3, background: BRAND.primary, borderRadius: "0 3px 3px 0" }} />}</button>; })}
        </div>
        <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "7px 6px", borderRadius: 9, background: "transparent", border: "none", cursor: "pointer" }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: BRAND.grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 700 }}>{userInitials}</div>{sidebarOpen && <div style={{ textAlign: "left" }}><div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{userName}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{t("Sign out", "Uitloggen")}</div></div>}</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOP BAR */}
        <div style={{ background: theme.headerBg, borderBottom: `1px solid ${theme.border}`, padding: "0 24px", display: "flex", alignItems: "center", height: 58, gap: 12, flexShrink: 0 }}>
          {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 4 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.textS} strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg></button>}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{ws && <Avatar initials={ws.avatar} color={ws.color} size={32} />}<div><div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{ws?.name}</div><div style={{ fontSize: 11, color: theme.textT }}>{ws?.industry}</div></div></div>
          <div style={{ flex: 1 }} />
          <button onClick={() => setShowNewPost(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginRight: 8 }}>+ {t("Create Post", "Maak Post")}</button>
          <button onClick={() => { setShowSupport(o => !o); setShowNews(false); }} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showSupport ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Headphones size={18} color={showSupport ? BRAND.primary : theme.textS} /></button>
          <button onClick={() => { setShowNews(o => !o); setShowSupport(false); }} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showNews ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Newspaper size={18} color={showNews ? BRAND.primary : theme.textS} /></button>
          <button onClick={() => setDarkMode(o => !o)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: darkMode ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{darkMode ? <Sun size={18} color={BRAND.amber} /> : <Moon size={18} color={theme.textS} />}</button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowLangMenu(o => !o)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: showLangMenu ? theme.tagBg : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Globe size={18} color={showLangMenu ? BRAND.primary : theme.textS} /></button>
            {showLangMenu && <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.18)", overflow: "hidden", zIndex: 200, minWidth: 150 }}>{[{ code: "en", label: "🇬🇧 English" }, { code: "nl", label: "🇳🇱 Nederlands" }].map(l => <button key={l.code} onClick={() => { setLanguage(l.code as any); setShowLangMenu(false); }} style={{ width: "100%", padding: "10px 16px", background: language === l.code ? theme.tagBg : "none", border: "none", cursor: "pointer", fontSize: 13, color: language === l.code ? BRAND.primary : theme.text, textAlign: "left", fontWeight: language === l.code ? 700 : 400 }}>{l.label}</button>)}</div>}
          </div>
          <div style={{ position: "relative", marginLeft: 4 }}>
            <button onClick={() => setShowUserMenu(o => !o)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: `1px solid ${theme.border}`, borderRadius: 10, padding: "5px 10px", cursor: "pointer" }}>
              {session.user?.image ? <img src={session.user.image} style={{ width: 30, height: 30, borderRadius: "50%" }} alt="" /> : <div style={{ width: 30, height: 30, borderRadius: "50%", background: BRAND.gradBtn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{userInitials}</div>}
              <div style={{ textAlign: "left" }}><div style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>{userName}</div><div style={{ fontSize: 10, color: theme.textT }}>{userEmail}</div></div><span style={{ fontSize: 12, color: theme.textT }}>▾</span>
            </button>
            {showUserMenu && <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, boxShadow: "0 8px 30px rgba(0,0,0,0.18)", width: 220, zIndex: 200, overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${theme.border}` }}><div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{userName}</div><div style={{ fontSize: 11, color: theme.textT }}>{userEmail}</div></div>
              {[{ icon: <Settings size={15} />, label: t("Settings", "Instellingen") }, { icon: <CreditCard size={15} />, label: t("Billing", "Facturering") }, { icon: <HelpCircle size={15} />, label: t("Help", "Hulp") }].map(item => <button key={item.label} onClick={() => setShowUserMenu(false)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: theme.text, textAlign: "left" }}>{item.icon}{item.label}</button>)}
              <div style={{ borderTop: `1px solid ${theme.border}` }}><button onClick={() => signOut({ callbackUrl: "/" })} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: BRAND.red, textAlign: "left" }}><LogOut size={15} color={BRAND.red} />{t("Logout", "Uitloggen")}</button></div>
            </div>}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>

          {/* DASHBOARD */}
          {page === "dashboard" && <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 4 }}>Dashboard</h1>
            <p style={{ fontSize: 13, color: theme.textT, marginBottom: 20 }}>{t(`Welcome back, ${userName}`, `Welkom terug, ${userName}`)}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
              {[{ label: t("Total", "Totaal"), value: wsPosts.length, color: BRAND.primary, icon: <PenLine size={16} color={BRAND.primary} /> }, { label: t("Scheduled", "Gepland"), value: scheduled.length, color: "#0EA5E9", icon: <Clock3 size={16} color="#0EA5E9" /> }, { label: t("Published", "Gepubliceerd"), value: published.length, color: BRAND.green, icon: <CheckCircle size={16} color={BRAND.green} /> }, { label: t("Pending", "In afwachting"), value: pending.length, color: BRAND.amber, icon: <AlertCircle size={16} color={BRAND.amber} /> }].map(s => <div key={s.label} style={{ background: theme.card, borderRadius: 14, padding: "18px 20px", border: `1px solid ${theme.border}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><div style={{ fontSize: 11, fontWeight: 700, color: theme.textT }}>{s.label.toUpperCase()}</div><div style={{ width: 32, height: 32, borderRadius: 9, background: darkMode ? s.color + "20" : s.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div></div><div style={{ fontSize: 34, fontWeight: 900, color: s.color }}>{s.value}</div></div>)}
            </div>
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 16 }}>{t("Recent Posts", "Recente Posts")}</div>
              {wsPosts.slice(0, 5).map((post: any) => <div key={post.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${theme.border}` }}><div style={{ flex: 1, overflow: "hidden" }}><div style={{ fontSize: 13, color: theme.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.content}</div><div style={{ display: "flex", gap: 5, marginTop: 4 }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}<span style={{ fontSize: 11, color: theme.textT }}>{post.scheduled_date}</span></div></div><StatusTag status={post.status} approval={post.approval} /></div>)}
              {wsPosts.length === 0 && <p style={{ fontSize: 13, color: theme.textT }}>{t("No posts yet", "Nog geen posts")}</p>}
            </div>
          </div>}

          {/* POSTS */}
          {page === "posts" && <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>{t("All Posts", "Alle Posts")}</h1><button onClick={() => setShowNewPost(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ {t("Create", "Maak")}</button></div>
            {wsPosts.map((post: any) => <div key={post.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}><div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><div style={{ flex: 1 }}><p style={{ margin: "0 0 10px", fontSize: 14, color: theme.text, lineHeight: 1.6 }}>{post.content}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}<span style={{ fontSize: 11, color: theme.textT }}>• {post.scheduled_date} {post.scheduled_time}</span><StatusTag status={post.status} approval={post.approval} /></div></div><div style={{ display: "flex", gap: 6, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" }}><div style={{ display: "flex", gap: 6 }}>{post.platforms?.includes("youtube") && post.video_url && post.status !== "published" && <button onClick={() => publishToYouTube(post)} disabled={publishing === post.id} style={{ fontSize: 12, background: "#FF000015", color: "#FF0000", border: "1px solid #FF000030", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600, opacity: publishing === post.id ? 0.5 : 1 }}>{publishing === post.id ? "Uploading..." : "▶ YouTube"}</button>}{post.approval === "pending" && post.status !== "draft" && <button onClick={() => approvePost(post.id, "approved")} style={{ fontSize: 12, background: darkMode ? "rgba(16,185,129,0.15)" : BRAND.greenL, color: BRAND.green, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600 }}>✓</button>}<button onClick={() => deletePost(post.id)} style={{ fontSize: 12, background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600 }}>✕</button></div>{post.youtube_id && <a href={`https://www.youtube.com/watch?v=${post.youtube_id}`} target="_blank" rel="noopener" style={{ fontSize: 11, color: "#FF0000", fontWeight: 600, textDecoration: "none" }}>▶ YouTube</a>}</div></div></div>)}
          </div>}

          {/* CALENDAR */}
          {page === "calendar" && (() => {
            const today = new Date(); const yr = calDate.getFullYear(); const mo = calDate.getMonth(); const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const firstDay = new Date(yr, mo, 1).getDay(); const daysInMonth = new Date(yr, mo + 1, 0).getDate();
            const cells = Array.from({ length: 42 }, (_, i) => { const d = i - firstDay + 1; return d >= 1 && d <= daysInMonth ? d : null; });
            function postsForDate(date: Date) { return wsPosts.filter((p: any) => p.scheduled_date === date.toISOString().split("T")[0]); }
            return <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: theme.text, minWidth: 160 }}>{calDate.toLocaleString("en", { month: "long" })} {yr}</span>
                <button onClick={() => setCalDate(new Date())} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: darkMode ? "rgba(13,148,136,0.15)" : "#E0F2F1", color: "#0D9488", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t("Today", "Vandaag")}</button>
                <button onClick={() => { const d = new Date(calDate); d.setMonth(mo - 1); setCalDate(d); }} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: darkMode ? "rgba(13,148,136,0.15)" : "#E0F2F1", color: "#0D9488", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                <button onClick={() => { const d = new Date(calDate); d.setMonth(mo + 1); setCalDate(d); }} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: darkMode ? "rgba(13,148,136,0.15)" : "#E0F2F1", color: "#0D9488", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
              </div>
              <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${theme.border}` }}>{DAYS_SHORT.map(d => <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 700, color: theme.textT }}>{d}</div>)}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
                  {cells.map((day, i) => { const date = day ? new Date(yr, mo, day) : null; const isToday = date ? date.toDateString() === today.toDateString() : false; const dayPosts = date ? postsForDate(date) : []; return <div key={i} style={{ minHeight: 90, padding: "6px 4px", borderRight: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, background: theme.card }}>{day && <div style={{ fontSize: 13, fontWeight: isToday ? 800 : 500, color: isToday ? "#0D9488" : theme.textS, marginBottom: 4, textAlign: "right", paddingRight: 4 }}>{day}</div>}{dayPosts.slice(0, 2).map((post: any) => <div key={post.id} style={{ fontSize: 10, background: darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL, color: BRAND.primary, borderRadius: 4, padding: "2px 4px", marginBottom: 2, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.content.slice(0, 20)}</div>)}</div>; })}
                </div>
              </div>
            </div>;
          })()}

          {/* QUEUE */}
          {page === "queue" && <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 6 }}>{t("Queue", "Wachtrij")}</h1>
            <p style={{ fontSize: 13, color: theme.textT, marginBottom: 20 }}>{t("Drag to reorder.", "Sleep om te herordenen.")}</p>
            {scheduled.length === 0 && <div style={{ textAlign: "center", padding: "3rem 0" }}><div style={{ fontSize: 44, marginBottom: 10 }}>📭</div><div style={{ fontSize: 15, fontWeight: 600, color: theme.textS }}>{t("No scheduled posts", "Geen geplande posts")}</div></div>}
            <div onDragOver={(e: any) => e.preventDefault()}>{scheduled.map((post: any, idx: number) => <DraggableQueueItem key={post.id} post={post} index={idx} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} isDragging={dragIndex} dragOverIndex={dragOverIdx} theme={theme} dark={darkMode} />)}</div>
          </div>}

          {/* DRAFTS */}
          {page === "drafts" && <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Drafts", "Concepten")}</h1>
            {draftPosts.length === 0 ? <div style={{ textAlign: "center", padding: "3rem 0", color: theme.textT }}>📝 {t("No drafts", "Geen concepten")}</div>
              : draftPosts.map((post: any) => <div key={post.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}><div style={{ flex: 1 }}><div style={{ fontSize: 13, color: theme.text }}>{post.content}</div></div><button onClick={() => deletePost(post.id)} style={{ fontSize: 12, background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer" }}>{t("Delete", "Verwijder")}</button></div>)}
          </div>}

          {/* APPROVAL */}
          {page === "approval" && <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Approval", "Goedkeuring")}</h1>
            {pending.length === 0 ? <div style={{ textAlign: "center", padding: "4rem 0" }}>🎉 <span style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>{t("All caught up!", "Alles bijgewerkt!")}</span></div>
              : pending.map((post: any) => <div key={post.id} style={{ background: theme.card, border: `1.5px solid ${BRAND.amber}50`, borderRadius: 16, padding: "18px", marginBottom: 14 }}><p style={{ margin: "0 0 12px", fontSize: 14, color: theme.text }}>{post.content}</p><div style={{ display: "flex", gap: 6, marginBottom: 16 }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}<span style={{ fontSize: 12, color: theme.textT }}>{post.scheduled_date}</span></div><div style={{ display: "flex", gap: 10 }}><button onClick={() => approvePost(post.id, "approved")} style={{ flex: 1, padding: "10px", background: darkMode ? "rgba(16,185,129,0.15)" : BRAND.greenL, color: BRAND.green, border: `1px solid ${BRAND.green}40`, borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>✓ {t("Approve", "Goedkeuren")}</button><button onClick={() => approvePost(post.id, "rejected")} style={{ flex: 1, padding: "10px", background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: `1px solid ${BRAND.red}40`, borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>✕ {t("Reject", "Afwijzen")}</button></div></div>)}
          </div>}

          {/* ANALYTICS */}
          {page === "analytics" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Analytics", "Statistieken")}</h1><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>{[{ label: "Reach", value: "12,450", color: BRAND.primary }, { label: "Engagement", value: "4.8%", color: BRAND.green }, { label: "Posts", value: String(wsPosts.length), color: "#0EA5E9" }].map(s => <div key={s.label} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "18px 20px" }}><div style={{ fontSize: 11, fontWeight: 700, color: theme.textT, marginBottom: 10 }}>{s.label.toUpperCase()}</div><div style={{ fontSize: 30, fontWeight: 900, color: s.color }}>{s.value}</div></div>)}</div></div>}

          {/* MEDIA */}
          {page === "media" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Media", "Media")}</h1><div style={{ background: theme.card, border: `2px dashed ${theme.border}`, borderRadius: 14, padding: "40px", textAlign: "center" }}><Upload size={36} color={theme.textT} /><div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginTop: 12 }}>{t("Drop files here", "Sleep bestanden hierheen")}</div></div></div>}

          {/* TEAM */}
          {page === "team" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Team</h1><div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}><Avatar initials={userInitials} color={BRAND.primary} size={40} /><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{userName}</div><div style={{ fontSize: 12, color: theme.textT }}>{userEmail}</div></div><Tag label="Admin" color={BRAND.primary} bg={darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL} /></div></div>}

          {/* SETTINGS */}
          {page === "settings" && <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Settings", "Instellingen")}</h1>
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "18px", marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12 }}>{t("Connected accounts", "Gekoppelde accounts")}</div>
              {[{ id: "youtube", label: "YouTube", color: "#FF0000", icon: "▶", desc: t("Videos & Shorts", "Video's & Shorts") }, { id: "facebook", label: "Facebook", color: "#1877F2", icon: "f", desc: "Pages" }, { id: "instagram", label: "Instagram", color: "#E1306C", icon: "ig", desc: "Reels" }, { id: "tiktok", label: "TikTok", color: "#010101", icon: "tt", desc: t("Videos", "Video's") }, { id: "snapchat", label: "Snapchat", color: "#FFCE00", icon: "sc", desc: "Stories" }].map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${darkMode ? "#2A2A40" : "#F3F4F6"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: p.color + "15", border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: p.color, fontWeight: 700 }}>{p.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{p.label}</div>
                      <div style={{ fontSize: 11, color: theme.textT }}>{p.desc}</div>
                      {p.id === "youtube" && ws?.youtube_channel_name && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>{ws.youtube_channel_thumb && <img src={ws.youtube_channel_thumb} style={{ width: 20, height: 20, borderRadius: "50%" }} alt="" />}<span style={{ fontSize: 12, color: BRAND.green, fontWeight: 600 }}>{ws.youtube_channel_name}</span></div>}
                    </div>
                  </div>
                  {p.id === "youtube" ? (
                    ws?.youtube_channel_id ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => { fetchYouTubeChannels(); setShowChannelPicker(true); }} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${p.color}`, background: p.color + "10", color: p.color, cursor: "pointer", fontWeight: 600 }}>{t("Switch", "Wissel")}</button>
                        <button onClick={disconnectYouTube} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${BRAND.red}`, background: BRAND.red + "10", color: BRAND.red, cursor: "pointer", fontWeight: 600 }}>{t("Disconnect", "Ontkoppel")}</button>
                      </div>
                    ) : <button onClick={() => { fetchYouTubeChannels(); setShowChannelPicker(true); }} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${p.color}`, background: p.color + "10", color: p.color, cursor: "pointer", fontWeight: 600 }}>Connect →</button>
                  ) : <button style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.textT, cursor: "default", fontWeight: 600 }}>{t("Coming soon", "Binnenkort")}</button>}
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>

      {/* CREATE POST MODAL */}
      {showNewPost && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
        <div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: "min(560px,100%)", boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto", border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 18, color: theme.text }}>{t("Create new post", "Nieuwe post")}</div>
          <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>TYPE</label><div style={{ display: "flex", gap: 8 }}>{["post", "story", "reel", "video"].map(tp => <button key={tp} onClick={() => setDraft(d => ({ ...d, type: tp }))} style={{ padding: "6px 14px", borderRadius: 8, border: draft.type === tp ? `2px solid ${BRAND.primary}` : `1px solid ${theme.border}`, background: draft.type === tp ? (darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL) : "transparent", color: draft.type === tp ? BRAND.primary : theme.textS, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{tp.charAt(0).toUpperCase() + tp.slice(1)}</button>)}</div></div>
          <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>PLATFORMS</label><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{PLATFORMS.map(p => <button key={p.id} onClick={() => setDraft(d => ({ ...d, platforms: d.platforms.includes(p.id) ? d.platforms.filter(x => x !== p.id) : [...d.platforms, p.id] }))} style={{ border: draft.platforms.includes(p.id) ? `2px solid ${p.color}` : `1px solid ${theme.border}`, background: draft.platforms.includes(p.id) ? (darkMode ? p.color + "20" : p.bg) : "transparent", color: draft.platforms.includes(p.id) ? p.color : theme.textS, borderRadius: 9, padding: "7px 14px", fontSize: 13, cursor: "pointer", fontWeight: draft.platforms.includes(p.id) ? 700 : 400 }}>{p.label}</button>)}</div></div>

          {/* IMAGE UPLOAD */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>{t("IMAGE", "AFBEELDING")}</label>
            {draft.image_url ? <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${theme.border}` }}><div style={{ position: "relative" }}><img src={draft.image_url} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} /><button onClick={() => setDraft(d => ({ ...d, image_url: "" }))} style={{ position: "absolute", top: 8, right: 8, background: BRAND.red, color: "#fff", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 12 }}>✕</button></div><div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, background: theme.codeBg }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: BRAND.green }} /><span style={{ fontSize: 12, color: BRAND.green, fontWeight: 600 }}>{t("Ready", "Klaar")}</span></div></div>
              : uploadingImage ? <div style={{ borderRadius: 12, border: `1px solid ${BRAND.primary}40`, background: darkMode ? "rgba(124,58,237,0.1)" : BRAND.primaryL, padding: "20px", textAlign: "center" }}><div style={{ width: 40, height: 40, margin: "0 auto 12px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} /><div style={{ fontSize: 13, fontWeight: 600, color: BRAND.primary }}>{t("Uploading...", "Uploaden...")}</div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
              : <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "24px", borderRadius: 12, border: `2px dashed ${theme.border}`, cursor: "pointer", background: theme.codeBg }}><span style={{ fontSize: 24 }}>📷</span><span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{t("Upload image", "Upload afbeelding")}</span><input type="file" accept="image/*" style={{ display: "none" }} onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadImage(f); if (u) setDraft(d => ({ ...d, image_url: u })); } }} /></label>}
          </div>

          {/* VIDEO UPLOAD */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>VIDEO</label>
            {draft.video_url ? <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${theme.border}`, background: "#000" }}>
              <div style={{ position: "relative", width: videoAspect === "vertical" ? 180 : "100%", margin: videoAspect === "vertical" ? "0 auto" : undefined }}>
                <video src={draft.video_url} controls onLoadedMetadata={(e: any) => { const v = e.currentTarget; setVideoAspect(v.videoHeight > v.videoWidth ? "vertical" : "horizontal"); }} style={{ width: "100%", height: videoAspect === "vertical" ? 320 : 180, objectFit: "contain", display: "block", background: "#000" }} />
                <button onClick={() => { setDraft(d => ({ ...d, video_url: "" })); setVideoAspect(null); }} style={{ position: "absolute", top: 8, right: 8, background: BRAND.red, color: "#fff", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 12 }}>✕</button>
              </div>
              <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, background: theme.codeBg }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: BRAND.green }} /><span style={{ fontSize: 12, color: BRAND.green, fontWeight: 600 }}>{t("Ready", "Klaar")}</span><span style={{ fontSize: 11, marginLeft: "auto", background: videoAspect === "vertical" ? "#FF000015" : BRAND.primary + "15", padding: "2px 8px", borderRadius: 5, fontWeight: 700, color: videoAspect === "vertical" ? "#FF0000" : BRAND.primary }}>{videoAspect === "vertical" ? "Short / Reel" : "Video"}</span></div>
            </div>
              : uploadingVideo ? <div style={{ borderRadius: 12, border: `1px solid ${BRAND.primary}40`, background: darkMode ? "rgba(124,58,237,0.1)" : BRAND.primaryL, padding: "20px", textAlign: "center" }}><div style={{ width: 40, height: 40, margin: "0 auto 12px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} /><div style={{ fontSize: 13, fontWeight: 600, color: BRAND.primary }}>{t("Uploading video...", "Video uploaden...")}</div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
              : <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "24px", borderRadius: 12, border: `2px dashed ${theme.border}`, cursor: "pointer", background: theme.codeBg }}><span style={{ fontSize: 24 }}>🎬</span><span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{t("Upload video", "Upload video")}</span><span style={{ fontSize: 11, color: theme.textT }}>MP4, MOV · max 256MB</span><input type="file" accept="video/mp4,video/*" style={{ display: "none" }} onChange={async e => { const f = e.target.files?.[0]; if (f) { const u = await uploadVideo(f); if (u) setDraft(d => ({ ...d, video_url: u })); } }} /></label>}
          </div>

          <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>{t("CONTENT", "INHOUD")}</label><textarea value={draft.content} onChange={e => setDraft(d => ({ ...d, content: e.target.value }))} placeholder={t("Write your post...", "Schrijf je post...")} style={{ width: "100%", minHeight: 120, boxSizing: "border-box", borderRadius: 10, border: `1px solid ${theme.inputBorder}`, padding: "10px 12px", fontSize: 14, resize: "vertical", fontFamily: "inherit", background: theme.inputBg, color: theme.text }} /><div style={{ fontSize: 12, color: draft.content.length > 280 ? BRAND.red : theme.textT, textAlign: "right", marginTop: 4 }}>{draft.content.length}/280</div></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}><div><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>{t("DATE", "DATUM")}</label><input type="date" value={draft.date} onChange={e => setDraft(d => ({ ...d, date: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} /></div><div><label style={{ fontSize: 12, fontWeight: 700, color: theme.textS, display: "block", marginBottom: 6 }}>{t("TIME", "TIJD")}</label><input type="time" value={draft.time} onChange={e => setDraft(d => ({ ...d, time: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} /></div></div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setShowNewPost(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS }}>{t("Cancel", "Annuleren")}</button>
            <button onClick={saveAsDraft} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS, fontWeight: 600 }}>{t("Draft", "Concept")}</button>
            <button onClick={schedulePost} disabled={!draft.content || !draft.date || draft.platforms.length === 0} style={{ flex: 1.5, padding: "11px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: (!draft.content || !draft.date || draft.platforms.length === 0) ? 0.45 : 1 }}>{t("Schedule", "Inplannen")}</button>
            <button onClick={publishNow} disabled={!draft.content || draft.platforms.length === 0} style={{ flex: 1.5, padding: "11px", borderRadius: 10, border: "none", background: BRAND.green, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: (!draft.content || draft.platforms.length === 0) ? 0.45 : 1 }}>{t("Publish now", "Nu publiceren")}</button>
          </div>
        </div>
      </div>}

      {/* NEW WORKSPACE MODAL */}
      {showNewWS && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
        <div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: "min(440px,100%)", boxSizing: "border-box", border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 18, color: theme.text }}>{t("New workspace", "Nieuwe workspace")}</div>
          <input value={newWS.name} onChange={e => setNewWS(w => ({ ...w, name: e.target.value }))} placeholder={t("Company name", "Bedrijfsnaam")} style={{ width: "100%", marginBottom: 12, padding: "11px 13px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} />
          <input value={newWS.industry} onChange={e => setNewWS(w => ({ ...w, industry: e.target.value }))} placeholder={t("Industry", "Industrie")} style={{ width: "100%", marginBottom: 16, padding: "11px 13px", borderRadius: 9, border: `1px solid ${theme.inputBorder}`, fontSize: 14, boxSizing: "border-box", background: theme.inputBg, color: theme.text }} />
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>{WORKSPACE_COLORS.map(col => <button key={col} onClick={() => setNewWS(w => ({ ...w, color: col }))} style={{ width: 32, height: 32, borderRadius: "50%", background: col, border: newWS.color === col ? `3px solid ${theme.text}` : "3px solid transparent", cursor: "pointer", padding: 0 }} />)}</div>
          <div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowNewWS(false)} style={{ flex: 1, padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS }}>{t("Cancel", "Annuleren")}</button><button onClick={addWorkspace} disabled={!newWS.name} style={{ flex: 1, padding: "11px", borderRadius: 10, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, opacity: !newWS.name ? 0.45 : 1 }}>{t("Create", "Aanmaken")}</button></div>
        </div>
      </div>}

      {/* CHANNEL PICKER MODAL */}
      {showChannelPicker && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem" }}>
        <div style={{ background: theme.modalBg, borderRadius: 20, padding: "24px", width: "min(440px,100%)", boxSizing: "border-box", border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6, color: theme.text }}>{t("Select YouTube Channel", "Kies YouTube Kanaal")}</div>
          <p style={{ fontSize: 13, color: theme.textT, marginBottom: 18 }}>{t("Choose which channel to connect.", "Kies welk kanaal je wilt koppelen.")}</p>
          {loadingChannels ? <div style={{ textAlign: "center", padding: "30px 0" }}><div style={{ width: 40, height: 40, margin: "0 auto 12px", borderRadius: "50%", border: `3px solid ${BRAND.primary}30`, borderTopColor: BRAND.primary, animation: "spin 1s linear infinite" }} /><div style={{ fontSize: 13, color: BRAND.primary, fontWeight: 600 }}>{t("Loading...", "Laden...")}</div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
            : ytChannels.length === 0 ? <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ fontSize: 36, marginBottom: 8 }}>📺</div><div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{t("No channels found", "Geen kanalen gevonden")}</div><button onClick={fetchYouTubeChannels} style={{ marginTop: 12, padding: "8px 16px", borderRadius: 8, border: "none", background: BRAND.gradBtn, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>{t("Retry", "Opnieuw")}</button></div>
            : <div>{ytChannels.map((ch: any) => <button key={ch.id} onClick={() => selectYouTubeChannel(ch)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 12, border: ws?.youtube_channel_id === ch.id ? `2px solid ${BRAND.green}` : `1px solid ${theme.border}`, background: ws?.youtube_channel_id === ch.id ? (darkMode ? "rgba(16,185,129,0.1)" : BRAND.greenL) : theme.card, cursor: "pointer", marginBottom: 8, textAlign: "left" }}>{ch.thumbnail ? <img src={ch.thumbnail} style={{ width: 44, height: 44, borderRadius: "50%" }} alt="" /> : <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FF000015", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>▶</div>}<div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{ch.title}</div><div style={{ fontSize: 11, color: theme.textT }}>{ch.id}</div></div>{ws?.youtube_channel_id === ch.id && <div style={{ width: 24, height: 24, borderRadius: "50%", background: BRAND.green, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>✓</div>}</button>)}</div>}
          <button onClick={() => { setShowChannelPicker(false); setYtChannels([]); }} style={{ width: "100%", padding: "11px", borderRadius: 10, border: `1px solid ${theme.border}`, background: "transparent", cursor: "pointer", fontSize: 14, color: theme.textS, marginTop: 8 }}>{t("Cancel", "Annuleren")}</button>
        </div>
      </div>}
    </div>
  );
}