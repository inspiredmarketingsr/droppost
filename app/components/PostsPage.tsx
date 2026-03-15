"use client";
import { Plus, Trash2, PlayCircle, ExternalLink } from "lucide-react";
import { BRAND, PBadge, StatusTag, Theme } from "./ui";

type Props = {
  wsPosts: any[];
  darkMode: boolean;
  theme: Theme;
  publishing: string | null;
  onNewPost: () => void;
  onDelete: (id: string) => void;
  onPublishYT: (post: any) => void;
  t: (en: string, nl: string) => string;
};

export default function PostsPage({ wsPosts, darkMode, theme, publishing, onNewPost, onDelete, onPublishYT, t }: Props) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text }}>Posts</h1>
        <button onClick={onNewPost} style={{ background: BRAND.gradBtn, color: "#fff", border: "none", borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          <Plus size={15} /> {t("New", "Nieuw")}
        </button>
      </div>
      {wsPosts.map((post: any) => (
        <div key={post.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 10px", fontSize: 14, color: theme.text, lineHeight: 1.6 }}>{post.content}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {post.platforms?.map((pid: string) => <PBadge key={pid} pid={pid} dark={darkMode} />)}
                <span style={{ fontSize: 11, color: theme.textT }}>{post.scheduled_date} {post.scheduled_time}</span>
                <StatusTag status={post.status} approval={post.approval} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {post.platforms?.includes("youtube") && post.video_url && post.status !== "published" && (
                  <button onClick={() => onPublishYT(post)} disabled={publishing === post.id} style={{ fontSize: 12, background: "#FF000015", color: "#FF0000", border: "1px solid #FF000030", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    {publishing === post.id ? "..." : <><PlayCircle size={13} /> YT</>}
                  </button>
                )}
                <button onClick={() => onDelete(post.id)} style={{ fontSize: 12, background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Trash2 size={13} />
                </button>
              </div>
              {post.youtube_id && (
                <a href={`https://www.youtube.com/watch?v=${post.youtube_id}`} target="_blank" rel="noopener" style={{ fontSize: 11, color: "#FF0000", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                  <ExternalLink size={11} /> YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}