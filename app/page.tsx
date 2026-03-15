"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { PenLine, Clock3, CheckCircle, AlertCircle, Upload } from "lucide-react";
import LandingPage from "./components/LandingPage";
import { BRAND, WORKSPACE_COLORS, useTheme, Avatar, PBadge, StatusTag, Tag, DraggableQueueItem } from "./components/ui";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SupportPanel, NewsPanel } from "./components/Panels";
import { CreatePostModal, NewWorkspaceModal, ChannelPickerModal } from "./components/Modals";

export default function App() {
  const { data: session, status } = useSession();
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
  useEffect(() => {
    if (session && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("pickChannel") === "true") { setPage("settings"); setTimeout(() => { fetchYouTubeChannels(); setShowChannelPicker(true); }, 500); window.history.replaceState({}, "", "/"); }
    }
  }, [session]);

  /* ═══ DATA FUNCTIONS ═══ */
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
    try { const wsData = workspaces.find(w => w.id === activeWS); const res = await fetch("/api/youtube/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: post.content.slice(0, 100), description: post.content, privacyStatus: "public", videoUrl: post.video_url, channelId: wsData?.youtube_channel_id || undefined }) }); const data = await res.json(); if (data.success) { await supabase.from("posts").update({ status: "published", youtube_id: data.videoId }).eq("id", post.id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].map(p => p.id === post.id ? { ...p, status: "published", youtube_id: data.videoId } : p) })); alert(`Published! ${data.url}`); } else { alert(`YouTube error: ${data.error}`); } }
    catch (err: any) { alert(`Upload failed: ${err.message}`); }
    setPublishing(null);
  }

  async function fetchYouTubeChannels() { setLoadingChannels(true); try { const res = await fetch("/api/youtube/channels"); const data = await res.json(); if (data.channels) setYtChannels(data.channels); else alert(data.error || "Failed"); } catch { alert("Failed to load channels"); } setLoadingChannels(false); }
  async function selectYouTubeChannel(channel: any) { if (!activeWS) return; await supabase.from("workspaces").update({ youtube_channel_id: channel.id, youtube_channel_name: channel.title, youtube_channel_thumb: channel.thumbnail }).eq("id", activeWS); setWorkspaces(prev => prev.map(w => w.id === activeWS ? { ...w, youtube_channel_id: channel.id, youtube_channel_name: channel.title, youtube_channel_thumb: channel.thumbnail } : w)); setShowChannelPicker(false); setYtChannels([]); }
  async function disconnectYouTube() { if (!activeWS) return; await supabase.from("workspaces").update({ youtube_channel_id: null, youtube_channel_name: null, youtube_channel_thumb: null }).eq("id", activeWS); setWorkspaces(prev => prev.map(w => w.id === activeWS ? { ...w, youtube_channel_id: null, youtube_channel_name: null, youtube_channel_thumb: null } : w)); }

  function resetDraft() { setDraft({ content: "", platforms: [], date: "", time: "12:00", type: "post", image_url: "", video_url: "" }); setVideoAspect(null); setShowNewPost(false); }
  async function saveAsDraft() { if (!draft.content || !activeWS) return; const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: draft.date || null, scheduled_time: draft.time, status: "draft", approval: "none", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single(); if (data) setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); resetDraft(); }
  async function schedulePost() { if (!draft.content || !draft.date || draft.platforms.length === 0 || !activeWS) return; const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: draft.date, scheduled_time: draft.time, status: "scheduled", approval: "pending", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single(); if (data) setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); resetDraft(); }
  async function publishNow() { if (!draft.content || draft.platforms.length === 0 || !activeWS) return; const today = new Date().toISOString().split("T")[0]; const now = new Date().toTimeString().slice(0, 5); const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: today, scheduled_time: now, status: "publishing", approval: "approved", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single(); if (data) { setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); if (draft.platforms.includes("youtube") && draft.video_url) { const vid = draft.video_url; const cnt = draft.content; resetDraft(); await publishToYouTube({ ...data, video_url: vid, content: cnt }); return; } } resetDraft(); }

  async function addWorkspace() { if (!newWS.name) return; const ini = newWS.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(); const { data } = await supabase.from("workspaces").insert({ user_id: userEmail, ...newWS, avatar: ini }).select().single(); if (data) { setWorkspaces(prev => [...prev, data]); setPosts(prev => ({ ...prev, [data.id]: [] })); setActiveWS(data.id); } setNewWS({ name: "", industry: "", color: WORKSPACE_COLORS[0] }); setShowNewWS(false); }
  async function approvePost(id: string, decision: string) { await supabase.from("posts").update({ approval: decision }).eq("id", id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].map(p => p.id === id ? { ...p, approval: decision } : p) })); }
  async function deletePost(id: string) { await supabase.from("posts").delete().eq("id", id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].filter(p => p.id !== id) })); }

  function handleDragStart(e: any, idx: number) { setDragIndex(idx); e.dataTransfer.effectAllowed = "move"; }
  function handleDragOver(e: any, idx: number) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverIdx(idx); }
  async function handleDrop(e: any, toIdx: number) { e.preventDefault(); if (dragIndex === null || dragIndex === toIdx || !activeWS) { setDragIndex(null); setDragOverIdx(null); return; } const sched = (posts[activeWS] || []).filter(p => p.status === "scheduled").sort((a: any, b: any) => `${a.scheduled_date}T${a.scheduled_time}`.localeCompare(`${b.scheduled_date}T${b.scheduled_time}`)); const reordered = [...sched]; const [moved] = reordered.splice(dragIndex, 1); reordered.splice(toIdx, 0, moved); const allTimes = sched.map((p: any) => ({ date: p.scheduled_date, time: p.scheduled_time })).sort((a: any, b: any) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)); const updates: PromiseLike<any>[] = []; const updatedPosts = reordered.map((post: any, i: number) => { const slot = allTimes[i]; if (post.scheduled_date !== slot.date || post.scheduled_time !== slot.time) updates.push(supabase.from("posts").update({ scheduled_date: slot.date, scheduled_time: slot.time }).eq("id", post.id)); return { ...post, scheduled_date: slot.date, scheduled_time: slot.time }; }); const otherPosts = (posts[activeWS] || []).filter(p => p.status !== "scheduled"); setPosts(prev => ({ ...prev, [activeWS!]: [...updatedPosts, ...otherPosts] })); await Promise.all(updates); setDragIndex(null); setDragOverIdx(null); }

  /* ═══ LOADING / AUTH GUARDS ═══ */
  if (status === "loading") return null;
  if (session && loading && workspaces.length === 0) return <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Loading...</div></div>;
  if (!session) return <LandingPage />;

  /* ═══ DERIVED DATA ═══ */
  const ws = workspaces.find(w => w.id === activeWS);
  const wsPosts = activeWS ? (posts[activeWS] || []) : [];
  const scheduled = wsPosts.filter(p => p.status === "scheduled").sort((a: any, b: any) => `${a.scheduled_date}T${a.scheduled_time}`.localeCompare(`${b.scheduled_date}T${b.scheduled_time}`));
  const published = wsPosts.filter(p => p.status === "published");
  const draftPosts = wsPosts.filter(p => p.status === "draft");
  const pending = wsPosts.filter(p => p.approval === "pending" && p.status !== "draft");

  /* ═══ RENDER ═══ */
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: theme.bg }}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} workspaces={workspaces} activeWS={activeWS} switchWorkspace={switchWorkspace} setShowNewWS={setShowNewWS} page={page} setPage={setPage} pendingCount={pending.length} t={t} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} ws={ws} session={session} userName={userName} userEmail={userEmail} userInitials={userInitials} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} showSupport={showSupport} setShowSupport={setShowSupport} showNews={showNews} setShowNews={setShowNews} showLangMenu={showLangMenu} setShowLangMenu={setShowLangMenu} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} setShowNewPost={setShowNewPost} theme={theme} t={t} />

        {showSupport && <SupportPanel theme={theme} darkMode={darkMode} t={t} onClose={() => setShowSupport(false)} />}
        {showNews && <NewsPanel theme={theme} darkMode={darkMode} t={t} onClose={() => setShowNews(false)} />}

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>

          {/* DASHBOARD */}
          {page === "dashboard" && <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Dashboard</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
              {[{ label: "Total", value: wsPosts.length, color: BRAND.primary, icon: <PenLine size={16} color={BRAND.primary} /> }, { label: "Scheduled", value: scheduled.length, color: "#0EA5E9", icon: <Clock3 size={16} color="#0EA5E9" /> }, { label: "Published", value: published.length, color: BRAND.green, icon: <CheckCircle size={16} color={BRAND.green} /> }, { label: "Pending", value: pending.length, color: BRAND.amber, icon: <AlertCircle size={16} color={BRAND.amber} /> }].map(s => <div key={s.label} style={{ background: theme.card, borderRadius: 14, padding: "18px 20px", border: `1px solid ${theme.border}` }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div style={{ fontSize: 11, fontWeight: 700, color: theme.textT }}>{s.label.toUpperCase()}</div><div style={{ width: 32, height: 32, borderRadius: 9, background: darkMode ? s.color + "20" : s.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div></div><div style={{ fontSize: 34, fontWeight: 900, color: s.color }}>{s.value}</div></div>)}
            </div>
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "20px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 16 }}>{t("Recent Posts", "Recente Posts")}</div>
              {wsPosts.slice(0, 5).map((post: any) => <div key={post.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${theme.border}` }}><div style={{ flex: 1, overflow: "hidden" }}><div style={{ fontSize: 13, color: theme.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.content}</div><div style={{ display: "flex", gap: 5, marginTop: 4 }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}</div></div><StatusTag status={post.status} approval={post.approval} /></div>)}
              {wsPosts.length === 0 && <p style={{ fontSize: 13, color: theme.textT }}>{t("No posts yet", "Nog geen posts")}</p>}
            </div>
          </div>}

          {/* POSTS */}
          {page === "posts" && <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>Posts</h1><button onClick={() => setShowNewPost(true)} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+</button></div>
            {wsPosts.map((post: any) => <div key={post.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}><div style={{ display: "flex", gap: 12 }}><div style={{ flex: 1 }}><p style={{ margin: "0 0 10px", fontSize: 14, color: theme.text, lineHeight: 1.6 }}>{post.content}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>{post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}<span style={{ fontSize: 11, color: theme.textT }}>{post.scheduled_date} {post.scheduled_time}</span><StatusTag status={post.status} approval={post.approval} /></div></div><div style={{ display: "flex", gap: 6, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" }}><div style={{ display: "flex", gap: 6 }}>{post.platforms?.includes("youtube") && post.video_url && post.status !== "published" && <button onClick={() => publishToYouTube(post)} disabled={publishing === post.id} style={{ fontSize: 12, background: "#FF000015", color: "#FF0000", border: "1px solid #FF000030", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600 }}>{publishing === post.id ? "..." : "▶ YT"}</button>}<button onClick={() => deletePost(post.id)} style={{ fontSize: 12, background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer" }}>✕</button></div>{post.youtube_id && <a href={`https://www.youtube.com/watch?v=${post.youtube_id}`} target="_blank" rel="noopener" style={{ fontSize: 11, color: "#FF0000", fontWeight: 600, textDecoration: "none" }}>▶ YouTube</a>}</div></div></div>)}
          </div>}

          {/* CALENDAR */}
          {page === "calendar" && (() => { const today = new Date(); const yr = calDate.getFullYear(); const mo = calDate.getMonth(); const DS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]; const fd = new Date(yr, mo, 1).getDay(); const dim = new Date(yr, mo + 1, 0).getDate(); const cells = Array.from({ length: 42 }, (_, i) => { const d = i - fd + 1; return d >= 1 && d <= dim ? d : null; }); const pfd = (date: Date) => wsPosts.filter((p: any) => p.scheduled_date === date.toISOString().split("T")[0]); return <div><div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}><span style={{ fontSize: 16, fontWeight: 700, color: theme.text, minWidth: 160 }}>{calDate.toLocaleString("en", { month: "long" })} {yr}</span><button onClick={() => { const d = new Date(calDate); d.setMonth(mo - 1); setCalDate(d); }} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: darkMode ? "rgba(13,148,136,0.15)" : "#E0F2F1", color: "#0D9488", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button><button onClick={() => { const d = new Date(calDate); d.setMonth(mo + 1); setCalDate(d); }} style={{ width: 32, height: 32, borderRadius: 8, border: "none", background: darkMode ? "rgba(13,148,136,0.15)" : "#E0F2F1", color: "#0D9488", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button></div><div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}><div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${theme.border}` }}>{DS.map(d => <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 700, color: theme.textT }}>{d}</div>)}</div><div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>{cells.map((day, i) => { const date = day ? new Date(yr, mo, day) : null; const isToday = date ? date.toDateString() === today.toDateString() : false; const dp = date ? pfd(date) : []; return <div key={i} style={{ minHeight: 90, padding: "6px 4px", borderRight: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}` }}>{day && <div style={{ fontSize: 13, fontWeight: isToday ? 800 : 500, color: isToday ? "#0D9488" : theme.textS, textAlign: "right", paddingRight: 4, marginBottom: 4 }}>{day}</div>}{dp.slice(0,2).map((post: any) => <div key={post.id} style={{ fontSize: 10, background: darkMode ? "rgba(124,58,237,0.15)" : BRAND.primaryL, color: BRAND.primary, borderRadius: 4, padding: "2px 4px", marginBottom: 2, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{post.content.slice(0,20)}</div>)}</div>; })}</div></div></div>; })()}

          {/* QUEUE */}
          {page === "queue" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Queue", "Wachtrij")}</h1>{scheduled.length === 0 && <div style={{ textAlign: "center", padding: "3rem 0" }}>📭 {t("No scheduled posts", "Geen geplande posts")}</div>}<div onDragOver={(e: any) => e.preventDefault()}>{scheduled.map((post: any, idx: number) => <DraggableQueueItem key={post.id} post={post} index={idx} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} isDragging={dragIndex} dragOverIndex={dragOverIdx} theme={theme} dark={darkMode} />)}</div></div>}

          {/* DRAFTS */}
          {page === "drafts" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Drafts", "Concepten")}</h1>{draftPosts.length === 0 ? <div style={{ textAlign: "center", padding: "3rem 0", color: theme.textT }}>📝 {t("No drafts", "Geen concepten")}</div> : draftPosts.map((post: any) => <div key={post.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center" }}><div style={{ flex: 1, fontSize: 13, color: theme.text }}>{post.content}</div><button onClick={() => deletePost(post.id)} style={{ fontSize: 12, background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer" }}>✕</button></div>)}</div>}

          {/* APPROVAL */}
          {page === "approval" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Approval", "Goedkeuring")}</h1>{pending.length === 0 ? <div style={{ textAlign: "center", padding: "4rem 0" }}>🎉 {t("All caught up!", "Alles bijgewerkt!")}</div> : pending.map((post: any) => <div key={post.id} style={{ background: theme.card, border: `1.5px solid ${BRAND.amber}50`, borderRadius: 16, padding: "18px", marginBottom: 14 }}><p style={{ margin: "0 0 12px", fontSize: 14, color: theme.text }}>{post.content}</p><div style={{ display: "flex", gap: 10 }}><button onClick={() => approvePost(post.id, "approved")} style={{ flex: 1, padding: "10px", background: darkMode ? "rgba(16,185,129,0.15)" : BRAND.greenL, color: BRAND.green, border: `1px solid ${BRAND.green}40`, borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>✓</button><button onClick={() => approvePost(post.id, "rejected")} style={{ flex: 1, padding: "10px", background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: `1px solid ${BRAND.red}40`, borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>✕</button></div></div>)}</div>}

          {/* ANALYTICS */}
          {page === "analytics" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Analytics</h1><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>{[{ l: "Reach", v: "12,450", c: BRAND.primary }, { l: "Engagement", v: "4.8%", c: BRAND.green }, { l: "Posts", v: String(wsPosts.length), c: "#0EA5E9" }].map(s => <div key={s.l} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "18px 20px" }}><div style={{ fontSize: 11, fontWeight: 700, color: theme.textT, marginBottom: 10 }}>{s.l.toUpperCase()}</div><div style={{ fontSize: 30, fontWeight: 900, color: s.c }}>{s.v}</div></div>)}</div></div>}

          {/* MEDIA */}
          {page === "media" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Media</h1><div style={{ background: theme.card, border: `2px dashed ${theme.border}`, borderRadius: 14, padding: "40px", textAlign: "center" }}><Upload size={36} color={theme.textT} /><div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginTop: 12 }}>{t("Drop files here", "Sleep bestanden hierheen")}</div></div></div>}

          {/* TEAM */}
          {page === "team" && <div><h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Team</h1><div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}><Avatar initials={userInitials} color={BRAND.primary} size={40} /><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{userName}</div><div style={{ fontSize: 12, color: theme.textT }}>{userEmail}</div></div><Tag label="Admin" color={BRAND.primary} bg={darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL} /></div></div>}

          {/* SETTINGS */}
          {page === "settings" && <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Settings", "Instellingen")}</h1>
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "18px", marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12 }}>{t("Connected accounts", "Gekoppelde accounts")}</div>
              {[{ id: "youtube", label: "YouTube", color: "#FF0000", icon: "▶", desc: "Videos & Shorts" }, { id: "facebook", label: "Facebook", color: "#1877F2", icon: "f", desc: "Pages" }, { id: "instagram", label: "Instagram", color: "#E1306C", icon: "ig", desc: "Reels" }, { id: "tiktok", label: "TikTok", color: "#010101", icon: "tt", desc: "Videos" }, { id: "linkedin", label: "LinkedIn", color: "#0A66C2", icon: "in", desc: "Posts & Articles" }].map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${darkMode ? "#2A2A40" : "#F3F4F6"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: p.color + "15", border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: p.color, fontWeight: 700 }}>{p.icon}</div>
                    <div><div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{p.label}</div><div style={{ fontSize: 11, color: theme.textT }}>{p.desc}</div>{p.id === "youtube" && ws?.youtube_channel_name && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>{ws.youtube_channel_thumb && <img src={ws.youtube_channel_thumb} style={{ width: 20, height: 20, borderRadius: "50%" }} alt="" />}<span style={{ fontSize: 12, color: BRAND.green, fontWeight: 600 }}>{ws.youtube_channel_name}</span></div>}</div>
                  </div>
                  {p.id === "youtube" ? (ws?.youtube_channel_id ? <div style={{ display: "flex", gap: 6 }}><button onClick={() => { fetchYouTubeChannels(); setShowChannelPicker(true); }} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${p.color}`, background: p.color + "10", color: p.color, cursor: "pointer", fontWeight: 600 }}>{t("Switch", "Wissel")}</button><button onClick={disconnectYouTube} style={{ fontSize: 12, padding: "6px 12px", borderRadius: 8, border: `1px solid ${BRAND.red}`, background: BRAND.red + "10", color: BRAND.red, cursor: "pointer", fontWeight: 600 }}>{t("Disconnect", "Ontkoppel")}</button></div> : <button onClick={() => signIn("google", { callbackUrl: "/?pickChannel=true" })} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${p.color}`, background: p.color + "10", color: p.color, cursor: "pointer", fontWeight: 600 }}>Connect →</button>) : <button style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.textT, cursor: "default", fontWeight: 600 }}>{t("Coming soon", "Binnenkort")}</button>}
                </div>
              ))}
            </div>
          </div>}
        </div>
      </div>

      {/* MODALS */}
      {showNewPost && <CreatePostModal draft={draft} setDraft={setDraft} darkMode={darkMode} theme={theme} uploadingImage={uploadingImage} uploadingVideo={uploadingVideo} videoAspect={videoAspect} uploadImage={uploadImage} uploadVideo={uploadVideo} setVideoAspect={setVideoAspect} onClose={resetDraft} onSaveDraft={saveAsDraft} onSchedule={schedulePost} onPublishNow={publishNow} t={t} />}
      {showNewWS && <NewWorkspaceModal newWS={newWS} setNewWS={setNewWS} onClose={() => setShowNewWS(false)} onCreate={addWorkspace} theme={theme} t={t} />}
      {showChannelPicker && <ChannelPickerModal ws={ws} ytChannels={ytChannels} loadingChannels={loadingChannels} darkMode={darkMode} theme={theme} t={t} onSelect={selectYouTubeChannel} onClose={() => { setShowChannelPicker(false); setYtChannels([]); }} onRetry={fetchYouTubeChannels} />}
    </div>
  );
}