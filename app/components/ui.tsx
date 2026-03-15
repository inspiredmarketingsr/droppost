"use client";
import { Clock3, GripVertical } from "lucide-react";

export const BRAND = {
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

export const PLATFORMS = [
  { id: "facebook", label: "Facebook", short: "FB", color: "#1877F2", bg: "#EBF5FF" },
  { id: "instagram", label: "Instagram", short: "IG", color: "#E1306C", bg: "#FDE8F0" },
  { id: "tiktok", label: "TikTok", short: "TT", color: "#010101", bg: "#F3F3F3" },
  { id: "linkedin", label: "LinkedIn", short: "LI", color: "#0A66C2", bg: "#E8F4FD" },
  { id: "youtube", label: "YouTube", short: "YT", color: "#FF0000", bg: "#FFF0F0" },
];

export const WORKSPACE_COLORS = [BRAND.primary, "#10B981", "#F59E0B", "#E1306C", "#1877F2", "#06B6D4"];

export const pl = (id: string) => PLATFORMS.find(p => p.id === id);

export function useTheme(dm: boolean) {
  if (!dm) return { bg: BRAND.bg, card: BRAND.white, text: BRAND.text, textS: BRAND.textS, textT: BRAND.textT, border: BRAND.border, inputBg: BRAND.white, inputBorder: BRAND.border, headerBg: BRAND.white, modalBg: BRAND.white, hoverBg: "#F3F4F6", codeBg: "#F9FAFB", tagBg: BRAND.primaryL, calWeekend: "#F0FDFA", calHeader: "#F9FAFB", calToday: "#E0F2F1" };
  return { bg: "#0B0B14", card: "#16162A", text: "#E5E7EB", textS: "#9CA3AF", textT: "#6B7280", border: "#2A2A40", inputBg: "#1E1E35", inputBorder: "#3A3A55", headerBg: "#111125", modalBg: "#1A1A30", hoverBg: "#1E1E35", codeBg: "#12121F", tagBg: "rgba(124,58,237,0.2)", calWeekend: "#12122A", calHeader: "#14142A", calToday: "rgba(13,148,136,0.15)" };
}

export type Theme = ReturnType<typeof useTheme>;

export function Avatar({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: color + "22", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.3, fontWeight: 800, color, flexShrink: 0 }}>{initials}</div>;
}

export function PBadge({ pid, dark }: { pid: string; dark: boolean }) {
  const p = pl(pid); if (!p) return null;
  return <span style={{ fontSize: 11, background: dark ? p.color + "20" : p.bg, color: p.color, borderRadius: 5, padding: "2px 6px", fontWeight: 700, border: `1px solid ${p.color}20` }}>{p.short}</span>;
}

export function Tag({ label, color, bg }: { label: string; color: string; bg: string }) {
  return <span style={{ fontSize: 11, background: bg, color, borderRadius: 20, padding: "2px 9px", fontWeight: 600 }}>{label}</span>;
}

export function StatusTag({ status, approval }: { status: string; approval?: string }) {
  if (status === "published") return <Tag label="Published" color={BRAND.green} bg={BRAND.greenL} />;
  if (status === "draft") return <Tag label="Draft" color={BRAND.textS} bg={BRAND.border} />;
  if (approval === "pending") return <Tag label="Pending" color={BRAND.amber} bg={BRAND.amberL} />;
  if (approval === "rejected") return <Tag label="Rejected" color={BRAND.red} bg={BRAND.redL} />;
  return <Tag label="Scheduled" color={BRAND.primary} bg={BRAND.primaryL} />;
}

export function DraggableQueueItem({ post, index, onDragStart, onDragOver, onDrop, isDragging, dragOverIndex, theme, dark }: any) {
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