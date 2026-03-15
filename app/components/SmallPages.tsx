// ═══════════════════════════════════════
// app/components/QueuePage.tsx
// ═══════════════════════════════════════
"use client";
import { Inbox } from "lucide-react";
import { DraggableQueueItem, Theme } from "./ui";

type QueueProps = {
  scheduled: any[];
  dragIndex: number | null;
  dragOverIdx: number | null;
  onDragStart: (e: any, idx: number) => void;
  onDragOver: (e: any, idx: number) => void;
  onDrop: (e: any, idx: number) => void;
  darkMode: boolean;
  theme: Theme;
  t: (en: string, nl: string) => string;
};

export function QueuePage({ scheduled, dragIndex, dragOverIdx, onDragStart, onDragOver, onDrop, darkMode, theme, t }: QueueProps) {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Queue", "Wachtrij")}</h1>
      {scheduled.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Inbox size={32} color={theme.textT} style={{ marginBottom: 8 }} />
          <div style={{ color: theme.textT, fontSize: 14 }}>{t("No scheduled posts", "Geen geplande posts")}</div>
        </div>
      )}
      <div onDragOver={(e: any) => e.preventDefault()}>
        {scheduled.map((post: any, idx: number) => (
          <DraggableQueueItem key={post.id} post={post} index={idx} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} isDragging={dragIndex} dragOverIndex={dragOverIdx} theme={theme} dark={darkMode} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// app/components/DraftsPage.tsx
// ═══════════════════════════════════════
import { FileText, Trash2 } from "lucide-react";
import { BRAND } from "./ui";

type DraftsProps = {
  draftPosts: any[];
  darkMode: boolean;
  theme: Theme;
  onDelete: (id: string) => void;
  t: (en: string, nl: string) => string;
};

export function DraftsPage({ draftPosts, darkMode, theme, onDelete, t }: DraftsProps) {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Drafts", "Concepten")}</h1>
      {draftPosts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FileText size={32} color={theme.textT} style={{ marginBottom: 8 }} />
          <div style={{ color: theme.textT, fontSize: 14 }}>{t("No drafts", "Geen concepten")}</div>
        </div>
      ) : draftPosts.map((post: any) => (
        <div key={post.id} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 13, color: theme.text }}>{post.content}</div>
          <button onClick={() => onDelete(post.id)} style={{ fontSize: 12, background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Trash2 size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// app/components/ApprovalPage.tsx
// ═══════════════════════════════════════
import { PartyPopper, CheckCircle } from "lucide-react";

type ApprovalProps = {
  pending: any[];
  darkMode: boolean;
  theme: Theme;
  onApprove: (id: string, decision: string) => void;
  t: (en: string, nl: string) => string;
};

export function ApprovalPage({ pending, darkMode, theme, onApprove, t }: ApprovalProps) {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>{t("Approval", "Goedkeuring")}</h1>
      {pending.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <PartyPopper size={32} color={BRAND.green} style={{ marginBottom: 8 }} />
          <div style={{ color: theme.textT, fontSize: 14 }}>{t("All caught up!", "Alles bijgewerkt!")}</div>
        </div>
      ) : pending.map((post: any) => (
        <div key={post.id} style={{ background: theme.card, border: `1.5px solid ${BRAND.amber}50`, borderRadius: 16, padding: "18px", marginBottom: 14 }}>
          <p style={{ margin: "0 0 12px", fontSize: 14, color: theme.text }}>{post.content}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => onApprove(post.id, "approved")} style={{ flex: 1, padding: "10px", background: darkMode ? "rgba(16,185,129,0.15)" : BRAND.greenL, color: BRAND.green, border: `1px solid ${BRAND.green}40`, borderRadius: 10, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <CheckCircle size={15} /> {t("Approve", "Goedkeuren")}
            </button>
            <button onClick={() => onApprove(post.id, "rejected")} style={{ flex: 1, padding: "10px", background: darkMode ? "rgba(239,68,68,0.15)" : BRAND.redL, color: BRAND.red, border: `1px solid ${BRAND.red}40`, borderRadius: 10, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <Trash2 size={15} /> {t("Reject", "Afwijzen")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// app/components/AnalyticsPage.tsx
// ═══════════════════════════════════════
import { AlertCircle } from "lucide-react";

type AnalyticsProps = {
  wsPosts: any[];
  darkMode: boolean;
  theme: Theme;
  t: (en: string, nl: string) => string;
};

export function AnalyticsPage({ wsPosts, darkMode, theme, t }: AnalyticsProps) {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Analytics</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {[{ l: "Reach", v: "—", c: BRAND.primary }, { l: "Engagement", v: "—", c: BRAND.green }, { l: "Posts", v: String(wsPosts.length), c: "#0EA5E9" }].map(s => (
          <div key={s.l} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: theme.textT, marginBottom: 10 }}>{s.l.toUpperCase()}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: "24px", textAlign: "center" }}>
        <AlertCircle size={28} color={theme.textT} style={{ marginBottom: 8 }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{t("Real analytics coming soon", "Echte analytics komen binnenkort")}</div>
        <div style={{ fontSize: 12, color: theme.textT, marginTop: 4 }}>{t("Connect your accounts in Settings to see real data", "Koppel je accounts in Instellingen voor echte data")}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// app/components/MediaPage.tsx
// ═══════════════════════════════════════
import { Upload } from "lucide-react";

type MediaProps = { theme: Theme; t: (en: string, nl: string) => string };

export function MediaPage({ theme, t }: MediaProps) {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Media</h1>
      <div style={{ background: theme.card, border: `2px dashed ${theme.border}`, borderRadius: 14, padding: "40px", textAlign: "center" }}>
        <Upload size={36} color={theme.textT} />
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.text, marginTop: 12 }}>{t("Drop files here", "Sleep bestanden hierheen")}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// app/components/TeamPage.tsx
// ═══════════════════════════════════════
import { Avatar, Tag } from "./ui";

type TeamProps = {
  userName: string;
  userEmail: string;
  userInitials: string;
  darkMode: boolean;
  theme: Theme;
};

export function TeamPage({ userName, userEmail, userInitials, darkMode, theme }: TeamProps) {
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: theme.text, marginBottom: 20 }}>Team</h1>
      <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <Avatar initials={userInitials} color={BRAND.primary} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{userName}</div>
          <div style={{ fontSize: 12, color: theme.textT }}>{userEmail}</div>
        </div>
        <Tag label="Admin" color={BRAND.primary} bg={darkMode ? "rgba(124,58,237,0.2)" : BRAND.primaryL} />
      </div>
    </div>
  );
}