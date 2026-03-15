"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { BRAND, WORKSPACE_COLORS, useTheme } from "./components/ui";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { SupportPanel, NewsPanel } from "./components/Panels";
import { CreatePostModal, NewWorkspaceModal, ChannelPickerModal } from "./components/Modals";
import Dashboard from "./components/Dashboard";
import PostsPage from "./components/PostsPage";
import CalendarPage from "./components/CalendarPage";
import SettingsPage from "./components/SettingsPage";
import { QueuePage, DraftsPage, ApprovalPage, AnalyticsPage, MediaPage, TeamPage } from "./components/SmallPages";

export default function App() {
  const { data: session, status } = useSession();

  /* ═══ STATE ═══ */
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

  /* ═══ DATA ═══ */
  async function loadWorkspaces() {
    setLoading(true);
    const { data } = await supabase.from("workspaces").select("*").eq("user_id", userEmail).order("created_at", { ascending: true });
    if (data && data.length > 0) { setWorkspaces(data); setActiveWS(data[0].id); await loadPosts(data[0].id); }
    else { const ini = userEmail.slice(0, 2).toUpperCase(); const { data: ws } = await supabase.from("workspaces").insert({ user_id: userEmail, name: "My Workspace", industry: "General", color: BRAND.primary, avatar: ini }).select().single(); if (ws) { setWorkspaces([ws]); setActiveWS(ws.id); } }
    setLoading(false);
  }
  async function loadPosts(wsId: string) { const { data } = await supabase.from("posts").select("*").eq("workspace_id", wsId).order("created_at", { ascending: false }); if (data) setPosts(prev => ({ ...prev, [wsId]: data })); }
  async function switchWorkspace(wsId: string) { setActiveWS(wsId); setPage("dashboard"); if (!posts[wsId]) await loadPosts(wsId); }

  /* ═══ UPLOADS ═══ */
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

  /* ═══ YOUTUBE ═══ */
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

  /* ═══ POST ACTIONS ═══ */
  function resetDraft() { setDraft({ content: "", platforms: [], date: "", time: "12:00", type: "post", image_url: "", video_url: "" }); setVideoAspect(null); setShowNewPost(false); }
  async function saveAsDraft() { if (!draft.content || !activeWS) return; const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: draft.date || null, scheduled_time: draft.time, status: "draft", approval: "none", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single(); if (data) setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); resetDraft(); }
  async function schedulePost() { if (!draft.content || !draft.date || draft.platforms.length === 0 || !activeWS) return; const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: draft.date, scheduled_time: draft.time, status: "scheduled", approval: "pending", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single(); if (data) setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); resetDraft(); }
  async function publishNow() { if (!draft.content || draft.platforms.length === 0 || !activeWS) return; const today = new Date().toISOString().split("T")[0]; const now = new Date().toTimeString().slice(0, 5); const { data } = await supabase.from("posts").insert({ workspace_id: activeWS, content: draft.content, platforms: draft.platforms, scheduled_date: today, scheduled_time: now, status: "publishing", approval: "approved", image_url: draft.image_url || null, video_url: draft.video_url || null }).select().single(); if (data) { setPosts(prev => ({ ...prev, [activeWS!]: [data, ...(prev[activeWS!] || [])] })); if (draft.platforms.includes("youtube") && draft.video_url) { const vid = draft.video_url; const cnt = draft.content; resetDraft(); await publishToYouTube({ ...data, video_url: vid, content: cnt }); return; } } resetDraft(); }
  async function addWorkspace() { if (!newWS.name) return; const ini = newWS.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(); const { data } = await supabase.from("workspaces").insert({ user_id: userEmail, ...newWS, avatar: ini }).select().single(); if (data) { setWorkspaces(prev => [...prev, data]); setPosts(prev => ({ ...prev, [data.id]: [] })); setActiveWS(data.id); } setNewWS({ name: "", industry: "", color: WORKSPACE_COLORS[0] }); setShowNewWS(false); }
  async function approvePost(id: string, decision: string) { await supabase.from("posts").update({ approval: decision }).eq("id", id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].map(p => p.id === id ? { ...p, approval: decision } : p) })); }
  async function deletePost(id: string) { await supabase.from("posts").delete().eq("id", id); if (activeWS) setPosts(prev => ({ ...prev, [activeWS]: prev[activeWS].filter(p => p.id !== id) })); }

  /* ═══ DRAG & DROP ═══ */
  function handleDragStart(e: any, idx: number) { setDragIndex(idx); e.dataTransfer.effectAllowed = "move"; }
  function handleDragOver(e: any, idx: number) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverIdx(idx); }
  async function handleDrop(e: any, toIdx: number) { e.preventDefault(); if (dragIndex === null || dragIndex === toIdx || !activeWS) { setDragIndex(null); setDragOverIdx(null); return; } const sched = (posts[activeWS] || []).filter(p => p.status === "scheduled").sort((a: any, b: any) => `${a.scheduled_date}T${a.scheduled_time}`.localeCompare(`${b.scheduled_date}T${b.scheduled_time}`)); const reordered = [...sched]; const [moved] = reordered.splice(dragIndex, 1); reordered.splice(toIdx, 0, moved); const allTimes = sched.map((p: any) => ({ date: p.scheduled_date, time: p.scheduled_time })).sort((a: any, b: any) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)); const updates: PromiseLike<any>[] = []; const updatedPosts = reordered.map((post: any, i: number) => { const slot = allTimes[i]; if (post.scheduled_date !== slot.date || post.scheduled_time !== slot.time) updates.push(supabase.from("posts").update({ scheduled_date: slot.date, scheduled_time: slot.time }).eq("id", post.id)); return { ...post, scheduled_date: slot.date, scheduled_time: slot.time }; }); const otherPosts = (posts[activeWS] || []).filter(p => p.status !== "scheduled"); setPosts(prev => ({ ...prev, [activeWS!]: [...updatedPosts, ...otherPosts] })); await Promise.all(updates); setDragIndex(null); setDragOverIdx(null); }

  /* ═══ GUARDS ═══ */
  if (status === "loading") return null;
  if (session && loading && workspaces.length === 0) return <div style={{ minHeight: "100vh", background: BRAND.dark, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>Loading...</div></div>;
  if (!session) return <LandingPage />;

  /* ═══ DERIVED ═══ */
  const ws = workspaces.find(w => w.id === activeWS);
  const wsPosts = activeWS ? (posts[activeWS] || []) : [];
  const scheduled = wsPosts.filter(p => p.status === "scheduled").sort((a: any, b: any) => `${a.scheduled_date}T${a.scheduled_time}`.localeCompare(`${b.scheduled_date}T${b.scheduled_time}`));
  const published = wsPosts.filter(p => p.status === "published");
  const draftPosts = wsPosts.filter(p => p.status === "draft");
  const pending = wsPosts.filter(p => p.approval === "pending" && p.status !== "draft");

  /* ═══ RENDER ═══ */
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI',system-ui,sans-serif", background: theme.bg }}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} page={page} setPage={setPage} pendingCount={pending.length} t={t} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} ws={ws} workspaces={workspaces} activeWS={activeWS} switchWorkspace={switchWorkspace} setShowNewWS={setShowNewWS} session={session} userName={userName} userEmail={userEmail} userInitials={userInitials} darkMode={darkMode} setDarkMode={setDarkMode} language={language} setLanguage={setLanguage} showSupport={showSupport} setShowSupport={setShowSupport} showNews={showNews} setShowNews={setShowNews} showLangMenu={showLangMenu} setShowLangMenu={setShowLangMenu} showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} setShowNewPost={setShowNewPost} theme={theme} t={t} />

        {showSupport && <SupportPanel theme={theme} darkMode={darkMode} t={t} onClose={() => setShowSupport(false)} />}
        {showNews && <NewsPanel theme={theme} darkMode={darkMode} t={t} onClose={() => setShowNews(false)} />}

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {page === "dashboard" && <Dashboard wsPosts={wsPosts} scheduled={scheduled} published={published} pending={pending} darkMode={darkMode} theme={theme} t={t} />}
          {page === "posts" && <PostsPage wsPosts={wsPosts} darkMode={darkMode} theme={theme} publishing={publishing} onNewPost={() => setShowNewPost(true)} onDelete={deletePost} onPublishYT={publishToYouTube} t={t} />}
          {page === "calendar" && <CalendarPage wsPosts={wsPosts} calDate={calDate} setCalDate={setCalDate} darkMode={darkMode} theme={theme} t={t} />}
          {page === "queue" && <QueuePage scheduled={scheduled} dragIndex={dragIndex} dragOverIdx={dragOverIdx} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} darkMode={darkMode} theme={theme} t={t} />}
          {page === "drafts" && <DraftsPage draftPosts={draftPosts} darkMode={darkMode} theme={theme} onDelete={deletePost} t={t} />}
          {page === "approval" && <ApprovalPage pending={pending} darkMode={darkMode} theme={theme} onApprove={approvePost} t={t} />}
          {page === "analytics" && <AnalyticsPage wsPosts={wsPosts} darkMode={darkMode} theme={theme} t={t} />}
          {page === "media" && <MediaPage theme={theme} t={t} />}
          {page === "team" && <TeamPage userName={userName} userEmail={userEmail} userInitials={userInitials} darkMode={darkMode} theme={theme} />}
          {page === "settings" && <SettingsPage ws={ws} darkMode={darkMode} theme={theme} onFetchChannels={fetchYouTubeChannels} onShowChannelPicker={setShowChannelPicker} onDisconnectYT={disconnectYouTube} t={t} />}
        </div>
      </div>

      {showNewPost && <CreatePostModal draft={draft} setDraft={setDraft} darkMode={darkMode} theme={theme} uploadingImage={uploadingImage} uploadingVideo={uploadingVideo} videoAspect={videoAspect} uploadImage={uploadImage} uploadVideo={uploadVideo} setVideoAspect={setVideoAspect} onClose={resetDraft} onSaveDraft={saveAsDraft} onSchedule={schedulePost} onPublishNow={publishNow} t={t} />}
      {showNewWS && <NewWorkspaceModal newWS={newWS} setNewWS={setNewWS} onClose={() => setShowNewWS(false)} onCreate={addWorkspace} theme={theme} t={t} />}
      {showChannelPicker && <ChannelPickerModal ws={ws} ytChannels={ytChannels} loadingChannels={loadingChannels} darkMode={darkMode} theme={theme} t={t} onSelect={selectYouTubeChannel} onClose={() => { setShowChannelPicker(false); setYtChannels([]); }} onRetry={fetchYouTubeChannels} />}
    </div>
  );
}